import { ClientEvents } from 'discord.js'

export function onEvent<K extends keyof ClientEvents>(
  on: K,
  listener: (...args: ClientEvents[K]) => void
) {
  return {
    on: on,
    exec: listener,
  }
}

export interface CustomBotEvent<K extends keyof ClientEvents> {
  on: string
  exec: (...args: ClientEvents[K]) => void
}
