import { Guild, MessageEmbed, SnowflakeUtil } from 'discord.js'

import { DEFAULT_SERVER_LOGO, THEME_COLORS } from '../../util/constants'
import { colorCyan, colorBlue } from '../format/colors'
import { mentionUser } from '../format/mentions'

export class ServerInformation extends MessageEmbed {
  constructor(guild: Guild) {
    super()

    const snowflake = SnowflakeUtil.deconstruct(guild.id)
    const icon = guild.iconURL() || DEFAULT_SERVER_LOGO

    this.setColor(THEME_COLORS.info)
    this.setTitle('Server Information')
    this.setThumbnail(icon)
    this.setAuthor(guild.name, icon)
    this.addField('Owner', mentionUser(guild.ownerID), true)
    this.addField('Snowflake/Id', colorCyan(guild.id))
    this.addField('Boosts', guild.premiumSubscriptionCount, true)
    this.addField('Partnered', guild.partnered, true)
    this.addField('Region', guild.region)
    this.addField(
      'Creation Timestamp',
      colorCyan(
        `${new Date(snowflake.timestamp).toISOString()}\n${new Date(
          snowflake.timestamp
        ).toDateString()}\n${new Date(snowflake.timestamp).toUTCString()}`
      ),
      true
    )
  }
}
