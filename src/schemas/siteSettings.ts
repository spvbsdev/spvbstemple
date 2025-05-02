import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'templeName',
      title: 'Temple Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'templeInfo',
      title: 'Temple Information',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content about the temple, its history, and significance',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
        { name: 'zipCode', title: 'ZIP Code', type: 'string' }
      ]
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { 
          name: 'primaryPhone', 
          title: 'Primary Phone Number', 
          type: 'string',
          description: 'Main contact number for the temple'
        },
        { 
          name: 'secondaryPhone', 
          title: 'Secondary Phone Number', 
          type: 'string',
          description: 'Alternative contact number'
        },
        { name: 'email', title: 'Email', type: 'string' },
        { 
          name: 'whatsapp', 
          title: 'WhatsApp Number', 
          type: 'string', 
          description: 'Format: +1XXXXXXXXXX' 
        },
        {
          name: 'additionalContacts',
          title: 'Additional Contacts (Contact Page Only)',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { 
                name: 'name',
                title: 'Contact Name',
                type: 'string',
                description: 'Name of the contact person'
              },
              {
                name: 'role',
                title: 'Role',
                type: 'string',
                description: 'Role or position of the contact person'
              },
              {
                name: 'phone',
                title: 'Phone Number',
                type: 'string'
              },
              {
                name: 'whatsapp',
                title: 'WhatsApp Number',
                type: 'string',
                description: 'Format: +1XXXXXXXXXX'
              }
            ]
          }],
          description: 'Additional contacts that will only be shown on the Contact page'
        }
      ]
    }),
    defineField({
      name: 'templeHours',
      title: 'Temple Hours',
      type: 'object',
      fields: [
        { name: 'weekday', title: 'Weekday Hours', type: 'string' },
        { name: 'weekend', title: 'Weekend Hours', type: 'string' },
        { name: 'specialNote', title: 'Special Note', type: 'string' }
      ]
    })
  ]
}) 