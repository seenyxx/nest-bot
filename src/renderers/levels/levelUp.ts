import { ColorResolvable, MessageEmbed, User, UserResolvable } from 'discord.js'
import { mentionUser } from '../format/mentions'

export class LevelUpMessage extends MessageEmbed {
  constructor(color: ColorResolvable, newLvl: number, id: string) {
    super()
    this.setColor(color)
    this.setDescription(`${mentionUser(id)} is now level **\`${newLvl}\`**`)
  }
}
