import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import App from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance of a website',
          type: 'deposit',
          category: 'Web Development',
          amount: 6000,
          createdAt: new Date('2021-05-30 09:00:00')
        },
        {
          id: 2,
          title: 'Rent',
          type: 'withdraw',
          category: 'House',
          amount: 1500,
          createdAt: new Date('2021-06-05 11:00:00')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, requests) => {
      const data = JSON.parse(requests.requestBody);

      return schema.create('transaction', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);