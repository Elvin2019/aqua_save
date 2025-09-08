import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const languages = [
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 120 }}>
      <LanguageIcon sx={{ mr: 1, color: 'inherit', fontSize: 20 }} />
      <FormControl size="small" variant="outlined">
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{
            color: 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.7)',
            },
            '& .MuiSelect-icon': {
              color: 'inherit',
            },
          }}
        >
          {languages.map((language) => (
            <MenuItem key={language.code} value={language.code}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
