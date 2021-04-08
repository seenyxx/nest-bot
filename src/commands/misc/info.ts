import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../util/constants'
import { InfoMessage } from '../../renderers/misc/info'

export default createCommand(
  {
    triggers: ['info', 'about'],
    category: 'misc',
    cooldown: 3,
    desc: 'Gives you information about the bot.',
    requiredPermissions: PERMISSION_LEVELS.user,
  },
  async (msg, args) => {
    msg.reply(new InfoMessage())
  }
)
