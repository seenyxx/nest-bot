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
    triggers: ['create', 'make'],
    category: 'moderation',
    cooldown: 10,
    desc: 'Provides a setup for a reaction role.',
    requiredPermissions: PERMISSION_LEVELS.user,
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    const count = getRRCount(msg.guild.id)
    const embed = new MessageEmbed()
      .setColor(THEME_COLORS.info)
      .setTitle('Reaction role count')
      .setDescription(`Reaction count: \`${count}/${MAX_REACTION_ROLE_COUNT}\``)
      .setFooter('To remove a reaction role use the delete command')

    msg.reply(embed)
  }
)
