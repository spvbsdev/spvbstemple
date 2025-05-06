import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'infrastructureDonation',
  title: 'Infrastructure Donations',
  type: 'document',
  fields: [
    defineField({
      name: 'donorName',
      title: 'Donor Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectName',
      title: 'Infrastructure Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'donationAmount',
      title: 'Donation Amount (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'donationDate',
      title: 'Donation Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectImages',
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
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'donorPhoto',
      title: 'Donor Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'testimonial',
      title: 'Donor Testimonial',
      type: 'text',
      description: 'Optional testimonial or message from the donor',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Set to false to hide this donation from the website',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'donorName',
      subtitle: 'projectName',
      media: 'projectImages.0',
    },
  },
}); 