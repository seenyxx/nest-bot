import { ClientUser, Collection } from 'discord.js'

import { Command, HelpCategories } from '../client/handlers/command'
import { CooldownsManager } from '../client/handlers/cooldowns'
import { Configuration, getConfig } from './helpers'

export const botCache: BotCache = {
  config: getConfig(),
  commands: new Collection<string, Command>(),
  cooldowns: new CooldownsManager(),
  helpDisplays: {
    leveling: '🏆 Leveling',
    misc: '🧊 Miscellaneous',
    moderation: '🔨 Moderation',
  },
  shardCount: 0,
}

export interface BotCache {
  commands: Collection<string, Command>
  cooldowns: CooldownsManager
  helpDisplays: Record<HelpCategories, string>
  botUser?: ClientUser
  shardCount: number
  config: Configuration
}
