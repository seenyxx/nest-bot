import { Collection } from 'discord.js'
import { getConfig, Configuration } from './helpers'
import { Command, HelpCategories } from '../client/handlers/command'
import { CooldownsManager } from '../client/handlers/cooldowns'

export const botCache: BotCache = {
  config: getConfig(),
  commands: new Collection<string, Command>(),
  cooldowns: new CooldownsManager(),
  helpDisplays: {
    leveling: '🏆 Leveling',
    misc: '🧊 Miscellaneous',
    moderation: '🔨 Moderation',
  },
}

export interface BotCache {
  config: Configuration
  commands: Collection<string, Command>
  cooldowns: CooldownsManager
  helpDisplays: Record<HelpCategories, string>
}
