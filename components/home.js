import { useEffect} from "react";
import Header from "./header";
import DashboardComponent from "./dashboard";
import TradingTokenComponent from "./tradingTokenComponent";

const HomeComponent = () => {
  return (
    <div style={{ backgroundColor: '#fefefe', height: '100vh'}}>
     <Header />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
      <DashboardComponent />
      <TradingTokenComponent />
      </div>
    </div>
  )
}

export default HomeComponent;