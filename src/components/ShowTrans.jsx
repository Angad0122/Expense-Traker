import React from 'react';
import './ShowTrans.css';
import {useTrans} from '../contexts/transContext';

function ShowTrans({ transactions, deleteTransaction }) {
    return (
        
        <div>
            {transactions.map((transaction, i) => (
                <div className='showtrans' id={`showtrans-${i}`} key={i}>
                    <p className='mr-5'> <b>{transaction.name}</b></p>
                    {transaction.sign === '+' ? (
                        <p className='ml-5 text-green-400'><b> +₹{transaction.amount}</b></p>
                    ) : (
                        <p className='ml-5 text-red-600'><b> -₹{transaction.amount}</b></p>
                    )}
                    <button onClick={() => deleteTransaction(i)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ShowTrans;


