import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useTrans } from '../contexts/transContext';

function ShowGraph(){


const { transactions } = useTrans();
const data = transactions;
let Income_data = []
let Expense_data = []

data.forEach(item => {
    if (item.sign === "+"){
        Income_data.push({name: item.name, amount: parseFloat(item.amount)}) 
    } else {
        Expense_data.push({name: item.name, amount: parseFloat(item.amount) })
    }
})



const renderLineChart = (
  <LineChart className='text-black' width={600} height={300} data={Expense_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis dataKey= "amount"/>
  </LineChart>
);
const renderLineChart2 = (
    <LineChart className='text-black' width={600} height={300} data={Income_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis dataKey ="amount" />
    </LineChart>
  );
    return (
        <div>
            <h3 className='m-5 text-2xl'><b>Expense Graph</b></h3>
            {renderLineChart}
            <h3 className='m-5 text-2xl'><b>Income Graph</b></h3>
            {renderLineChart2}
        </div>
    )
}
export default  ShowGraph;