import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'अस्वीकृति - द पल्टन',
  description: 'द पल्टन की अस्वीकृति और सामग्री संबंधी नीति',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* English Disclaimer */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-slate-100 mb-6">Disclaimer</h1>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Content Disclaimer</h2>
            <p className="mb-6">
              The views expressed on The Paltan are those of individual contributors and not necessarily 
              of the website owner.
            </p>
            <p className="mb-6">
              We strive for accuracy, but cannot guarantee that all information is error-free or up to date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">No Professional Advice</h2>
            <p className="mb-6">
              The content is for informational purposes only and should not be considered legal, medical, 
              or professional advice.
            </p>
          </section>

          <hr className="my-12 border-gray-300" />

          {/* Hindi Disclaimer */}
          <section className="mb-12">
            <h1 className="text-3xl font-bold text-amber-400 mb-6">⚠ अस्वीकृति (Disclaimer)</h1>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">सामग्री संबंधी अस्वीकृति</h2>
            <p className="mb-6">
              दी पल्टन पर प्रकाशित विचार लेखकों के व्यक्तिगत हैं और जरूरी नहीं कि वे वेबसाइट संचालक के विचार हों। 
              हम सटीक जानकारी देने का प्रयास करते हैं, लेकिन सभी सूचनाओं की पूर्णता या अद्यतनता की गारंटी नहीं देते।
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">पेशेवर सलाह नहीं</h2>
            <p className="mb-6">
              यहां दी गई जानकारी केवल सामान्य जानकारी हेतु है और इसे किसी भी प्रकार की कानूनी, चिकित्सा या विशेषज्ञ सलाह न समझें।
            </p>
          </section>

          <hr className="my-12 border-gray-300" />

          {/* Copyright Info */}
          <section>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">© कॉपीराइट सूचना (Copyright Info)</h1>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-blue-900 font-semibold mb-4">
                © दी पल्टन, 2025-2026। सर्वाधिकार सुरक्षित।
              </p>
              <p className="text-blue-800 mb-4">
                इस वेबसाइट की सभी सामग्री, जैसे लेख, चित्र आदि, दी पल्टन की संपत्ति हैं (जब तक अन्यथा उल्लेख न हो)। 
                बिना पूर्व अनुमति के किसी भी सामग्री की पुनःप्रकाशन, वितरण या कॉपीिंग प्रतिबंधित है।
              </p>
              <p className="text-blue-800">
                <strong>अनुमति हेतु कृपया संपर्क करें:</strong> 
                <a href="mailto:thepaltann@gmail.com" className="underline ml-2">thepaltann@gmail.com</a>
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚖️ कानूनी सूचना</h3>
              <p className="text-yellow-800 text-sm">
                यह एक स्वतंत्र मीडिया प्लेटफॉर्म है। हमारा उद्देश्य निष्पक्ष और संतुलित पत्रकारिता करना है। 
                किसी भी कानूनी मुद्दे के लिए कृपया हमसे संपर्क करें।
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
