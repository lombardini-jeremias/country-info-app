import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PopulationChart from "../components/PopulationChart";
import BorderCountries from "../components/BorderCountries";

const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/country/${countryCode}`
          https://date.nager.at/api/v3/CountryInfo/UA
        );
        setCountryInfo(response.data); // Asegúrate de que los datos coincidan con la estructura esperada
      } catch (error) {
        console.error("Error fetching country info:", error);
      }
    };
    fetchCountryInfo();
  }, [countryCode]);

  if (!countryInfo) return <p>Loading...</p>;

  return (
    <div>
      <h1>{countryInfo.name}</h1>
      <img
        src={countryInfo.flagUrl}
        alt={`${countryInfo.name} flag`}
        width="100"
      />
      <h2>Bordering Countries</h2>
      {/* Asegúrate de pasar los países fronterizos */}
      <BorderCountries borders={countryInfo.borders} />
      <h2>Population Data</h2>
      {/* Asegúrate de pasar los datos de población */}
      <PopulationChart populationData={countryInfo.populationData} />
    </div>
  );
};

export default CountryInfoPage;
