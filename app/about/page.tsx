import { Metadata } from 'next';
import HeroBackground from '@/components/HeroBackground';
import PremiumCard from '@/components/PremiumCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutHero from '@/components/AboutHero';
import ErrorBoundary from '@/components/ErrorBoundary';
import { client } from '@/lib/sanity';
import { featuredTestimonialsQuery } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'हमारे बारे में - द पल्टन',
  description: 'द पल्टन के बारे में जानें - एक स्वतंत्र मीडिया प्लेटफॉर्म जो सच्ची पत्रकारिता करता है',
};

export default async function AboutPage() {
  // Fetch featured testimonials
  const testimonials = await client.fetch(featuredTestimonialsQuery, {}, { cache: 'no-store' });

  return (
    <div className="min-h-screen relative">
      <HeroBackground />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

        {/* Hero Section */}
        <AboutHero />

        {/* Main About Content */}
        <ErrorBoundary>
          <section className="prose prose-lg max-w-none mb-16">
            <PremiumCard glowColor="amber" className="mb-12">
              <h2 className="text-3xl font-bold text-amber-400 mb-6">About Us | हमारे बारे में</h2>
            
              <p className="text-slate-200 mb-6 text-lg leading-relaxed">
                Welcome to <strong className="text-amber-400">The Paltan</strong> – Jahan Khabar sirf headlines nahi hoti, ek samajh bhi hoti hai.
              </p>
            
              <p className="text-slate-300 mb-6 leading-relaxed">
                यह मंच एक प्रयास है – सच्ची, संतुलित और संवेदनशील पत्रकारिता के लिए। यहाँ हर खबर का मक़सद सिर्फ जानकारी देना नहीं, 
                बल्कि उस पर सोचने की जगह बनाना भी है।
              </p>
            
              <p className="text-slate-300 mb-6 leading-relaxed">
                हम मानते हैं कि धर्म, राजनीति, समाज, युवा मुद्दे, ग्रामीण ज़िंदगियाँ, और हमारी सांस्कृतिक विरासत — ये सब एक-दूसरे से जुड़े हैं। 
                और इन्हें समझने के लिए ज़रूरी है कि हम सिर्फ शोर नहीं, संवाद करें।
              </p>
            </PremiumCard>

            {/* What We Do */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-100 mb-8">हम क्या करते हैं:</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <PremiumCard glowColor="green" delay={0.1}>
                  <h3 className="text-xl font-semibold text-emerald-400 mb-3">📰 राष्ट्रीय और स्थानीय मुद्दे</h3>
                  <p className="text-slate-300">जमीनी रिपोर्टिंग और गहरे विश्लेषण के साथ</p>
                </PremiumCard>
                <PremiumCard glowColor="amber" delay={0.2}>
                  <h3 className="text-xl font-semibold text-orange-400 mb-3">🕉️ धर्म और अध्यात्म</h3>
                  <p className="text-slate-300">विचारशील लेख और संवाद</p>
                </PremiumCard>
                <PremiumCard glowColor="purple" delay={0.3}>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">🎓 युवा और करियर</h3>
                  <p className="text-slate-300">स्किलिंग से जुड़ी सूचनाएं और अवसर</p>
                </PremiumCard>
                <PremiumCard glowColor="teal" delay={0.4}>
                  <h3 className="text-xl font-semibold text-pink-400 mb-3">🎨 साहित्य और संस्कृति</h3>
                  <p className="text-slate-300">लोक संस्कृति को स्पेस देना</p>
                </PremiumCard>
              </div>
              <div className="mt-6 text-center">
                <p className="text-slate-100 text-lg font-medium">
                  और हाँ, आपकी आवाज़ को भी – क्योंकि हम मानते हैं कि हर पाठक एक संभावित लेखक है।
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl mb-12 border border-slate-700/30">
              <h2 className="text-3xl font-bold text-slate-100 mb-6">हमारा मिशन</h2>
              <p className="text-slate-300 mb-4 text-lg leading-relaxed">
                यह वेबसाइट फिलहाल एक स्वतंत्र और व्यक्तिगत पहल है – किसी कॉर्पोरेट या राजनीतिक एजेंडा से नहीं जुड़ी। 
                हमारी नज़र साफ है:
              </p>
              <blockquote className="text-2xl font-bold text-amber-400 text-center py-4 italic">
                &ldquo;Khabar ko sirf fast nahi, farsighted bhi banaya jaye.&rdquo;
              </blockquote>
            </div>

            {/* Reviews/Testimonials */}
            <TestimonialsSection testimonials={testimonials} />

        {/* Join Us Section */}
        <div className="relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 rounded-2xl mb-12">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-purple-500/10"></div>
          
          <div className="relative p-8">
            <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">आइए जुड़िए</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Newsletter */}
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-red-500/30 transition-colors">
                    <span className="text-2xl">📩</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">न्यूज़लेटर</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">हर हफ्ते के टॉप आर्टिकल्स हमारे न्यूज़लेटर में</p>
              </div>

              {/* Share Thoughts */}
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">अपने विचार साझा करें</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">हम उन्हें जगह देंगे</p>
              </div>

              {/* WhatsApp Updates */}
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-green-500/30 transition-colors">
                    <span className="text-2xl">📲</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">WhatsApp अपडेट्स</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">सीधे लिंक और अपडेट्स पाएं</p>
              </div>

              {/* Writing Opportunity */}
              <div className="group">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:bg-orange-500/30 transition-colors">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">लेखन का मौका</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">अगर आप सिर्फ पढ़ना नहीं, लिखना भी चाहते हैं, तो हमसे संपर्क करें।</p>
              </div>
            </div>
          </div>
        </div>

            {/* Editor's Note */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl mb-12 border border-slate-700/30">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">From the Editor&apos;s Desk</h2>
              <div className="text-slate-300 space-y-4">
                <p>When we began this journey, our aim was simple — to listen.</p>
                <p>To listen to the man from the village with no internet but deep wisdom. To the woman who&apos;s never been on camera but has a story worth telling. To the youth who wants to ask uncomfortable questions, and to the traditions that still shape our modern identities.</p>
                <p>This is a platform that celebrates faith without fanaticism, critique without chaos, and society without silence.</p>
                <p>Whether it&apos;s a ground report from the highways or a cultural reflection from the heart of India — we bring stories that speak.</p>
                <p className="font-semibold text-amber-400">Truth. Culture. People. That&apos;s our foundation. And our promise.</p>
                <div className="mt-6 pt-4 border-t border-slate-600/30">
                  <p className="font-semibold text-slate-100">— Chetan Joshi</p>
                  <p className="text-sm text-slate-400">Editor & Founder, The Paltan</p>
                  <p className="text-sm text-amber-400">Email: <a href="mailto:thepaltann@gmail.com" className="underline">thepaltann@gmail.com</a></p>
                </div>
              </div>
            </div>

            {/* Platform Description */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/30">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">About The Paltan</h2>
              <div className="text-slate-300 space-y-4">
                <p>The Paltan is an independent media platform that blends journalistic integrity with cultural consciousness.</p>
                <p>We cover the real India — from spiritual dialogues to rural voices, policy shifts to youth aspirations.</p>
                <p>Our work focuses on underreported themes in religion, governance, social issues, and community change — through ground reports, explainers, and reader-driven storytelling.</p>
                <p>Whether it&apos;s a festival in Ujjain, a civic issue in Indore, or a skill training in Rajasthan&apos;s hinterlands, we believe every story deserves a platform.</p>
                <div className="mt-6 pt-4 border-t border-slate-600/30">
                  <p className="font-semibold text-center text-lg text-amber-400">
                    (Honest, Inclusive, Local-first)
                  </p>
                  <p className="text-center text-sm mt-2 text-slate-400">
                    Format: Multilingual (Hindi + English)
                  </p>
                </div>
              </div>
            </div>
          </section>
        </ErrorBoundary>
      </div>
    </div>
  );
}