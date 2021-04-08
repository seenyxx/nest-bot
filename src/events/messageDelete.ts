import { onEvent } from '../client/handlers/event';
import { getStarboardMessage } from '../database/starboard';
import { getStarboardChannel } from '../util/helpers';
import { StarboardMessage } from '../renderers/starboard/message'
import { STAR_BOARD_REACTION } from '../util/constants'
import { Message } from 'discord.js';

export default onEvent('messageDelete', async msg => {
  if (msg.partial) await msg.fetch()
  if (msg.author?.partial) await msg.author.fetch()

  if (msg.author?.bot) return
  if (!msg.guild) return

  const starboard = await getStarboardChannel(msg.guild)

  if (starboard) {
    const starboardMsg = await getStarboardMessage(msg.guild.id, msg.id)
    
    if (!starboardMsg) return
    
    const fetchedMsg = await starboard.messages.fetch(starboardMsg).catch(no => {})

    if (fetchedMsg) {
      fetchedMsg.delete()
    }
  }
})