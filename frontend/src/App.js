import React from 'react';
import AppRouter from './Routers/AppRouter';
import MediaProvider from './Context/MediaContext'

function App() {

  return (
    <div id="app--wrapper">
      <MediaProvider>
        <AppRouter/>
      </MediaProvider>
    </div>
  );
}

export default App;
