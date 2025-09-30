import SubmissionsPageClient from './SubmissionsPageClient';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function SubmissionsPage() {
  // No longer need to fetch Google Sheets settings since we're using email
  return <SubmissionsPageClient />;
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
