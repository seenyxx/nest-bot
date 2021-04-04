import { ShardingManager } from 'discord.js'
import { botCache } from './util/cache'

const manager = new ShardingManager(`${__dirname}/main.js`, {
  token: botCache.config.token,
})

manager.spawn()
