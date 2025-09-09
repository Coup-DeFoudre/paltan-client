import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'उपयोग की शर्तें - द पल्टन',
  description: 'द पल्टन की उपयोग की शर्तें और नियम',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* English Terms */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">📜 Terms of Use</h1>
            <p className="text-sm text-slate-400 mb-8 text-center">Effective Date: 15.08.2025</p>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-8">
              <p className="text-slate-300 leading-relaxed">
                Welcome to <span className="text-amber-400 font-semibold">द पल्टन (The Paltan)</span> ("we", "our", or "us"). 
                By accessing or using this website, you agree to comply with and be bound by these Terms of Use. 
                If you do not agree with any part of these terms, please do not use the website.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">1. Use of Content</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>All content on this site is for informational and educational purposes only.</li>
                <li>Users may share articles via social media platforms with proper attribution to द पल्टन.</li>
                <li>Republishing full articles or substantial portions without written permission is strictly prohibited.</li>
                <li>Content may not be used for commercial purposes without explicit consent.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">2. User Conduct</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>You agree not to post or transmit content that is unlawful, defamatory, abusive, offensive, or obscene.</li>
                <li>We reserve the right to moderate, edit, or delete any user comments, submissions, or interactions.</li>
                <li>Users must respect intellectual property rights and refrain from plagiarism.</li>
                <li>Spam, promotional content, or irrelevant links are not permitted.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">3. External Links & Third Parties</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>We may include links to third-party websites for reference and additional information.</li>
                <li>We are not responsible for the content, accuracy, or reliability of these external sites.</li>
                <li>Clicking external links is at your own discretion and risk.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">4. Modifications & Updates</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 leading-relaxed">
                We reserve the right to update, modify, or change these Terms at any time without prior notice. 
                Continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <hr className="my-12 border-amber-400/30" />

          {/* Hindi Terms */}
          <section>
            <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">उपयोग की शर्तें</h1>
            <p className="text-sm text-slate-400 mb-8 text-center">प्रभावी तिथि: 15.08.2025</p>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-8">
              <p className="text-slate-300 leading-relaxed">
                <span className="text-amber-400 font-semibold">दी पल्टन</span> ("हम", "हमारा", "इस साइट") का उपयोग करके, 
                आप इन उपयोग की शर्तों से सहमत होते हैं। यदि आप इन शर्तों के किसी भी हिस्से से सहमत नहीं हैं, 
                तो कृपया वेबसाइट का उपयोग न करें।
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">1. सामग्री का उपयोग</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>वेबसाइट पर दी गई सभी सामग्री केवल सामान्य जानकारी और शैक्षणिक उद्देश्य के लिए है।</li>
                <li>आप दी पल्टन को उचित श्रेय देकर लेखों को सोशल मीडिया पर साझा कर सकते हैं।</li>
                <li>बिना लिखित अनुमति के पूर्ण लेख या उसके महत्वपूर्ण हिस्सों का पुनः प्रकाशन सख्त प्रतिबंधित है।</li>
                <li>स्पष्ट सहमति के बिना सामग्री का व्यावसायिक उपयोग नहीं किया जा सकता।</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">2. उपयोगकर्ता आचरण</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>आप ऐसी कोई भी सामग्री पोस्ट या प्रसारित नहीं करेंगे जो अवैध, मानहानिकारक, अपमानजनक या आपत्तिजनक हो।</li>
                <li>हम किसी भी टिप्पणी, प्रस्तुति या बातचीत को संपादित, मॉडरेट या हटाने का अधिकार सुरक्षित रखते हैं।</li>
                <li>उपयोगकर्ताओं को बौद्धिक संपदा अधिकारों का सम्मान करना चाहिए और साहित्यिक चोरी से बचना चाहिए।</li>
                <li>स्पैम, प्रचारात्मक सामग्री या अप्रासंगिक लिंक की अनुमति नहीं है।</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">3. बाहरी लिंक और तृतीय पक्ष</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>हम संदर्भ और अतिरिक्त जानकारी के लिए तृतीय-पक्ष वेबसाइटों के लिंक शामिल कर सकते हैं।</li>
                <li>हम इन बाहरी साइटों की सामग्री, सटीकता या विश्वसनीयता के लिए जिम्मेदार नहीं हैं।</li>
                <li>बाहरी लिंक पर क्लिक करना आपके अपने विवेक और जोखिम पर है।</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">4. संशोधन और अपडेट</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 leading-relaxed">
                हम बिना पूर्व सूचना के किसी भी समय इन शर्तों को अपडेट, संशोधित या बदलने का अधिकार सुरक्षित रखते हैं। 
                परिवर्तनों के बाद वेबसाइट का निरंतर उपयोग नई शर्तों की स्वीकृति माना जाएगा।
              </p>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-r from-amber-900/20 to-amber-800/20 rounded-lg border border-amber-400/30">
              <h3 className="text-xl font-semibold text-amber-400 mb-4 flex items-center">
                <span className="mr-2">📧</span> संपर्क करें
              </h3>
              <p className="text-slate-300">
                किसी भी प्रश्न, सुझाव या अनुमति के लिए कृपया संपर्क करें: 
                <a href="mailto:thepaltann@gmail.com" className="text-amber-400 underline ml-2 hover:text-amber-300">
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
