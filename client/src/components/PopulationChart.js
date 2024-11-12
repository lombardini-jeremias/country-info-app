import React from 'react'
import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const PopulationChart = ({ populationData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={populationData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          label={{
            value: 'Year',
            position: 'insideBottomRight',
            offset: -5,
          }}
        />
        <YAxis
          dataKey="value"
          label={{
            value: 'population',
            angle: -90,
            position: 'insideLeft',
            offset: 0,
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PopulationChart

PopulationChart.propTypes = {
  populationData: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
}
