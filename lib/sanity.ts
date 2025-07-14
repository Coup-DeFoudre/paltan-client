import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'kz53v52t',       // ✅ Your real Sanity Project ID
  dataset: 'production',
  apiVersion: '2023-01-01',    // Use latest stable date
  useCdn: true,                // Use CDN for faster read-only access
})
