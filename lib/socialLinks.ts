import { Facebook, Instagram, Youtube, Twitter, MessageCircle } from 'lucide-react';

export interface SocialLink {
  id: string;
  icon: React.ElementType;
  label: string;
  url: string;
  color: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'facebook',
    icon: Facebook,
    label: 'Facebook',
    url: 'https://www.facebook.com/thepaltann',
    color: 'hover:bg-blue-600/20 hover:text-blue-400'
  },
  {
    id: 'instagram',
    icon: Instagram,
    label: 'Instagram',
    url: 'https://www.instagram.com/thepaltan.in?igsh=YzV4bG0wb3ZlbWhp',
    color: 'hover:bg-pink-500/20 hover:text-pink-400'
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    url: 'https://whatsapp.com/channel/0029VaNGB2LInlqGmbK3rO1X',
    color: 'hover:bg-green-500/20 hover:text-green-400'
  },
  {
    id: 'youtube',
    icon: Youtube,
    label: 'YouTube',
    url: 'https://youtube.com/@thepaltann',
    color: 'hover:bg-red-500/20 hover:text-red-400'
  },
  {
    id: 'twitter',
    icon: Twitter,
    label: 'Twitter',
    url: 'https://x.com/thepaltan_?t=AV8B33j9h5vLAAvAYn-1PQ&s=08',
    color: 'hover:bg-blue-500/20 hover:text-blue-400'
  }
];