import { Rule, SchemaTypeDefinition } from '@sanity/types';

interface HeroImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt: string;
  caption?: string;
  order: number;
}

const heroCarousel: SchemaTypeDefinition = {
  name: 'heroCarousel',
  title: 'Hero Carousel',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Carousel Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true, // Enables UI for selecting focal point
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule: Rule) => rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (rule: Rule) => rule.required().min(1),
            }
          ]
        }
      ],
      validation: (rule: Rule) => rule.required().min(1),
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Only one carousel should be active at a time',
      initialValue: true,
    }
  ],
  preview: {
    select: {
      images: 'images',
      active: 'active'
    },
    prepare(selection: { [key: string]: unknown }): { title: string; subtitle: string } {
      const images = selection.images as HeroImage[] | undefined;
      const active = selection.active as boolean | undefined;
      return {
        title: `Hero Carousel ${active ? '(Active)' : '(Inactive)'}`,
        subtitle: `${images?.length || 0} images`,
      }
    }
  }
};

export default heroCarousel; 