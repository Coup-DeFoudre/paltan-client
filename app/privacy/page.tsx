import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति - द पल्टन',
  description: 'द पल्टन की गोपनीयता नीति और डेटा सुरक्षा',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* English Privacy Policy */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">🔒 Privacy Policy</h1>
            <p className="text-sm text-slate-400 mb-8 text-center">Effective Date: 15.08.2025</p>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-8">
              <p className="text-slate-300 leading-relaxed">
                At <span className="text-amber-400 font-semibold">द पल्टन (The Paltan)</span>, we are committed to protecting your privacy and personal information. 
                This policy outlines how we collect, use, and safeguard your information when you visit our website.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">1. Information We Collect</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li><strong>Analytics Data:</strong> Device information, browser type, IP address, pages visited, and time spent on the site (via tools like Google Analytics)</li>
                <li><strong>Contact Information:</strong> Email addresses only when you voluntarily subscribe to newsletters or submit contact forms</li>
                <li><strong>User Interactions:</strong> Comments, feedback, and other voluntary submissions</li>
                <li><strong>Cookies:</strong> Small data files to enhance your browsing experience and remember preferences</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">2. How We Use Information</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>To improve website content, functionality, and user experience</li>
                <li>To send newsletters and updates (only if you have subscribed)</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To analyze website traffic and optimize performance</li>
                <li>To ensure website security and prevent fraudulent activities</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">3. Data Sharing & Third Parties</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li><strong>We do not sell, trade, or rent</strong> your personal information to third parties</li>
                <li>We may share anonymized data with analytics providers (Google Analytics) under strict confidentiality agreements</li>
                <li>Information may be disclosed if required by law or to protect our legal rights</li>
                <li>We do not use third-party advertising networks that track users across websites</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">4. Cookies & Tracking</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 mb-4">We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>Remember your preferences and settings</li>
                <li>Provide a personalized browsing experience</li>
                <li>Analyze website performance and usage patterns</li>
              </ul>
              <p className="text-slate-300 mt-4">
                You can disable cookies through your browser settings, though this may affect website functionality.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">5. Data Security</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 leading-relaxed">
                We implement industry-standard security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>
          </section>

          <hr className="my-12 border-amber-400/30" />

          {/* Hindi Privacy Policy */}
          <section>
            <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">गोपनीयता नीति</h1>
            <p className="text-sm text-slate-400 mb-8 text-center">प्रभावी तिथि: 15.08.2025</p>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-8">
              <p className="text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-semibold">दी पल्टन</span> पर, आपकी गोपनीयता और व्यक्तिगत जानकारी की सुरक्षा हमारे लिए सर्वोच्च प्राथमिकता है। 
                इस नीति में बताया गया है कि हम किस प्रकार की जानकारी एकत्र करते हैं, उसका उपयोग कैसे करते हैं, और उसकी सुरक्षा कैसे करते हैं।
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">1. हम कौन सी जानकारी एकत्र करते हैं</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li><strong>विश्लेषण डेटा:</strong> डिवाइस जानकारी, ब्राउज़र प्रकार, आईपी पता, देखे गए पृष्ठ, और साइट पर बिताया गया समय (Google Analytics जैसे उपकरणों के माध्यम से)</li>
                <li><strong>संपर्क जानकारी:</strong> ईमेल पते केवल तब जब आप स्वेच्छा से न्यूज़लेटर की सदस्यता लेते हैं या संपर्क फॉर्म भरते हैं</li>
                <li><strong>उपयोगकर्ता इंटरैक्शन:</strong> टिप्पणियां, फीडबैक, और अन्य स्वैच्छिक प्रस्तुतियां</li>
                <li><strong>कुकीज़:</strong> आपके ब्राउज़िंग अनुभव को बेहतर बनाने और प्राथमिकताओं को याद रखने के लिए छोटी डेटा फाइलें</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">2. जानकारी का उपयोग कैसे किया जाता है</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>वेबसाइट की सामग्री, कार्यक्षमता और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए</li>
                <li>न्यूज़लेटर और अपडेट भेजने के लिए (केवल यदि आपने सदस्यता ली है)</li>
                <li>आपकी पूछताछ का जवाब देने और ग्राहक सहायता प्रदान करने के लिए</li>
                <li>वेबसाइट ट्रैफिक का विश्लेषण करने और प्रदर्शन को अनुकूलित करने के लिए</li>
                <li>वेबसाइट सुरक्षा सुनिश्चित करने और धोखाधड़ी की गतिविधियों को रोकने के लिए</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">3. डेटा साझाकरण और तृतीय पक्ष</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li><strong>हम आपकी व्यक्तिगत जानकारी को नहीं बेचते, व्यापार नहीं करते या किराए पर नहीं देते</strong></li>
                <li>हम सख्त गोपनीयता समझौतों के तहत विश्लेषण प्रदाताओं के साथ अनामिकृत डेटा साझा कर सकते हैं</li>
                <li>कानून द्वारा आवश्यक होने या हमारे कानूनी अधिकारों की सुरक्षा के लिए जानकारी का खुलासा किया जा सकता है</li>
                <li>हम ऐसे तृतीय-पक्ष विज्ञापन नेटवर्क का उपयोग नहीं करते जो वेबसाइटों में उपयोगकर्ताओं को ट्रैक करते हैं</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">4. कुकीज़ और ट्रैकिंग</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 mb-4">हम निम्नलिखित उद्देश्यों के लिए कुकीज़ का उपयोग करते हैं:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>आपकी प्राथमिकताओं और सेटिंग्स को याद रखने के लिए</li>
                <li>व्यक्तिगत ब्राउज़िंग अनुभव प्रदान करने के लिए</li>
                <li>वेबसाइट प्रदर्शन और उपयोग पैटर्न का विश्लेषण करने के लिए</li>
              </ul>
              <p className="text-slate-300 mt-4">
                आप अपनी ब्राउज़र सेटिंग्स के माध्यम से कुकीज़ को निष्क्रिय कर सकते हैं, हालांकि इससे वेबसाइट की कार्यक्षमता प्रभावित हो सकती है।
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">5. डेटा सुरक्षा</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 leading-relaxed">
                हम आपकी व्यक्तिगत जानकारी को अनधिकृत पहुंच, परिवर्तन, प्रकटीकरण या विनाश से बचाने के लिए 
                उद्योग-मानक सुरक्षा उपायों को लागू करते हैं। हालांकि, इंटरनेट पर कोई भी स्थानांतरण विधि 100% सुरक्षित नहीं है।
              </p>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg border border-green-400/30">
              <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                <span className="mr-2">🛡️</span> आपकी सुरक्षा हमारी प्राथमिकता
              </h3>
              <p className="text-slate-300 mb-4">
                हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए पूर्ण रूप से प्रतिबद्ध हैं और नवीनतम सुरक्षा तकनीकों का उपयोग करते हैं।
              </p>
              <p className="text-slate-300">
                किसी भी गोपनीयता संबंधी प्रश्न के लिए संपर्क करें: 
                <a href="mailto:thepaltann@gmail.com" className="text-green-400 underline ml-2 hover:text-green-300">
                  thepaltann@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
