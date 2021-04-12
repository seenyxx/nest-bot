import { readFileSync } from 'fs';
import { Database } from 'quickmongo'
import { Configuration } from '../util/helpers';

export function getConfig(): Configuration {
  const path = `${__dirname}/../../${
    process.env.NODE_ENV !== 'production' ? 'config.dev.json' : 'config.json'
  }`
  return JSON.parse(readFileSync(path).toString())
}

const guilds = new Database(getConfig().database).createModel('guilds')

export async function getGuildLockdown(id: string): Promise<boolean> {
  return (await guilds.get(`${id}.lockdown`)) || false
}

export async function turnOnGuildLockdown(id: string) {
  await guilds.set(`${id}.lockdown`, true)
}

export async function turnOffGuildLockdown(id: string) {
  await guilds.set(`${id}.lockdown`, false)
}

export async function setLogsWebhook(id: string, wh: string) {
  await guilds.set(`${id}.logs`, wh)
}

export async function getLogsWebhook(id: string): Promise<string | null> {
  return await guilds.get(`${id}.logs`)
}

export async function deleteLogsWebhook(id: string) {
  await guilds.delete(`${id}.logs`)
}
