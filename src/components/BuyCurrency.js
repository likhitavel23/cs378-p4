import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import axios from 'axios';
import { currencies, currencyImages } from '../utils/currencyData';

function BuyCurrency() {
  const navigate = useNavigate();
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customCurrencies, setCustomCurrencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const API_KEY = 'fca_live_oMQLdqV2KMtUI2We4CzZAGERq1ZSUcKracaKFxbu';
      const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

      try {
        const response = await axios.get(BASE_URL);
        const rates = response.data.data;
        setExchangeRates(rates);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch exchange rates');
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleCurrencySelect = (currency) => {
    navigate(`/order/${currency}`, {
      state: { exchangeRate: exchangeRates[currency], customCurrencies },
    });
  };

  const handleSearchCurrency = async () => {
    if (!searchTerm) return;
    const currencyCode = searchTerm.toUpperCase();
    
    if (!currencies.some(c => c.code === currencyCode) && !customCurrencies.includes(currencyCode)) {
      setCustomCurrencies([...customCurrencies, currencyCode]);
    }
  };

  return (
    <div className="buy-currency-container">
      <div className="header">
        <h1>Order Foreign Currency</h1>
        <p>Select the foreign currency you'd like to purchase</p>
        <p>
          If the currency you want isn't displayed, type in the currency code
          and if we cant find it the rate will be displayed as N/A.
        </p>
      </div>

      <div className="search-container" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search (e.g., NZD, INR)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearchCurrency}
        >
          Add Currency
        </button>
      </div>

      {loading ? (
        <p>Loading exchange rates...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="currency-grid">
          {[
            ...currencies,
            ...customCurrencies.map((code) => ({ code, name: code })),
          ].map((currency) => (
            <div
              className="currency-card"
              key={currency.code}
              onClick={() => handleCurrencySelect(currency.code)}
            >
              <img
                src={currencyImages[currency.code] || '/default-currency.png'}
                alt={`${currency.name} icon`}
                className="currency-image"
              />
              <div className="currency-details">
                <h2>
                  {currency.name} ({currency.code})
                </h2>
                <p>
                  Current rate:{' '}
                  {exchangeRates[currency.code]?.toFixed(2) || 'N/A'}{' '}
                  {currency.code}/USD
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyCurrency;

