import { PortableTextBlock } from '@portabletext/types'

export interface Event {
  _id: string
  title: string
  slug: {
    current: string
  }
  eventDate: string
  description: string
  detailedDescription?: PortableTextBlock[]
  flyer?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  imageUrl?: string
  isAnnualEvent: boolean
  eventType: 'jayanthi' | 'aaradhana' | 'shivaratri' | 'navaratri' | 'other'
  schedule?: Array<{
    time: string
    activity: string
  }>
  isActive: boolean
} 