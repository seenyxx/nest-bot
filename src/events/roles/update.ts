import { onEvent } from '../../client/handlers/event';
import { checkGuildLogOption } from '../../database/config';
import { LogRoleUpdate } from '../../renderers/guildLogs/roles';
import { getGuildLogs } from '../../util/helpers';

export default onEvent('roleUpdate', async (oldRole, newRole) => {
  const guild = newRole.guild

  const logs = await getGuildLogs(guild)

  if (logs && (await checkGuildLogOption(guild.id, 'roles'))) {
    logs.send(new LogRoleUpdate(oldRole, newRole))
  }
})