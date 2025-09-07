import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'उपयोग की शर्तें - द पल्टन',
  description: 'द पल्टन की उपयोग की शर्तें और नियम',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* English Terms */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-slate-100 mb-6">Terms of Use</h1>
            <p className="text-sm text-slate-400 mb-6">Effective Date: 15.08.2025</p>
            
            <p className="mb-6">
              Welcome to The Paltan (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing or using this website, 
              you agree to comply with and be bound by these Terms of Use. If you do not agree, 
              please do not use the website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Use of Content</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>All content on this site is for informational purposes only.</li>
              <li>Users may share articles via social media with proper attribution.</li>
              <li>Republishing full articles without permission is prohibited.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. User Conduct</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>You agree not to post or transmit content that is unlawful, defamatory, abusive, or obscene.</li>
              <li>We reserve the right to moderate or delete any user comments or submissions.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. External Links</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>We may include links to third-party sites for reference.</li>
              <li>We are not responsible for the content or reliability of these external sites.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Modifications</h2>
            <p className="mb-6">
              We reserve the right to update or change these Terms at any time. Continued use of 
              the site after changes means acceptance.
            </p>
          </section>

          <hr className="my-12 border-gray-300" />

          {/* Hindi Terms */}
          <section>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">📜 उपयोग की शर्तें (Terms of Use)</h1>
            <p className="text-sm text-gray-600 mb-6">प्रभावी तिथि: 15.08.2025</p>
            
            <p className="mb-6">
              दी पल्टन (&ldquo;हम&rdquo;, &ldquo;हमारा&rdquo;, &ldquo;इस साइट&rdquo;) का उपयोग करके, आप इन उपयोग की शर्तों से सहमत होते हैं। 
              यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया वेबसाइट का उपयोग न करें।
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. सामग्री का उपयोग</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>वेबसाइट पर दी गई सभी सामग्री केवल सामान्य जानकारी के लिए है।</li>
              <li>आप हमारे लेखों को उचित श्रेय (credit) के साथ साझा कर सकते हैं।</li>
              <li>बिना अनुमति के पूर्ण लेख को पुनः प्रकाशित करना प्रतिबंधित है।</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. उपयोगकर्ता आचरण</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>आप ऐसी कोई भी सामग्री पोस्ट या प्रसारित नहीं करेंगे जो अवैध, मानहानिकारक, अभद्र या आपत्तिजनक हो।</li>
              <li>हम किसी भी टिप्पणी या उपयोगकर्ता सामग्री को संपादित या हटाने का अधिकार सुरक्षित रखते हैं।</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. बाहरी लिंक</h2>
            <p className="mb-6">
              हमारी वेबसाइट पर कुछ बाहरी वेबसाइटों के लिंक हो सकते हैं, जिनकी सामग्री के लिए हम जिम्मेदार नहीं हैं।
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. बदलाव</h2>
            <p className="mb-6">
              हम कभी भी इन शर्तों को संशोधित कर सकते हैं। यदि आप इन परिवर्तनों के बाद वेबसाइट का उपयोग करते हैं, 
              तो इसे आपकी सहमति माना जाएगा।
            </p>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">📧 संपर्क करें</h3>
              <p className="text-blue-800">
                अनुमति हेतु कृपया संपर्क करें: <a href="mailto:thepaltann@gmail.com" className="underline">thepaltann@gmail.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
