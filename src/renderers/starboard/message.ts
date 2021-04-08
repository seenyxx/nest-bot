import Color from 'color'
import { Message, MessageEmbed } from 'discord.js'

import {
  STAR_BOARD_INTERVALS,
  STAR_BOARD_COLOR,
  STAR_BOARD_COLOR_MULTI,
} from '../../util/constants'

export class StarboardMessage extends MessageEmbed {
  constructor(msg: Message, starCount: number) {
    super()
    this.setColor(computeColor(starCount))
    this.setAuthor(msg.author.tag, msg.author.displayAvatarURL(), msg.url)
    this.setDescription(msg.content)
    this.addField('\u200B', `[\`[View Message]\`](${msg.url})`)
    this.setFooter(
      `${computeEmoji(starCount)} ${starCount} | ${
        msg.editedTimestamp ? '(edited)' : ''
      }`
    )
  }
}

export function computeColor(starCount: number) {
  return new Color(STAR_BOARD_COLOR)
    .rotate(Math.round(starCount * STAR_BOARD_COLOR_MULTI))
    .hex()
}

export function computeEmoji(starCount: number) {
  if (starCount < STAR_BOARD_INTERVALS[3]) {
    return '⭐'
  } else if (
    starCount > STAR_BOARD_INTERVALS[3] &&
    starCount < STAR_BOARD_INTERVALS[5]
  ) {
    return '🌟'
  } else if (starCount > STAR_BOARD_INTERVALS[5]) {
    return '🌠'
  }
}
