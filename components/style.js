import styled from 'styled-components';

export const TableCell = styled.span`
  width: 100px;
  max-width: 150px;
  display: block;
  overflow: hidden;
  font-size: 12px;
`;

export const AsksStyles = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BidsStyles = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const OrderBookContainerStyles = styled.div`
  display: flex;
  flex-direction: column; 
  width: 50%; 
  margin: 20px; 
  padding: 20px; 
  border: 2px solid #e3e3e357;
`;

export const NavbarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid rgb(232, 236, 253);
`;
export const NavbarLinkStyles = styled.div`
  padding: 3px 0px 0px 8px;
  color: #7578b5;
  font-size: 16px; 
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 50px;
  &:hover {
    color: #000;
    font-weight: 600;
  }
`;
export const UserBtnStyle = styled.div`
  align-items: center;
  background-color: rgb(246, 246, 255);
  border: 1px solid rgb(232, 236, 253);
  border-radius: 21px;
  cursor: pointer;
  display: flex;
  height: 38px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin: 0px;
  outline: none;
  padding: 8px 8px 8px 13px;
  width: 80px;
  z-index: 1;
  padding: 0 16px;
  &:hover {
    background: rgb(255, 255, 255);
    box-shadow: rgb(33 35 74 / 17%) 0px 4px 8px;
  }
`;

export const UserBtnContainer = styled.div`
  align-items: center;
  border-left: 1px solid rgb(232, 236, 253);
  display: flex;
  padding: 0px 24px;
`;

export const LogoBoxStyles = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px; 
  margin-right: 55px;
`