import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { currencies, getCurrencySymbol } from '../utils/currencyData';

const OrderPage = () => {
  const { currency } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [exchangeRate, setExchangeRate] = useState(
    location.state?.exchangeRate || 1
  );
  const [selectedCurrency, setSelectedCurrency] = useState(currency || 'EUR');
  const [customCurrencies, setCustomCurrencies] = useState(location.state?.customCurrencies || []);
  const [amount, setAmount] = useState(''); 
  const [usdAmount, setUsdAmount] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.exchangeRate || selectedCurrency !== currency) {
      const fetchExchangeRate = async (currencyCode) => {
        const API_KEY = 'fca_live_oMQLdqV2KMtUI2We4CzZAGERq1ZSUcKracaKFxbu';
        const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

        try {
          setLoading(true);
          const response = await axios.get(BASE_URL);
          const rates = response.data.data;
          setExchangeRate(rates[currencyCode] || 1);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch exchange rate');
          setLoading(false);
        }
      };
      fetchExchangeRate(selectedCurrency);
    }
  }, [selectedCurrency, location.state, currency]);

  const handleAmountChange = (value, isUsd) => {
    if (isUsd) {
      setUsdAmount(value);
      setAmount(value ? (value * exchangeRate).toFixed(2) : '');
    } else {
      setAmount(value);
      setUsdAmount(value ? (value / exchangeRate).toFixed(2) : '');
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/', {
      state: { currency: selectedCurrency, amount, usdAmount },
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#e3f2fd',
        padding: '32px',
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '1200px',
          textAlign: 'center',
          background: '#ffffff',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography sx={{ color: '#0d47a1' }} variant="h4" gutterBottom>
          Order Foreign Currency
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: '#0d47a1', marginBottom: '32px' }}
        >
          Pick the currency and enter amount you wish to purchase in USD or the selected currency.
        </Typography>

        {loading ? (
          <Typography>Loading exchange rate...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <Select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              variant="outlined"
              sx={{
                flex: '1',
                minWidth: '250px',
                height: '75px',
                fontSize: '18px',
              }}
              inputProps={{ style: { height: '50px', padding: '12px' } }}
            >
              {[...currencies, ...customCurrencies.map(code => ({ code }))].map(({ code }) => (
                <MenuItem key={code} value={code}>{code}</MenuItem>
              ))}
            </Select>

            <TextField
              label={`Enter ${getCurrencySymbol(selectedCurrency)} Amount`}
              variant="outlined"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value, false)}
            />
            <TextField
              label="Current Exchange Rate"
              value={exchangeRate?.toFixed(2) || ''}
              disabled
            />
            <TextField
              label="US Dollar Amount"
              value={usdAmount}
              onChange={(e) => handleAmountChange(e.target.value, true)}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleProceedToCheckout}
              sx={{
                flex: '1',
                minWidth: '250px',
                padding: '16px',
                fontSize: '18px',
                borderRadius: '8px',
                backgroundColor: '#0d47a1',
                height: '75px',
              }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderPage;
