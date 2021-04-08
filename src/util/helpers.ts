import { Guild, NewsChannel, PermissionResolvable, TextChannel } from 'discord.js'

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

export async function getStarboardChannel(
  guild: Guild
): Promise<TextChannel | NewsChannel | undefined> {
  return guild.channels.cache.find(
    c => c.isText() && c.name.includes('starboard')
  ) as TextChannel | NewsChannel | undefined
}

export function calculateMemoryUsageMB() {
  return Math.floor(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100
}

export function parseDisplayUptime(uptime: number) {
  let secs = Math.floor(uptime)

  let days = Math.floor(secs / (3600 * 24))

  secs -= days * 3600 * 24

  let hours = Math.floor(secs / 3600)

  secs -= hours * 3600

  let mins = Math.floor(secs / 60)

  secs -= mins * 60

  return [
    `${days}:${hours}:${mins}:${secs}`,
    `${days}d ${hours}h ${mins}m ${secs}s`,
  ]
}