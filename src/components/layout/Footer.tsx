'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube,
  ArrowUp
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: 'https://www.facebook.com/CCAgency.ub', label: 'Facebook', icon: Facebook },
    { href: 'https://www.youtube.com/@BuyaYura', label: 'YouTube', icon: Youtube },
    { href: 'https://www.instagram.com/cca.agency?igsh=bTNjbDZnbW54ZDc5', label: 'Instagram', icon: Instagram },
  ];

  const contactInfo = [
    { 
      icon: Phone, 
      label: '+976 9424 7600', 
      href: 'tel:+97694247600' 
    },
    { 
      icon: Phone, 
      label: '+82 010 4252 3878', 
      href: 'tel:+8201042523878' 
    },
    { 
      icon: Mail, 
      label: 'Ccagency.mn@gmail.com', 
      href: 'mailto:Ccagency.mn@gmail.com' 
    },
    { 
      icon: MapPin, 
      label: t('footer.contact.address'), 
      href: '#' 
    },
  ];

  return (
    <footer 
      className="bg-white text-gray-700 border-t border-gray-200"
      aria-label="Site Footer"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        {/* Grid layout for footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Image 
                  src="/images/cca-logo.svg" 
                  alt="CCA Education Agency Logo" 
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold text-gray-900">
                {t('agency.name')}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {t('footer.branding.description')}
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">{t('Contact')}</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    {contact.href === '#' ? (
                      <span className="text-sm text-gray-600">{contact.label}</span>
                    ) : (
                      <a
                        href={contact.href}
                        className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        {contact.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">{t('footer.social.title')}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar with legal info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} {t('agency.name')}. {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                {t('footer.legal.terms')}
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200">
                {t('footer.legal.privacy')}
              </Link>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={t('footer.backToTop')}
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">{t('footer.backToTop')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}