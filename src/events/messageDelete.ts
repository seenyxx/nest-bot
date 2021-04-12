import { Message, PartialMessage } from 'discord.js'

import { onEvent } from '../client/handlers/event'
import { getStarboardMessage } from '../database/starboard'
import { LogMessageDelete } from '../renderers/guildLogs/msg'
import { getGuildLogs, getStarboardChannel } from '../util/helpers'

export default onEvent('messageDelete', async msg => {
  if (!msg.guild) return
  if (!msg.content) return
  
  parseStarboard(msg)

  const logs = await getGuildLogs(msg.guild)

  if (logs) {
    logs.send(new LogMessageDelete(msg))
  }
})


async function parseStarboard(msg: Message | PartialMessage) {
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
}