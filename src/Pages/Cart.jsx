import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Style/Cart.css";

function Cart() {

  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = user ? `cart_${user.id}` : null;

  const [data, setData] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState({
    house: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });

  
  useEffect(() => {
    if (!cartKey) return;

    const storedCart =
      JSON.parse(localStorage.getItem(cartKey)) || [];
    setData(storedCart);
  }, [cartKey]);

  const updateCart = (updatedCart) => {
    setData(updatedCart);
    localStorage.setItem(cartKey, JSON.stringify(updatedCart));
  };

  const increment = (id) => {
    updateCart(
      data.map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    updateCart(
      data.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    updateCart(data.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setData([]);
    localStorage.removeItem(cartKey); 
  };

  const subtotal = data.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const message = `Hello, I want to buy these watches 👇

${data
  .map(
    (item) => `---------------------------
Name: ${item.name}
ID: ${item.id}
Qty: ${item.qty || 1}
Price: ₹${item.price * (item.qty || 1)}
---------------------------`
  )
  .join("\n")}

Subtotal: ₹${subtotal}

Delivery Address:
House: ${address.house}
Area: ${address.area}
District: ${address.district}
State: ${address.state}
Pincode: ${address.pincode}
`;

  const whatsappLink = `https://wa.me/9392655416?text=${encodeURIComponent(
    message
  )}`;

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please login to view your cart</h4>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="cart container mt-5">
        <h2 className="text-center text-secondary">Shopping Cart</h2>

        {data.length === 0 && <p>Cart is empty</p>}

        {data.map((item) => (
          <div key={item.id} className="row align-items-center border-bottom py-3">
            <div className="col-3">
              <img
                src={`${item.image}`}
                className="img-fluid"
                alt={item.name}
              />
            </div>

            <div className="col-5">
              <h2>{item.name}</h2>
              <h3>₹{item.price}</h3>
              <p className="text-muted">₹{item.oldPrice}</p>
            </div>

            <div className="col-4">
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => decrement(item.id)}
                >
                  −
                </button>

                <span className="qty-value">{item.qty || 1}</span>

                <button
                  className="qty-btn me-2"
                  onClick={() => increment(item.id)}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-danger mt-2 btn-remove"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {data.length > 0 && (
          <>
            <h4 className="mt-4">
              Subtotal:
              <span className="text-dark"> ₹{subtotal}</span>
            </h4>

            <div className="d-flex gap-2 my-3">
              <button className="btn btn-danger flex-fill" onClick={clearCart}>
                Clear Cart
              </button>

              <Link to="/shop" className="btn btn-success flex-fill text-center">
                Continue Shopping
              </Link>

              {!showAddress && (
                <button
                  className="btn btn-warning flex-fill"
                  onClick={() => setShowAddress(true)}
                >
                  Buy Now via WhatsApp
                </button>
              )}
            </div>

            {showAddress && (
              <div className="address-form mt-4 p-3 border rounded text-dark">
                <h5>Enter Delivery Address</h5>

                {["house", "area", "district", "state", "pincode"].map(
                  (field) => (
                    <input
                      key={field}
                      name={field}
                      placeholder={field.toUpperCase()}
                      onChange={handleChange}
                      className="form-control mb-2"
                    />
                  )
                )}

                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-secondary flex-fill"
                    onClick={() => setShowAddress(false)}
                  >
                    Back
                  </button>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-fill"
                  >
                    <button className="btn btn-success w-100">
                      Send Order on WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
