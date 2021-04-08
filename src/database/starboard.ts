import { Database } from 'quickmongo'
import { botCache } from '../util/cache'

const StarboardDb = new Database(botCache.config.database).createModel('starboard')

export async function getStarboardMessage(
  guildId: string,
  originalMsgId: string
): Promise<string | undefined> {
  return await StarboardDb.get(`${guildId}.${originalMsgId}`)
}

export async function setStarboardMessage(
  guildId: string,
  originalMsgId: string,
  starboardMessageId: string
) {
  await StarboardDb.set(`${guildId}.${originalMsgId}`, starboardMessageId)
}

export async function removeStarboardMessage(
  guildId: string,
  originalMsgId: string
) {
  if (!(await getStarboardMessage(guildId, originalMsgId))) return

  await StarboardDb.delete(`${guildId}.${originalMsgId}`)
}
