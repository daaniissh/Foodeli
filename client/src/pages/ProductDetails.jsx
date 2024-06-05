import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import {  FavoriteBorder ,FavoriteRounded } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useParams } from "react-router-dom";
import { openSnackbar } from "../redux/reducers/snackBar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch } from "react-redux";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../api";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 99%;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  width: 100%;
  padding: 12px;
  gap: 32px;
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 600px;
  max-height:500px;
  border-radius: 12px;
  @media (max-width: 750px) {
    height: 400px;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;
const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Sizes = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Items = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap:wrap;
`;
const Item = styled.div`
background:${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 12px;
padding:10px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ selected, theme }) =>
    selected &&
    `
  background: ${theme.primary};
  color: white;
  `}
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
`;
const Pi = styled.p`
 font-size:15px;
`;
const ProductDetails = ({setOpenAuth}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [selected, setSelected] = useState();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true)
    await getProductDetails(id).then(res => {
      setProduct(res.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
    })

  };

  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        if(err.response.data.message == "jwt malformed"){
          setOpenAuth(true)
         }
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
       if(err.response.data.message == "jwt malformed"){
        setOpenAuth(true)
       }
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const checkFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === id
        );
        console.log(isFavorite)
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getProduct();
    checkFavourite();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImageWrapper>
            <Image src={product?.img} />
          </ImageWrapper>
          <Details>
            <div>
              <Title>{product?.name}</Title>
              {/* <Name>{"product?.name"}</Name> */}
            </div>
            <Rating value={3.5} />
            <Price>
              ${product?.price?.mrp} <Span>${product?.price?.org}</Span>{" "}
              <Percent> (${product?.price?.off}% Off) </Percent>
            </Price>
            <Desc>{product?.desc}</Desc>
            <Sizes> 
              <Pi>Ingredients:</Pi> 
              <Items>

              {product?.ingredients.map((size) => (
                  <Item
                    selected={selected === size}
                    onClick={() => setSelected(size)}
                  >
                    {size}
                  </Item>
                ))}

              </Items>
            </Sizes>
            <ButtonWrapper>
              <Button
                text="Add to Cart"
                leftIcon={
                  
                    <ShoppingCartOutlinedIcon sx={{ fontSize: "22px", color: "red" }} />
                 
                }
                full
                outlined
                isLoading={cartLoading}
                onClick={() => addCart()}
              />
              {/* <Button text="Buy Now" full />   */}
              <Button
                leftIcon={
                  favorite ? (
                    <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favoriteLoading}
                onClick={() => (favorite ? removeFavorite() : addFavorite())}
              />
            </ButtonWrapper>
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductDetails;