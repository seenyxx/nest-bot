import { Canvas, CanvasRenderingContext2D, loadImage } from 'canvas'
import Color from 'color'
import { GuildMember } from 'discord.js'

import { LevelManager } from '../../database/levels'
import { RANK_FONT, RANK_TEXT_COLOR, RANK_SIZE_MULTI } from '../../util/constants'
import {
  COLOR_WHEEL_TURN,
  PROGRESS_HEIGHT,
  PROGRESS_WIDTH,
  RANK_BG_PRIMARY,
  RANK_BG_SECONDARY,
  RANK_BORDER_SIZE,
  RANK_CARD_ROUND_RADIUS,
  RANK_PFP_SIZE,
} from '../../util/constants'
import { shortenNumber } from '../../util/helpers'

export class RankCard extends Canvas {
  constructor() {
    super(2600 * RANK_SIZE_MULTI, 780 * RANK_SIZE_MULTI)
  }

  async render(user: GuildMember) {
    const dbUser = new LevelManager(user)

    const ctx = this.getContext('2d')

    const color = await dbUser.getColor()

    const bgGradient = ctx.createLinearGradient(0, 0, this.width, this.height)
    bgGradient.addColorStop(0, color)
    bgGradient.addColorStop(1, this.shiftColor(color, COLOR_WHEEL_TURN))

    ctx.fillStyle = bgGradient
    this.roundRect(ctx, 0, 0, this.width, this.height, RANK_CARD_ROUND_RADIUS)

    ctx.fillStyle = RANK_BG_PRIMARY
    this.roundRect(
      ctx,
      RANK_BORDER_SIZE,
      RANK_BORDER_SIZE,
      this.width - RANK_BORDER_SIZE * 2,
      this.height - RANK_BORDER_SIZE * 2,
      RANK_CARD_ROUND_RADIUS
    )

    // Draw avatar
    const avatar = await loadImage(
      user.user.displayAvatarURL({ size: 512, format: 'jpg' })
    )

    const avPosX = 140 * RANK_SIZE_MULTI
    const avPosY = 140 * RANK_SIZE_MULTI

    ctx.save()
    ctx.beginPath()
    ctx.arc(
      RANK_PFP_SIZE / 2 + avPosX,
      RANK_PFP_SIZE / 2 + avPosY,
      RANK_PFP_SIZE / 2,
      0,
      Math.PI * 2,
      true
    )
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, avPosX, avPosY, RANK_PFP_SIZE, RANK_PFP_SIZE)

    ctx.restore()

    const pbPosX = 700 * RANK_SIZE_MULTI
    const pbPosY = 570 * RANK_SIZE_MULTI

    const progress = await dbUser.getProgress()
    const filledProgress = (progress[0] / progress[1]) * PROGRESS_WIDTH

    ctx.fillStyle = RANK_BG_SECONDARY
    this.roundRect(
      ctx,
      pbPosX,
      pbPosY,
      PROGRESS_WIDTH,
      PROGRESS_HEIGHT,
      RANK_CARD_ROUND_RADIUS
    )

    ctx.fillStyle = color
    this.roundRect(
      ctx,
      pbPosX,
      pbPosY,
      filledProgress,
      PROGRESS_HEIGHT,
      RANK_CARD_ROUND_RADIUS
    )

    const txtPosX = pbPosX
    const txtPosY = 350 * RANK_SIZE_MULTI

    const fSize = (user.user.username.length > 15 ? 140 : 130) * RANK_SIZE_MULTI
    ctx.fillStyle = RANK_TEXT_COLOR
    
    ctx.font =
      user.user.username.length > 15 ? `${fSize}px ${RANK_FONT}` : `${fSize}px ${RANK_FONT}`

    const usernameSize = ctx.measureText(user.user.username)
    ctx.fillText(user.user.username, txtPosX, txtPosY)

    ctx.font = `${96 * RANK_SIZE_MULTI}px Fira Mono, ${RANK_FONT}`

    const progressBarOffset = -20 * RANK_SIZE_MULTI

    ctx.fillText(
      `Lvl ${await dbUser.getLevel()}`,
      pbPosX,
      pbPosY + progressBarOffset
    )

    const xpText = `${shortenNumber(progress[0])} / ${shortenNumber(progress[1])}`
    const xpSize = ctx.measureText(xpText)
    ctx.fillText(
      xpText,
      pbPosX + PROGRESS_WIDTH - xpSize.width,
      pbPosY + progressBarOffset
    )

    ctx.fillStyle = color
    ctx.fillText(
      `#${user.user.discriminator}`,
      txtPosX + usernameSize.width,
      txtPosY
    )

    ctx.font = `${110 * RANK_SIZE_MULTI}px ${RANK_FONT}`

    const xp = await dbUser.getRawXp()
    const users = await dbUser.getGuild()
    const sortable = Object.entries(users).sort(([, a], [, b]) => b - a)
    const rankNumber =
      sortable.findIndex(u => u[0] === user.id && u[1] === xp) == -1
        ? sortable.length + 1
        : sortable.findIndex(u => u[0] === user.id && u[1] === xp) + 1
    const rankNumberPosX = 2400 * RANK_SIZE_MULTI
    const rankNumberPosY = 235 * RANK_SIZE_MULTI
    const rankNumberText = `#${rankNumber}`

    const rankNumberTextStats = ctx.measureText(rankNumberText)
    ctx.fillText(
      rankNumberText,
      rankNumberPosX - rankNumberTextStats.width,
      rankNumberPosY
    )
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    if (w < 2 * r) r = w / 2
    if (h < 2 * r) r = h / 2
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
    ctx.fill()
  }

  private shiftColor(hex: string, turn: number) {
    return new Color(hex).rotate(turn).hex()
  }
}
