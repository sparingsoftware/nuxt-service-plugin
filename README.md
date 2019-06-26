# Nuxt service plugin

[![MIT license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/SparingSoftware/nuxt-service-plugin/blob/master/LICENSE)
[![Downloads number](https://img.shields.io/npm/dt/@sparing-software/nuxt-service-plugin.svg)](https://www.npmjs.com/package/@sparing-software/nuxt-service-plugin)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Services integration with Nuxt.js

## Installation
Install package in your project 
```bash
$ npm install @sparing-software/nuxt-service-plugin
```
 
## Configuration
1. Create `@/plugins/service.js` - feel free to use your favourite http client
```js 
import createService from '@sparing-software/nuxt-service-plugin'

export default function (ctx, inject) {
  const httpClient = ctx.$axios
  const service = createService(httpClient)

  ctx.$service = service
  inject('service', service)
}
```

2. Add plugin (`nuxt.config.js`)
```js
plugins: [
  '@/plugins/service'
]
```

3. Transpile plugin with webpack to autoimport services files (`nuxt.config.js`)
```js
build: {
  transpile: ['@sparing-software/nuxt-service']
}
```

## Usage
1. Create `service` folder in your root directory
2. Add service by creating js file - for example: `@/service/books.js` will create `books` service
```js
export default axios => ({
  getAll () {
    return axios.get('/books')
  },
  getById (id) {
    return axios.get('/books?id=' + id)
  }
})
```
3. `books` service is now accessible all over the app:
 - Components: `this.$service.books.getAll()`
 - Vuex actions: `this.app.$service.books.getAll()`
 - The Context: `ctx.$service.books.getAll()`


## Contributing
Want to help improve this plugin? Great!  
Project is open-source so fork repo and join us!

## License
MIT License © [Sparing Interactive](https://github.com/SparingSoftware)
