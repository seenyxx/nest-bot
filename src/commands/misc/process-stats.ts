import { Message, MessageEmbed } from 'discord.js'
import { createCommand } from '../../client/handlers/command'
import { PERMISSION_LEVELS, THEME_COLORS } from '../../util/constants'
import { colorGreen, colorBlue } from '../../renderers/format/colors'
import { codeBlock } from '../../renderers/format/other'

export default createCommand({
  triggers: ['process-stats', 'process'],
  category: 'misc',
  cooldown: 5,
  desc: 'Gets the resource usage of the process.',
  requiredPermissions: PERMISSION_LEVELS.user,
}, async (msg: Message, args: string[]) => {
  const embed = new MessageEmbed()
    .setColor(THEME_COLORS.info)
    .setTitle('Process Statistics')
    .addField('Memory Heap Size', codeBlock(`[${process.memoryUsage().heapUsed / 1000}](KB)`, 'md'), true)
    .addField('Memory Heap Total', codeBlock(`[${process.memoryUsage().heapTotal / 1000}](KB)`, 'md'), true)
    .addField('System CPU Usage', colorBlue(`${process.cpuUsage().system / 1000}%`), true)
    .addField('Uptime', colorGreen(`${process.uptime()}s`))
  
  msg.reply(embed)
})