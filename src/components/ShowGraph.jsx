import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { useTrans } from '../contexts/transContext';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>{`${entry.name}: ₹${entry.amount}`}</p>
        ))}
      </div>
    );
  }

  return null;
}

function ShowGraph() {
  const { transactions } = useTrans();

  // Assuming transactions contain date in 'time' property and amount in 'amount' property
  const data = transactions.map(item => ({
    time: item.time, // Assuming item.time contains the transaction time/date
    amount: parseFloat(item.amount),
    name: item.name,
    sign: item.sign
  }));

  const Income_data = data.filter(item => item.sign === "+");
  const Expense_data = data.filter(item => item.sign !== "+");

  return (
    <div>
      <h3 className='m-5 text-2xl'><b>Income and Expense Graph</b></h3>
      <LineChart className='text-black' width={800} height={400} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Legend />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="amount" data={Income_data} name="Income" stroke="#82ca9d" />
        <Line type="monotone" dataKey="amount" data={Expense_data} name="Expense" stroke="#ff0000" />
      </LineChart>
    </div>
  );
}

export default ShowGraph;
