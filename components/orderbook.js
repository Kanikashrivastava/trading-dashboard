import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { getFormatPrice } from './../utils';
import { Tabs } from 'antd';
import { Url } from "@/utils/helper";
import {TableCell, AsksStyles, BidsStyles, OrderBookContainerStyles} from './style';

const URL = `${Url}/orderbook/v1?quoteToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&baseToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`;

const OrderBookDetails = () => {
  const [asks, setAsks] = useState([])
    const [bids, setBids] = useState([])
    const ws = useRef(null);

  useEffect(() => {
      ws.current= new WebSocket('wss://api.0x.org/orderbook/v1');
      getOrderBookHandler()
  }, []);

  useEffect(() => {
    let msg = {
        "type": "subscribe",
        "channel": "orders",
        "requestId": "123e4567-e89b-12d3-a456-426655440000"
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      console.log(data, '-data')
      if (data?.type !== "update") {
        return;
      }
      asks.filter(elem => {
        if (data?.payload?.order?.chainId === elem?.order?.chainId) {
          elem.order = data.payload.order
        }
      })
      setAsks(asks)
    };
    
    ws.onopen = () => ws.current?.send(jsonMsg);

  }, [asks]);

  const getOrderBookHandler = async () => {
    try {
      const response = await axios.get(`${URL}`);
      const {asks, bids} = response?.data;
      setAsks(asks?.records);
      setBids(bids?.records);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = () => {
    let unSubMsg = {
      "type": "subscribe",
      "channel": "orders",
      "requestId": "123e4567-e89b-12d3-a456-426655440000"
    };
    let unSub = JSON.stringify(unSubMsg);

    ws.current.send(unSub);
    getOrderBookHandler();
  };
  return (
    <div>
      <div style={{ cursor: 'pointer' }} onClick={() => handleSelect()}>
          <AsksStyles>
            <TableCell>{'Price(USD)'}</TableCell>
            <TableCell style={{ textAlign: 'right' }}>{'Quantity'}</TableCell>
            <TableCell style={{ textAlign: 'right' }}>{'Total(USD)'}</TableCell>
          </AsksStyles>
        </div>
        <div style={{ }}>
          {asks && asks.map((elem) => (
            <AsksStyles key={elem.order.chainId}>
              <TableCell style={{ color: 'red' }}>{getFormatPrice(elem.order.makerAmount)}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>{getFormatPrice(elem?.order?.salt)}</TableCell>
              <TableCell style={{ textAlign: 'right' }}>{getFormatPrice(elem.order.takerAmount)}</TableCell>
            </AsksStyles>
          ))}
        </div>
        <div style={{ }}>
        {bids?.map(elem => (
          <BidsStyles key={elem.order.chainId}>
            <TableCell style={{ color: 'green' }}>{getFormatPrice(elem.order.makerAmount)}</TableCell>
            <TableCell style={{ textAlign: 'right' }}>{getFormatPrice(elem?.order?.salt)}</TableCell>  {/* couldn't find the quantity key hence added salt as its a random number described by ox docs} */}
            <TableCell style={{ textAlign: 'right' }}>{getFormatPrice(elem?.order?.takerAmount)}</TableCell>
          </BidsStyles>
        ))}
      </div>
    </div>
  )
}


const items = [
  {
    key: '1',
    label: `OrderBook`,
    children: <OrderBookDetails />
  },
  {
    key: '2',
    label: `Market`,
    children: <div>Something went wrong!</div>
  },
]

const OrderBook = () => {
  return (
    <OrderBookContainerStyles>
      <Tabs defaultActiveKey="1" items={items} />
    </OrderBookContainerStyles>
    );
};



export default OrderBook;
