import { GuildMember, Message } from 'discord.js'
import { Database } from 'quickmongo'
import { botCache } from '../util/cache'
import { DEFAULT_RANK_COLOR, DEFAULT_XP, XP_COOLDOWN } from '../util/constants'
import { LevelUpMessage } from '../renderers/levels/levelUp'

const levels = new Database(botCache.config.database).createModel('levels')

export class LevelManager {
  readonly id
  readonly guild

  constructor(user: GuildMember) {
    this.id = user.id
    this.guild = user.guild
  }

  selectGuild(query: string) {
    return `${this.id}.${this.guild.id}.${query}`
  }

  selectXp() {
    return `lvl_${this.guild.id}.${this.id}`
  }

  selectUser(query: string) {
    return `${this.id}.${query}`
  }

  async getRawXp(): Promise<number> {
    return (await levels.get(this.selectXp())) || 0
  }

  async setRawXp(val: number) {
    return await levels.set(this.selectXp(), val)
  }

  async addRawXp(val: number) {
    return await levels.add(this.selectXp(), val)
  }

  async subtractRawXp(val: number) {
    return await levels.subtract(this.selectXp(), val)
  }

  calculateLevelXp(lvl: number) {
    return 5 * Math.pow(lvl, 2) + 50 * lvl + 100
  }

  async getLevel() {
    let xp = await this.getRawXp()
    let lvl = 0

    while (xp >= this.calculateLevelXp(lvl)) {
      xp -= this.calculateLevelXp(lvl)
      lvl++
    }

    return lvl
  }

  async getLevelFromXp(xp: number) {
    let lvl = 0

    while (xp >= this.calculateLevelXp(lvl)) {
      xp -= this.calculateLevelXp(lvl)
      lvl++
    }

    return lvl
  }

  async getProgress() {
    let xp = await this.getRawXp()
    let lvl = 0

    while (xp >= this.calculateLevelXp(lvl)) {
      xp -= this.calculateLevelXp(lvl)
      lvl++
    }

    return [xp, this.calculateLevelXp(await this.getLevel())]
  }

  async getProgressFromXp(xp: number) {
    let lvl = 0

    while (xp >= this.calculateLevelXp(lvl)) {
      xp -= this.calculateLevelXp(lvl)
      lvl++
    }

    return [xp, this.calculateLevelXp(await this.getLevel())]
  }

  async getColor(): Promise<string> {
    return (await levels.get(this.selectUser('color'))) || DEFAULT_RANK_COLOR
  }

  async setColor(c: string) {
    return await levels.set(this.selectUser('color'), c)
  }

  async setGuildMulti(multi: number) {
    if (multi > 5 || multi < 0.1) multi = 1

    if (multi == 1) {
      return await levels.delete(this.selectGuild('multi'))
    } else {
      return await levels.set(this.selectGuild('multi'), multi)
    }
  }

  async getGuildMulti() {
    return (await levels.get(this.selectGuild('multi'))) || 1
  }

  async updateXp(msg: Message) {
    const cd = botCache.cooldowns.checkCooldown('_levels', this.id)

    if (!cd) {
      botCache.cooldowns.setCooldown('_levels', this.id, XP_COOLDOWN)

      const newLvl = await this.getLevelFromXp(
        (await this.getRawXp()) + (await this.getGuildMulti()) * DEFAULT_XP
      )
      const oldLvl = await this.getLevel()

      await this.addRawXp((await this.getGuildMulti()) * DEFAULT_XP)

      if (newLvl > oldLvl) {
        msg.reply(new LevelUpMessage(await this.getColor(), newLvl, this.id))
      }
    }
  }

  async getGuild(): Promise<Record<string, number>> {
    return (await levels.get(`lvl_${this.guild.id}`)) || {}
  }
}
