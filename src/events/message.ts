import { Message } from 'discord.js'

import { onEvent } from '../client/handlers/event'
import { LevelManager } from '../database/levels'
import { CooldownError } from '../renderers/errors/cooldown'
import { GuildOnlyError } from '../renderers/errors/guildOnly'
import { MissingArgumentsError } from '../renderers/errors/missingArgs'
import {
  ClientPermissionError,
  PermissionError,
} from '../renderers/errors/permission'
import { StandardError } from '../renderers/errors/std'
import { botCache } from '../util/cache'

export default onEvent('message', async msg => {
  if (msg.author.bot) return

  if (msg.guild && msg.member) {
    const user = new LevelManager(msg.member)

    user.updateXp(msg)
  }

  if (await parseCommand(msg, true)) {
    parseCommand(msg)
  }
})

async function parseCommand(msg: Message, sc?: boolean) {
  if (!msg.content.startsWith(botCache.config.prefix)) return
  const args = msg.content
    .substr(botCache.config.prefix.length, msg.content.length)
    .split(/ +/g)

  let command = args.shift()
  let sub = args[0]

  if (!command) {
    return true
  }

  if (sc && !sub) {
    return true
  } else if (sc && sub) {
    command = command.concat(` ${sub}`)
    args.shift()
  }

  const cmd = botCache.commands.get(command)

  if (!cmd) return sc ? true : false
  if (cmd.opts.guildOnly && !msg.guild) {
    return msg.reply(new GuildOnlyError())
  }
  if (cmd.opts.guildOnly && !msg.member) {
    return msg.reply(new GuildOnlyError())
  }

  if (msg.member && msg.guild && msg.guild.me) {
    const hasPerms = cmd.opts.requiredPermissions.every(perm =>
      msg.member?.hasPermission(perm)
    )

    const clientHasPerms = cmd.opts.requiredPermissions.every(perm =>
      msg.guild?.me?.hasPermission(perm)
    )

    if (!hasPerms) {
      return msg.reply(new PermissionError(cmd.opts.requiredPermissions))
    }

    if (!clientHasPerms) {
      return msg.reply(new ClientPermissionError(cmd.opts.requiredPermissions))
    }
  }

  if (cmd.opts.argsCount && cmd.opts.argsCount > args.length) {
    return msg.reply(
      new MissingArgumentsError(cmd.opts.missingArgs, cmd.opts.argsCount)
    )
  }

  const remaining = botCache.cooldowns.checkCooldown(
    cmd.opts.triggers[0],
    msg.author.id
  )

  if (remaining) {
    return msg.reply(new CooldownError(remaining))
  }
  if (cmd.opts.typing) {
    msg.channel.startTyping()
  }
  botCache.cooldowns.setCooldown(
    cmd.opts.triggers[0],
    msg.author.id,
    cmd.opts.cooldown
  )

  if (process.env.NODE_ENV !== 'production') {
    console.time(`︱⌚︱USE︱ -> Executed command: ${command}`)
  }
  await cmd.exec(msg, args).catch(e => msg.reply(new StandardError(e)))
  if (process.env.NODE_ENV !== 'production') {
    console.timeEnd(`︱⌚︱USE︱ -> Executed command: ${command}`)
  }
  if (cmd.opts.typing) {
    msg.channel.stopTyping()
  }
}
