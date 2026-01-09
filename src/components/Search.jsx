import { useState, useEffect } from "react";
import axios from "axios";
import '../Style/Search.css'

function Search() {
  const [watches, setWatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get("/watches/")
      .then((res) => setWatches(res.data))
      .catch((err) => console.error(err));
  }, []);


  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = watches.filter((w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  };

  return (
    <div className="container mt-4">
      <div className="row">

        
        <div className="col-md-12">

         
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search watches"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="btn btn-warning search-btn" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          
          <div className="row">
            {searchResults.length === 0 ? (
              <p>Search for watches</p>
            ) : (
              searchResults.map((watch) => (
                <div className="col-md-4 mb-3" key={watch.id}>
                  <div className="card">
                    <img
                      src={`${watch.image}`}
                      className="card-img-top"
                      alt={watch.name}
                    />
                    <div className="card-body">
                      <h5>{watch.name}</h5>
                      <p>₹{watch.price}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Search;
