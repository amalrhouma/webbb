import React, { useState } from 'react';
import { BedDouble, UtensilsCrossed, Wifi, Car, Users, Refrigerator, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RoomDetailsModal from '../components/RoomDetailsModal';
import Navigation from '../components/Navigation';
import { images } from '../data/images';

interface RoomType {
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
  image: string;
  gallery: string[];
}

function EconomicRooms() {
  const { t } = useTranslation();
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);

  const commonAmenities = [
    t('rooms.features.wifi'),
    t('rooms.features.parking'),
    t('rooms.features.aircon'),
    t('rooms.features.pets')
  ];

  const rooms: RoomType[] = [
    {
      type: t('rooms.types.double'),
      capacity: 2,
      size: 35,
      beds: t('rooms.beds.double'),
      view: [
        t('rooms.view.garden'),
        t('rooms.view.city'),
        t('rooms.view.courtyard')
      ],
      amenities: [
        ...commonAmenities,
        t('rooms.amenities.tv'),
        t('rooms.amenities.desk')
      ],
      bathroom: [
        t('rooms.bathroom.private'),
        t('rooms.bathroom.toiletries'),
        t('rooms.bathroom.bidet'),
        t('rooms.bathroom.toilet'),
        t('rooms.bathroom.shower'),
        t('rooms.bathroom.hairdryer')
      ],
      features: [
        t('rooms.features.hardwood'),
        t('rooms.features.desk'),
        t('rooms.features.tv'),
        t('rooms.features.phone'),
        t('rooms.features.fan')
      ],
      accessibility: [
        t('rooms.accessibility.wheelchair'),
        t('rooms.accessibility.ground_floor')
      ],
      rules: [
        t('rooms.rules.no_smoking'),
        t('rooms.rules.pets'),
        t('rooms.rules.no_parties')
      ],
      image: images.rooms.luxury.room1,
      gallery: [
        images.rooms.luxury.room1,
        images.common.bathroom1,
        images.common.bathroom2,
        images.common.hallway
      ]
    },
    {
      type: t('rooms.types.triple'),
      capacity: 3,
      size: 40,
      beds: `${t('rooms.beds.double')} + ${t('rooms.beds.single')}`,
      view: [
        t('rooms.view.garden'),
        t('rooms.view.city')
      ],
      amenities: [
        ...commonAmenities,
        t('rooms.amenities.tv'),
        t('rooms.amenities.desk')
      ],
      bathroom: [
        t('rooms.bathroom.private'),
        t('rooms.bathroom.toiletries'),
        t('rooms.bathroom.bidet'),
        t('rooms.bathroom.toilet'),
        t('rooms.bathroom.shower'),
        t('rooms.bathroom.hairdryer')
      ],
      features: [
        t('rooms.features.hardwood'),
        t('rooms.features.desk'),
        t('rooms.features.tv'),
        t('rooms.features.phone'),
        t('rooms.features.fan')
      ],
      accessibility: [
        t('rooms.accessibility.wheelchair')
      ],
      rules: [
        t('rooms.rules.no_smoking'),
        t('rooms.rules.pets'),
        t('rooms.rules.no_parties')
      ],
      image: images.rooms.luxury.room2,
      gallery: [
        images.rooms.luxury.room2,
        images.common.bathroom1,
        images.common.bathroom2,
        images.common.hallway
      ]
    },
    {
      type: t('rooms.types.family'),
      capacity: 4,
      size: 45,
      beds: `2 ${t('rooms.beds.double')}`,
      view: [
        t('rooms.view.garden'),
        t('rooms.view.city'),
        t('rooms.view.courtyard')
      ],
      amenities: [
        ...commonAmenities,
        t('rooms.amenities.tv'),
        t('rooms.amenities.desk')
      ],
      bathroom: [
        t('rooms.bathroom.private'),
        t('rooms.bathroom.toiletries'),
        t('rooms.bathroom.bidet'),
        t('rooms.bathroom.toilet'),
        t('rooms.bathroom.shower'),
        t('rooms.bathroom.hairdryer')
      ],
      features: [
        t('rooms.features.hardwood'),
        t('rooms.features.desk'),
        t('rooms.features.tv'),
        t('rooms.features.phone'),
        t('rooms.features.fan')
      ],
      accessibility: [
        t('rooms.accessibility.wheelchair')
      ],
      rules: [
        t('rooms.rules.no_smoking'),
        t('rooms.rules.pets'),
        t('rooms.rules.no_parties')
      ],
      image: images.rooms.luxury.room3,
      gallery: [
        images.rooms.luxury.room3,
        images.common.bathroom1,
        images.common.bathroom2,
        images.common.hallway
      ]
    }
  ];

  const kitchenFeatures = [
    {
      icon: <Refrigerator className="w-6 h-6 text-yellow-600" />,
      title: t('economicFloor.kitchen.basicAppliances.title'),
      description: t('economicFloor.kitchen.basicAppliances.description')
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-yellow-600" />,
      title: t('economicFloor.kitchen.sharedSpace.title'),
      description: t('economicFloor.kitchen.sharedSpace.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ 
        backgroundImage: `url(${images.rooms.luxury.room1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} className="relative">
        <div className="bg-black bg-opacity-50">
          <Navigation />
          <div className="max-w-7xl mx-auto px-4 py-20 text-white">
            <h1 className="text-5xl font-serif mb-4">{t('economicFloor.title')}</h1>
            <p className="text-xl opacity-90">{t('economicFloor.subtitle')}</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-serif mb-6">{t('rooms.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
                onClick={() => setSelectedRoom(room)}
              >
                <img 
                  src={room.image}
                  alt={room.type}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.type}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{t('rooms.details.upTo')} {room.capacity} {t('rooms.details.guests')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      <span>{t('rooms.features.wifi')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      <span>{t('rooms.features.parking')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4" />
                      <span>{t('rooms.features.aircon')}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-yellow-600">
                    {t('rooms.details.moreDetails')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-serif mb-6">{t('economicFloor.kitchen.title')}</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8">
                <div className="space-y-6">
                  {kitchenFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[300px]">
                <img 
                  src={images.common.kitchen}
                  alt={t('economicFloor.kitchen.title')}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {selectedRoom && (
          <RoomDetailsModal
            isOpen={!!selectedRoom}
            onClose={() => setSelectedRoom(null)}
            room={selectedRoom}
          />
        )}
      </main>
    </div>
  );
}

export default EconomicRooms;