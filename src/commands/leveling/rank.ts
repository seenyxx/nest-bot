import { Message, MessageAttachment } from 'discord.js'

import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../util/constants'
import { RankCard } from '../../renderers/levels/rankCard'

export default createCommand(
  {
    triggers: ['rank', 'lvl', 'level'],
    desc: 'Brings up the rank card.',
    category: 'leveling',
    cooldown: 8,
    requiredPermissions: PERMISSION_LEVELS.user,
    guildOnly: true,
    typing: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.member || !msg.guild) return

    const card = new RankCard()
    await card.render(msg.member)

    msg.reply(new MessageAttachment(card.toBuffer()))
  }
)
