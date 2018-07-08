import History from './base'

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
    }
}
