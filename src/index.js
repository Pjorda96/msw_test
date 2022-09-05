import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// basic process
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// in case of "homepage": "/login/" in the package.json
// async function main() {
//   if (process.env.NODE_ENV === 'development') {
//     if (window.location.pathname === '/login') {
//       window.location.pathname = '/login/'
//       return
//     }
//     const { worker } = require('./mocks/browser')
//     await worker.start({
//       serviceWorker: {
//         url: '/login/mockServiceWorker.js',
//       },
//     })
//   }
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root'),
//   )
// }

// main()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
