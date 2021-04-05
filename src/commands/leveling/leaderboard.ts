import { Message } from 'discord.js'
import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS } from '../../util/constants'
import { LeaderboardMessage } from '../../renderers/levels/leaderboard'

export default createCommand(
  {
    triggers: ['leaderboard', 'lb'],
    cooldown: 5,
    category: 'leveling',
    desc: "Shows you the server's leaderboard.",
    requiredPermissions: PERMISSION_LEVELS.user,
    guildOnly: true,
  },
  async (msg: Message, args: string[]) => {
    if (!msg.member) return
    const lb = new LeaderboardMessage()
    await lb.init(msg.member)
    msg.reply(lb)
  }
)
