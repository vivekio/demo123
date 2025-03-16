import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../slices/productDetailSlice.ts";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import Header from "../components/header.tsx";
import Footer from "../components/footer.tsx";
import { addToCart } from "../slices/cartSlice.ts";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>★</span>
    ));
  };

  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="border rounded-lg overflow-hidden">
          <img
            src={product?.image || "https://via.placeholder.com/500"}
            alt={product?.title}
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product?.title}</h1>
          <div className="flex items-center mb-2">
          <div className="flex">{renderStars(product?.rating?.rate)}</div>
            {/* <span className="text-yellow-500">★★★★☆</span> */}
            <span className="text-gray-600 ml-2">({product?.rating?.count} reviews)</span>
          </div>
          <p className="text-gray-700 mb-4">{product?.description}</p>
          <p className="text-2xl sm:text-3xl font-semibold mb-4">${product?.price}</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => dispatch(addToCart(product as any))}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Additional Product Details */}
      <div className="mt-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Product Details</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Category: {product?.category}</li>
          <li>Rating: {product?.rating?.rate} / 5</li>
          <li>Total Reviews: {product?.rating?.count}</li>
        </ul>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetail;
