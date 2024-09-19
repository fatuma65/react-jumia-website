import { productsTypes, productType } from "./types";

export const fetchAllProducts = (products) => {
  console.log(products)
  return {
    type: productsTypes.FETCH_ALL_PRODUCTS,
    payload: products,
  };
};

export const fetchProductsFailure = (error) => {
  return {
    type: productsTypes.FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
};

export const fetchProductDetails = (productDetails) => {
  return {
    type: productType.FETCH_PRODUCT,
    payload: productDetails,
  };
};

export const fetchProductFailure = (error) => {
  return {
    type: productType.FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

export const slicedProduct = (startIndex, endIndex) => {
  return {
    type: productsTypes.SLICED_PRODUCTS,
    payload: {startIndex, endIndex}
  }
}
