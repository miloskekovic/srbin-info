/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, createContext } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
  const [language, setLanguage] = useState('srCyrlRS');
  return (
    <SettingsContext.Provider value={[language, setLanguage]}>
      {props.children}
    </SettingsContext.Provider>
  );
};
