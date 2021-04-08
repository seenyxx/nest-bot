import { Message, MessageEmbed, User } from 'discord.js'
import { STAR_BOARD_COLORS, STAR_BOARD_INTERVALS } from '../../util/constants'

export class StarboardMessage extends MessageEmbed {
  constructor(msg: Message, starCount: number) {
    super()
    this.setColor(computeColor(starCount))
    this.setAuthor(msg.author.tag, msg.author.displayAvatarURL(), msg.url)
    this.setDescription(msg.content)
    this.setFooter(`⭐ ${starCount}`)
  }
}


export function computeColor(starCount: number) {
  if (starCount < STAR_BOARD_INTERVALS[0]) {
    return STAR_BOARD_COLORS[0]
  }
  else if (starCount < STAR_BOARD_INTERVALS[1] && starCount > STAR_BOARD_INTERVALS[0]) {
    return STAR_BOARD_COLORS[1]
  }
  else if (starCount < STAR_BOARD_INTERVALS[2] && starCount > STAR_BOARD_INTERVALS[1]) {
    return STAR_BOARD_COLORS[2]
  }
  else if (starCount < STAR_BOARD_INTERVALS[3] && starCount > STAR_BOARD_INTERVALS[2]) {
    return STAR_BOARD_COLORS[3]
  }
  else if (starCount < STAR_BOARD_INTERVALS[4] && starCount > STAR_BOARD_INTERVALS[3]) {
    return STAR_BOARD_COLORS[4]
  }
  else if (starCount < STAR_BOARD_INTERVALS[5] && starCount > STAR_BOARD_INTERVALS[4]) {
    return STAR_BOARD_COLORS[5]
  }
  else if (starCount > STAR_BOARD_INTERVALS[5]) {
    return STAR_BOARD_COLORS[6]
  }

  return STAR_BOARD_COLORS[0]
}