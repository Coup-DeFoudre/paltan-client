'use client';

import React, { useState } from 'react';
import { Calendar, MessageSquare, Mail, Bell, MessageCircle, Check, X } from 'lucide-react';
import PremiumCard from './PremiumCard';
import GradientText from './GradientText';

export default function FeaturesSection() {
  const [subscriptions, setSubscriptions] = useState({
    newsletter: false,
    pushNotifications: false,
    whatsapp: false
  });

  const [email, setEmail] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage('कृपया ईमेल पता दर्ज करें');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptions(prev => ({ ...prev, newsletter: true }));
      setMessage('न्यूज़लेटर सब्सक्रिप्शन सफल!');
      setEmail('');
    } catch {
      setMessage('कुछ गलत हुआ, कृपया दोबारा कोशिश करें');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handlePushNotification = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setSubscriptions(prev => ({ ...prev, pushNotifications: true }));
          setMessage('पुश नोटिफिकेशन चालू हो गए!');
          
          // Show a test notification
          new Notification('पल्टन न्यूज़', {
            body: 'आपको अब महत्वपूर्ण समाचारों की सूचना मिलेगी',
            icon: '/favicon.ico'
          });
        } else {
          setMessage('नोटिफिकेशन अनुमति नहीं दी गई');
        }
      } catch {
        setMessage('नोटिफिकेशन सपोर्ट उपलब्ध नहीं');
      }
    } else {
      setMessage('आपका ब्राउज़र नोटिफिकेशन सपोर्ट नहीं करता');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleWhatsAppSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber.trim()) {
      setMessage('कृपया WhatsApp नंबर दर्ज करें');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptions(prev => ({ ...prev, whatsapp: true }));
      setMessage('WhatsApp अपडेट सब्सक्रिप्शन सफल!');
      setWhatsappNumber('');
    } catch {
      setMessage('कुछ गलत हुआ, कृपया दोबारा कोशिश करें');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };
  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-slate-400" />,
      title: "Event Calendar",
      titleHindi: "इवेंट कैलेंडर",
      description: "त्योहार, रैलियाँ या यात्राएं – सब कुछ एक जगह, पहले से प्लान कीजिये।",
      gradient: 'teal' as const,
      action: () => window.open('/calendar', '_blank'),
      buttonText: "कैलेंडर देखें"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-slate-400" />,
      title: "Reader Submissions", 
      titleHindi: "पाठक योगदान",
      description: "आपकी बात भी हो सकती है हेडलाइन – भेजिये अपना कंटेंट, हम देखेंगे।",
      gradient: 'green' as const,
      action: () => { window.location.href = '/submissions'; },
      buttonText: "सबमिशन फॉर्म खोलें"
    },
    {
      icon: <Mail className="w-8 h-8 text-slate-400" />,
      title: "Newsletter",
      titleHindi: "न्यूज़लेटर",
      description: "हर हफ्ते का डाइजेस्ट, छोटा और उपयोगी। जो इंपॉर्टेंट है, वही इनबॉक्स में।",
      gradient: 'purple' as const,
      isSubscription: true,
      subscribed: subscriptions.newsletter
    },
    {
      icon: <Bell className="w-8 h-8 text-slate-400" />,
      title: "Push Notifications",
      titleHindi: "पुश नोटिफिकेशन",
      description: "ब्रेकिंग या ज़रूरी खबर? ब्राउज़र या फोन पे सीधे मिलेगी।",
      gradient: 'amber' as const,
      isSubscription: true,
      subscribed: subscriptions.pushNotifications,
      action: handlePushNotification
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-slate-400" />,
      title: "WhatsApp Updates",
      titleHindi: "WhatsApp अपडेट्स", 
      description: "जो खास है, वही WhatsApp पे। स्टोरीज़, वीडियो, और अलर्ट, सब कुछ तुरंत।",
      gradient: 'green' as const,
      isSubscription: true,
      subscribed: subscriptions.whatsapp
    }
  ];

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
            Additional Features
          </h2>
        </div>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          हमारे विशेष फीचर्स जो आपको बेहतर अनुभव देते हैं
        </p>
      </div>

      {/* Status Message */}
      {message && (
        <div className="mb-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            message.includes('सफल') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {message.includes('सफल') ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
            {message}
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <PremiumCard key={feature.title} glowColor={feature.gradient} delay={index * 0.1}>
            <div className="text-center h-full flex flex-col">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.titleHindi}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-grow">
                {feature.description}
              </p>
              
              {/* Newsletter Subscription Form */}
              {feature.title === 'Newsletter' && !feature.subscribed && (
                <form onSubmit={handleNewsletterSubmit} className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="आपका ईमेल"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'सब्सक्राइब हो रहा है...' : 'न्यूज़लेटर सब्सक्राइब करें'}
                  </button>
                </form>
              )}

              {/* WhatsApp Subscription Form */}
              {feature.title === 'WhatsApp Updates' && !feature.subscribed && (
                <form onSubmit={handleWhatsAppSubscription} className="mt-4">
                  <input
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="+91 आपका नंबर"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'जोड़ा जा रहा है...' : 'WhatsApp जोड़ें'}
                  </button>
                </form>
              )}

              {/* Push Notification Button */}
              {feature.title === 'Push Notifications' && !feature.subscribed && (
                <button
                  onClick={feature.action}
                  className="w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg text-sm font-bold transition-colors mt-4"
                >
                  नोटिफिकेशन चालू करें
                </button>
              )}

              {/* Action Buttons for Other Features */}
              {feature.buttonText && (
                <button
                  onClick={feature.action}
                  className={`w-full px-4 py-2 bg-${feature.gradient}-500 hover:bg-${feature.gradient}-600 text-white rounded-lg text-sm font-medium transition-colors mt-4`}
                >
                  {feature.buttonText}
                </button>
              )}

              {/* Subscribed Status */}
              {feature.subscribed && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-400 text-sm">
                  <Check className="w-4 h-4" />
                  <span>सब्सक्राइब हो गए!</span>
                </div>
              )}
            </div>
          </PremiumCard>
        ))}
      </div>

      {/* Coming Soon Banner */}
      <div className="mt-12 text-center">
        <PremiumCard glowColor="amber" className="max-w-2xl mx-auto">
          <div className="text-center">
            <GradientText gradient="amber" className="text-xl font-bold mb-2">
              📲 Coming Soon: Mobile App
            </GradientText>
            <p className="text-slate-300 text-sm">
              हमारा मोबाइल ऐप जल्द ही आ रहा है - बेहतर अनुभव के लिए
            </p>
          </div>
        </PremiumCard>
      </div>

    </section>
  );
}
