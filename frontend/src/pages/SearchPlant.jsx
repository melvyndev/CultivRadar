import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Nav from "../components/Nav";

const SearchPlant = ({ lat, lng }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      axios.get(`http://127.0.0.1:8000/api/plants`)
        .then(response => {
          setPlants(response.data);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error fetching plants data:', error);
        });
    };
    fetchPlants();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://127.0.0.1:8000/api/plants/${searchValue}`)
      .then(response => {
        setPlants(response.data);
      })
      .catch(error => {
        console.error('Error searching plants:', error);
      });
  };

  if (loading) {
    return (
      <div className='transparent p-3'>
        <img width={200} src={require('../assets/images/loading.gif')} alt="Loading" />
      </div>
    );
  }

  return (
    <main>
      <Nav />
      <div className='row'>
      <div className='col-3'>
  <div id="sidenav-3" className="sidenav" style={{ backgroundColor: '#F5F5F5', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
    <div className="text-center">
      <img src={require('../assets/images/loading.gif')} alt="Agriculture" width={50} />
      <h4 style={{ marginTop: '10px', marginBottom: '0' }}>Agriculture Search</h4>
    </div>
    <hr className="mt-2 mb-2" />
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4" data-mdb-input-init>
        <input type="search" className="form-control" id="datatable-search-input" placeholder="Search..." value={searchValue} onChange={handleSearchChange} style={{ borderRadius: '20px' }} />
      </div>
      <button type="submit" className="btn btn-success w-100" style={{ borderRadius: '20px' }}>Search</button>
    </form>
  </div>
</div>

        <div className='col-9'>
          <div className="main-content">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-outline mb-4" data-mdb-input-init>
                <input type="search" className="form-control" id="datatable-search-input" placeholder="Search..." value={searchValue} onChange={handleSearchChange} />
                <label className="form-label" htmlFor="datatable-search-input">Search</label>
              </div>
              <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <div id="datatable" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {plants.map((plant, index) => (
                <div key={index} className="mb-2">
                  <Link to={`/detail-plant/${plant.id}`} state={{ plant: plant }} style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="d-flex align-items-center">
                      <img src={plant.image_url} alt={plant.common_name} width={50} height={50} className="mr-2" />
                      <Badge bg={"light"} text={"success"} className="w-100">
                        <div>{`${plant.scientific_name} - ${plant.common_name}`}</div>
                      </Badge>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SearchPlant;
