import { Collection } from 'discord.js'
import { getConfig } from './helpers'
import { Command } from '../client/handlers/command'
import { CooldownsManager } from '../client/handlers/cooldowns';

export const botCache = {
  config: getConfig(),
  commands: new Collection<string, Command>(),
  cooldowns: new CooldownsManager()
}