import React, { useCallback, useEffect, useMemo } from "react";
import Header from "../components/header.tsx";
import Footer from "../components/footer.tsx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store.ts";
import { addToCart, resetCart } from "../slices/cartSlice.ts";
import axios from "axios";
import {  deleteCartProduct, updateCartService } from "../services/APIservices.ts";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartData = useSelector((state: RootState) => state.cart.items);
  const { items } = useSelector((state: RootState) => state.products);

  const getCartProducts = useCallback(async () => {
    const data: any = await axios('https://fakestoreapi.com/carts/user/2')
    if (data.data.length > 0) {
      const currentUserData = data?.data?.find((x) => x.userId === 2)?.products
      dispatch(resetCart([] as any))
      await currentUserData.forEach(async (product) => {
        const cartValue = await getDetailOfProduct(product)
        dispatch(addToCart(cartValue as any))
      });
    }
  }, []);


  const getDetailOfProduct = useCallback(async (product) => {
    const detail = await axios(`https://fakestoreapi.com/products/${product.productId}`)
    return { ...detail.data, quantity: product.quantity }
  }, [])

  useEffect(() => {
    getCartProducts();
  }, [getCartProducts]);

  const subtotal = useMemo(() => {
    const totalPrice = cartData.reduce((acc, item) => acc + item.price, 0)
    return totalPrice
  }, [cartData])

  const getTotal = useMemo(() => {
    return subtotal + 9.99 + 24
  }, [cartData])


  const updateCartProduct = useCallback((item, action) => {
    if (action === 'add') {
      updateCartService(item)

    } else if (action === 'remove') {
      deleteCartProduct(item)
    }
  }, [])

  return (
    <div className="bg-gray-100">
      <Header />
      <div className=" p-6 max-w-6xl mx-auto">
        {/* Shopping Cart Section */}
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.map((item) => (
              <div key={item?.id} className="flex items-center p-4 bg-white shadow rounded-lg">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded" />
                <div className="ml-4 flex-1 space-y-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="font-semibold">${item?.price?.toFixed(2)}</p>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <button className="border px-2 py-1">-</button>
                      <span>{item.quantity}</span>
                      <button className="border px-2 py-1" onClick={() => updateCartProduct(item, 'add')}>+</button>
                    </div>
                    <div className="flex items-center" onClick={() => updateCartProduct(item, 'remove')}>
                      <button className="text-red-500"><RiDeleteBin5Line /></button>
                      <button className="text-red-500">Remove</button>
                    </div>
                  </div>
                </div>

              </div>

            ))}
          </div>

          {/* Order Summary */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$9.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$24.00</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{getTotal}</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">Proceed to Checkout</button>
          </div>
        </div>

        {/* Recommended Products */}
        <h2 className="text-xl font-semibold mt-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {items.slice(0, 4).map((product) => (
            <div key={product.id} className="p-4 bg-white shadow rounded-lg">
              <img src={product.image} alt={product.title} className="w-full h-32 object-cover rounded" />
              <p className="mt-2 font-medium">{product.title}</p>
              <p className="font-semibold">${product.price.toFixed(2)}</p>
              <button className="mt-2 w-full bg-gray-800 text-white py-1 rounded">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
