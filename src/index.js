import { initRoutes, getCurrentPathName ,createHistory, createLocation }from './util'
import matchPath from './match'
const history = window.history
class Router {
  constructor (routes) {
    if (!window || !window.history) {
      throw new Error('we need HTML5 history API support!')
    }
    this.routes = initRoutes(routes)
    this.update()
    window.addEventListener('popstate', this.update.bind(this))
  }
  
  update () {
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
      const location = createLocation()
      value['match'](location, match)
    })
  }

  pushState(path, state = null) {
    history.pushState(state, null, path)
    this.update()
  }

  replaceState(path, state = null) {
    history.replaceState(state, null, path)
    this.update()
  }
  
  go (n) {
    if (typeof n !== 'number') return 
    history.go(n)
  }

  back () {
    this.go(-1)
  }

  forward () {
    this.go(1)
  }
}

export default Router