import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plane, Star, Wifi, Car, Phone, Mail, Clock, BedDouble, Crown, Sparkles, Percent, UtensilsCrossed, Chrome as Broom, Wind } from 'lucide-react';
import Navigation from '../components/Navigation';
import BookingModal from '../components/BookingModal';
import { images } from '../data/images';

function HomePage() {
  const { t } = useTranslation();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const cleaningServices = [
    {
      icon: <Broom className="w-8 h-8 text-yellow-600" />,
      title: t('amenities.cleaning.daily'),
      description: t('amenities.cleaning.dailyDesc')
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      title: t('amenities.cleaning.onRequest'),
      description: t('amenities.cleaning.onRequestDesc')
    }
  ];

  const getRestaurantsList = () => {
    try {
      const restaurantsList = t('amenities.restaurants.list', { returnObjects: true });
      return Array.isArray(restaurantsList) ? restaurantsList : [];
    } catch (error) {
      console.warn('Failed to load restaurants list from translations');
      return [];
    }
  };

  const restaurantsList = getRestaurantsList();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src={images.common.hero}
            alt={t('hero.welcome')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <Navigation />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4">{t('hero.welcome')}</h1>
          <p className="text-lg md:text-xl mb-8">{t('hero.subtitle')}</p>
          <div className="flex items-center gap-2 text-yellow-300 mb-6">
            <Plane className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-sm md:text-base">{t('hero.airport')}</span>
          </div>
          <button 
            onClick={() => setIsBookingModalOpen(true)}
            className="bg-yellow-300 text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-yellow-400 transition text-sm md:text-base"
          >
            {t('hero.book')}
          </button>
        </div>
      </header>

      {/* Rooms Section */}
      <section id="rooms" className="py-12 md:py-20 px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 md:mb-16">{t('rooms.title')}</h2>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Standard Rooms */}
          <Link to="/standard-rooms" className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition hover:shadow-xl">
            <img 
              src={images.rooms.standard.room1}
              alt={t('rooms.standard.title')}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <BedDouble className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl md:text-2xl font-serif">{t('rooms.standard.title')}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {t('rooms.standard.description')}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  {t('rooms.features.wifi')}
                </li>
                <li className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  {t('rooms.features.parking')}
                </li>
                <li className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  {t('rooms.features.aircon')}
                </li>
              </ul>
            </div>
          </Link>

          {/* Economic Rooms */}
          <Link to="/economic-rooms" className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition hover:shadow-xl">
            <img 
              src={images.rooms.luxury.room1}
              alt={t('rooms.economic.title')}
              className="w-full h-48 md:h-64 object-cover"
            />
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <BedDouble className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl md:text-2xl font-serif">{t('rooms.economic.title')}</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                {t('rooms.economic.description')}
              </p>
              <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                <li className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  {t('rooms.features.wifi')}
                </li>
                <li className="flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  {t('rooms.features.aircon')}
                </li>
                <li className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  {t('rooms.features.parking')}
                </li>
              </ul>
            </div>
          </Link>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-10 md:mb-16">{t('amenities.title')}</h2>
          
          {/* Cleaning Services */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
              <h3 className="text-xl md:text-2xl font-serif">{t('amenities.cleaning.title')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {cleaningServices.map((service, index) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    {service.icon}
                    <h4 className="text-lg md:text-xl font-semibold">{service.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm md:text-base">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Partnerships */}
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
              <h3 className="text-xl md:text-2xl font-serif">{t('amenities.restaurants.title')}</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {restaurantsList.map((restaurant: any, index: number) => (
                <div key={index} className="bg-white p-4 md:p-6 rounded-lg shadow-md">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Percent className="w-5 h-5 text-yellow-600" />
                    <h4 className="text-lg md:text-xl font-semibold">{restaurant.name}</h4>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">{restaurant.description}</p>
                  <div className="bg-yellow-50 p-3 rounded-md">
                    <p className="text-yellow-800 font-semibold text-sm md:text-base">{t('amenities.restaurants.discount')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-900 text-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif mb-6">{t('contact.title')}</h2>
          <div className="space-y-4">
            <p className="flex items-center gap-2 text-sm md:text-base">
              <Phone className="w-5 h-5 text-yellow-300" />
              {t('contact.phone')}
            </p>
            <p className="flex items-center gap-2 text-sm md:text-base">
              <Mail className="w-5 h-5 text-yellow-300" />
              {t('contact.email')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-4 md:py-6 px-4 md:px-6 text-center border-t border-gray-800">
        <p className="text-sm">{t('footer.copyright')}</p>
      </footer>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}

export default HomePage;