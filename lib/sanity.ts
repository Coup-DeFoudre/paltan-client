import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'kz53v52t',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Add token for authentication
  ignoreBrowserTokenWarning: true // Ignore token warnings in browser
})
