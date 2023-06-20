import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function SalesSummaryPage() {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: 'Reports',
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: [20000, 24000, 12000, 15000, 30000, 23000, 50000],
        // borderColor: 'rgb(53, 162, 235)',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className='px-8 py-6 w-full'>
      <h3>Sales Summary</h3>

      <div className="flex gap-4 mt-6">
        <div>
          <label htmlFor="fromdate" className='block'>From Date</label>
          <input type="date" name="fromdate" id="fromdate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>

        <div>
          <label htmlFor="todate" className='block'>To Date</label>
          <input type="date" name="todate" id="todate" className='block w-60 outline-none text-ipos-grey bg-ipos-grey-50 px-4 py-3 rounded-2xl mt-2' />
        </div>
      </div>

      <div className="mt-8">
        <div className="w-full p-4 border rounded-2xl">
          <Line options={options} data={data} className='w-full' />
        </div>
      </div>
    </div>
  )
}
