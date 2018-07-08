/**
 * Export the VueRouter class, & install it automatically if Vue is defined.
 */

import createMatcher from './matcher/createMatcher'

/**
 * Use a factory (method) pattern to encapsulate the creation(usage: CRUD) of objects.
 *
 * Define a VueRouter for choosing one history to instantiate among different types
 * of histories.
 */
export default class VueRouter {
    constructor(opts = {}) {
        this.matcher = createMatcher(opts.routes || [], this)
    }

    /**
     * Match the request location with the location of the component.
     * (proxy the match method for the client)
     */
    match(raw, current, redirectForm) {
        return this.matcher.match(raw, current, redirectForm)
    }
}
