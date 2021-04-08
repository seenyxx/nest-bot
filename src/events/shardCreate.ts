import { onEvent } from '../client/handlers/event';
import { botCache } from '../util/cache'

export default onEvent('shardReady', s => {
  console.log(`✔ Shard: ${s} ready!`)
  botCache.shardCount++
})