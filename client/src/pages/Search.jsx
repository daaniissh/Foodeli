import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ProductCard from '../components/cards/ProductCard';
import "./order.css"
import { SearchSharp } from '@mui/icons-material';
import { Input, InputAdornment, TextField } from '@mui/material';
import { getAllProducts } from '../api';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  padding: 20px 30px;
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  
  // overflow-y:hidden;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
    overflow-y: scroll;
  }
  background: ${({ theme }) => theme.bg};
`;
const Products = styled.div`
  padding: 12px;
  overflow: hidden;
  height: fit-content;
  @media (min-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;
const SearchI = styled.div`
  display: flex;
  justify-content: center;
  // width:500px;
 
  align-items:center;
  padding:15px;
`;
const SearchC = styled.div`
  display: flex;
  justify-content: center;
  width:100%;
 max-width:500px;
  align-items:center;
  padding:8px;
  border-radius:10px;
  border:1px solid gray;
  // @media (max-width: 750px) {
  //   gap: 14px;
  // }
`;
const Search = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const getFilteredProductsData = async () => {

    // Call the API function for filtered products
    await getAllProducts(`search=${search}`).then((res) => {

      console.log(res.data,"==============")
      setProducts(res.data)
    });
  };
  useEffect(() => {
    getFilteredProductsData()
  }, [])

  useEffect(() => {
    console.log(search)
    console.log(products)
    // if(search == ""){
    //   setSearch(".")
    // }
    const timeout = setTimeout(() => {
      if (search) {
        getFilteredProductsData();
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);
  return (
    <Container>

      <Products>
        <SearchI>
          <SearchC>
            <TextField
              value={search}
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              className='inp'

              placeholder='Search for a dish'
              id="input-with-icon-adornment"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchSharp />
                  </InputAdornment>
                )

              }}
            />
          </SearchC>
        </SearchI>
        <CardWrapper>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </CardWrapper>
      </Products>
    </Container>
  )
}

export default Search