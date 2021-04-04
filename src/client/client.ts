import { Client } from 'discord.js'
import { botCache } from '../util/cache'
import { loadCommands, loadEvents } from './loaders';

export class BotClient extends Client {
  constructor() {
    super({
      partials: ['MESSAGE', 'REACTION', 'USER'],
    })
  }

  async init() {
    await loadCommands()
    await loadEvents(this)
    this.login(botCache.config.token)
  }
}
