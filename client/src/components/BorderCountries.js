import React from "react";
import { Link } from "react-router-dom";

const BorderCountries = ({ borders }) => (
  <ul>
    {borders.map((border) => (
      <li key={border.code}>
        <Link to={`/country/${border.code}`}>{border.name}</Link>
      </li>
    ))}
  </ul>
);

export default BorderCountries;
