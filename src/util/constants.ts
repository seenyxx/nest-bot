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
export const DEFAULT_SERVER_LOGO = 'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png'