export function isDevelopment() {
  return process.env.NODE_ENV === 'production' ? false : true
}

export function getConfig(): Configuration {
  const path = `${__dirname}/../../${
    isDevelopment() ? 'config.dev.json' : 'config.json'
  }`
  return require(path)
}

export interface Configuration {
  token: string
  prefix: string
  database: string
}

export function joinArray(a: any[], sep?: string, ends?: string) {
  return `${ends}${a.join(sep || ' ')}${ends}`
}
