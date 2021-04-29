import { Guild, NewsChannel, PermissionResolvable, TextChannel } from 'discord.js'
import { readFileSync } from 'fs'
import { deleteLogsWebhook, getLogsWebhook } from '../database/config'

export function getConfig(): Configuration {
  const path = `${__dirname}/../../${
    process.env.NODE_ENV !== 'production' ? 'config.dev.json' : 'config.json'
  }`
  return JSON.parse(readFileSync(path).toString())
}

export function getDatabaseUrl() {
  return getConfig().database
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
  return Math.floor((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100
}

export function parseDisplayUptime(uptime: number) {
  let secs = Math.floor(uptime)

  let days = Math.floor(secs / (3600 * 24))

  secs -= days * 3600 * 24

  let hours = Math.floor(secs / 3600)

  secs -= hours * 3600

  let mins = Math.floor(secs / 60)

  secs -= mins * 60

  return [`${days}:${hours}:${mins}:${secs}`, `${days}d ${hours}h ${mins}m ${secs}s`]
}

export function stripString(str: string) {
  let str2 = str.substr(1, str.length)
  return str2.substr(0, str2.length - 1)
}

export async function getMuteRole(guild: Guild) {
  const muteRole =
    guild.roles.cache.find(r => r.name.includes('Muted')) ||
    (await guild.roles.create({
      data: {
        name: 'Muted',
        hoist: false,
        mentionable: false,
      },
    }))

  guild.channels.cache.forEach(c => {
    c.createOverwrite(muteRole, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
    })
  })

  return muteRole
}

export async function getGuildLogs(guild: Guild) {
  const logsId = await getLogsWebhook(guild.id)

  if (!logsId) return

  const whs = await guild.fetchWebhooks()

  const wh = whs.find(wh => wh.id === logsId)

  if (!wh) {
    deleteLogsWebhook(guild.id)
    return
  }

  return wh
}

export function compareBooleanObjects(
  oldObj: Record<string, boolean>,
  newObj: Record<string, boolean>
) {
  let ret: Record<string, boolean> = {}
  for (const key in oldObj) {
    if (oldObj[key] !== newObj[key]) {
      ret[key] = newObj[key]
    }
  }

  return ret
}
