import { onEvent } from '../../client/handlers/event';
import { checkGuildLogOption } from '../../database/config';
import { getGuildLogs } from '../../util/helpers';
import { RoleCreateLog } from '../../renderers/guildLogs/roles'

export default onEvent('roleCreate', async role => {
  const guild = role.guild

  const logs = await getGuildLogs(guild)

  if (logs && (await checkGuildLogOption(guild.id, 'roles'))) {
    logs.send(new RoleCreateLog(role))
  }
})