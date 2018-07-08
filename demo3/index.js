/**
 * Export the VueRouter class, & install it automatically if Vue is defined.
 */
import HashHistory from './history/hash'
import HTML5History from './history/html5'
import AbstractHistory from './history/abstract'

/**
 * Use factory (method) pattern to encapsulate the creation(usage: CRUD) of objects.
 *
 * Define a VueRouter for choosing one history to instantiate among different types
 * of histories.
 */
export default class VueRouter {
    constructor(opts = {}) {
        this.opts = opts

        let mode = opts.mode || 'hash'

        switch(mode) {
        case 'hash':
            this.history = new HashHistory(this, opts.base)
            break
        case 'history':
            this.history = new HTML5History(this, opts.base)
            break
        case 'abstract':
            this.history = new AbstractHistory(this, opts.base)
            break
        default:
            if (process.env.NODE_ENV !== 'production') {
                console.error(`Invalid mode: ${mode}`)
            }
        }

    }
}
