import { inBrowser } from '../util/dom'

/**
 * This class defines a abstract history. Every history is instantiated in
 * its subclasses, & no histories is instantiated by it.
 */
export default class History {
    /**
     * Create a history.
     *
     * @param router {Object} a router with a path of the current page
     * @param base {String} a base url
     */
    constructor(router, base) {
        this.router = router
        this.base = normalize(base)
    }
}


// private module members
/**
 * Normalize(标准化) the base url.
 */
function normalize (base) {
    if (!base) {
        if (inBrowser) {
            // respect <base> tag
            const baseEl = document.querySelector('base')
            base = (baseEl && baseEl.getAttribute('href')) || '/'
            // strip full URL origin
            base = base.replace(/^https?:\/\/[^\/]+/, '')
        } else {
            base = '/'
        }
    }
    // make sure there's the starting slash
    if (base.charAt(0) !== '/') {
        base = '/' + base
    }
    // remove trailing slash
    return base.replace(/\/$/, '')
}
