export function initRoutes (routes = []) {
  const routesMap = new Map()
  try {
    routes.forEach(route => {
      const { path, exact = false, sensitive = false, strict = false, match } = route
      routesMap.set(path, { exact, sensitive, strict, match})
    })
  } catch (e) {
    throw new Error('Route must have path and match function!')
  }

  return routesMap
}

// export function createHistory () {
//   const history = window.history
//   return {
//     length: history.length,
//     push: (path, state = null) => {
//       history.pushState(path, state)
//     },
//     replace: (path, state = null) => {
//       history.replaceState(path, state)
//     },
//     go: (n) => history.go(n),
//     forward: () => history.go(1),
//     back: () => hisotory.go(-1)
//   }
// }

export function createLocation () {
  const { pathname, search, hash } = window.location
  return {
    pathname,
    search,
    hash
  }
}

export function getCurrentPathName () {
  return window.location.pathname || '/'
}
