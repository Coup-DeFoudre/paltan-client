import { client } from '@/lib/sanity';
import { 
  allEventsQuery, 
  upcomingEventsQuery, 
  featuredEventsQuery 
} from '@/lib/queries';
import CalendarPageClient from './CalendarPageClient';

// Revalidate every 60 seconds in production to ensure fresh event data
export const revalidate = 60;

export default async function CalendarPage() {
  try {
    const [allEvents, upcomingEvents, featuredEvents] = await Promise.all([
      client.fetch(allEventsQuery, {}, { cache: 'no-store' }),
      client.fetch(upcomingEventsQuery, {}, { cache: 'no-store' }),
      client.fetch(featuredEventsQuery, {}, { cache: 'no-store' }),
    ]);

    return (
      <CalendarPageClient 
        allEvents={allEvents || []}
        upcomingEvents={upcomingEvents || []}
        featuredEvents={featuredEvents || []}
      />
    );
  } catch (error) {
    console.error('Error fetching events:', error);
    
    // Return CalendarPageClient with empty arrays as fallback
    return (
      <CalendarPageClient 
        allEvents={[]}
        upcomingEvents={[]}
        featuredEvents={[]}
      />
    );
  }
}

export async function generateMetadata() {
  return {
    title: 'Events Calendar | पल्टन न्यूज़ - इवेंट कैलेंडर',
    description: 'Stay updated with upcoming events, festivals, rallies, and cultural programs in your region. त्योहार, रैलियाँ, सांस्कृतिक कार्यक्रम और अन्य महत्वपूर्ण इवेंट्स की जानकारी पाएं।',
    keywords: 'events, calendar, festivals, rallies, cultural programs, मध्य प्रदेश events, राजस्थान events',
    openGraph: {
      title: 'Events Calendar | पल्टन न्यूज़',
      description: 'Discover upcoming events, festivals, and programs in your region',
      type: 'website',
    },
  };
}
