"use client";

import Card from "@/components/card/Card";
import Cart from "@/components/cart/Cart";
import { useEffect, useState } from "react";

export default function Home() {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:8000/products`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      setProducts(responseData);
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      const currentQuantity = newCart[product.id]?.quantity || 0;
      newCart[product.id] = { ...product, quantity: currentQuantity + 1 };
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevCart) => {
      const newCart = { ...prevCart };
      const currentQuantity = newCart[productId]?.quantity || 0;

      if (currentQuantity > 1) {
        newCart[productId] = {
          ...newCart[productId],
          quantity: currentQuantity - 1,
        };
      } else {
        delete newCart[productId];
      }

      return newCart;
    });
  };

  const getTotalCartAmount = (products) => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p.id === Number(itemId));
      if (product) {
        totalAmount += cartItems[itemId] * product.price;
      }
    }
    return totalAmount;
  };

  return (
    <div className="w-full mt-20">
      <div className="container m-auto">
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          getTotalCartAmount={getTotalCartAmount}
        />
        <div className="w-[1440px] grid grid-cols-3 gap-3">
          {products.map((product) => (
            <div>
              <Card handleSubmit={() => addToCart(product)} product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
