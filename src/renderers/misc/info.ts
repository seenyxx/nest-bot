import { MessageEmbed } from 'discord.js'

import { botCache } from '../../util/cache'
import { THEME_COLORS } from '../../util/constants'
import { calculateMemoryUsageMB, parseDisplayUptime } from '../../util/helpers'
import { codeBlock } from '../format/other'

export class InfoMessage extends MessageEmbed {
  constructor() {
    super()
    this.setColor(THEME_COLORS.info)
    this.setTitle('About')
    this.addField(
      'Stats',
      codeBlock(
        `[Memory] ${calculateMemoryUsageMB()} MB\n\n[Discord.js Version] ${
          require(`${__dirname}/../../../package.json`).dependencies['discord.js']
        }\n[Node.js Version] ${process.versions.node}\n[Shards] ${
          botCache.shardCount
        }`,
        'ini'
      )
    )
    this.addField(
      'Uptime',
      codeBlock(parseDisplayUptime(process.uptime())[1], 'css')
    )
  }
}
