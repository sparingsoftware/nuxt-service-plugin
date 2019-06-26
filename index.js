const requireServices = require.context('../../../service/', false, /\.(js|ts)$/)
const servicesModules = requireServices.keys().map(fileName => {
  const builder = requireServices(fileName).default
  const name = fileName.replace(/^\.\//, '')
    .replace(/.[^.]*$/, '')
    .replace(/(-\w)/g, m => m[1].toUpperCase())

  return { name, builder }
})

export default function createService (httpClient) {
  const services = servicesModules.map(serviceModule => {
    const service = serviceModule.builder(httpClient)
    const name = typeof service.name === 'string'
      ? service.name
      : serviceModule.name

    return { service, name }
  })

  const serviceHashTable = services.reduce((hashTable, service) => {
    hashTable[service.name] = service.service
    return hashTable
  }, {})

  return serviceHashTable
}
