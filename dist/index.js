(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('path-to-regexp')) :
  typeof define === 'function' && define.amd ? define(['path-to-regexp'], factory) :
  (global = global || self, global.Router = factory(global.pathToRegexp));
}(this, function (pathToRegexp) { 'use strict';

  pathToRegexp = pathToRegexp && pathToRegexp.hasOwnProperty('default') ? pathToRegexp['default'] : pathToRegexp;

  function initRoutes (routes = []) {
    const routesMap = new Map();
    try {
      routes.forEach(route => {
        const { path, exact = false, sensitive = false, strict = false, match } = route;
        routesMap.set(path, { exact, sensitive, strict, match});
      });
    } catch (e) {
      throw new Error('Route must have path and match function!')
    }

    return routesMap
  }

  function createHistory () {
    const history = window.history;
    return {
      length: history.length,
      push: (path, state = null) => history.pushState(path, state),
      replace: (path, state = null) => history.replaceState(path, state),
      go: (n) => history.go(n),
      forward: () => history.go(1),
      back: () => hisotory.go(-1)
    }
  }

  function createLocation () {
    const { pathname, search, hash } = window.location;
    return {
      pathname,
      search,
      hash
    }
  }

  function getCurrentPathName () {
    return window.location.pathname || '/'
  }

  function compilePath (path, options) {
    const keys = [];
    const re =  pathToRegexp(path, keys, options);
    return {
      re,
      keys
    }
  }

  function matchPath (pathName, options = {}) {
    if (pathName === undefined || pathName === null) return null

    const { path, exact = false, strict = false, sensitive = false } = options;  

    const { re , keys } = compilePath(path, { end: exact, strict, sensitive });

    const match = re.exec(pathName);
    if(!match) return null

    const url = match[0], values = match.slice(1);
    const isExact = pathName === url;
    
    if(exact && !isExact) return null

    return {
      path,
      url: path === "/" && url === "" ? "/" : url,
      isExact: exact,
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo
      }, {})
    }
  }

  class Router {
    constructor (routes) {
      if (!window || !window.history) {
        throw new Error('we need HTML5 history API support!')
      }
      this.routes = initRoutes(routes);
      this.observer();
      window.addEventListener('popstate', this.observer);
    }
    
    observer () {
      this.routes.forEach((value, key) => {
        const pathName = getCurrentPathName();
        const options = {
          path: key,
          exact: value.exact,
          sensitive: value.exact,
          strict: value.strict
        };
        const match = matchPath(pathName, options);
        if (!match) return
        const history = createHistory(), location = createLocation();
        value['match'](history, location, match);
      });
    }
    
    dispose () {
      window.removeEventListener('popstate', this.observer);
    }

  }

  return Router;

}));
//# sourceMappingURL=index.js.map
