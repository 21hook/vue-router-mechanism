import History from './base'

/**
 * This class represent a hash history, which is proxy object of the window location to manage
 * the location histories.
 */
export default class HashHistory extends History {
    /**
     * Construct a hash history.
     * delegation: call the method of a history in hash constructor.
     */
    constructor(router, base) {
        super(router, base) // call the super class's constructor

        ensureSlash()
    }

    // instance methods
    /**
     * Transition to the new location & push the current location to the
     * history stack.
     */
    push (location) {
        this.transitionTo(location)
        pushHash(this)
    }

    /**
     * Return the location of the current page
     * Ex:
     *  http://www.mysite.com/home#content
     *
     * The location equals to:
     *  [/path][?search_params][#hash_fragment]
     */
    getCurrentLocation() {
        return getHash()
    }

}

// private module members
/**
 * Ensure the hash fragment of each url padded with a slash for spa routes.
 */
function ensureSlash () {
    const path = getHash()
    if (path.charAt(0) === '/') {
        return true
    }
    window.location.replace(padSlash('/' + path))
    return false
}

/**
 * Get the hash fragment of the url.
 * Ex:
 *  'http://www.mysite.com/home#header'
 *  -> '#/header'
 */
export function getHash () {
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    const href = window.location.href
    const index = href.indexOf('#')
    return index === -1 ? '' : href.slice(index + 1)
}

/**
 * Pad the hash fragment with a slash
 * (change the page anchors to spa routes).
 *
 * Ex:
 *  'https://www.mysite.com/home/#header'
 *  -> 'https//www.mysite.com/home/#/header'
 */
function padSlash (path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
}

/**
 * Push the current location to the history stack.
 */
function pushHash (path) {
    window.location.hash = path
}
