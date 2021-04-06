import { Collection, Message, MessageEmbed, TextChannel } from 'discord.js'
import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS, NUMBER_REGEX, THEME_COLORS } from '../../util/constants'
import { joinArray } from '../../util/helpers'
import { colorBlue } from '../../renderers/format/colors'

const timeOut = 5000

export default createCommand(
  {
    triggers: ['purge', 'pur'],
    cooldown: 5,
    desc:
      'Purges a certain amount of messages. If an error like something similar to "Unknown Message" appears it means that the bot has not cached the message meaning that it cannot delete it just like how purging cannot delete messages older than 14 days.',
    category: 'moderation',
    argsCount: 1,
    missingArgs: 'You need to specify the amount of messages you want to delete.',
    requiredPermissions: PERMISSION_LEVELS.user.concat('MANAGE_MESSAGES'),
    guildOnly: true,
    usage: '<Message Count>',
  },
  async (msg: Message, args: string[]) => {
    const count = args[0]

    if (!count.match(NUMBER_REGEX)) throw new Error('Invalid number provided.')

    if (msg.channel.type === 'text' || msg.channel.type === 'news') {
      const parsedCount = parseInt(args[0])

      if (parsedCount < 2 || parsedCount > 1000)
        throw new Error(
          'You cannot delete more than 1000 messages or less than 2 messages.'
        )

      if (parsedCount <= 100) {
        const deleted = await msg.channel.bulkDelete(parsedCount)
        const users = [...new Set(deleted.map(del => del.author.tag))]

        const embed = new MessageEmbed()
          .setColor(THEME_COLORS.log)
          .setTitle('Purged Messages')
          .setDescription(`Deleted **${deleted.size}** messages.`)
          .addField('Users', colorBlue(joinArray(users, '\n')))

        const reply = await msg.reply(embed)

        reply.delete({
          timeout: timeOut,
        })
      } else if (parsedCount > 100) {
        const loopTimes = Math.floor(parsedCount / 100)
        let deleted: Collection<string, Message> = new Collection()

        for (let i = 0; i < loopTimes; i++) {
          const currentDeleted = await msg.channel.bulkDelete(100)
          deleted.concat(currentDeleted)
        }

        const lastDeleted = await msg.channel.bulkDelete(parsedCount % 100)
        deleted.concat(lastDeleted)

        const users = [...new Set(deleted.map(del => del.author.tag))]

        const embed = new MessageEmbed()
          .setColor(THEME_COLORS.log)
          .setTitle('Purged Messages')
          .setDescription(`Deleted **${parsedCount}** messages.`)
          .addField('Users', colorBlue(joinArray(users, '\n')))

        const reply = await msg.reply(embed)

        reply.delete({
          timeout: timeOut,
        })
      }
    }
  }
)
