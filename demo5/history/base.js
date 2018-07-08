import { inBrowser } from '../util/dom'

/**
 * This class defines a abstract history. Every history is instantiated in
 * its subclasses, & no histories is instantiated by it.
 */
export default class History {
    /**
     * Create a history, which is also a message publisher.
     *
     * @param router {Object} a router with a path of the current page
     * @param base {String} a base url
     */
    constructor(router, base) {
        this.router = router
        this.base = normalize(base)
        this.readyCb = [] // store a list of function subscribers
        this.readyErrorCb = [] // above
    }

    // lifecycle hooks
    /**
     * Define a success callback when the router navigates in a successful state,
     * & a error callback when the router navigates in a failure state.
     */
    onReady(cb, errorCb) {
        if(this.ready) {
            cb()
        } else {
            this.readyCb.push(cb)
            if(errorCb) {
                this.readyErrorCb.push(errorCb)
            }
        }
    }

    /**
     * Transition to a new location, call onComplete & onAbort,
     * and onReady & onError lifecycle hooks.
     */
    transitionTo (location, onComplete, onAbort) {
        const route = this.router.match(location, this.current)
        this.confirmTransition(route, () => {
            this.updateRoute(route)
            onComplete && onComplete(route) // call the lifecycle hooks of onComplete
            this.ensureURL()

            // fire ready cbs once
            if (!this.ready) {
                this.ready = true
                this.readyCbs.forEach(cb => { cb(route) }) // call the lifecycle hooks of onReady
            }
        }, err => {
            if (onAbort) {
                onAbort(err) // above
            }
            if (err && !this.ready) {
                this.ready = true
                this.readyErrorCbs.forEach(cb => { cb(err) }) // above
            }
        })
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
