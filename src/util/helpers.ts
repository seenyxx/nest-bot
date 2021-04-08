import { Guild, PermissionResolvable, TextChannel } from 'discord.js'

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
  return `${ends || ''}${a.join(sep || ' ')}${ends || ''}`
}

export function formatPermissions(a: PermissionResolvable[]) {
  return a.map(perm => eachWordUppercase(perm.toString().replace(/_/g, ' ')))
}

export function eachWordUppercase(phrase: string) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function shortenNumber(number: number) {
  return number > 1000 ? `${Math.floor(number / 100) / 10}k` : number
}

export function duplicateObject<V>(o: V): V {
  return JSON.parse(JSON.stringify(o))
}

export async function findMessageFromGuild(guild: Guild, id: string) {
  let channels = guild.channels.cache
    .filter(c => c.type === 'text' || c.type === 'news')
    .array()
  for (let c of channels) {
    let target = await (c as TextChannel).messages.fetch(id).catch(no => {})
    if (target) return target
  }
}
