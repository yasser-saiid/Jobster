import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='count'
          stroke='#716afdd3'
          fill='#6c63ff'
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
