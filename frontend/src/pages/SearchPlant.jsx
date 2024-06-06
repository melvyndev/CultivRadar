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
      const response = await axios.get(`http://127.0.0.1:8000/api/plants/${searchValue}`);
      setPlants(Array.isArray(response.data) ? response.data : []);
      if (response.data.length === 0) {
        setError('No plants found.');
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
              <h4 style={{ marginTop: '10px', marginBottom: '0' }}>Recherche</h4>
            </div>
            <hr className="mt-2 mb-2" />
            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4" data-mdb-input-init>
                <input type="search" className="form-control" id="datatable-search-input" placeholder="Pomme..." value={searchValue} onChange={handleSearchChange} style={{ borderRadius: '20px' }} />
              </div>
              <button type="submit" className="btn btn-success w-100" style={{ borderRadius: '20px' }}>Valider</button>
            </form>
          </div>
        </div>

        <div className='col-9'>
          <div className="main-content" style={{ backgroundColor: '#f0f4f3', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div id="datatable" style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              {plants.length > 0 ? plants.map((plant, index) => (
                <div key={index} className="mb-2" style={{ borderBottom: '1px solid #e0e0e0', padding: '10px 0' }}>
                  <Link to={`/detail-plant/${plant.id}`} state={{ plant: plant }} style={{ textDecoration: 'none', color: '#333', width: '100%' }}>
                    <div className="d-flex align-items-center">
                    <img width={50}
                src={`http://127.0.0.1:8000/${plant.image}`? require('../assets/images/gardening.png'):`http://127.0.0.1:8000/${plant.image}`}
                alt={plant.common_name}            />                      <div style={{ flexGrow: 1 }}>
                        <div style={{ color: '#4caf50', fontWeight: 'bold' }}>{plant.scientific_name}</div>
                        <div style={{ color: '#757575' }}>{plant.common_name}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )) : <div>No plants found.</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SearchPlant;
