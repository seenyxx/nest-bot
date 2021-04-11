import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS, POLL_EMOJIS } from '../../util/constants'
import { Poll } from '../../renderers/misc/poll'

const TITLE_REGEX = /\[.+\]/g
const OPTION_REGEX = /\([^()]+\)/g

export default createCommand(
  {
    triggers: ['poll', 'vote'],
    category: 'misc',
    cooldown: 5,
    desc: 'Creates a poll.',
    requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_MESSAGES'),
    argsCount: 3,
    missingArgs:
      "You need to provide a title and at least 2 options. Refer to this command's help menu for more usage information.",
    guildOnly: true,
    usage: '[<Title>] (<Option 1>) (<Option 2>)...',
  },
  async (msg, args) => {
    const titleMatch = msg.content.match(TITLE_REGEX)
    const options = msg.content.match(OPTION_REGEX)

    if (!titleMatch) throw new Error('You need to have a title.')
    if (!options) throw new Error('You did not provide any options')
    if (options.length < 2) throw new Error('You must have at least 2 options.')

    const title = titleMatch[0].trim()

    if (options.length > POLL_EMOJIS.length)
      throw new Error(`You cannot have more than ${POLL_EMOJIS.length} options.`)

    const poll = await msg.channel.send(new Poll(msg.author, title, options))

    for (let i = 0; i < options.length; i++) {
      poll.react(POLL_EMOJIS[i])
    }

    msg.delete()
  }
)
