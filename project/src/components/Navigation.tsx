import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-menu')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLanguageChange = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      localStorage.setItem('i18nextLng', lng);
      setIsOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const navLinks = location.pathname === '/' ? (
    <>
      <a href="#rooms" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.rooms')}</a>
      <a href="#amenities" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.amenities')}</a>
      <a href="#contact" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.contact')}</a>
    </>
  ) : (
    <Link to="/" className="hover:text-yellow-300" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.backToHome')}</Link>
  );

  return (
    <nav className="relative z-10">
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-white text-2xl font-serif">Galileo B&B</Link>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-white">
            {navLinks}
          </div>
          
          <div className="relative language-menu">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="flex items-center gap-2 text-white hover:text-yellow-300 focus:outline-none p-2"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm">{currentLanguage.flag} {currentLanguage.name}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
                      i18n.language === language.code
                        ? 'bg-yellow-50 text-yellow-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{language.flag}</span>
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <Link to="/" className="text-white text-xl font-serif">Galileo B&B</Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black bg-opacity-90 border-t border-gray-800">
            <div className="px-4 py-2">
              <div className="flex flex-col gap-4 text-white mb-4">
                {navLinks}
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm mb-2">{t('nav.selectLanguage')}</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        handleLanguageChange(language.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded ${
                        i18n.language === language.code
                          ? 'bg-yellow-500 text-white'
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span className="text-sm">{language.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}