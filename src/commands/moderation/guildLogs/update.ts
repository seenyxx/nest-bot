import { createSubCommand } from '../../../client/handlers/command'
import {
  getGuildLogsOptions,
  LogOptions,
  LogOptsKeys,
  LogOptsKeysArray,
  updateLogOptions,
} from '../../../database/config'
import { PERMISSION_LEVELS } from '../../../util/constants'
import { LogOptionsMessage } from '../../../renderers/guildLogs/options'

export default createSubCommand(
  {
    parents: ['logs', 'logger', 'log'],
    triggers: ['update', 'update-key', 'update-option'],
    category: 'moderation',
    desc: 'Enables/Disables the logging of an event.',
    cooldown: 5,
    requiredPermissions: PERMISSION_LEVELS.user.concat([
      'MANAGE_GUILD',
      'MANAGE_WEBHOOKS',
      'MANAGE_MESSAGES',
    ]),
    argsCount: 2,
    guildOnly: true,
    missingArgs: 'You need to provide an option and what to update the option to.',
    typing: false,
    usage: '<Option> <True|False>',
  },
  async (msg, args) => {
    if (!msg.guild) return

    const options = args[0].trim() as LogOptsKeys
    const updatedValue = args[1] === 'true'
    const id = msg.guild.id

    const match = LogOptsKeysArray.some(key => options == key)

    if (!match)
      throw new Error(
        `The options need to be one of these:\n${LogOptsKeysArray.join(', ')}`
      )

    await updateLogOptions(id, options, updatedValue)

    const logOpts = await getGuildLogsOptions(id)

    msg.reply(new LogOptionsMessage(logOpts))
  }
)
