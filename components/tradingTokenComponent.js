import React, { useEffect, useState } from 'react';
import { InputNumber, Tabs, Card, Space,Divider, Select, Button } from 'antd';
import Image from 'next/image';
import { IMAGES } from '@/public/image';
import { ArrowDownOutlined } from '@ant-design/icons';
import Router from 'next/router'
import styled from 'styled-components';
import { Url } from '@/utils/helper';
const { Option } = Select;

const ButtonStyle = styled(Button)`
  background: #1677ff;
  color: white;
  width: 90%;
  height: 40px;
  border-radius: 50px;
  margin-top: 25px;
`;

const Selector = (props) => {
  const [payToken, setPayToken] = useState('')
  const [receiveToken, setReceiveToken] = useState('')
  const [sellAmount, setSellAmount] = useState(0)
  const [receivedAmount, setReceivedAmount] = useState(0)

  
  useEffect(() => {
    fetchPriceAvailability()
  },[sellAmount])

const fetchPriceAvailability = async () => {
  try {
    const res = await fetch(`${Url}/swap/v1/price?sellToken=ETH&buyToken=USDC&sellAmount=${sellAmount}`)
    const data = await res.json()
    setReceivedAmount(data.price)
  } catch (error) {
    console.loh(error)
  }
}
  
	return (
    <div>
      <div style={{
        color: '#1f1f41',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '20px'
      }}>
      You Pay
    </div>
    <Select
      size={'large'}
      style={{
        width: '50%',
      }}
      defaultActiveFirstOption={true}
      placeholder="Choose Token"
      onChange={() => setPayToken("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")}
    >
        <Option value="ethereum" label="Ethereum">
          <Space >
            <span role="img" aria-label="Ethereum">
              <Image style={{ width: '10px', height: 'auto' }} src={IMAGES.ethereum_icon} alt="ethereum icon" />
            </span>
            Ethereum - <span>ETH</span>
          </Space>
        </Option>
        
      </Select>
      <div style={{ float: 'right', width: '40%' }}>
        <InputNumber 
          min={1} 
          value={sellAmount} 
          size={"large"} 
          defaultValue={3} 
          disabled={!payToken}
          onChange={val => { 
            setSellAmount(val)
            fetchPriceAvailability(val)
          }}
          />
      </div>
      <div style={{color: 'red'}}>{(payToken && !receivedAmount) && 'minimum amount should be at least 1000000000'}</div>

      <Divider plain><ArrowDownOutlined style={{ border: '1px solid #bec5e8', padding: '7px', borderRadius: '50px', color: '#7678b5', fontSize: '16px' }}/></Divider>
      <div style={{
        color: '#1f1f41',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '20px'
      }}>
      You Receive
    </div>
      <Select
      size={'large'}
      style={{
        width: '50%',
      }}
      defaultActiveFirstOption={true}
      placeholder="Choose Token"
      onChange={val => setReceiveToken(0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)}
    >
        <Option value="USDC" label="USDC">
          <Space style={{ display: 'flex', alignItems: 'center'}}>
            <span role="img" aria-label="USDC">
              <Image style={{ width: '20px', height: 'auto' }} src={IMAGES.usdc_icon} alt="USDC icon" />
            </span>
            USD Coin - <span>USDC</span>
          </Space>
        </Option>
      </Select>
      <div style={{ float: 'right', width: '40%' }}>
        <InputNumber 
          min={1} 
          value={receivedAmount} 
          max={10} size={"large"} 
          defaultValue={3} 
          disabled={!receiveToken}
          />
      </div>
      <ButtonStyle disabled={!(receiveToken && payToken && sellAmount)} onClick={() => Router.push('/orderbook')}>Swap</ButtonStyle>
  </div>
	)
}
const TradingTokenComponent = () => {

  
	const items = [
		{
			key: '1',
			label: `Market`,
			children: <Selector />
		},
	]
	
	return (
			<div >
        <Card style={{
          width: '100%',
          minHeight: '403px',
          backgroundColor: '#ffffff',
          boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 1px, rgb(42 43 58 / 5%) 0px 20px 98px, rgb(42 43 58 / 6%) 0px 2px 12px',
          marginTop: '20px'
        }}>
					<Tabs defaultActiveKey="1" items={items} />
        </Card>
			</div>
	)
}

export default TradingTokenComponent;