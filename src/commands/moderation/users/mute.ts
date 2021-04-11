import { createCommand } from '../../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../../util/constants'
import { getMuteRole } from '../../../util/helpers';
import { Success } from '../../../renderers/moderation/success'
import { mentionUser } from '../../../renderers/format/mentions';
import { colorGreen } from '../../../renderers/format/colors'
export default createCommand({
  category: 'moderation',
  triggers: ['mute', 'silence'],
  cooldown: 5,
  desc: 'Mutes a user which prevents them from speaking reacting.',
  requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_ROLES'),
  argsCount: 1,
  missingArgs: 'You must mention a member.',
  guildOnly: true,
  usage: '<User> <Reason?>'
}, async (msg, args) => {
  if (!msg.guild) return

  if (!msg.mentions.members || !msg.mentions.members.first()) throw new Error('You did not mention a member.')
  
  const member = msg.mentions.members.first()

  if (!member) throw new Error('You did not mention a member.')

  const muteRole = await getMuteRole(msg.guild)

  args.shift()
  const reason = args.join(' ') || 'No reason provided'

  member?.roles.add(muteRole, reason).catch(no => {})

  msg.reply(new Success('Muted User', `Muted ${mentionUser(member.id)}\nIssued by ${mentionUser(msg.author.id)}`).addField('Reason', colorGreen(reason)))
})