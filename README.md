### Install
```
  npm install oce-router --save
  or
  yarn add oce-router
```


### Usage
1. Router
```
  const router = new Router(routes)
```
2. Route
```
  const routes = [
    // This route will match '/foo', it won't match '/foo/bar' and '/foo/'
    {
      path: '/foo',                               // match path 
      exact: true,                                // exact mode
      strict: true,                               // strict mode
      match: (match, location) => {...}  // This funciton will be invoked when path match the current pathname
    },
    // This route can match '/bar/*' 
    {
      path: '/bar',
      match: () => {}
    }
  ]

  // match function will take 2 parameters
  // location = {pathname, search, hash}
  // match = {path, url, isExact, params}

3. API
Router.pushState Router.replaceState Router.go Router.forward Router.back
```