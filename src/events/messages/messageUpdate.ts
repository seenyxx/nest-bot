import { onEvent } from '../../client/handlers/event'
import { getStarboardMessage } from '../../database/starboard'
import { getGuildLogs, getStarboardChannel } from '../../util/helpers'
import { StarboardMessage } from '../../renderers/starboard/message'
import { STAR_BOARD_MIN, STAR_BOARD_REACTION, ID_REGEX } from '../../util/constants'
import { Guild, Message, PartialMessage, TextChannel, GuildMember } from 'discord.js'
import { LogBulkMessageDelete, LogMessageEdit } from '../../renderers/guildLogs/msg'
import { checkGuildLogOption } from '../../database/config'

export default onEvent('messageUpdate', async (oldMsg, newMsg) => {
  if (newMsg.partial) await newMsg.fetch()
  if (oldMsg.partial) await oldMsg.fetch()
  if (newMsg.author?.partial) await newMsg.author.fetch()
  if (oldMsg.author?.partial) await oldMsg.author.fetch()

  if (newMsg.author?.bot) return
  if (!newMsg.guild) return

  parseStarboard(oldMsg, newMsg)

  const logs = await getGuildLogs(newMsg.guild)

  if (
    logs &&
    oldMsg.content &&
    newMsg.content &&
    (await checkGuildLogOption(newMsg.guild.id, 'msgs'))
  ) {
    logs.send(new LogMessageEdit(oldMsg, newMsg))
  }
})

async function parseStarboard(
  oldMsg: Message | PartialMessage,
  newMsg: Message | PartialMessage
) {
  if (newMsg.partial) await newMsg.fetch()
  if (oldMsg.partial) await oldMsg.fetch()
  if (newMsg.author?.partial) await newMsg.author.fetch()
  if (oldMsg.author?.partial) await oldMsg.author.fetch()

  if (newMsg.author?.bot) return
  if (!newMsg.guild) return

  const starboard = await getStarboardChannel(newMsg.guild)

  if (starboard) {
    const starboardMsg = await getStarboardMessage(newMsg.guild.id, newMsg.id)

    if (!starboardMsg) return

    const msg = await starboard.messages.fetch(starboardMsg).catch(no => {})

    if (!msg) {
      const count = newMsg.reactions.cache.find(
        r => r.emoji.name === STAR_BOARD_REACTION
      )?.count

      if (!count || count < STAR_BOARD_MIN) return

      starboard.send(new StarboardMessage(newMsg as Message, count))
    } else {
      const count = newMsg.reactions.cache.find(
        r => r.emoji.name === STAR_BOARD_REACTION
      )?.count

      if (!count || count < STAR_BOARD_MIN) return

      msg.edit(new StarboardMessage(newMsg as Message, count))
    }
  }
}
