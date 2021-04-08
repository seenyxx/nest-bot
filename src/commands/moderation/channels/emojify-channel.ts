import { Message, MessageEmbed, TextChannel } from 'discord.js'
import { createCommand } from '../../../client/handlers/command'
import {
  PERMISSION_LEVELS,
  EMOJI_REGEX,
  THEME_COLORS,
} from '../../../util/constants'

export default createCommand(
  {
    triggers: ['emojify-channel', 'emojify', 'ec'],
    cooldown: 3,
    category: 'moderation',
    desc: 'Emojifies the channel name.',
    requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_CHANNELS'),
    argsCount: 1,
    missingArgs: 'You need to provide an emoji.',
    guildOnly: true,
    usage: '<Emoji>',
  },
  async (msg: Message, args: string[]) => {
    const emoji = args.shift()

    if (!emoji || !emoji.trim().match(EMOJI_REGEX))
      throw new Error('You did not provide a valid emoji.')

    const channel = msg.channel as TextChannel

    channel.setName(`${emoji.trim()}︱${channel.name}`)

    const embed = new MessageEmbed()
      .setColor(THEME_COLORS.success)
      .setTitle('Changed the channel name.')

    msg.reply(embed)
  }
)
