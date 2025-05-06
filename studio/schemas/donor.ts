import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'donor',
  title: 'Donors',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Donor Name',
      type: 'string',
      description: 'Name of the donor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Donation Amount',
      type: 'number',
      description: 'Amount donated in INR',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'cause',
      title: 'Donation Cause',
      type: 'string',
      description: 'Purpose of the donation',
      options: {
        list: [
          { title: 'Temple Development', value: 'development' },
          { title: 'Annadanam', value: 'annadanam' },
          { title: 'Festivals & Events', value: 'festivals' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'donationDate',
      title: 'Donation Date',
      type: 'datetime',
      description: 'When was the donation made',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      description: 'Optional message from the donor',
    }),
    defineField({
      name: 'isAnonymous',
      title: 'Keep Anonymous',
      type: 'boolean',
      description: 'Whether to display the donor name publicly',
      initialValue: false,
    }),
    defineField({
      name: 'displayOnWebsite',
      title: 'Display on Website',
      type: 'boolean',
      description: 'Whether to display this donation on the website',
      initialValue: true,
    }),
    defineField({
      name: 'proofOfDonation',
      title: 'Proof of Donation',
      type: 'image',
      description: 'Optional receipt or proof of donation',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'amount',
      cause: 'cause',
    },
    prepare(selection) {
      const { title, subtitle, cause } = selection;
      return {
        title: title || 'Anonymous Donor',
        subtitle: `₹${subtitle} - ${cause}`,
      };
    },
  },
}); 