import { defineType, defineField } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100)
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required().max(500)
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Reader', value: 'reader' },
          { title: 'Journalist', value: 'journalist' },
          { title: 'Academic', value: 'academic' },
          { title: 'Community Leader', value: 'community_leader' },
          { title: 'Youth', value: 'youth' },
          { title: 'Rural Voice', value: 'rural_voice' }
        ]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5)
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial prominently'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      quote: 'quote'
    },
    prepare(selection) {
      const { title, subtitle, quote } = selection
      return {
        title: title,
        subtitle: `${subtitle} - ${quote?.substring(0, 50)}...`
      }
    }
  }
})
