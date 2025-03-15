import euroImage from '../images/EuroIcon.png';
import yenImage from '../images/YenIcon.png';
import poundImage from '../images/PoundIcon.png';
import pesoImage from '../images/PesoIcon.png';
import cadImage from '../images/PesoIcon.png';
import audImage from '../images/PesoIcon.png';
import chfImage from '../images/PesoIcon.png';
import cnyImage from '../images/PesoIcon.png';
import inrImage from '../images/PesoIcon.png';
import brlImage from '../images/PesoIcon.png';

export const currencyImages = {
  EUR: euroImage,
  JPY: yenImage,
  GBP: poundImage,
  MXN: pesoImage,
  CAD: cadImage,
  AUD: audImage,
  CHF: chfImage,
  CNY: cnyImage,
  INR: inrImage,
  BRL: brlImage,
};

export const currencies = [
  { code: 'EUR', name: 'Euro' },
  { code: 'JPY', name: 'Yen' },
  { code: 'GBP', name: 'Pound' },
  { code: 'MXN', name: 'Peso' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'BRL', name: 'Brazilian Real' },
];

export const getCurrencySymbol = (currencyCode) => {
  switch (currencyCode) {
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'JPY':
      return '¥';
    case 'MXN':
      return '₱';
    case 'CAD':
      return 'C$';
    case 'AUD':
      return 'A$';
    case 'CHF':
      return 'CHF';
    case 'CNY':
      return '¥';
    case 'INR':
      return '₹';
    case 'BRL':
      return 'R$';
    default:
      return '';
  }
};
