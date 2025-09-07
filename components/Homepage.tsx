// components/HomePage.tsx
'use client';

// import { useState } from 'react';

// Import component types
import { Article, Ad, Notice, EditorPick, Feature, Video } from './homepage/types';

// Import homepage components
import NoticeBar from './homepage/NoticeBar';
import BreakingNewsTicker from './homepage/BreakingNewsTicker';
import FeaturedCarousel from './homepage/FeaturedCarousel';
import EditorsPicks from './homepage/EditorsPicks';
import CategorySection from './CategorySection';
import AdSection from './homepage/AdSection';
import FeaturesSection from './FeaturesSection';

interface HomePageProps {
  notices: Notice[];
  trendingArticles: Article[];
  editorPicks: EditorPick[];
  editorPickArticles: Article[];
  features: Feature[];
  categoryArticles: { [key: string]: Article[] };
  categoryVideos: { [key: string]: Video[] };
  ads: Ad[];
}

const HomePage: React.FC<HomePageProps> = ({ 
  notices, 
  trendingArticles, 
  editorPicks,
  // editorPickArticles, // Currently unused
  // features, // Currently unused
  categoryArticles,
  categoryVideos,
  ads 
}) => {
  
  // Transform functions to adapt data to component interfaces
  const transformAdsForAdSection = (ads: Ad[]) => {
    return ads.map(ad => ({
      title: ad.title,
      description: ad.title, // Use title as description since Ad doesn't have description
      imageUrl: ad.adImage?.asset?.url
    }));
  };

  const transformArticlesForBreakingNews = (articles: Article[]) => {
    return articles.map(article => ({
      title: article.title
    }));
  };

  const transformArticlesForCarousel = (articles: Article[]) => {
    return articles.map(article => ({
      title: article.title,
      description: article.excerpt || article.title
    }));
  };

  const transformEditorPicksForComponent = (picks: EditorPick[]) => {
    return picks.map(pick => ({
      title: pick.title,
      description: pick.description
    }));
  };

  // Enhanced dummy data for demonstration
  const dummyCategoryArticles = {
    videos: categoryVideos.all && categoryVideos.all.length > 0 ? categoryVideos.all.map(video => ({
      _id: video._id,
      title: video.title,
      slug: { current: `videos/${video._id}` },
      coverImage: { asset: { url: video.thumbnail?.asset?.url || video.thumbnailUrl || 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop' } },
      publishedAt: video.publishedAt,
      excerpt: video.description || 'वीडियो देखें',
      isVideo: true,
      views: video.views,
      embedUrl: video.embedUrl
    })) : [
      {
        _id: 'video1',
        title: 'संसद सत्र: प्रमुख बिंदुओं की विस्तृत चर्चा',
        slug: { current: 'videos/parliament-session-discussion' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=300&fit=crop&auto=format' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'संसद के महत्वपूर्ण मुद्दों पर विस्तृत चर्चा और विश्लेषण।',
        isVideo: true,
        views: 12500,
        embedUrl: 'https://www.youtube.com/embed/example'
      },
      {
        _id: 'video2',
        title: 'ग्राउंड रिपोर्ट: किसान आंदोलन की वास्तविकता',
        slug: { current: 'videos/farmers-movement-ground-report' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop&auto=format' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'किसानों की समस्याओं और उनके संघर्ष की जमीनी हकीकत।',
        isVideo: true,
        views: 8900,
        embedUrl: 'https://www.youtube.com/embed/example'
      },
      {
        _id: 'video3',
        title: 'युवा उद्यमिता: स्टार्टअप की सफलता की कहानियां',
        slug: { current: 'videos/youth-entrepreneurship-success' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'भारतीय युवाओं के सफल स्टार्टअप की प्रेरणादायक कहानियां।',
        isVideo: true,
        views: 15600,
        embedUrl: 'https://www.youtube.com/embed/example'
      }
    ],
    national: categoryArticles.national && categoryArticles.national.length > 0 ? categoryArticles.national : [
      {
        _id: 'national1',
        title: 'संसद के शीतकालीन सत्र में महत्वपूर्ण विधेयक पेश',
        slug: { current: 'parliament-winter-session' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'इस सत्र में कई अहम विधेयक पेश किए जाएंगे जो देश के भविष्य को प्रभावित करेंगे।'
      },
      {
        _id: 'national2',
        title: 'किसानों के लिए नई योजना की घोषणा',
        slug: { current: 'farmer-new-scheme' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'सरकार ने किसानों की आय दोगुनी करने के लिए एक नई योजना का ऐलान किया है।'
      },
      {
        _id: 'national3',
        title: 'रक्षा क्षेत्र में स्वदेशी तकनीक को बढ़ावा',
        slug: { current: 'defense-indigenous-tech' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'भारत रक्षा उपकरणों के मामले में आत्मनिर्भरता की दिशा में तेजी से आगे बढ़ रहा है।'
      },
      {
        _id: 'national4',
        title: 'डिजिटल इंडिया मिशन में नई उपलब्धियां',
        slug: { current: 'digital-india-achievements' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'देश के डिजिटलीकरण में मिली नई सफलताएं और भविष्य की योजनाएं।'
      },
      {
        _id: 'national5',
        title: 'आर्थिक सुधारों के सकारात्मक परिणाम',
        slug: { current: 'economic-reforms-results' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'नई आर्थिक नीतियों के कारण देश की अर्थव्यवस्था में आई तेजी।'
      }
    ],
    dharma: categoryArticles.dharma && categoryArticles.dharma.length > 0 ? categoryArticles.dharma : [
      {
        _id: 'dharma1',
        title: 'दीवाली 2024: पर्यावरण के अनुकूल मनाएं त्योहार',
        slug: { current: 'eco-friendly-diwali-2024' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1605367852095-342d24a3e108?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'इस बार दीवाली मनाने के पारंपरिक और पर्यावरण के अनुकूल तरीकों को जानें।'
      },
      {
        _id: 'dharma2',
        title: 'गुरु नानक जयंती: सिख धर्म की शिक्षाएं',
        slug: { current: 'guru-nanak-teachings' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'गुरु नानक देव जी की शिक्षाएं आज भी कितनी प्रासंगिक हैं, जानें विस्तार से।'
      },
      {
        _id: 'dharma3',
        title: 'आधुनिक युग में योग और ध्यान का महत्व',
        slug: { current: 'yoga-meditation-modern-age' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'तनावभरी जिंदगी में योग और ध्यान कैसे मानसिक शांति दे सकते हैं।'
      },
      {
        _id: 'dharma4',
        title: 'भारतीय त्योहारों का सांस्कृतिक महत्व',
        slug: { current: 'indian-festivals-cultural-significance' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'हमारे पारंपरिक त्योहार कैसे सामाजिक एकजुटता बढ़ाते हैं।'
      },
      {
        _id: 'dharma5',
        title: 'आध्यात्मिक पर्यटन: तीर्थ यात्रा के नए आयाम',
        slug: { current: 'spiritual-tourism-pilgrimage' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'धार्मिक स्थलों की यात्रा कैसे आत्मिक शांति प्रदान करती है।'
      }
    ],
    society: categoryArticles.society && categoryArticles.society.length > 0 ? categoryArticles.society : [
      {
        _id: 'society1',
        title: 'ग्रामीण महिलाओं का सशक्तिकरण: एक सफलता की कहानी',
        slug: { current: 'rural-women-empowerment' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1594608661623-4484cf838cdc?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'कैसे ग्रामीण महिलाएं स्वयं सहायता समूहों के माध्यम से अपना जीवन बदल रही हैं।'
      },
      {
        _id: 'society2',
        title: 'बदलती सामाजिक सोच: युवाओं के बीच नए मूल्य',
        slug: { current: 'changing-social-values-youth' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'आज की युवा पीढ़ी कैसे पारंपरिक और आधुनिक मूल्यों के बीच संतुलन बना रही है।'
      },
      {
        _id: 'society3',
        title: 'भारतीय भाषाओं का संरक्षण: डिजिटल युग में चुनौतियां',
        slug: { current: 'indian-languages-digital-age' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'डिजिटल दुनिया में अपनी मातृभाषाओं को कैसे जीवित रखा जा सकता है।'
      },
      {
        _id: 'society4',
        title: 'शहरीकरण और पारंपरिक संस्कृति का संरक्षण',
        slug: { current: 'urbanization-cultural-preservation' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'तेजी से बढ़ते शहरों में कैसे बचाएं अपनी सांस्कृतिक पहचान।'
      },
      {
        _id: 'society5',
        title: 'सामाजिक मीडिया का समाज पर प्रभाव',
        slug: { current: 'social-media-impact-society' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'डिजिटल प्लेटफॉर्म कैसे बदल रहे हैं हमारे रिश्ते और संवाद के तरीके।'
      }
    ],
    'ground-reports': categoryArticles['ground-reports'] && categoryArticles['ground-reports'].length > 0 ? categoryArticles['ground-reports'] : [
      {
        _id: 'ground1',
        title: 'मध्य प्रदेश के आदिवासी क्षेत्र में विकास की कहानी',
        slug: { current: 'mp-tribal-development' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'आदिवासी क्षेत्रों में हो रहे विकास कार्यों की जमीनी हकीकत से साक्षात्कार।'
      },
      {
        _id: 'ground2',
        title: 'जल संकट: राजस्थान के गांवों की चुनौती',
        slug: { current: 'rajasthan-water-crisis' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1541544181051-e46607bc22fd?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'राजस्थान के दूरदराज के गांवों में पानी की समस्या और स्थानीय समाधान।'
      },
      {
        _id: 'ground3',
        title: 'खनन माफिया बनाम पर्यावरण: छत्तीसगढ़ की रिपोर्ट',
        slug: { current: 'mining-mafia-environment-chhattisgarh' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1459664018906-085c36f472af?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'अवैध खनन का पर्यावरण पर प्रभाव और स्थानीय समुदाय की लड़ाई।'
      },
      {
        _id: 'ground4',
        title: 'किसान आंदोलन: जमीनी हकीकत और मुद्दे',
        slug: { current: 'farmers-movement-ground-reality' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'किसानों की समस्याओं की वास्तविकता और उनके संघर्ष की कहानी।'
      },
      {
        _id: 'ground5',
        title: 'शिक्षा व्यवस्था: गांव से शहर तक की चुनौतियां',
        slug: { current: 'education-system-rural-urban-challenges' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'भारत की शिक्षा व्यवस्था में मौजूद समस्याएं और संभावित समाधान।'
      }
    ],
    youth: categoryArticles.youth && categoryArticles.youth.length > 0 ? categoryArticles.youth : [
      {
        _id: 'youth1',
        title: 'स्टार्टअप इकोसिस्टम: भारत में युवा उद्यमिता का उदय',
        slug: { current: 'startup-ecosystem-youth-entrepreneurship' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'कैसे भारतीय युवा स्टार्टअप के माध्यम से नवाचार और रोजगार सृजन में योगदान दे रहे हैं।'
      },
      {
        _id: 'youth2',
        title: 'स्किल इंडिया: नए युग के लिए नए कौशल',
        slug: { current: 'skill-india-new-age-skills' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'भविष्य की नौकरियों के लिए आवश्यक कौशल और उन्हें सीखने के तरीके।'
      },
      {
        _id: 'youth3',
        title: 'गिग इकॉनॉमी: युवाओं के लिए नए अवसर',
        slug: { current: 'gig-economy-opportunities-youth' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'फ्रीलांसिंग और गिग इकॉनॉमी कैसे युवाओं को नए करियर के विकल्प दे रहे हैं।'
      },
      {
        _id: 'youth4',
        title: 'ऑनलाइन शिक्षा: डिजिटल युग में सीखने के नए तरीके',
        slug: { current: 'online-education-digital-learning' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'कोविड के बाद ऑनलाइन शिक्षा कैसे बनी युवाओं की पहली पसंद।'
      },
      {
        _id: 'youth5',
        title: 'मानसिक स्वास्थ्य: युवाओं में बढ़ती जागरूकता',
        slug: { current: 'mental-health-awareness-youth' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'मानसिक स्वास्थ्य के प्रति बढ़ती समझ और उपलब्ध सहायता सेवाएं।'
      }
    ],
    voices: categoryArticles.voices && categoryArticles.voices.length > 0 ? categoryArticles.voices : [
      {
        _id: 'voices1',
        title: 'एक शिक्षक की डायरी: कोविड के बाद शिक्षा व्यवस्था',
        slug: { current: 'teacher-diary-post-covid-education' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'एक अनुभवी शिक्षक के नज़रिए से शिक्षा जगत में आए बदलाव की कहानी।'
      },
      {
        _id: 'voices2',
        title: 'माँ का पत्र: बेटी की शादी और सामाजिक दबाव',
        slug: { current: 'mother-letter-daughter-marriage-social-pressure' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'समाज के दबाव और बेटी के सपनों के बीच एक माँ की दुविधा की ईमानदार कहानी।'
      },
      {
        _id: 'voices3',
        title: 'किसान का बयान: खेती में तकनीक का सफर',
        slug: { current: 'farmer-statement-technology-in-farming' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'पारंपरिक खेती से आधुनिक तकनीक तक - एक किसान का अनुभव।'
      },
      {
        _id: 'voices4',
        title: 'डॉक्टर की चिंता: ग्रामीण इलाकों में स्वास्थ्य सेवा',
        slug: { current: 'doctor-concern-rural-healthcare' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'ग्रामीण क्षेत्रों में काम करने वाले डॉक्टर की चुनौतियों और समाधान की बात।'
      },
      {
        _id: 'voices5',
        title: 'युवा का संकल्प: पर्यावरण संरक्षण के लिए व्यक्तिगत प्रयास',
        slug: { current: 'youth-resolve-personal-environment-conservation' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'पर्यावरण बचाने के लिए व्यक्तिगत स्तर पर किए जा रहे छोटे-बड़े प्रयास।'
      }
    ],
    'art-literature': categoryArticles['art-literature'] && categoryArticles['art-literature'].length > 0 ? categoryArticles['art-literature'] : [
      {
        _id: 'art1',
        title: 'भारतीय लोक कलाओं का पुनरुत्थान: डिजिटल युग में नई पहचान',
        slug: { current: 'indian-folk-arts-revival-digital-age' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'पारंपरिक कलाएं कैसे सोशल मीडिया और डिजिटल प्लेटफॉर्म पर नई पहचान बना रही हैं।'
      },
      {
        _id: 'art2',
        title: 'हिंदी साहित्य में युवा लेखकों का योगदान',
        slug: { current: 'hindi-literature-young-writers-contribution' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'समकालीन हिंदी साहित्य में नई आवाज़ें और उनकी विविधता की खोज।'
      },
      {
        _id: 'art3',
        title: 'हस्तशिल्प कलाकारों की संघर्ष गाथा',
        slug: { current: 'handicraft-artists-struggle-story' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'मशीनी युग में हाथ से बनी कलाकृतियों के कारीगरों का जीवन संघर्ष।'
      },
      {
        _id: 'art4',
        title: 'भारतीय सिनेमा में क्षेत्रीय फिल्मों का बढ़ता प्रभाव',
        slug: { current: 'indian-cinema-regional-films-growing-influence' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1489599504792-91030ddd4e6a?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'बॉलीवुड से कहीं आगे - क्षेत्रीय सिनेमा कैसे बना रहा है राष्ट्रीय पहचान।'
      },
      {
        _id: 'art5',
        title: 'पुस्तक मेलों का सांस्कृतिक महत्व',
        slug: { current: 'book-fairs-cultural-importance' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'डिजिटल युग में भी क्यों महत्वपूर्ण हैं पुस्तक मेले और पुस्तकालय।'
      }
    ],
    local: categoryArticles.local && categoryArticles.local.length > 0 ? categoryArticles.local : [
      {
        _id: 'local1',
        title: 'गाँव में डिजिटल क्रांति: ऑनलाइन बैंकिंग से लेकर ई-कॉमर्स तक',
        slug: { current: 'village-digital-revolution-banking-ecommerce' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'छोटे शहरों और गाँवों में कैसे बदल रही है डिजिटल तकनीक लोगों की ज़िंदगी।'
      },
      {
        _id: 'local2',
        title: 'स्थानीय त्योहारों का आधुनिक स्वरूप',
        slug: { current: 'local-festivals-modern-form' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'पारंपरिक त्योहार कैसे अपना रहे हैं आधुनिक तौर-तरीके, बिना अपना मूल खोए।'
      },
      {
        _id: 'local3',
        title: 'पंचायती राज: ज़मीनी लोकतंत्र की नई दिशा',
        slug: { current: 'panchayati-raj-grassroots-democracy-new-direction' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'गाँव से शहर तक - स्थानीय शासन व्यवस्था में आ रहे सकारात्मक बदलाव।'
      },
      {
        _id: 'local4',
        title: 'स्वयं सहायता समूहों की सफलता की कहानी',
        slug: { current: 'self-help-groups-success-story' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1594608661623-4484cf838cdc?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'महिलाओं के स्वयं सहायता समूह कैसे बन रहे हैं सामुदायिक विकास का आधार।'
      },
      {
        _id: 'local5',
        title: 'छोटे शहरों में उभरते स्टार्टअप्स',
        slug: { current: 'small-cities-emerging-startups' },
        coverImage: { asset: { url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=300&h=200&fit=crop' } },
        publishedAt: new Date().toISOString(),
        excerpt: 'टियर-2 और टियर-3 शहरों से निकलने वाले नवाचार और व्यावसायिक समाधान।'
      }
    ]
  };

  // Theme colors for different categories
  // Modern color psychology themes - cohesive and eye-catching
  const categoryThemes = {
    videos: {
      gradient: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50',
      bg: 'bg-gradient-to-r from-rose-100 to-pink-100',
      button: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white',
      hover: '#f43f5e',
      text: 'text-rose-600',
      accent: 'border-rose-200',
      shadow: 'shadow-rose-100/50'
    },
    national: {
      gradient: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
      bg: 'bg-gradient-to-r from-blue-100 to-indigo-100',
      button: 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white',
      hover: '#3b82f6',
      text: 'text-blue-600',
      accent: 'border-blue-200',
      shadow: 'shadow-blue-100/50'
    },
    dharma: {
      gradient: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
      bg: 'bg-gradient-to-r from-amber-100 to-orange-100',
      button: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
      hover: '#f59e0b',
      text: 'text-amber-600',
      accent: 'border-amber-200',
      shadow: 'shadow-amber-100/50'
    },
    society: {
      gradient: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50',
      bg: 'bg-gradient-to-r from-emerald-100 to-teal-100',
      button: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white',
      hover: '#10b981',
      text: 'text-emerald-600',
      accent: 'border-emerald-200',
      shadow: 'shadow-emerald-100/50'
    },
    'ground-reports': {
      gradient: 'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50',
      bg: 'bg-gradient-to-r from-violet-100 to-purple-100',
      button: 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white',
      hover: '#8b5cf6',
      text: 'text-violet-600',
      accent: 'border-violet-200',
      shadow: 'shadow-violet-100/50'
    },
    youth: {
      gradient: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50',
      bg: 'bg-gradient-to-r from-cyan-100 to-blue-100',
      button: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      hover: '#06b6d4',
      text: 'text-cyan-600',
      accent: 'border-cyan-200',
      shadow: 'shadow-cyan-100/50'
    },
    voices: {
      gradient: 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50',
      bg: 'bg-gradient-to-r from-slate-100 to-gray-100',
      button: 'bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-slate-600 to-gray-600 text-white',
      hover: '#475569',
      text: 'text-slate-600',
      accent: 'border-slate-200',
      shadow: 'shadow-slate-100/50'
    },
    'art-literature': {
      gradient: 'bg-gradient-to-br from-pink-50 via-rose-50 to-red-50',
      bg: 'bg-gradient-to-r from-pink-100 to-rose-100',
      button: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
      hover: '#ec4899',
      text: 'text-pink-600',
      accent: 'border-pink-200',
      shadow: 'shadow-pink-100/50'
    },
    local: {
      gradient: 'bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50',
      bg: 'bg-gradient-to-r from-lime-100 to-green-100',
      button: 'bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600',
      buttonHover: 'transform hover:scale-105 transition-all duration-300',
      badge: 'bg-gradient-to-r from-lime-500 to-green-500 text-white',
      hover: '#65a30d',
      text: 'text-lime-600',
      accent: 'border-lime-200',
      shadow: 'shadow-lime-100/50'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 font-mixed pb-20 lg:pb-0 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Notice Bar */}
      <NoticeBar notices={notices} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        
        {/* Top Banner Ads */}
        <AdSection ads={transformAdsForAdSection(ads)} />

        {/* Hero Section / Breaking News Slider */}
        <section className="mb-8 sm:mb-12">
          <BreakingNewsTicker notices={transformArticlesForBreakingNews(trendingArticles)} />
          <FeaturedCarousel articles={transformArticlesForCarousel(trendingArticles)} />
        </section>

        {/* Middle Ads */}
        <div className="mb-8 sm:mb-12">
          <AdSection ads={transformAdsForAdSection(ads)} />
        </div>

        {/* Editor's Picks Section */}
        <EditorsPicks articles={transformEditorPicksForComponent(editorPicks)} />

        {/* Categories Section */}
        <section className="mb-8 sm:mb-12">
          <div className="text-center mb-8 sm:mb-10 opacity-0 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4">
              विषयानुसार कवरेज
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              हर विषय की गहराई से की गई रिपोर्टिंग - तथ्यों के साथ, संवेदनशीलता के साथ
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Videos Section */}
          <div className="opacity-0 animate-fade-in-up [animation-delay:200ms]">
            <CategorySection
              title="Videos | वीडियो कहानियां"
              subtitle="Dekhiye, suniye aur mehsoos kijiye – har kahani ko jeevant banate hue."
              description="विज़ुअल स्टोरीटेलिंग के माध्यम से गहराई से समझें हर मुद्दे को – जैसे आप वहां मौजूद हों।"
              emoji="🎥"
              articles={dummyCategoryArticles.videos}
              categoryKey="videos"
              themeColor={categoryThemes.videos}
            />
          </div>

          {/* National News */}
          <div className="opacity-0 animate-fade-in-up [animation-delay:400ms]">
            <CategorySection
              title="National News | देश की खबरें"
              subtitle="Desh ke har kone se zaroori updates – politics se le kar policy tak."
              description="राजनीति, शासन और देश के बड़े फैसलों पर आधारित खबरें, बिना किसी सनसनी के – बस साफ, सटीक जानकारी।"
              emoji="📰"
              articles={dummyCategoryArticles.national}
              categoryKey="national"
              themeColor={categoryThemes.national}
            />
          </div>

          {/* Dharma & Spirituality */}
          <CategorySection
            title="Dharma & Spirituality | धर्म और अध्यात्म"
            subtitle="Sanskaaron aur aastha se judi baatein, samay ke saath samvedansheel tarike se."
            description="धर्मिक संवाद, त्योहारों की व्याख्या और अध्यात्मिक दृष्टिकोण – आज के समाज में उनके मायने क्या हैं?"
            emoji="🕉"
            articles={dummyCategoryArticles.dharma}
            categoryKey="dharma"
            themeColor={categoryThemes.dharma}
          />

          {/* Society & Culture */}
          <CategorySection
            title="Society & Culture | समाज और संस्कृति"
            subtitle="Apne samaj ko samajhne ki ek nayi koshish."
            description="विरासत, ग्रामीण ज़िंदगियाँ, भाषाएं और बदलते सामाजिक सरोकार – हमारे दौर की सच्ची झलक।"
            emoji="🌏"
            articles={dummyCategoryArticles.society}
            categoryKey="society"
            themeColor={categoryThemes.society}
          />

          {/* Ground Reports */}
          <CategorySection
            title="Ground Reports | ज़मीनी रिपोर्ट्स"
            subtitle="Field se sidhe – bina filter, bina makeup."
            description="फील्ड स्टोरीज़, खोजी रिपोर्ट्स और मिस्ट्री ऑडिट्स – जैसे देखा, वैसे बताया।"
            emoji="🧭"
            articles={dummyCategoryArticles['ground-reports']}
            categoryKey="ground-reports"
            themeColor={categoryThemes['ground-reports']}
          />

          {/* Youth & Careers */}
          <CategorySection
            title="Youth & Careers | युवा और करियर"
            subtitle="Yuvaon ke sapne, naukri aur nayi soch ke saath."
            description="शिक्षा, स्किल डेवलपमेंट और गिग इकॉनॉमी से जुड़े अवसर – हर महत्वाकांक्षी दिमाग के लिए।"
            emoji="🎓"
            articles={dummyCategoryArticles.youth}
            categoryKey="youth"
            themeColor={categoryThemes.youth}
          />

          {/* Voices & Experiences */}
          <CategorySection
            title="Voices & Experiences | विचार और अनुभव"
            subtitle="Asli logon ki asli kahaniyaan – unfiltered aur honest."
            description="व्यक्तिगत अनुभव, चिंताएं और सुझाव – समाज के हर तबके से आती आवाज़ें, बिना किसी फिल्टर के।"
            emoji="🗣️"
            articles={dummyCategoryArticles.voices}
            categoryKey="voices"
            themeColor={categoryThemes.voices}
          />

          {/* Art & Literature */}
          <CategorySection
            title="Art & Literature | कला और साहित्य"
            subtitle="Creativity aur cultural richness ko samjhane ki koshish."
            description="कलाकारों की कहानियां, साहित्यिक कृतियों की समीक्षा और सांस्कृतिक विरासत का संरक्षण।"
            emoji="🎨"
            articles={dummyCategoryArticles['art-literature']}
            categoryKey="art-literature"
            themeColor={categoryThemes['art-literature']}
          />

          {/* Local Engagement */}
          <CategorySection
            title="Local Engagement | लोकल जुड़ाव"
            subtitle="Aas-paas ki duniya se connected rehne ka tareeka."
            description="स्थानीय घटनाएं, समुदायिक पहल और ग्रामीण-शहरी विकास की कहानियां – जमीनी स्तर पर बदलाव की गाथा।"
            emoji="🏘️"
            articles={dummyCategoryArticles.local}
            categoryKey="local"
            themeColor={categoryThemes.local}
          />
        </section>

        {/* Additional Features Section */}
        <FeaturesSection />

        {/* Footer Ads */}
        <AdSection ads={transformAdsForAdSection(ads)} />
      </div>
    </div>
  );
};

export default HomePage;
