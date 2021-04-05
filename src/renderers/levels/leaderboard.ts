import { MessageEmbed, GuildMember } from 'discord.js'
import { THEME_COLORS } from '../../util/constants'
import { LevelManager } from '../../database/levels'
import { mentionUser } from '../format/mentions'

export class LeaderboardMessage extends MessageEmbed {
  constructor() {
    super()
  }

  async init(member: GuildMember) {
    const levels = new LevelManager(member)

    this.setColor(THEME_COLORS.info)
    this.setTitle(`\`${member.guild.name}\`'s Leaderboard`)

    const users = await levels.getGuild()
    const sortable = Object.entries(users)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)

    let text = ''

    let index = 0
    for (const user of sortable) {
      let badge: string | undefined

      switch (index) {
        case 0:
          badge = '🥇'
          break
        case 1:
          badge = '🥈'
          break
        case 2:
          badge = '🥉'
          break
        case 3:
          badge = '🏅'
        case 4:
          badge = '🏅'
      }
      const progress = await levels.getProgressFromXp(user[1])
      text = text.concat(
        `**${badge || '▫'}${index + 1}** ${mentionUser(
          user[0]
        )} **LVL:** [\`${await levels.getLevelFromXp(
          user[1]
        )}\`](https://example.com) **XP** [\`${progress[0]} / ${
          progress[1]
        }\`](https://example.com)\n`
      )
      index++
    }
    this.setDescription(text)
  }
}
