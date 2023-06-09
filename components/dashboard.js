import React, { useEffect, useRef, useState } from 'react';
import Dashboard from './data';
import { formatData } from '@/utils';


const DashboardComponent = () => {
  const [currencies, setCurrencies] = useState([]);
  const [pair, setPair] = useState('');
  const [price, setPrice] = useState('0.00');
  const [pastData, setPastData] = useState({});
  const ws = useRef(null);
  const first = useRef(false);

  const url = 'https://api.pro.coinbase.com';

  useEffect(() => {
    ws.current= new WebSocket('wss://ws-feed.pro.coinbase.com');

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + '/products')
      .then((res) => res.json())
      .then((data) => (pairs = data));

      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair
        }
      });
      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      })
      setCurrencies(filtered);
      setPair(filtered[0].display_name)
      first.current = true;
    }

    apiCall();
  },[]);

  useEffect(() => {
    if (!first.current) {
      
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
  
    let jsonMsg = JSON.stringify(msg);

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));

      let formattedData = formatData(dataArr);
      setPastData(formattedData);
    };
    fetchHistoricalData();
    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }
      if (data.product_id === pair) {
        setPrice(data?.price);
      }
    };
    ws.onopen = () => ws.current.send(jsonMsg);
  }, [pair]);

  const handleSelect = (e) => {
    let unSubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unSub = JSON.stringify(unSubMsg);

    ws.current.send(unSub);
    setPair(e.target.value);
  };

  return (
    <div className="container">
      <select name="currency" value={pair} onChange={handleSelect}>
        {currencies.map((cur, idx) => {
          return (
            <option key={idx} value={cur.id}>
              {cur.display_name}
            </option>
          );
        })}
      </select>
      <Dashboard price={price} data={pastData} />
    </div>
  )
}

export default DashboardComponent;