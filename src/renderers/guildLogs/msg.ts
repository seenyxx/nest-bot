import {
  Collection,
  Message,
  MessageEmbed,
  TextChannel,
  MessageAttachment,
  PartialMessage,
} from 'discord.js'

import { THEME_COLORS } from '../../util/constants'
import { mentionUser } from '../format/mentions'
import { messageLinkButtom } from '../format/other'

export class LogMessageDelete extends MessageEmbed {
  constructor(m: Message | PartialMessage) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle(`Message deleted in \`#${(m.channel as TextChannel).name}\``)
    this.setAuthor(m.author?.tag, m.author?.displayAvatarURL())
    this.setDescription(m.content)

    if (m.attachments.size > 0) {
      this.attachFiles(m.attachments.map(at => new MessageAttachment(at.attachment)))
    }
  }
}

export class LogBulkMessageDelete extends MessageEmbed {
  constructor(msgs: Collection<string, Message | PartialMessage>, c: TextChannel) {
    super()
    this.setColor(THEME_COLORS.error)
    this.setTitle(`Messages deleted in \`#${c.name}\``)

    this.setDescription(
      msgs
        .filter(m => typeof m.content !== 'undefined')
        .map(m => `${m.author?.tag}: ${m.content}\n`)
    )
  }
}

export class LogMessageEdit extends MessageEmbed {
  constructor(oldM: Message | PartialMessage, newM: Message | PartialMessage) {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle(`Message updated in \`${(newM.channel as TextChannel).name}\``)
    this.setAuthor(newM.author?.tag, newM.author?.displayAvatarURL())
    this.setDescription(
      `**Before:** ${oldM.content}\n\n**After:** ${
        newM.content
      }\n${messageLinkButtom(newM)}`
    )

    if (newM.attachments.size > 0) {
      this.attachFiles(
        newM.attachments.map(at => new MessageAttachment(at.attachment))
      )
    }
  }
}
