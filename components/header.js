import Image from "next/image";
import { UserOutlined, HomeOutlined, CompassFilled, MenuOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { IMAGES } from "@/public/image";
import {NavbarStyles, LogoBoxStyles, NavbarLinkStyles, UserBtnContainer, UserBtnStyle} from './style';
const { Search } = Input;

const Header = (props) => {
    const onSearch = (value) => console.log(value);
    return (
        <div className="navbar">
        <NavbarStyles >
          <LogoBoxStyles>
            <Image src={IMAGES.logo} style={{width: '40px', height: 'auto', marginRight: '10px'}} alt="Matcha logo" />
            <span style={{ fontSize: '16px', fontWeight: '500', color: '#1f1f41' }}>Matcha</span>
          </LogoBoxStyles>
          <Search placeholder="Search by token name, symbol, or address…" onSearch={onSearch} enterButton iconStyle={{color: 'red'}} />
          <NavbarLinkStyles className={props.className}><HomeOutlined /><span style={{ paddingLeft: '10px' }}>Home</span></NavbarLinkStyles>
          <NavbarLinkStyles className={props.className} style={{ borderRight: '1px solid rgb(232, 236, 253)' }}>
            <CompassFilled /><span style={{ paddingLeft: '10px' }}>Trade</span>
          </NavbarLinkStyles>
          <UserBtnContainer>
            <UserBtnStyle>
              <MenuOutlined /> 
              <UserOutlined />
            </UserBtnStyle>
          </UserBtnContainer>
        </NavbarStyles>
      </div>
    )
}

export default Header;