import { onEvent } from '../client/handlers/event'
import { botCache } from '../util/cache'
import {
  PermissionError,
  ClientPermissionError,
} from '../renderers/errors/permission'
import { GuildOnlyError } from '../renderers/errors/guildOnly'
import { MissingArgumentsError } from '../renderers/errors/missingArgs'
import { StandardError } from '../renderers/errors/std'
import { CooldownError } from '../renderers/errors/cooldown'
import { LevelManager } from '../database/levels'
import { Message } from 'discord.js';

export default onEvent('message', async msg => {
  if (msg.author.bot) return

  if (msg.guild && msg.member) {
    const user = new LevelManager(msg.member)

    user.updateXp(msg)
  }

  parseCommand(msg)
})


async function parseCommand(msg: Message, sc?: boolean) {
  const args = msg.content
    .substr(botCache.config.prefix.length, msg.content.length)
    .split(/ +/g)

  let command = args.shift()
  let sub = args[0]

  if (!command) {
    parseCommand(msg, true)
    return
  }

  if (sc && !sub) {
    return
  } else if (sc && sub) {
    command = command.concat(` ${sub}`)
    args.shift()
  }


  const cmd = botCache.commands.get(command)

  if (!cmd) return
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
  await cmd.exec(msg, args).catch(e => msg.reply(new StandardError(e)))
  botCache.cooldowns.setCooldown(
    cmd.opts.triggers[0],
    msg.author.id,
    cmd.opts.cooldown
  )

  if (cmd.opts.typing) {
    msg.channel.stopTyping()
  }
}