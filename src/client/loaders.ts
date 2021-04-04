import { readdir } from 'fs/promises'
import { Command } from './handlers/command'
import { botCache } from '../util/cache'
import { BotClient } from './client'
import { CustomBotEvent } from './handlers/event'

const rootPath = `${__dirname}/..`

export async function loadCommands(path?: string) {
  if (!path) path = 'commands'
  for (const fileOrDir of await readdir(`${rootPath}/${path}`)) {
    const ext = fileOrDir.split('.')[1]

    if (!ext) {
      loadCommands(`${path}/${fileOrDir}`)
    } else if (ext === 'js') {
      const module: Command | undefined = (
        await import(`${rootPath}/${path}/${fileOrDir}`)
      ).default

      if (module) {
        module.opts.triggers.forEach(trigger => {
          if (!botCache.commands.get(trigger)) {
            console.log(
              `[CMD] -> Loading trigger: ${trigger} for command: ${module.opts.triggers[0]}`
            )
            botCache.commands.set(trigger, module)
          }
        })
      }
    }
  }
}

export async function loadEvents(client: BotClient, path?: string) {
  if (!path) path = 'events'

  for (const fileOrDir of await readdir(`${rootPath}/${path}`)) {
    const ext = fileOrDir.split('.')[1]

    if (!ext) {
      loadCommands(`${path}/${fileOrDir}`)
    } else if (ext === 'js') {
      const module: CustomBotEvent<any> | undefined = (
        await import(`${rootPath}/${path}/${fileOrDir}`)
      ).default

      if (module) {
        console.log(`[EVENTS] -> Loading event: ${module.on}`)
        client.on(module.on, module.exec)
      }
    }
  }
}
