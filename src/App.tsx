import { useState, useEffect } from 'react';
import { PageType } from './types';
import { HomeView } from './components/HomeView';
import { ArticlesView } from './components/ArticlesView';
import { AsciiGalleryView } from './components/AsciiGalleryView';
import { PaintingsView } from './components/PaintingsView';
import { PhotosView } from './components/PhotosView';
import { AboutView } from './components/AboutView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash.startsWith('about')) {
        setCurrentPage('about');
      } else if (hash.startsWith('articles') || hash.startsWith('article')) {
        setCurrentPage('articles');
      } else if (hash.startsWith('ascii')) {
        setCurrentPage('ascii');
      } else if (hash.startsWith('paintings') || hash.startsWith('painting')) {
        setCurrentPage('paintings');
      } else if (hash.startsWith('photos') || hash.startsWith('photo')) {
        setCurrentPage('photos');
      } else {
        setCurrentPage('home');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased text-white selection:bg-white selection:text-[#096C48]">
      {currentPage === 'home' && <HomeView onNavigate={navigateTo} />}
      {currentPage === 'about' && <AboutView onNavigate={navigateTo} />}
      {currentPage === 'articles' && <ArticlesView onNavigate={navigateTo} />}
      {currentPage === 'ascii' && <AsciiGalleryView onNavigate={navigateTo} />}
      {currentPage === 'paintings' && <PaintingsView onNavigate={navigateTo} />}
      {currentPage === 'photos' && <PhotosView onNavigate={navigateTo} />}
    </div>
  );
}
