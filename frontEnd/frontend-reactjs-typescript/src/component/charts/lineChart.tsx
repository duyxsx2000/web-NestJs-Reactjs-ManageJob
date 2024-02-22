import { ResponsiveLine } from '@nivo/line'
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
type Props = {
  countJob: {month: number, countJob: number[]}[] | null
}
type Data = {
  name: string,
  value1: number,
  value2: number,
  value3: number
}
const LineChartByJobs = ({countJob}: Props) => {
  console.log(countJob);
  const [data, setData] = useState<Data[] | null>(null)
  useEffect(() => {
    const newData = countJob?.map((item, index) => (
      {
        name: (item.month + 1).toString(),
        value1: item.countJob[0],
        value2: item.countJob[1],
        value3: item.countJob[2]
      }
    ))
    setData(newData ? newData : null)
  },[countJob])

  if(!data) return null
  return (
    <div className='w-full'>
      <p className='ml-16 font-semibold mb-4 p-1'>Job statistics chart for the year</p>
      <LineChart width={1100} height={500} data={data} >
        <XAxis
          dataKey="name"
          axisLine={{ stroke: '#aaa', strokeWidth: 2 }}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#333' }}
          axisLine={{ stroke: '#aaa', strokeWidth: 4 }}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="value1" stroke="#8884d8" strokeWidth={2} name="New Job" />
        <Line type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={2} name="Job done" />
        <Line type="monotone" dataKey="value3" stroke="#ffc658" strokeWidth={2} name="job error" />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
 }

export default LineChartByJobs