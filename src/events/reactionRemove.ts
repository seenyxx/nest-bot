import { GuildMember, User } from 'discord.js'
import { onEvent } from '../client/handlers/event'
import { getReactionRole, removeReactionRole } from '../database/reactionRoles'

export default onEvent('messageReactionRemove', async (reaction, user) => {
  if (reaction.partial) await reaction.fetch()
  if (reaction.message.partial) await reaction.message.fetch()
  if (user.partial) await user.fetch()

  if (user.bot) return
  if (!reaction.message.guild) return

  const msg = reaction.message
  const guild = reaction.message.guild
  const reactionRole = await getReactionRole(guild.id, msg.id, reaction.emoji.name)

  if (!reactionRole) return

  const role = guild.roles.cache.find(r => r.id === reactionRole.role)

  if (!role) {
    await reaction.remove()
    await removeReactionRole(guild.id, msg.id, reactionRole.emoji, reactionRole.role)
    return
  }

  const member = guild.member(user as User)

  if (member) {
    if (role.position > (guild.me as GuildMember).roles.highest.position) return
    member.roles.remove(role, 'Reaction role remove').catch(no => {})
  }
})
