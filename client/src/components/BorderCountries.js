import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BorderCountries = ({ borders }) => (
  <ul>
    {borders.map((border) => (
      <li key={border.code}>
        <Link to={`/country/${border.code}`}>{border.name}</Link>
      </li>
    ))}
  </ul>
)

export default BorderCountries

BorderCountries.propTypes = {
  borders: PropTypes.arrayOf(PropTypes.string).isRequired,
}
