import React from 'react';
import Router from '@/routes/Routes';
import Scene from './Scene';
import Header from './Header';
import Footer from './Footer';
import '@styles/style.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Scene>
        <Router />
      </Scene>
      <Footer />
    </>
  );
};

export default App;
