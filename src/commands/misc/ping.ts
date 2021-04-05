import { Message, MessageEmbed } from 'discord.js'

import { createCommand } from '../../client/handlers/command'
import { colorBlue, colorGreen } from '../../renderers/format/colors'
import { PERMISSION_LEVELS, THEME_COLORS } from '../../util/constants'

export default createCommand(
  {
    triggers: ['ping', 'pong'],
    category: 'misc',
    cooldown: 3,
    desc: "Tells you the bot's ping!",
    requiredPermissions: PERMISSION_LEVELS.user,
  },
  async (msg: Message, args: string[]) => {
    const embed = new MessageEmbed()
      .setColor(THEME_COLORS.info)
      .setTitle('🏓 Pong!')
      .setDescription(colorGreen('Calculating..'))

    const m = await msg.reply(embed)

    m.edit(
      embed.setDescription(
        colorBlue(`🌐 ${m.createdTimestamp - msg.createdTimestamp}ms`)
      )
    )
  }
)
