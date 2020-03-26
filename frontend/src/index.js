import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

/*função onde se baseia toda a aplicação, tudo se volta 
para esse arquivo js, para ai ir para o browser*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);