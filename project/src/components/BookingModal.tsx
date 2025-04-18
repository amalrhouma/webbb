import React, { useState } from 'react';
import { X, Calendar, Users, BedDouble, MessageSquare, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const [isCustomCode, setIsCustomCode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+39',
    customCountryCode: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    roomType: 'standard',
    specialRequests: ''
  });

  const countryCodes = [
    { code: '+39', country: 'Italy (+39) 🇮🇹' },
    { code: '+33', country: 'France (+33) 🇫🇷' },
    { code: '+44', country: 'UK (+44) 🇬🇧' },
    { code: '+49', country: 'Germany (+49) 🇩🇪' },
    { code: '+34', country: 'Spain (+34) 🇪🇸' },
    { code: '+1', country: 'USA (+1) 🇺🇸' },
    { code: '+1', country: 'Canada (+1) 🇨🇦' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: `${isCustomCode ? formData.customCountryCode : formData.countryCode} ${formData.phone}`,
        checkInDate: formData.checkIn,
        checkOutDate: formData.checkOut,
        guests: formData.guests,
        roomType: formData.roomType,
        description: formData.specialRequests
      };

      await emailjs.send(
        'service_34bo5vc',
        'template_kalo352',
        templateParams,
        'HgoQxUdDOIjmpUxjz'
      );

      setIsSuccess(true);
      setCountdown(15);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onClose();
            setIsSuccess(false);
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              countryCode: '+39',
              customCountryCode: '',
              checkIn: '',
              checkOut: '',
              guests: '1',
              roomType: 'standard',
              specialRequests: ''
            });
            setIsCustomCode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('booking.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCustomCode = () => {
    setIsCustomCode(!isCustomCode);
    if (!isCustomCode) {
      setFormData(prev => ({ ...prev, customCountryCode: '+' }));
    }
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 md:p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif mb-4">{t('booking.submitSuccess')}</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            {t('booking.firstName')}: {formData.firstName}<br />
            {t('booking.email')}: {formData.email}<br />
            {t('booking.checkIn')}: {formData.checkIn}<br />
            {t('booking.roomType')}: {formData.roomType}
          </p>
          <div className="text-sm text-gray-500">
            {t('booking.autoClose')} ({countdown}s)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-serif">{t('booking.title')}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.firstName')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.lastName')} *
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('booking.phone')} *
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="customCode"
                      checked={isCustomCode}
                      onChange={toggleCustomCode}
                      className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                    />
                    <label htmlFor="customCode" className="text-sm text-gray-600">
                      {t('booking.customCode')}
                    </label>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] md:grid-cols-[140px_1fr] gap-2">
                    {isCustomCode ? (
                      <input
                        type="text"
                        name="customCountryCode"
                        value={formData.customCountryCode}
                        onChange={handleChange}
                        placeholder="+XXX"
                        pattern="^\+[0-9]{1,4}$"
                        required
                        className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                      />
                    ) : (
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-full px-2 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 bg-white appearance-none"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code + country.country} value={country.code}>
                            {country.country}
                          </option>
                        ))}
                      </select>
                    )}
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="123456789"
                      className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t('booking.checkIn')} *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  required
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t('booking.checkOut')} *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  required
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {t('booking.guests')} *
                </label>
                <select
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {t(i === 0 ? 'booking.guest' : 'booking.guests')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <BedDouble className="w-4 h-4" />
                  {t('booking.roomType')} *
                </label>
                <select
                  name="roomType"
                  required
                  value={formData.roomType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="standard">{t('rooms.standard.title')}</option>
                  <option value="economic">{t('rooms.economic.title')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('booking.specialRequests')}
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder={t('booking.specialRequestsPlaceholder')}
              ></textarea>
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 md:px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm md:text-base"
                disabled={isSubmitting}
              >
                {t('booking.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 md:px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {isSubmitting ? t('booking.submitting') : t('booking.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}