import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति - द पल्टन',
  description: 'द पल्टन की गोपनीयता नीति और डेटा सुरक्षा',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* English Privacy Policy */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-slate-100 mb-6">Privacy Policy</h1>
            <p className="text-sm text-slate-400 mb-6">Effective Date: 15.08.2025</p>
            
            <p className="mb-6">
              We are committed to protecting your privacy. This policy outlines how we collect, 
              use, and safeguard your information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Basic analytics (via tools like Google Analytics): device info, browser type, IP address</li>
              <li>Email addresses (only if you sign up for newsletters or submit forms)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Use of Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To improve website content and user experience</li>
              <li>To send occasional newsletters if subscribed</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Data Sharing</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>We do not sell, trade, or rent your personal information.</li>
              <li>We may share information with service providers (e.g., for analytics) under strict confidentiality.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Cookies</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>We use cookies for a better browsing experience.</li>
              <li>You can disable cookies via your browser settings.</li>
            </ul>
          </section>

          <hr className="my-12 border-gray-300" />

          {/* Hindi Privacy Policy */}
          <section>
            <h1 className="text-3xl font-bold text-amber-400 mb-6">🔒 गोपनीयता नीति (Privacy Policy)</h1>
            <p className="text-sm text-slate-400 mb-6">प्रभावी तिथि: 15.08.2025</p>
            
            <p className="mb-6">
              दी पल्टन पर, आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। इस नीति में बताया गया है कि हम किस प्रकार की 
              जानकारी एकत्र करते हैं और उसका उपयोग कैसे करते हैं।
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. हम कौन सी जानकारी एकत्र करते हैं</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>सामान्य ब्राउज़िंग जानकारी (जैसे ब्राउज़र प्रकार, डिवाइस, आईपी पता) – विश्लेषण (analytics) के लिए।</li>
              <li>ईमेल पता – केवल तब जब आप न्यूज़लेटर के लिए साइन अप करते हैं या संपर्क फॉर्म भरते हैं।</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. जानकारी का उपयोग कैसे किया जाता है</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>वेबसाइट की गुणवत्ता और उपयोगकर्ता अनुभव को बेहतर बनाने के लिए।</li>
              <li>समय-समय पर आपको न्यूज़लेटर भेजने के लिए (यदि आपने अनुमति दी है)।</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. जानकारी की साझेदारी</h2>
            <p className="mb-6">
              हम आपकी व्यक्तिगत जानकारी को बेचते, किराए पर नहीं देते और न ही व्यापार करते हैं। विश्लेषण सेवाओं के लिए 
              सीमित जानकारी विश्वसनीय सेवाप्रदाता के साथ साझा की जा सकती है।
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. कुकीज़ (Cookies)</h2>
            <p className="mb-6">
              हम बेहतर अनुभव के लिए कुकीज़ का उपयोग करते हैं। आप अपने ब्राउज़र की सेटिंग में जाकर कुकीज़ को निष्क्रिय कर सकते हैं।
            </p>

            <div className="mt-12 p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">🛡️ आपकी सुरक्षा</h3>
              <p className="text-green-800">
                हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं और उद्योग-मानक सुरक्षा उपायों का उपयोग करते हैं।
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
