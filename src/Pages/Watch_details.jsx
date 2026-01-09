import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../Style/Watch_details.css";
import axios from "axios";
import { Link } from "react-router-dom";

function WatchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [watch, setWatch] = useState(null);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    house: "",
    area: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [showAddress, setShowAddress] = useState(false);

  useEffect(() => {
    axios
      .get(`/watches/${id}/`)
      .then((res) => setWatch(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const addToCart = () => {
    const exists = cart.find((i) => i.id === watch.id);
    if (exists) increment(watch.id);
    else updateCart([...cart, { ...watch, qty: 1 }]);
    navigate("/Cart/");
  };

  const increment = (id) => {
    const exists = cart.find((i) => i.id === id);
    if (exists) {
      updateCart(
        cart.map((i) =>
          i.id === id ? { ...i, qty: (i.qty || 1) + 1 } : i
        )
      );
    } else {
      updateCart([...cart, { ...watch, qty: 1 }]);
    }
  };

  const decrement = (id) => {
    const exists = cart.find((i) => i.id === id);
    if (exists) {
      updateCart(
        cart.map((i) =>
          i.id === id ? { ...i, qty: i.qty > 1 ? i.qty - 1 : 0 } : i
        ).filter((i) => i.qty > 0)
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

            if (!watch) return <p className="text-center mt-5 text-white">Loading...</p>;
          const currentQty = cart.find((i) => i.id === watch.id)?.qty || 1;
            const imageUrl = `${watch.image}`;
            const message = `Hello, I want to buy this watch 
          Name: ${watch.name}
          Watch_ID:${watch.id}
          Items:${currentQty}
          Price: ₹${watch.price*currentQty}
          Watch Image: ${imageUrl}
          Delivery Address:
          House: ${address.house}, Area: ${address.area}, District: ${address.district}, State: ${address.state}, Pincode: ${address.pincode}`;

  const whatsappLink = `https://wa.me/9959187411?text=${encodeURIComponent(message)}`;

  

  return (
    <>
      <Navbar />

      <div className="container watch-details  text-white">
        <div className="row g-4">
        
          <div className="col-md-6">
            <div className="image-box mb-3">
              <img src={imageUrl} alt={watch.name} className="img-fluid rounded" />
            </div>
            <div className="d-flex gap-2">
              {[...Array(3)].map((_, i) => (
                <img
                  key={i}
                  src={imageUrl}
                  alt=""
                  className="img-thumbnail"
                  style={{ width: "70px", cursor: "pointer" }}
                />
              ))}
            </div>
          </div>

        
          <div className="col-md-6">
            <span className="badge bg-warning text-dark mb-2">NEW ARRIVAL</span>
            <h2 className="product-title text-white">{watch.name}</h2>
            <p className="text-secondary fs-4">{watch.brand} for {watch.gender}</p>

            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="h4 text-white">₹{watch.price}</span>
              {watch.oldPrice && (
                <>
                  <span className="text-secondary text-decoration-line-through">₹{watch.oldPrice}</span>
                  <span className="text-warning fw-bold">
                    {watch.discount}% Off
                  </span>
                </>
              )}
            </div>

            <p className="text-secondary small">(inclusive of all taxes)</p>

           
            <div className="row">
              <div className="col">
            <div className="d-flex align-items-center gap-2 mb-3">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => decrement(watch.id)}
                disabled={currentQty === 1}
              >
                -
              </button>
              <span>{currentQty}</span>
              
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => increment(watch.id)}
              >
                +
              </button>
              </div>
              <div className="col">
             <h4 className=""><span className="text-secondary">Subtotal:</span> ₹{watch.price*currentQty}</h4>
            </div>
            </div>
            </div>

           
            <div className="d-flex gap-2 flex-wrap mb-3">
              <button className="btn btn-dark" onClick={addToCart}>Add to Cart</button>
              {!showAddress && (
                <button className="btn buy-now" onClick={() => setShowAddress(true)}>Buy Now via WhatsApp</button>
              )}
            </div>

            
           {showAddress && (
  <div className="address-form p-3 bg-dark rounded mb-3 text-white">
    <h5 className="mb-3 text-light">Enter Delivery Address</h5>

    {["house", "area", "district", "state", "pincode"].map((field) => (
      <input
        key={field}
        name={field}
        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
        onChange={handleChange}
        className="form-control mb-2 bg-dark text-white border-light"
      />
    ))}

    <div className="d-flex gap-2 mt-2">
     
      <button
        className="btn btn-secondary w-50"
        onClick={() => setShowAddress(false)}
      >
        Back
      </button>

      
      <a href={whatsappLink} target="_blank" rel="noreferrer" className="w-50">
        <button className="btn btn-success w-100 ">
          Send Order on WhatsApp
        </button>
      </a>
    </div>
  </div>
)}

            
            <div className="row row-cols-2 g-2 mt-3 text-white">
              <div className="col">✔ 6 Months Warranty</div>
              <div className="col">✔ 7 Days Return</div>
              <div className="col">✔ Free Shipping</div>
              <div className="col">✔ Pay on Delivery</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="collection-title text-warning">OUR COLLECTION</p>


                <div className="container">
                    <div className="row text-center ">

                    {cart.map((watch) => (
                        <div className="col-lg-3 col-md-6 mb-4" key={watch.id}>
                        <div className="watch-card">

                        
                            <div className="watch-image">
                            <Link to={`/watch/${watch.id}`}>
                                <img  src={`${watch.image}`} alt={watch.name} />
                            </Link>

                        <button className="button-2"onClick={() => handleAddToCart(watch)}>
                                <i className="bi bi-bag"></i> Add to Cart</button>

                </div>

               
                <div className="watch-content">
                  <h6 className="collection">{watch.category}</h6>
                  <h5 className="name">{watch.name}</h5>

                  <div className="price-row text-center ">
                    <span className="price ">₹ {watch.price}</span>
                    <span className="old-price text-end">₹ {watch.oldPrice}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
        </div>
        </div>
      
    </>
  );
}

export default WatchDetails;
