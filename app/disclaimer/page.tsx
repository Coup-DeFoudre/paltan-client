import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'अस्वीकृति - द पल्टन',
  description: 'द पल्टन की अस्वीकृति और सामग्री संबंधी नीति',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none prose-invert">
          
          {/* English Disclaimer */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">⚠ Disclaimer</h1>
            
            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">Content Disclaimer</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 mb-4">
                The views expressed on <span className="text-amber-400 font-semibold">द पल्टन (The Paltan)</span> are those of individual contributors and not necessarily 
                of the website owner or editorial team.
              </p>
              <p className="text-slate-300">
                We strive for accuracy in all our reporting and content, but cannot guarantee that all information is error-free, 
                complete, or up to date. Readers are advised to verify information from multiple sources.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">No Professional Advice</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300">
                The content on this website is for informational and educational purposes only and should not be considered 
                as legal, medical, financial, or professional advice. Always consult qualified professionals for specific guidance.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">External Links</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300">
                Our website may contain links to external websites. We are not responsible for the content, 
                accuracy, or privacy practices of these third-party sites.
              </p>
            </div>
          </section>

          <hr className="my-12 border-amber-400/30" />

          {/* Hindi Disclaimer */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">अस्वीकृति</h1>
            
            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">सामग्री संबंधी अस्वीकृति</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300 mb-4">
                <span className="text-amber-400 font-semibold">दी पल्टन</span> पर प्रकाशित विचार और मत लेखकों के व्यक्तिगत हैं और जरूरी नहीं कि 
                वे वेबसाइट संचालक या संपादकीय टीम के विचार हों।
              </p>
              <p className="text-slate-300">
                हम अपनी रिपोर्टिंग और सामग्री में सटीकता के लिए प्रयासरत हैं, लेकिन सभी सूचनाओं की पूर्णता, 
                सटीकता या अद्यतनता की गारंटी नहीं देते। पाठकों से अनुरोध है कि वे कई स्रोतों से जानकारी की पुष्टि करें।
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">व्यावसायिक सलाह नहीं</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300">
                यहां दी गई जानकारी केवल सामान्य जानकारी और शिक्षा के उद्देश्य से है। इसे किसी भी प्रकार की 
                कानूनी, चिकित्सा, वित्तीय या विशेषज्ञ सलाह न समझें। विशिष्ट मार्गदर्शन के लिए हमेशा योग्य पेशेवरों से सलाह लें।
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-6 border-b border-amber-400/30 pb-2">बाहरी लिंक</h2>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 mb-6">
              <p className="text-slate-300">
                हमारी वेबसाइट में बाहरी वेबसाइटों के लिंक हो सकते हैं। हम इन तृतीय-पक्ष साइटों की सामग्री, 
                सटीकता या गोपनीयता प्रथाओं के लिए जिम्मेदार नहीं हैं।
              </p>
            </div>
          </section>

          <hr className="my-12 border-amber-400/30" />

          {/* Copyright Info */}
          <section>
            <h1 className="text-3xl font-bold text-amber-400 mb-8 text-center">© कॉपीराइट सूचना</h1>
            
            <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 p-8 rounded-lg border border-amber-400/30 mb-8">
              <p className="text-amber-300 font-semibold text-lg mb-4 text-center">
                © दी पल्टन, 2025-2026। सर्वाधिकार सुरक्षित।
              </p>
              <p className="text-slate-300 mb-4 leading-relaxed">
                इस वेबसाइट की सभी सामग्री, जैसे लेख, चित्र, वीडियो, ग्राफिक्स आदि, दी पल्टन की बौद्धिक संपत्ति हैं 
                (जब तक अन्यथा उल्लेख न हो)। बिना पूर्व लिखित अनुमति के किसी भी सामग्री का पुनःप्रकाशन, 
                वितरण या कॉपी करना सख्त प्रतिबंधित है।
              </p>
              <p className="text-slate-300">
                <strong className="text-amber-400">अनुमति हेतु कृपया संपर्क करें:</strong> 
                <a href="mailto:thepaltann@gmail.com" className="text-amber-400 underline ml-2 hover:text-amber-300">
                  thepaltann@gmail.com
                </a>
              </p>
            </div>

            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-8 rounded-lg border border-slate-600/50">
              <h3 className="text-xl font-semibold text-amber-400 mb-4 flex items-center">
                <span className="mr-2">⚖️</span> कानूनी सूचना
              </h3>
              <p className="text-slate-300 leading-relaxed">
                यह एक स्वतंत्र डिजिटल मीडिया प्लेटफॉर्म है। हमारा उद्देश्य निष्पक्ष, संतुलित और 
                जिम्मेदार पत्रकारिता करना है। हम भारतीय संविधान और कानून का पूर्ण सम्मान करते हैं। 
                किसी भी कानूनी मुद्दे या शिकायत के लिए कृपया हमसे संपर्क करें।
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
