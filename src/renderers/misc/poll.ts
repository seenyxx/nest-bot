import { MessageEmbed, User } from 'discord.js'
import { POLL_EMOJIS } from '../../util/constants'
import { stripString } from '../../util/helpers'
import { colorCyan } from '../format/colors'

export class Poll extends MessageEmbed {
  constructor(author: User, title: string, options: string[]) {
    super()
    this.setAuthor(`Poll by ${author.tag}`, author.displayAvatarURL())
    this.addField('Title', colorCyan(stripString(title)))

    options.forEach((option, i) => {
      this.addField(`Option ${POLL_EMOJIS[i]}`, stripString(option))
    })
  }
}
