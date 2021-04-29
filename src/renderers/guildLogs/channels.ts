import { GuildChannel, MessageEmbed } from 'discord.js'

import { THEME_COLORS } from '../../util/constants'

export class LogChannelCreate extends MessageEmbed {
  constructor(c: GuildChannel) {
    super()
    this.setColor(THEME_COLORS.success)
    this.setTitle('Channel created')
    this.setDescription(`\`${c.name}\``)
  }
}

export class LogChannelUpdate extends MessageEmbed {
  constructor(oldC: GuildChannel, newC: GuildChannel) {
    super()
    this.setColor(THEME_COLORS.info)
  }
}
