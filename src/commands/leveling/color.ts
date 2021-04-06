import { Message, MessageEmbed } from 'discord.js'
import { createCommand } from '../../client/handlers/command'
import {
  THEME_COLORS,
  PERMISSION_LEVELS,
  HEX_COLOR_REGEX,
} from '../../util/constants'
import { LevelManager } from '../../database/levels'

export default createCommand(
  {
    triggers: ['color', 'colour', 'set-color', 'set-colour'],
    category: 'leveling',
    cooldown: 10,
    desc: "Sets your rank card's color. / Gets your current rank card color.",
    requiredPermissions: PERMISSION_LEVELS.user,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.member) return

    const color = args[0]
    const lm = new LevelManager(msg.member)

    if (color && color.match(HEX_COLOR_REGEX)) {
      lm.setColor(color)

      const embed = new MessageEmbed()
        .setColor(color)
        .setTitle('Set color')
        .setDescription(`Set color to \`${color}\``)

      msg.reply(embed)
    } else {
      const actualColor = await lm.getColor()
      const embed = new MessageEmbed()
        .setColor(actualColor)
        .setTitle('Color')
        .setDescription(`Your current color is \`${actualColor}\``)

      msg.reply(embed)
    }
  }
)
