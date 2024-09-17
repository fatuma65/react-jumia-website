import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// "test:ui": "vitest --ui",
import {
  fetchAllProducts,
  fetchProductFailure,
  slicedProduct,
} from "../redux/actions/productActions";

import { Card } from "react-bootstrap";
import "./ProductListStyles.css";
import ProductDetails from "./ProductDetails";
const ProductList= () => {
  const [loaded, setLoaded] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, products, slicedProducts } = useSelector(
    (state) => state.product
  );
  const [currentProducts, setCurrentPage] = useState(0);
  const perProducts = 6;

  const fetchProducts = async () => {
    // setLoaded(true)
    try {
      axios.get(`http://localhost:4000/products/get/products`)
      .then(response => {
        console.log(response.data)
        dispatch(fetchAllProducts(response.data))
        setLoaded(false)
      })
      .catch(error => {
        console.log('Error fetching data', error)
      })
      // const response = await fetch(`http://localhost:4000/products/get/products`)
      // if (response.ok) {
      //   const data = response.json()
      //   console.log(data),
      //   dispatch(fetchAllProducts(data))
       
      // }
      // else {
      //   console.log('an error has occured')
      // }
  }
  catch(error) {
    console.log(error),
    dispatch(fetchProductFailure(error.message))
  }}
  useEffect(() => {
    fetchProducts()
  },[dispatch])

  if (loaded) {
    return <div>Loading...</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (products.length > 0 && slicedProducts.length === 0) {
      const initialIndex = Math.min(perProducts, products.length);
      console.log(initialIndex);
      dispatch(slicedProduct(0, initialIndex));
      setCurrentPage(0);
    }
  }, [products, dispatch]);

  const handleNext = () => {
    const newStartIndex = Math.min(
      currentProducts + perProducts,
      products.length - perProducts
    );
    const newEndIndex = newStartIndex + perProducts;

    dispatch(slicedProduct(newStartIndex, newEndIndex));
    console.log("next is clicked");
  };

  const handleBack = () => {
    const newStartIndex = Math.max(currentProducts - perProducts, 0);
    const newEndIndex = newStartIndex + perProducts;
    dispatch(slicedProduct(newStartIndex, newEndIndex));
    console.log("clicked to get back the items");
  };

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // display a few words of the title
  const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return title
    }
    else {
      const words = title.split('')
      const truncateDTitle = words.slice(0, maxLength).join('')
      return truncateDTitle + '...'
    }
  }

  const handleClick = (id) => {
    setSelectedProduct(id);
    console.log(id);
    navigate(`/product/details/${id}`);
  };

  return (
    <div
      className='pagination '
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}

      style={{ position: "relative" }}
    >
  
      {slicedProducts.map((item) => {
        return (
          <div className="product row " key={item.id} onClick={() => handleClick(item.id)}>
            <Card className="col each ">        
              <Card.Img
                src={`http://localhost:4000/uploads/${item.image}`}
                className="img-fluid mx-auto card"
                style={{ width: "400px", height: "200px" }}
              />
              <Card.Title className="word-break">{truncateTitle(item.title, 15)}</Card.Title>
              <Card.Text className="fw-semibold">UGX {item.price}</Card.Text>
            </Card>
          </div>
        );
      })}

        {showArrows && (
          <div className='show1'>
            <button
              className="button1 "
              onClick={handleBack}
              disabled={currentProducts - perProducts >= products.length}
            >
              &lt;
            </button>
          </div>
        )}
      <div className="show ">
        {showArrows && (
          <div className="">
            <button
              className=' button1'
              onClick={handleNext}
              disabled={
                currentProducts + perProducts >= products.length ||
                products.length === 0
              }
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      {selectedProduct && <ProductDetails />}
    </div>
  );
};

export default ProductList;
