import { Message } from 'discord.js'
import { createCommand, HelpCategories } from '../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../util/constants'
import { DefaultHelpMenu } from '../../renderers/help/help'
import { botCache } from '../../util/cache'
import { CategoryHelpMenu } from '../../renderers/help/helpCategory'
import { CommandHelpMenu } from '../../renderers/help/helpCommand'

export default createCommand(
  {
    triggers: ['help'],
    category: 'misc',
    cooldown: 3,
    desc: 'Brings up the help menu.',
    requiredPermissions: PERMISSION_LEVELS.user,
    usage: '<Command/Menu?>',
  },
  async (msg: Message, args: string[]) => {
    const menuOrCommand = args[0] as HelpCategories

    if (!menuOrCommand) {
      return msg.reply(new DefaultHelpMenu())
    } else if (menuOrCommand) {
      if (botCache.helpDisplays[menuOrCommand]) {
        return msg.reply(new CategoryHelpMenu(menuOrCommand))
      } else {
        return msg.reply(new CommandHelpMenu(menuOrCommand))
      }
    }
  }
)
