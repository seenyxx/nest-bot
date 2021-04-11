import { createCommand } from '../../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../../util/constants'
import { getMuteRole } from '../../../util/helpers';
import { Success } from '../../../renderers/moderation/success'
import { mentionUser } from '../../../renderers/format/mentions';
export default createCommand({
  category: 'moderation',
  triggers: ['unmute', 'unsilence'],
  cooldown: 5,
  desc: 'Unmutes a user which allows them to send messages and react freely.',
  requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_ROLES'),
  argsCount: 1,
  missingArgs: 'You must mention a member.',
  guildOnly: true,
  usage: '<User>'
}, async (msg, args) => {
  if (!msg.guild) return

  if (!msg.mentions.members || !msg.mentions.members.first()) throw new Error('You did not mention a member.')
  
  const member = msg.mentions.members.first()

  if (!member) throw new Error('You did not mention a member.')

  const muteRole = await getMuteRole(msg.guild)

  member.roles.remove(muteRole).catch(no => {})

  msg.reply(new Success('Unmuted User', `Unmuted ${mentionUser(member.id)}\nIssued by ${mentionUser(msg.author.id)}`))
})