### Install
```
  npm install router --save
  or
  yarn add router
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
      match: (history, match, location) => {...}  // This funciton will be invoked when path match the current pathname
    },
    // This route can match '/bar/*' 
    {
      path: '/bar',
      match: () => {}
    }
  ]

  // match function will take 3 parameters
  // history = {length, push, repalce, go, back, forward}
  // location = {pathname, search, hash}
  // match = {path, url, isExact, params}

```