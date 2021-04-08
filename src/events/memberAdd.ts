import { onEvent } from '../client/handlers/event'
import { getGuildLockdown } from '../database/config'

export default onEvent('guildMemberAdd', async m => {
  const status = await getGuildLockdown(m.guild.id)

  if (status && m.bannable && !m.user.bot) {
    m.ban({
      reason: 'Lockdown! Come back later!',
    })

    return
  }
})
