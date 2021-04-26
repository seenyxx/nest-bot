import { BotClient } from './client/client'
import { botCache } from './util/cache'

process.on('unhandledRejection', console.error)

const client = new BotClient()

client.init()
