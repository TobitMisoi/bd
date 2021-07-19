import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './theme/globalStyles'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { UserProvider } from './contexts/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AuthProvider>
      <UserProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);