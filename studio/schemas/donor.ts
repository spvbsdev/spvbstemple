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
      description: 'Amount donated in INR (optional if not disclosed yet)',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (value === undefined || value === null) return true;
          return value > 0 || 'Amount must be positive';
        }),
    }),
    defineField({
      name: 'cause',
      title: 'Donation Cause',
      type: 'string',
      description: 'Purpose of the donation (optional)',
      options: {
        list: [
          { title: 'Temple Development', value: 'development' },
          { title: 'Kalyana Mandapam', value: 'kalyana-mandapam' },
          { title: 'Annadanam', value: 'annadanam' },
          { title: 'Festivals & Events', value: 'festivals' },
          { title: 'Maintenance', value: 'maintenance' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'donationDate',
      title: 'Donation Date',
      type: 'datetime',
      description: 'When the donation was made (optional)',
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
      const causeTitles: Record<string, string> = {
        development: 'Temple Development',
        'kalyana-mandapam': 'Kalyana Mandapam',
        annadanam: 'Annadanam',
        festivals: 'Festivals & Events',
        maintenance: 'Maintenance',
        other: 'Other',
      };
      const causeLabel = cause ? causeTitles[cause as string] ?? cause : 'No cause set';
      const amountPart =
        subtitle !== undefined && subtitle !== null && subtitle !== ''
          ? `₹${subtitle}`
          : 'No amount';
      return {
        title: title || 'Anonymous Donor',
        subtitle: `${amountPart} — ${causeLabel}`,
      };
    },
  },
}); 