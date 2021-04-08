import { ReactionRole } from '../database/reactionRoles'
import { mentionRole } from '../renderers/format/mentions'
export function parseTag(txt: string, tag: string, replace: string) {
  return txt.replace(new RegExp(`{${tag}}`, 'gi'), replace)
}

export function parseReactionRoleTag(txt: string, reactionRoles: ReactionRole[]) {
  const rrText = reactionRoles
    .map(rr => `${rr.emoji}: ${mentionRole(rr.role)}`)
    .join('\n')
  return parseTag(txt, 'roles', rrText)
}
