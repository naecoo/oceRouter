import { initRoutes, getCurrentPathName ,createHistory, createLocation }from './util'
import matchPath from './match'

class Router {
  constructor (routes) {
    if (!window || !window.history) {
      throw new Error('we need HTML5 history API support!')
    }
    this.routes = initRoutes(routes)
    this.observer()
    window.addEventListener('popstate', this.observer)
  }
  
  observer () {
    this.routes.forEach((value, key) => {
      const pathName = getCurrentPathName()
      const options = {
        path: key,
        exact: value.exact,
        sensitive: value.exact,
        strict: value.strict
      }
      const match = matchPath(pathName, options)
      if (!match) return
      const history = createHistory(), location = createLocation()
      value['match'](history, location, match)
    })
  }
  
  dispose () {
    window.removeEventListener('popstate', this.observer)
  }

}

export default Router