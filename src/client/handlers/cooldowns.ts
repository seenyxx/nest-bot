import db from 'quick.db'

export class CooldownsManager {
  setCooldown(name: string, id: string, cd: number) {
    db.set(`${id}_cd.${name}`, Date.now() + cd * 1000)
  }

  getCooldown(name: string, id: string): number {
    return db.get(`${id}_cd.${name}`) || 0
  }

  remCooldown(name: string, id: string) {
    return db.delete(`${id}_cd.${name}`)
  }

  checkCooldown(name: string, id: string) {
    const cooldown = this.getCooldown(name, id)

    const diff = cooldown - Date.now()

    if (diff > 0) {
      return Math.floor(diff / 100) / 10
    } else {
      this.remCooldown(name, id)
    }
  }
}
