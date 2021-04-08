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
export const HEX_COLOR_REGEX = /^(#[a-f0-9]{6})$/gi
export const EMOJI_REGEX = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu

export const MAX_REACTION_ROLE_COUNT = 50

export const STAR_BOARD_REACTION = '⭐'
export const STAR_BOARD_COLOR = '#b3d0ff'
export const STAR_BOARD_INTERVALS = [5, 10, 15, 20, 25, 35]
export const STAR_BOARD_MIN = 2
export const STAR_BOARD_COLOR_MULTI = 5