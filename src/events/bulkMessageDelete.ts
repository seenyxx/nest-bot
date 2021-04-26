import { onEvent } from '../client/handlers/event'
import { LogBulkMessageDelete } from '../renderers/guildLogs/msg'
import { getGuildLogs } from '../util/helpers'
import { Guild, TextChannel } from 'discord.js'

export default onEvent('messageDeleteBulk', async msgs => {
  const logs = await getGuildLogs(msgs.first()?.guild as Guild)

  if (logs) {
    logs.send(new LogBulkMessageDelete(msgs, msgs.first()?.channel as TextChannel))
  }
})
