import React from 'react';
import AppRouter from './routers/AppRouter';
import MediaProvider from './context/MediaContext'

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
