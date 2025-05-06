import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'c973pa4u',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  }
}) 