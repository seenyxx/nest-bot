import { Message, PermissionResolvable } from 'discord.js'
import { BotClient } from '../client'

export function createCommand(opts: CommandOpts, func: CommandFunction): Command {
  return {
    opts: opts,
    exec: func,
  }
}

export interface CommandOpts {
  triggers: string[]
  desc: string
  usage?: string
  cooldown: number
  argsCount?: number
  missingArgs?: string
  category: HelpCategories
  requiredPermissions: PermissionResolvable[]
  guildOnly?: boolean
  typing?: boolean
}

export type CommandFunction = (msg: Message, args: string[]) => Promise<any>
export type HelpCategories = 'leveling' | 'moderation' | 'misc'

export interface Command {
  opts: CommandOpts
  exec: CommandFunction
}
