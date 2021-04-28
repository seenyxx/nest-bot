import { onEvent } from '../../client/handlers/event';
import { checkGuildLogOption } from '../../database/config';
import { LogRoleDelete } from '../../renderers/guildLogs/roles';
import { getGuildLogs } from '../../util/helpers';

export default onEvent('roleDelete', async (role) => {
  const guild = role.guild

  const logs = await getGuildLogs(guild)

  if (logs && (await checkGuildLogOption(guild.id, 'roles')) && role.name) {
    logs.send(new LogRoleDelete(role))
  }
})