import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Temple Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text description with images and formatting',
    }),
    defineField({
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'targetAmount',
      title: 'Target Amount (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'raisedAmount',
      title: 'Amount Raised (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
      initialValue: 0,
    }),
    defineField({
      name: 'benefits',
      title: 'Project Benefits',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List the benefits and impact of this project',
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'object',
      fields: [
        { name: 'startDate', type: 'date', title: 'Start Date' },
        { name: 'estimatedCompletion', type: 'date', title: 'Estimated Completion' },
        { name: 'milestones', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Milestone Title' },
              { name: 'date', type: 'date', title: 'Target Date' },
              { name: 'completed', type: 'boolean', title: 'Completed' },
            ],
          },
        ]},
      ],
    }),
    defineField({
      name: 'donorRecognition',
      title: 'Donor Recognition Levels',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'level', type: 'string', title: 'Recognition Level' },
          { name: 'minAmount', type: 'number', title: 'Minimum Amount (₹)' },
          { name: 'benefits', type: 'text', title: 'Recognition Benefits' },
        ],
      }],
    }),
    defineField({
      name: 'isHighPriority',
      title: 'High Priority Project',
      type: 'boolean',
      description: 'Mark this as a high-priority project to feature it prominently',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      raised: 'raisedAmount',
      target: 'targetAmount',
    },
    prepare(selection) {
      const { title, status, raised, target } = selection;
      const progress = ((raised / target) * 100).toFixed(1);
      return {
        title: title,
        subtitle: `${status.charAt(0).toUpperCase() + status.slice(1)} - ₹${raised.toLocaleString()} of ₹${target.toLocaleString()} (${progress}%)`,
      };
    },
  },
}); 