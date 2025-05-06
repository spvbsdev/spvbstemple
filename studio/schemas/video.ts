import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: Rule => Rule.required().custom((url) => {
        if (typeof url === 'undefined') {
          return true // Allow undefined values
        }
        
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
        if (!youtubeRegex.test(url)) {
          return 'Please enter a valid YouTube URL'
        }
        return true
      })
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Bhajan', value: 'bhajan' },
          { title: 'Discourse', value: 'discourse' },
          { title: 'Event', value: 'event' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured videos will appear at the top',
      initialValue: false
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL',
      type: 'url',
      description: 'Optional custom thumbnail URL. If not provided, will use YouTube thumbnail.'
    })
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [
        { field: 'publishedAt', direction: 'desc' }
      ]
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [
        { field: 'publishedAt', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      category: 'category'
    },
    prepare(selection) {
      const { title, publishedAt, category } = selection
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : ''
      return {
        title: title,
        subtitle: `${category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Uncategorized'} - ${date}`
      }
    }
  }
}) 