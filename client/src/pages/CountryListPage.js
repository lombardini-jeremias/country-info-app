import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CountryListPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/country/available`
      );
      if (response.data) {
        setCountries(response.data);
        setLoading(false);
      } else {
        console.error("No data received from API.");
      }
    } catch (error) {
      console.error("Error fetching country list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Available Countries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.countryCode}>
              <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryListPage;
