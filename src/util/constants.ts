import { PermissionResolvable } from 'discord.js';

export const PERMISSION_LEVELS: Record<PermissionLevels, PermissionResolvable[]> = {
  user: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL'],
  mod: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'BAN_MEMBERS', 'KICK_MEMBERS', 'MUTE_MEMBERS', 'MANAGE_MESSAGES'],
  admin: ['ADMINISTRATOR'],
  guildManager: ['SEND_MESSAGES', 'READ_MESSAGE_HISTORY', 'VIEW_CHANNEL', 'MANAGE_GUILD']
}

export type PermissionLevels = 'user' | 'mod' | 'admin' | 'guildManager'