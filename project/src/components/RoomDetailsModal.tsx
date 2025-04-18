import React, { useState } from 'react';
import { X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    type: string;
    capacity: number;
    size: number;
    beds: string;
    view: string[];
    amenities: string[];
    bathroom: string[];
    features: string[];
    accessibility: string[];
    rules: string[];
    gallery: string[];
  };
}

export default function RoomDetailsModal({ isOpen, onClose, room }: RoomDetailsModalProps) {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.gallery.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
  };

  const renderList = (items: string[]) => (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">{t('rooms.details.roomDetails')}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              aria-label={t('common.close')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative mb-8">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={room.gallery[currentImageIndex]}
                alt={`${room.type} - ${t('rooms.details.image')} ${currentImageIndex + 1}`}
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </div>
            
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              aria-label={t('common.previous')}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              aria-label={t('common.next')}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {room.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                  aria-label={`${t('rooms.details.image')} ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.basicInfo')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">
                      {t('rooms.details.size')}: {room.size} m²
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">
                      {t('rooms.details.capacity')}: {t('rooms.details.upTo')} {room.capacity} {t('rooms.details.guests')}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">
                      {t('rooms.details.bedding')}: {room.beds}
                    </span>
                  </li>
                </ul>
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.views')}</h3>
                {renderList(room.view)}
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.bathroom')}</h3>
                {renderList(room.bathroom)}
              </section>
            </div>

            <div>
              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.amenities')}</h3>
                {renderList(room.amenities)}
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.features')}</h3>
                {renderList(room.features)}
              </section>

              <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.accessibility')}</h3>
                {renderList(room.accessibility)}
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">{t('rooms.details.rules')}</h3>
                {renderList(room.rules)}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}