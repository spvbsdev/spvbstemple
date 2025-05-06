import { library } from '@fortawesome/fontawesome-svg-core'
import { faOm, faPrayingHands, faHandsHelping, faCalendarAlt, faStar, faBell, faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'

// Tell Font Awesome to skip adding CSS automatically since we're doing it manually
config.autoAddCss = false

// Add icons to the library for global use
library.add(
  faOm,
  faPrayingHands,
  faHandsHelping,
  faCalendarAlt,
  faStar,
  faBell,
  faPlaceOfWorship
)

// Export commonly used icons
export const icons = {
  om: faOm,
  pray: faPrayingHands,
  helping: faHandsHelping,
  calendar: faCalendarAlt,
  star: faStar,
  bell: faBell,
  temple: faPlaceOfWorship
}

export type IconName = keyof typeof icons 