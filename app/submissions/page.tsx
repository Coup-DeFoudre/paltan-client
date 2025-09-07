import { client } from '@/lib/sanity';
import { submissionSettingsQuery } from '@/lib/queries';
import SubmissionsPageClient from './SubmissionsPageClient';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function SubmissionsPage() {
  try {
    const submissionSettings = await client.fetch(submissionSettingsQuery, {}, { cache: 'no-store' });

    return (
      <SubmissionsPageClient 
        googleSheetsUrl={submissionSettings?.googleSheetsUrl || null}
        notificationEmail={submissionSettings?.notificationEmail || null}
      />
    );
  } catch (error) {
    console.error('Error fetching submission settings:', error);
    
    return (
      <SubmissionsPageClient 
        googleSheetsUrl={null}
        notificationEmail={null}
      />
    );
  }
}

export async function generateMetadata() {
  return {
    title: 'Reader Submissions | पल्टन न्यूज़ - पाठक योगदान',
    description: 'Share your story with us. आपकी बात भी हो सकती है हेडलाइन – भेजिये अपना कंटेंट, हम देखेंगे।',
    keywords: 'reader submissions, citizen journalism, story submission, पाठक योगदान',
    openGraph: {
      title: 'Reader Submissions | पल्टन न्यूज़',
      description: 'Share your story with us - your voice matters',
      type: 'website',
    },
  };
}
