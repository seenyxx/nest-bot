import { Collection } from 'discord.js'
import { getConfig } from './helpers'
import { Command } from '../client/handlers/command'
export const botCache = {
  config: getConfig(),
  commands: new Collection<string, Command>(),
  help: new Collection<HelpIndex, HelpCategory>(),
}

interface HelpIndex {
  id: string
  display: string
}
type HelpCategory = Command[]
