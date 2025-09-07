import { client } from '@/lib/sanity';
// import { articlesByCategory } from '@/lib/queries';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

// Category mapping
const categoryMap: { [key: string]: { title: string; titleHindi: string; description: string } } = {
  'national': {
    title: 'National News',
    titleHindi: 'देश की खबरें',
    description: 'Desh ke har kone se zaroori updates – politics se le kar policy tak. राजनीति, शासन और देश के बड़े फैसलों पर आधारित खबरें।'
  },
  'dharma': {
    title: 'Dharma & Spirituality',
    titleHindi: 'धर्म और अध्यात्म',
    description: 'Sanskaaron aur aastha se judi baatein, samay ke saath samvedansheel tarike se. धर्मिक संवाद, त्योहारों की व्याख्या और अध्यात्मिक दृष्टिकोण।'
  },
  'society': {
    title: 'Society & Culture',
    titleHindi: 'समाज और संस्कृति',
    description: 'Apne samaj ko samajhne ki ek nayi koshish. विरासत, ग्रामीण ज़िंदगियाँ, भाषाएं और बदलते सामाजिक सरोकार।'
  },
  'ground-reports': {
    title: 'Ground Reports',
    titleHindi: 'ज़मीनी रिपोर्ट्स',
    description: 'Field se sidhe – bina filter, bina makeup. फील्ड स्टोरीज़, खोजी रिपोर्ट्स और मिस्ट्री ऑडिट्स।'
  },
  'youth': {
    title: 'Youth & Careers',
    titleHindi: 'युवा और करियर',
    description: 'Yuvaon ke sapne, naukri aur nayi soch ke saath. शिक्षा, स्किल डेवलपमेंट और गिग इकॉनॉमी से जुड़े अवसर।'
  },
  'voices': {
    title: 'Voices',
    titleHindi: 'विचार और अनुभव',
    description: 'Awaazein jo zaroori hain – aapki bhi, hamari bhi. राय, विश्लेषण और गेस्ट कॉलम।'
  },
  'art-literature': {
    title: 'Art & Literature',
    titleHindi: 'कला और साहित्य',
    description: 'Shabdon aur rangon ki duniya, jahan kala apne asli roop mein hoti hai. हिंदी साहित्य, किताबों की बातें और लोक कला।'
  },
  'local': {
    title: 'Local Connect',
    titleHindi: 'लोकल जुड़ाव',
    description: 'Apne sheher, apne rajya se real connection. मध्य प्रदेश, राजस्थान और दूसरे राज्यों से जुड़ी लोकल खबरें।'
  }
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const categoryInfo = categoryMap[resolvedParams.slug];
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found - द पल्टन'
    };
  }

  return {
    title: `${categoryInfo.title} - द पल्टन`,
    description: categoryInfo.description
  };
}

export default async function CategoryPage({ params }: Props) {
  try {
    const resolvedParams = await params;
    const categorySlug = resolvedParams.slug;
    
    // Check if category exists
    const categoryInfo = categoryMap[categorySlug];
    if (!categoryInfo) {
      notFound();
    }

    // Fetch all articles for this category
    const articles = await client.fetch(
      `*[_type == "article" && !(_id in path("drafts.**")) && category == $category && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        coverImage {
          asset -> {
            url
          }
        },
        category,
        subcategory,
        excerpt,
        author,
        isTrending,
        isEditorPick
      }`,
      { category: categorySlug },
      { cache: 'no-store' }
    );

    return (
      <CategoryPageClient 
        category={categoryInfo}
        articles={articles}
        categorySlug={categorySlug}
      />
    );
  } catch (error) {
    console.error('Error fetching category data:', error);
    notFound();
  }
}
