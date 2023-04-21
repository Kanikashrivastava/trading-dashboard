import { DashboardComponent, Header, OrderBook } from '@/components';
import React from 'react';

const OrderBookComponent = () => {
  return (
    <div >
      <Header />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DashboardComponent />
        <OrderBook />
      </div>
    </div>
  )
}

export default OrderBookComponent;