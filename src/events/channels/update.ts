import { GuildChannel } from 'discord.js'

import { onEvent } from '../../client/handlers/event'
import { checkGuildLogOption } from '../../database/config'
import { getGuildLogs } from '../../util/helpers'

export default onEvent('channelUpdate', async (_oldChannel, _newChannel) => {
  let newChannel = _newChannel as GuildChannel
  let oldChannel = _oldChannel as GuildChannel

  if (!oldChannel || !newChannel.guild) return

  const guild = newChannel.guild

  const logs = await getGuildLogs(guild)

  if (logs && (await checkGuildLogOption(guild.id, 'channels'))) {
  }
})
