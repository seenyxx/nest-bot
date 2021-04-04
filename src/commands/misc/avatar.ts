import { Message, MessageEmbed } from 'discord.js';
import { createCommand } from '../../client/handlers/command';
import { PERMISSION_LEVELS, THEME_COLORS } from '../../util/constants';

export default createCommand({
  triggers: ['avatar', 'av'],
  category: 'misc',
  desc: 'Sends your avatar or someone else\'s avatar in chat!',
  cooldown: 5,
  requiredPermissions: PERMISSION_LEVELS.user
}, async (msg: Message, args: string[]) => {
  const user = msg.mentions.users.first() || msg.author

  const embed = new MessageEmbed()
    .setColor(THEME_COLORS.info)
    .setTitle(`${user.tag}'s avatar`)
    .setImage(user.displayAvatarURL({
      size: 1024,
      dynamic: true
    }))

  msg.reply(embed)
})