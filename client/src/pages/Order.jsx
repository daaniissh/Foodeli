
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ButtonBase, CircularProgress, Tooltip } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import { getOrders } from "../api";
const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;



const Left = styled.div`
  flex: 1;
  display: flex;
  border-bottom:1px solid gray;
  flex-direction: column;
  // gap: 12px;
  @media (max-width: 750px) {
    flex: 1.2;
  }
`;
const Table = styled.div`
  font-size: 16px;
  display: flex;
  border-radius:12px;
  flex-direction:column;
  padding:10px;
  align-items: center;
  // background:gray;
  justify-content:center;
  @media (max-width: 750px) {
    flex-direction:column;
    gap:12px;
  }
 
  gap: 15px;
  ${({ head }) => head && `margin-bottom: 22px`}
`;
const TableS = styled.div`
  font-size: 16px;
  display: flex;
  padding:8px;
  align-items: center;
 
  gap: 30px;
 }
  ${({ head }) => head && `margin-bottom: 22px`}
`;
const TableItem = styled.div`
  ${({ flex }) => flex && `flex: 1; `}
  ${({ bold }) =>
    bold &&
    `font-weight: 600; 
  font-size: 18px;`}
`;
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction:column;
  justify-content:center;
  width:600px;
  padding: 12px;
  @media (max-width: 750px) {
    width:400px;
    flex-direction:column;
  }
`;
const TableItemA = styled.div`
  display:flex;
  align-items:center;
  flex-direction:column;

 
  justify-content:center;
  gap:10px;
    font-weight: 600; 
  font-size: 18px;
  
`;
const TableItemP = styled.div`
  display:flex;
  align-items:center;
  flex-direction:column;

 
  justify-content:center;
  gap:10px;
    font-weight: 600; 
  font-size: 18px;
  
`;
const Item = styled.div`
  display:flex;
  text-align:center;
  align-items:center;
  justify-content:center;
  gap:10px;
    font-weight: 600; 
  font-size: 18px;
  
`;


const Product = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  @media (max-width: 750px) {
    flex-direction:column;
    align-items:center;
  }
`;
const Image = styled.img`
  height: 100px;

  width:100px;
  border-radius:10px;
  object-fit:cover;
  @media (max-width: 750px) {
    width:300px;
    height: 200px;
  }
`;
const C = styled.div`
width:8px;
height:8px;
border-radius:50%;
background:green;
`;
const Details = styled.div`
display:flex;
align-items:center;
justify-content:space-between;
gap:60px;
@media (max-width: 750px) {
  gap:3px;
  flex-direction:column;
  align-items:center;
}

`;
const Protitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  text-align:center;
  text-transform: capitalize;
  font-weight: 700;
`;
const Op = styled.div`
  color: gray;
  font-size: 10px;
  text-transform: capitalize;
  font-weight: 500;
`;
const Or = styled.div`
  color: blue;
  display:flex;
  align-items:center;
  gap:3px;
  cursor:pointer;
  font-size: 10px;
  text-transform: capitalize;
  font-weight: 500;
`;
const Sa = styled.div`
  color: #5B86E5;
  display:flex;
  align-items:center;
  gap:3px;
  cursor:pointer;
  font-size: 10px;
  text-decoration:underline blue 0.5px;
  text-transform: capitalize;
  font-weight: 500;
`;
const ProDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: no-wrap;
  @media (max-width: 750px) {
    font-size: 10px;
  }
`;

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);

  const getProduct = async () => {
    const token = localStorage.getItem('krist-app-token');
    await getOrders(token).then(res => {
      const data = res.data;
      setOrderItems(data);
    });
  };
  const getOrderedDate = (timestamp) => {
    // Given timestamp
    

    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    // Get the year, month, and day from the Date object
    const year = date.getUTCFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name
    const day = date.getUTCDate();

    // Create the formatted date string
    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate

  }
  useEffect(() => {
    getProduct();
  }, []);



  return (
    <Container>
      <TableItem bold flex>
        Orders
      </TableItem>
      <Wrapper>
        {orderItems.map((order, orderIndex) => (
          <Left key={orderIndex}>
            <TableS />
            <Table>
              {order.products.map((productItem, productIndex) => (
                <div className="each">
                <TableItem key={productIndex} flex>
                  <Product>
                    <Image src={productItem.product.img} />
                    <Details>
                      <Protitle>{productItem.quantity} {productItem.product.name}</Protitle>
                      <TableItemP>${productItem.quantity * productItem.product.price.org}</TableItemP>
                      
                    </Details>
                  </Product>

                </TableItem>
            
              <TableItemA>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Tooltip
                    disableFocusListener
                    title={order.address}
                    arrow
                  >
                    <Sa>Delivery Address</Sa>
                  </Tooltip>
                </div>
                <Item>
                  <ProDesc>Delivered on {getOrderedDate(order.createdAt)}</ProDesc>
                </Item>
                <Op>Your items have been delivered</Op>
                <Or>
                  <StarIcon fontSize="12px" />
                  Rate & Review product
                </Or>
              </TableItemA></div>
                ))}
            </Table>
            <h4 className="total">Total amount : <span>${order.total_amount.$numberDecimal}</span> </h4>
            <br />
          </Left>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Order;

