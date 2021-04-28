import { onEvent } from '../../client/handlers/event'
import { LogBulkMessageDelete } from '../../renderers/guildLogs/msg'
import { getGuildLogs } from '../../util/helpers'
import { Guild, TextChannel } from 'discord.js'
import { checkGuildLogOption } from '../../database/config'

export default onEvent('messageDeleteBulk', async msgs => {
  const guild = msgs.first()?.guild

  if (!guild) return

  const logs = await getGuildLogs(guild)

  if (logs && (await checkGuildLogOption(guild.id, 'msgs'))) {
    logs.send(new LogBulkMessageDelete(msgs, msgs.first()?.channel as TextChannel))
  }
})
