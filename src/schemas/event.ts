import { defineField, defineType } from 'sanity'
import type { StringRule, TextRule, DatetimeRule } from '@sanity/types'
import { icons } from '../lib/icons'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule: TextRule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (rule: DatetimeRule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'recurrence',
      title: 'Recurrence',
      type: 'string',
      options: {
        list: [
          { title: 'One-time', value: 'one-time' },
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Yearly', value: 'yearly' },
        ],
      },
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: Object.keys(icons).map(key => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          value: key
        }))
      },
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this event should be displayed on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Start Date',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      date: 'startDate',
    },
    prepare(selection) {
      const { title, date } = selection
      return {
        title: title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
      }
    },
  },
}) 