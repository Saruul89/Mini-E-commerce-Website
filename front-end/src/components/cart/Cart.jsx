"use client";

const Cart = ({ cartItems, removeFromCart, getTotalCartAmount, product }) => {
  const cartproducts = [];
  const totalAmount = getTotalCartAmount(cartproducts);

  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_cart").showModal()}
      >
        Your Cart Items
      </button>
      <dialog id="my_modal_cart" className="modal">
        <div className="modal-box">
          <div>
            {Object.values(cartItems).length === 0 ? (
              <div>Your cart is empty.</div>
            ) : (
              Object.values(cartItems).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="w-[78%] flex justify-between">
                    <div>{item.name}</div>
                    <div>
                      ${item.price} x {item.quantity}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          {totalAmount > 0 && (
            <div className="checkout">
              <p>Subtotal: ${totalAmount}</p>
              <button>Checkout</button>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Cart;
