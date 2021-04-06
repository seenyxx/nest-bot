import { Message, MessageEmbed } from 'discord.js'

import { createCommand } from '../../client/handlers/command'
import { LevelManager } from '../../database/levels'
import { PERMISSION_LEVELS, NUMBER_REGEX, THEME_COLORS } from '../../util/constants'

export default createCommand(
  {
    triggers: ['multi', 'set-multi'],
    cooldown: 5,
    category: 'leveling',
    desc: "Shows you the server's multiplier / sets the server's multiplier.",
    requiredPermissions: PERMISSION_LEVELS.guildManager,
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.member) return
    const lm = new LevelManager(msg.member)

    const multi = args[0]

    if (multi && multi.match(NUMBER_REGEX)) {
      const actualMulti = parseFloat(multi)
      await lm.setGuildMulti(actualMulti)
      if (actualMulti < 0.1 || actualMulti > 5)
        throw new Error(
          'The new multiplier must be higher than 0.1 and lower than 5.'
        )
      const embed = new MessageEmbed()
        .setColor(THEME_COLORS.info)
        .setTitle('Set multiplier')
        .setDescription(`Set the multiplier to \`${actualMulti}\`!`)

      msg.reply(embed)
    } else {
      const actualMulti = await lm.getGuildMulti()
      const embed = new MessageEmbed()
        .setColor(THEME_COLORS.info)
        .setTitle('Multiplier')
        .setDescription(`The current multiplier is \`${actualMulti}\`!`)

      msg.reply(embed)
    }
  }
)
