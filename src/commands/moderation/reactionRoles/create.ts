import { Guild, Message, MessageEmbed } from 'discord.js'

import { createSubCommand } from '../../../client/handlers/command'
import { addReactionRole, checkRRCount, ReactionRole } from '../../../database/reactionRoles'
import { codeBlock } from '../../../renderers/format/other'
import {
  PERMISSION_LEVELS,
  HEX_COLOR_REGEX,
  EMOJI_REGEX,
} from '../../../util/constants'
import { parseReactionRoleTag } from '../../../util/tags'

export default createSubCommand(
  {
    parents: ['rr', 'reaction-role'],
    triggers: ['create', 'make'],
    category: 'moderation',
    cooldown: 10,
    desc: 'Provides a setup for a reaction role.',
    requiredPermissions: PERMISSION_LEVELS.user.concat([
      'MANAGE_ROLES',
      'MANAGE_CHANNELS',
      'MANAGE_MESSAGES',
    ]),
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.guild) return

    if (await checkRRCount(msg.guild.id)) throw new Error('You have reached the maximum amount of reaction roles.')

    msg.channel.send('Creating reaction role..')
    msg.channel.send('Which channel would you like to have your reaction role in?')
    const awaitedChannelMessages = await msg.channel.awaitMessages(
      m => m.author.id === msg.author.id,
      {
        max: 1,
        time: 30 * 1000,
      }
    )

    if (!awaitedChannelMessages) throw new Error('You did not provide a channel!')

    const channelMessage = awaitedChannelMessages.first()

    if (!channelMessage) throw new Error('You did not provide a valid channel!')

    const channel = channelMessage.mentions.channels.first()

    if (!channel || channel.guild.id !== msg.guild.id)
      throw new Error('That channel is not in this server!')

    msg.channel.send(
      `What would you like your message content to be?\nFormat: ${codeBlock(
        '<Hex Color> | <Title> | <Content>',
        'xml'
      )} You can also use the tag \`{roles}\` to list all the emojis and roles in the message.`
    )

    const awaitedEmbedMessage = await msg.channel.awaitMessages(
      m => m.author.id === msg.author.id,
      {
        max: 1,
        time: 60 * 1000,
      }
    )

    if (!awaitedEmbedMessage) throw new Error('You did not provide a valid message!')

    const embedMessage = awaitedEmbedMessage.first()

    if (!embedMessage) throw new Error('You did not provide a valid message!')

    const embedContent = embedMessage.content.split('|')

    if (embedContent.length < 3)
      throw new Error('You need to provide all 3 fields: color, title and content.')

    const color = embedContent.shift()
    let title = embedContent.shift()
    let content = embedContent.join('|')

    if (!color || !color.trim().match(HEX_COLOR_REGEX)) {
      console.log(color, color?.trim().match(HEX_COLOR_REGEX))
      throw new Error('You need to provide a valid hex colour.')
    }

    if (!title) throw new Error('You need to provide a title.')
    if (!content) throw new Error('You need to provide some content.')

    title = title.trim()
    content = content.trim()

    msg.channel.send(
      `Provide a list of reaction roles in the format: ${codeBlock(
        '<Emoji> : <Role>',
        'xml'
      )}\nType \`done\` when finished. Be aware that this expires in 3 minutes.`
    )

    let rrCollector = msg.channel.createMessageCollector(
      m => m.author.id === msg.author.id,
      {
        time: 3 * 60 * 1000,
      }
    )

    let reactionRoles: ReactionRole[] = []
    let errCounter = 0
    let counter = 0

    rrCollector.on('collect', async (m: Message) => {
      if (m.content === 'done') {
        rrCollector.stop()
        return
      }

      const args = m.content.split(':')
      const emoji = args.shift()
      const role = m.mentions.roles.first()

      if (await checkRRCount((msg.guild as Guild).id)) {
        m.channel.send('You have reached the maximum amount of reaction roles.')
        rrCollector.stop()
      }
      
      if (!emoji?.match(EMOJI_REGEX) || !role) {
        m.channel.send(
          'You did not provide a valid role or a valid emoji (The emoji must not be a custom emoji!).'
        )
        m.react('❌')
      } else if (emoji.trim().match(EMOJI_REGEX) && role) {
        if (!msg.guild || !msg.guild.me) return
        if (errCounter > 3) {
          rrCollector.stop()
          m.channel.send('You have sent too many invalid requests!')
        }
        if (role.position > msg.guild.me.roles.highest.position) {
          m.channel.send(
            `I cannot add that role as its position is higher than mine!\n${codeBlock(
              `Me: ${msg.guild.me.roles.highest.position}\n${role.name}: ${role.position}`,
              'yml'
            )}`
          )
          m.react('❌')
          errCounter++
          return
        }

        reactionRoles.push({
          emoji: emoji.trim(),
          role: role.id.trim(),
        })
        counter++
        m.react('✅')
      }
    })

    rrCollector.on('end', async () => {
      msg.channel.send('Ended!')

      const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(
          parseReactionRoleTag(content || 'Reaction role', reactionRoles)
        )

      const message = await channel.send(embed)

      for (const rr of reactionRoles) {
        message.react(rr.emoji)
        await addReactionRole(
          (message.guild as Guild).id,
          message.id,
          rr.emoji,
          rr.role
        )
      }
    })
  }
)
