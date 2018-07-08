import { cleanPath } from './util/path'

export default function createRouteMap (routes) {
    /*
        A list of path to be routed in the <router-link> component
        Ex:
            <'/',   '/home',      '/home/header'>
                  page location  page section anchor
     */
    const pathList = []
    const pathMap = Object.create(null) // create a new object with null as its object prototype

    routes.forEach(route => addRoute(pathList, pathMap, route))
}

// private module members
/**
 * Add a route object to each node in the pat tree.
 * Ex:
 *  A path tree in a page
 *      '/'
 *      '/home'
 *          - 'home/header'
 *          - 'home/content'
 */
function addRoute(pathList, pathMap, routeOpts) {
    const { path, name } = routeOpts
    const normalizedPath = normalizePath(path)
    const route = { // create a collection of route fields
        path: normalizedPath,
        components: routeOpts.components || { default: routeOpts.component },
        instances: {},
        name,
        redirect: routeOpts.redirect,
        beforeEnter: routeOpts.beforeEnter,
        meta: routeOpts.meta || {},
        props: routeOpts.props == null
            ? {}
            : routeOpts.components
                ? routeOpts.props
                : { default: routeOpts.props }
    }

    // traverse the children router of the current route
    if (routeOpts.children) {
        routeOpts.children.forEach(child => { // divide part
            addRoute(pathList, pathMap, child) // conquer the recursive case
        })
    }


    // conquer the base case
    // push the entry into path list
    // ,or set the entry to the path map
    /*
       The path map is a direct-dress table as shown below:
        '/'            | {} // router
        '/home'        | {}
        '/home/header' | {}
     */
    if (!pathMap[route.path]) {
        pathList.push(route.path)
        // path-to-route direct-address table
        pathMap[route.path] = route
    }
}

function normalizePath (path, parent) {
    if (path[0] === '/') return path
    if (parent == null) return path
    return cleanPath(`${parent.path}/${path}`)
}
