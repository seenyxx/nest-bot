import { Message, ReactionEmoji } from 'discord.js'
import { Database } from 'quickmongo'
import { botCache } from '../util/cache'
import { MAX_REACTION_ROLE_COUNT } from '../util/constants'

const ReactionRoleDb = new Database(botCache.config.database).createModel(
  'reaction_roles'
)

export async function addReactionRole(
  guildId: string,
  msgId: string,
  emoji: string,
  roleId: string
) {
  await ReactionRoleDb.push(`rr_${guildId}_${msgId}`, {
    emoji: emoji,
    role: roleId,
  })
  await addCount(guildId)
}

export async function getReactionRole(
  guildId: string,
  msgId: string,
  emoji: string
) {
  const rr: ReactionRole[] = await ReactionRoleDb.get(`rr_${guildId}_${msgId}`)

  if (!rr) return

  const foundRr = rr.find(r => r.emoji === emoji)

  return foundRr
}

export async function deleteReactionRoleMessage(guildId: string, msgId: string) {
  const verify = await ReactionRoleDb.get(`rr_${guildId}_${msgId}`)

  if (verify) {
    await ReactionRoleDb.delete(`rr_${guildId}_${msgId}`)
  }
}

export async function removeReactionRole(
  guildId: string,
  msgId: string,
  emoji: string,
  roleId: string
) {
  const verify: ReactionRole[] = await ReactionRoleDb.get(`rr_${guildId}_${msgId}`)

  if (
    !verify.includes({
      emoji: emoji,
      role: roleId,
    })
  ) {
    throw new Error('That message does not have that reaction role!')
  }

  await ReactionRoleDb.pull(`rr_${guildId}_${msgId}`, {
    emoji: emoji,
    role: roleId,
  })

  await subCount(guildId)
}

export async function removeReactionRoleMessage(guildId: string, msgId: string) {
  const rr: ReactionRole[] = await ReactionRoleDb.get(`rr_${guildId}_${msgId}`)
  if (!rr) {
    return false
  }

  if (rr.length) {
    await subCount(guildId, rr.length)
  }

  await ReactionRoleDb.delete(`rr_${guildId}_${msgId}`)

  return true
}

export interface ReactionRole {
  emoji: string
  role: string
}

export async function addCount(guildId: string, count?: number) {
  await ReactionRoleDb.add(`guild_${guildId}`, count || 1)
}

export async function subCount(guildId: string, count?: number) {
  await ReactionRoleDb.subtract(`guild_${guildId}`, count || 1)
}

export async function getRRCount(guildId: string) {
  return (await ReactionRoleDb.get(`guild_${guildId}`)) || 0
}

export async function checkRRCount(guildId: string, rrs?: number) {
  const count = await getRRCount(guildId)
  const rrCount = rrs || 0

  if (count + rrCount > MAX_REACTION_ROLE_COUNT) {
    return true
  } else {
    return false
  }
}
