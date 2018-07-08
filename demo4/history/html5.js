import History from './base'
import { START } from '../util/route'
import { setupScroll,  } from '../util/scroll'
import { supportsPushState, pushState } from '../util/push-state'

/**
 * This class represents a html5 history, which is defined like this:
 *  'https://www.mysite.com/home/header?name=Ada#avatar'
 * As the active location history changes, the current page won't request for
 * new page instead of changing the component view in the current page.
 */
export class HTML5History extends History {
    /**
     * Create a html5 history.
     */
    constructor(router, base) {
        super(router, base)

        setupListeners(router)
    }

    // object methods
    // switch to the prev/next location in the history stack
    /*
       The history stack:
            vue-router  <- top   vue-router             vue-router <- top
            vuex                 vuex    <- top         vuex
            zhihu                zhihu                  zhihu
            google               google                 google
            baidu                baidu                  baidu
          current page          prev page              next page
       => manipulate the pointer/index arithmetic, then emit the popstate message/event & trigger the
        function subscriber/listener
     */
    /**
     * Transition to the new location & push the current location to the
     * history stack.
     */
    push (location) {
        this.transitionTo(location)
        pushHash(this)
    }
}

//private module members
/**
 * Set up a function listener for the popstate event
 * @param router
 */
function setupListeners(router) {
    const supportsScroll = supportsPushState && router.options.scrollBehavior

    if (supportsScroll) {
        setupScroll()
    }

    // add popstate event of the location
    window.addEventListener('popstate', () => {
        // Avoiding first `popstate` event dispatched in some browsers but first
        // history route not updated since async guard at the same time.
        const location = getLocation(this.base)
        if (this.current === START && location === getLocation(this.base)) {
            return
        }

        this.transitionTo(location)
    })
}
/**
 * Return the location of the current page
 * Ex:
 *  http://www.mysite.com/home#content
 *
 *  The location equals to:
 *      [/path][?search_params][#hash_fragment]
 */
function getLocation (base) {
    let path = window.location.pathname
    if (base && path.indexOf(base) === 0) {
        path = path.slice(base.length)
    }
    return (path || '/') + window.location.search + window.location.hash
}

function pushHash (path) {
    if (supportsPushState) {
        pushState(getUrl(path))
    } else {
        window.location.hash = path
    }
}

function getUrl (path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
}
