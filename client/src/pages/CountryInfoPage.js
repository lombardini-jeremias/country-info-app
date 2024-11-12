import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import PopulationChart from '../components/PopulationChart'
import BorderCountries from '../components/BorderCountries'
import './CountryInfoPage.css'

const CountryInfoPage = () => {
  const { countryCode } = useParams()
  const [countryInfo, setCountryInfo] = useState(null)

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/country/${countryCode}`,
        )
        setCountryInfo(response.data)
      } catch (error) {
        console.error('Error fetching country info:', error)
      }
    }
    fetchCountryInfo()
  }, [countryCode])

  if (!countryInfo) return <p>Loading...</p>

  return (
    <div className="country-info-container">
      <div className="header">
        <img
          className="flag"
          src={countryInfo.flagData}
          alt={`${countryInfo.name} flag`}
        />
        <h1 className="country-name">{countryInfo.name}</h1>
      </div>
      <div className="borders-section">
        <h2>Bordering Countries</h2>
        <BorderCountries borders={countryInfo.borders} />
      </div>
      <div className="population-section">
        <h2>Population Data</h2>
        <PopulationChart populationData={countryInfo.populationData} />
      </div>
    </div>
  )
}

export default CountryInfoPage
