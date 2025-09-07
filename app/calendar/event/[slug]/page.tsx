import { client } from '@/lib/sanity';
import { eventBySlugQuery } from '@/lib/queries';
import EventDetailClient from './EventDetailClient';
import { notFound } from 'next/navigation';

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Revalidate every 60 seconds in production
export const revalidate = 60;

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  try {
    const { slug } = await params;
    const event = await client.fetch(eventBySlugQuery, { slug }, { cache: 'no-store' });

    if (!event) {
      notFound();
    }

    return <EventDetailClient event={event} />;
  } catch (error) {
    console.error('Error fetching event:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  try {
    const { slug } = await params;
    const event = await client.fetch(eventBySlugQuery, { slug });

    if (!event) {
      return {
        title: 'Event Not Found | पल्टन न्यूज़',
        description: 'The requested event could not be found.',
      };
    }

    return {
      title: `${event.title} | पल्टन न्यूज़ Events`,
      description: event.description,
      keywords: event.tags?.join(', ') || 'events, calendar, ' + event.category,
      openGraph: {
        title: event.title,
        description: event.description,
        images: event.eventImage?.asset?.url ? [event.eventImage.asset.url] : [],
        type: 'website',
      },
    };
  } catch {
    return {
      title: 'Event | पल्टन न्यूज़',
      description: 'Event details',
    };
  }
}
