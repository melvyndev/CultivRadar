import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import Nav from "../components/Nav";

const SearchPlant = ({ lat, lng }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/plants`);
        setPlants(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching plants data:', error);
        setError('Failed to fetch plant data.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/plants/search/${searchValue}`);
      setPlants(Array.isArray(response.data) ? response.data : []);
      if (response.data.length === 0) {
        setError('Aucune plante correspondante');
      }
    } catch (error) {
      console.error('Error searching plants:', error);
      setError('Failed to search plants.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='text-center p-3'>
        <img width={200} src={require('../assets/images/loading.gif')} alt="Loading" />
      </div>
    );
  }

  return (
    <main>
      <Nav />
      <div className='row'>
        <div className='col-3'>
          <div id="sidenav-3" className="sidenav bg-light p-3 rounded shadow-sm">
            <div className="text-center">
              <h4 className="my-2">Recherche</h4>
            </div>
            <hr className="my-2" />
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <input type="search" className="form-control rounded-pill" id="datatable-search-input" placeholder="Pomme..." value={searchValue} onChange={handleSearchChange} />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-pill">Valider</button>
            </form>
          </div>
        </div>

        <div className='col-9'>
          <div className="main-content bg-light p-4 rounded shadow-sm">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div id="datatable" className="table-responsive bg-white rounded p-3 shadow-sm" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {plants.length > 0 ? plants.map((plant, index) => (
                <div key={index} className="mb-2 border-bottom pb-2">
                  <Link to={`/detail-plant/${plant.id}`} state={{ plant: plant }} className="text-decoration-none text-dark d-flex align-items-center">
                    <img width={50} src={`http://127.0.0.1:8000/${plant.image}`} onError={(e) => { e.target.src = require('../assets/images/gardening.png'); }} alt={plant.common_name} className="me-3" />
                    <div>
                      <div className="text-success fw-bold">{plant.scientific_name}</div>
                      <div className="text-muted">{plant.common_name}</div>
                    </div>
                  </Link>
                </div>
              )) : <div>Aucune plante correspondante.</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SearchPlant;
