import { Message, PermissionResolvable } from 'discord.js'
import { duplicateObject } from '../../util/helpers'

export function createCommand(opts: CommandOpts, func: CommandFunction): Command {
  return {
    opts: opts,
    exec: func,
  }
}

export function createSubCommand(
  opts: SubCommandOpts,
  func: CommandFunction
): Command {
  let modOpts = duplicateObject(opts)

  modOpts.triggers = []
  opts.parents.forEach(p => {
    modOpts.triggers = modOpts.triggers.concat(opts.triggers.map(t => `${p} ${t}`))
  })

  return {
    opts: modOpts,
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

export interface SubCommandOpts extends CommandOpts {
  parents: string[]
}

export type CommandFunction = (msg: Message, args: string[]) => Promise<any>
export type HelpCategories = 'leveling' | 'moderation' | 'misc'

export interface Command {
  opts: CommandOpts
  exec: CommandFunction
}
