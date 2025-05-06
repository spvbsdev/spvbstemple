import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'templeService',
  title: 'Temple Services',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Daily Service', value: 'daily' },
          { title: 'Annual Festival', value: 'annual' },
          { title: 'Special Service', value: 'special' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timing',
      title: 'Service Timing',
      type: 'string',
      description: 'Time of the service (e.g., "6:00 AM - 7:00 AM" or "Full Moon Day")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Annual Service Date',
      type: 'string',
      description: 'For annual services, specify the date or occasion (e.g., "Maha Shivaratri")',
    }),
    defineField({
      name: 'significance',
      title: 'Religious Significance',
      type: 'text',
      description: 'Explain the spiritual importance of this service',
    }),
    defineField({
      name: 'offerings',
      title: 'Offerings',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of items devotees can offer during this service',
    }),
    defineField({
      name: 'specialInstructions',
      title: 'Special Instructions',
      type: 'text',
      description: 'Any specific guidelines or instructions for devotees',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this service should be displayed on the website',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
      timing: 'timing',
    },
    prepare(selection) {
      const { title, type, timing } = selection;
      return {
        title: title,
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${timing}`,
      };
    },
  },
}); 