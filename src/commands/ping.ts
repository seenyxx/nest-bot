import { createCommand } from '../client/handlers/command';
import { PERMISSION_LEVELS } from '../util/constants';
import { BotClient } from '../client/client';
import { Message } from 'discord.js';
export default createCommand({
  triggers: ['ping', 'pong'],
  category: 'misc',
  cooldown: 3,
  desc: 'Tells you the bot\'s ping!',
  requiredPermissions: PERMISSION_LEVELS.user,
  usage: ''
}, async (client: BotClient, msg: Message, args: string[]) => {
  
})