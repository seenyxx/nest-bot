import { GuildChannel } from 'discord.js'

import { onEvent } from '../../client/handlers/event'
import { checkGuildLogOption } from '../../database/config'
import { LogRoleCreate } from '../../renderers/guildLogs/roles'
import { getGuildLogs } from '../../util/helpers'
import { LogChannelCreate } from '../../renderers/guildLogs/channels'

export default onEvent('channelCreate', async _channel => {
  let channel = _channel as GuildChannel
  if (!channel.guild) return

  const guild = channel.guild

  const logs = await getGuildLogs(guild)

  if (logs && (await checkGuildLogOption(guild.id, 'channels'))) {
    logs.send(new LogChannelCreate(channel))
  }
})
