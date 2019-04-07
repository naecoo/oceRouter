import pathToRegexp from 'path-to-regexp'

function compilePath (path, options) {
  const keys = []
  const re =  pathToRegexp(path, keys, options)
  return {
    re,
    keys
  }
}

function matchPath (pathName, options = {}) {
  if (pathName === undefined || pathName === null) return null

  const { path, exact = false, strict = false, sensitive = false } = options  

  const { re , keys } = compilePath(path, { end: exact, strict, sensitive })

  const match = re.exec(pathName)
  if(!match) return null

  const url = match[0], values = match.slice(1)
  const isExact = pathName === url
  
  if(exact && !isExact) return null

  return {
    path,
    url: path === "/" && url === "" ? "/" : url,
    isExact: exact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index]
      return memo
    }, {})
  }
}

export default matchPath