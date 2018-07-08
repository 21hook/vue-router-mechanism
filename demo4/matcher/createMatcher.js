import createRouteMap from './createRouteMap'
import { normalizeLocation } from './util/location'


export default function createMatcher(routes, router) {
    const {pathList, pathMap} = createRouteMap(routes)

    function match(raw, currentRoute, redirectedFrom) {
        const location = normalizeLocation(raw, currentRoute, false, router)

        if (location.path) {
            location.params = {}
            for (let i = 0; i < pathList.length; i++) {
                const path = pathList[i]

                // match
                const route = pathMap[path]
                if (matchRoute(route.regex, location.path, location.params)) {
                    return _createRoute(route, location, redirectedFrom)
                }
            }
        }

        // no match
        return _createRoute(null, location)
    }



    // expose the interfaces to match & add routes
    return { match }
}

function matchRoute (regex, path, params) {
    const m = path.match(regex)

    if (!m) {
        return false
    } else if (!params) {
        return true
    }

    for (let i = 1, len = m.length; i < len; ++i) {
        const key = regex.keys[i - 1]
        const val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
        if (key) {
            // Fix #1994: using * with props: true generates a param named 0
            params[key.name || 'pathMatch'] = val
        }
    }

    return true
}
