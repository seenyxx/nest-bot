import { Database } from 'quickmongo'
import { botCache } from '../util/cache'

const guilds = new Database(botCache.config.database).createModel('guilds')

export async function getGuildLockdown(id: string): Promise<boolean> {
  return (await guilds.get(`${id}.lockdown`)) || false
}

export async function turnOnGuildLockdown(id: string) {
  await guilds.set(`${id}.lockdown`, true)
}

export async function turnOffGuildLockdown(id: string) {
  await guilds.set(`${id}.lockdown`, false)
}
