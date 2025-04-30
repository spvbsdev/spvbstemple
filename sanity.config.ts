import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import siteSettings from './src/schemas/siteSettings'
import service from './src/schemas/service'
import event from './src/schemas/event'
import donor from './src/schemas/donor'
import templeService from './src/schemas/templeService'
import project from './src/schemas/project'
import infrastructureDonation from './src/schemas/infrastructureDonation'
import heroCarousel from './src/schemas/heroCarousel'
import video from './src/schemas/video'

export default defineConfig({
  name: 'default',
  title: 'Sri Pothuluri Veera Brahmendra Swami Temple',
  projectId: 'c973pa4u',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [siteSettings, service, event, donor, templeService, project, infrastructureDonation, heroCarousel, video],
  },
  css: {
    postcss: false
  }
}) 