import React from 'react';
import { PageType } from '../types';
import { getAboutInfo } from '../utils/contentLoader';
import { useTheme } from '../utils/themeContext';
import { SimpleNav } from './SimpleNav';
import { AsciiPottedFlowersFooter } from './AsciiPottedFlowersFooter';

interface AboutViewProps {
  onNavigate: (page: PageType) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const aboutData = getAboutInfo();

  return (
    <div
      id="about-page"
      className={`min-h-screen w-full flex flex-col justify-between transition-colors duration-150 ${
        isLight
          ? 'bg-[#9c9c5d] text-black selection:bg-black selection:text-white'
          : 'bg-[#011a0e] text-[#f4fbf7] selection:bg-white selection:text-[#011a0e]'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto px-6 sm:px-12 py-10 sm:py-16 flex-1">
        <SimpleNav onBack={() => onNavigate('home')} label="بازگشت به خانه" />

        {/* Header */}
        <div
          className={`font-mono text-xs sm:text-sm mb-2 font-bold ${
            isLight ? 'text-black' : 'text-[#87cbb0]'
          }`}
          dir="ltr"
        >
          // ABOUT_ME // PROFILE
        </div>

        <h1
          className={`font-vazir text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight ${
            isLight ? 'text-black' : 'text-white'
          }`}
        >
          درباره من
        </h1>

        <p
          className={`font-mono text-xs sm:text-sm mb-8 font-bold ${
            isLight ? 'text-black' : 'text-[#87cbb0]'
          }`}
          dir="rtl"
        >
          {aboutData.name} — {aboutData.subtitle}
        </p>

        {/* Bio Section */}
        <div
          className={`mb-10 font-vazir text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal ${
            isLight ? 'text-black' : 'text-[#e2f4ec]'
          }`}
        >
          {aboutData.bio}
        </div>

        {/* ASCII divider */}
        <div
          className={`font-mono text-xs my-8 select-none overflow-hidden font-bold ${
            isLight ? 'text-black' : 'text-[#529d7c]'
          }`}
          dir="ltr"
        >
          +-------------------------------------------------------------------------------+
        </div>

        {/* Contact Information & Channels */}
        <div className="space-y-6">
          <h2
            className={`font-vazir text-lg sm:text-xl md:text-2xl font-bold mb-4 ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            راه‌های ارتباطی و کانال‌ها
          </h2>

          <div className="space-y-4 font-mono text-sm sm:text-base">
            {/* Phone */}
            {aboutData.phone && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  شماره تماس:
                </span>
                <a
                  href={`tel:${aboutData.phone.replace(/\s+/g, '')}`}
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.phone}
                </a>
              </div>
            )}

            {/* Email */}
            {aboutData.email && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  ایمیل:
                </span>
                <a
                  href={`mailto:${aboutData.email}`}
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.email}
                </a>
              </div>
            )}

            {/* Telegram */}
            {aboutData.telegram && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  کانال / آیدی تلگرام:
                </span>
                <a
                  href={aboutData.telegram.startsWith('http') ? aboutData.telegram : `https://t.me/${aboutData.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.telegram}
                </a>
              </div>
            )}

            {/* Instagram */}
            {aboutData.instagram && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  اینستاگرام:
                </span>
                <a
                  href={aboutData.instagram.startsWith('http') ? aboutData.instagram : `https://instagram.com/${aboutData.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.instagram}
                </a>
              </div>
            )}

            {/* YouTube */}
            {aboutData.youtube && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  یوتیوب:
                </span>
                <a
                  href={aboutData.youtube.startsWith('http') ? aboutData.youtube : `https://youtube.com/${aboutData.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.youtube}
                </a>
              </div>
            )}

            {/* X / Twitter */}
            {aboutData.xTwitter && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  توییتر / X:
                </span>
                <a
                  href={aboutData.xTwitter.startsWith('http') ? aboutData.xTwitter : `https://x.com/${aboutData.xTwitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.xTwitter}
                </a>
              </div>
            )}

            {/* GitHub */}
            {aboutData.github && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  گیت‌هاب:
                </span>
                <a
                  href={aboutData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ascii-link ${
                    isLight ? 'text-black hover:text-black font-bold' : 'text-[#e2f4ec] hover:text-white'
                  }`}
                  dir="ltr"
                >
                  {aboutData.github}
                </a>
              </div>
            )}

            {/* Location */}
            {aboutData.location && (
              <div
                className={`flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b ${
                  isLight ? 'border-black/30' : 'border-[#0d593d]'
                }`}
              >
                <span
                  className={`font-vazir text-sm sm:text-base font-bold ${
                    isLight ? 'text-black' : 'text-[#87cbb0]'
                  }`}
                >
                  موقعیت:
                </span>
                <span
                  className={`font-vazir ${
                    isLight ? 'text-black' : 'text-[#e2f4ec]'
                  }`}
                  dir="rtl"
                >
                  {aboutData.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Interests & Topics */}
        {aboutData.skillsOrInterests && (
          <div className="mt-10">
            <h2
              className={`font-vazir text-lg sm:text-xl md:text-2xl font-bold mb-4 ${
                isLight ? 'text-black' : 'text-white'
              }`}
            >
              زمینه‌های فعالیت و علایق
            </h2>
            <ul className="space-y-2 font-vazir text-sm sm:text-base list-none p-0">
              {aboutData.skillsOrInterests.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span
                    className={`font-mono select-none text-base font-bold ${
                      isLight ? 'text-black' : 'text-[#87cbb0]'
                    }`}
                  >
                    &gt;
                  </span>
                  <span className={isLight ? 'text-black' : 'text-[#cce8dc]'}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className={`mt-12 pt-6 border-t ${
            isLight ? 'border-black/30' : 'border-[#093522]'
          }`}
        >
          <SimpleNav onBack={() => onNavigate('home')} label="بازگشت به خانه" />
        </div>
      </div>

      {/* Potted flowers footer */}
      <AsciiPottedFlowersFooter />
    </div>
  );
};
