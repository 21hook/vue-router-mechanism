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
    }
}
