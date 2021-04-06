import { ColorResolvable, PermissionResolvable } from 'discord.js'

export const PERMISSION_LEVELS: Record<PermissionLevels, PermissionResolvable[]> = {
  user: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
  mod: [
    'SEND_MESSAGES',
    'READ_MESSAGE_HISTORY',
    'VIEW_CHANNEL',
    'BAN_MEMBERS',
    'KICK_MEMBERS',
    'MUTE_MEMBERS',
    'MANAGE_MESSAGES',
  ],
  admin: ['ADMINISTRATOR'],
  guildManager: [
    'SEND_MESSAGES',
    'READ_MESSAGE_HISTORY',
    'VIEW_CHANNEL',
    'MANAGE_GUILD',
  ],
}

export type PermissionLevels = 'user' | 'mod' | 'admin' | 'guildManager'

export const THEME_COLORS: Record<ThemeColors, ColorResolvable> = {
  error: 'RED',
  success: 'GREEN',
  log: '#2f3136',
  info: '#63C7FF',
  warn: '#ffd000',
}

export type ThemeColors = 'error' | 'success' | 'info' | 'log' | 'warn'
export const DEFAULT_SEPARATOR = '•'
export const ID_REGEX = /[0-9]+/g
export const USERNAME_TAG_REGEX = /^.+#[0-9]{4}$/g
export const DEFAULT_SERVER_LOGO =
  'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png'

export const DEFAULT_RANK_COLOR = '#429ef5'
export const XP_COOLDOWN = 45
export const DEFAULT_XP = 30

export const RANK_SIZE_MULTI = 0.32
export const RANK_CARD_ROUND_RADIUS = 30 * RANK_SIZE_MULTI
export const COLOR_WHEEL_TURN = -25
export const RANK_BG_PRIMARY = '#161E22'
export const RANK_BG_SECONDARY = '#3B464B'
export const RANK_BORDER_SIZE = 50 * RANK_SIZE_MULTI
export const RANK_PFP_SIZE = 480 * RANK_SIZE_MULTI
export const PROGRESS_WIDTH = 1750 * RANK_SIZE_MULTI
export const PROGRESS_HEIGHT = 80 * RANK_SIZE_MULTI
export const RANK_FONT = 'Ubuntu Mono, monospace'
export const RANK_TEXT_COLOR = '#FFFFFF'

export const NUMBER_REGEX = /[0-9]+/g
export const HEX_COLOR_REGEX = /^(#[a-f0-9]{6})$/
