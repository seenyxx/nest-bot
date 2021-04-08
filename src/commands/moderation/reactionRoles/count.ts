import { Message, MessageEmbed } from 'discord.js'
import { createSubCommand } from '../../../client/handlers/command'
import { getRRCount } from '../../../database/reactionRoles'
import {
  PERMISSION_LEVELS,
  THEME_COLORS,
  MAX_REACTION_ROLE_COUNT,
} from '../../../util/constants'

export default createSubCommand(
  {
    parents: ['rr', 'reaction-role'],
    triggers: ['count', 'counter'],
    category: 'moderation',
    cooldown: 5,
    desc: 'Tells you the amount of reaction roles on your server.',
    requiredPermissions: PERMISSION_LEVELS.user,
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    const count = await getRRCount(msg.guild.id)
    const embed = new MessageEmbed()
      .setColor(THEME_COLORS.info)
      .setTitle('Reaction role count')
      .setDescription(`Reaction count: \`${count}/${MAX_REACTION_ROLE_COUNT}\``)
      .setFooter('To remove a reaction role use the delete command')

    msg.reply(embed)
  }
)
