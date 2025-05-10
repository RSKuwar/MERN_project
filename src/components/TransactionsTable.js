import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

const TransactionsTable = ({ month }) => {
    const [transactions, setTransactions] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                setLoading(true);
                const data = await fetchTransactions(month);
                setTransactions(data || []); 
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setTransactions([]); 
            } finally {
                setLoading(false);
            }
        };
        getTransactions();
    }, [month]);

    return (
        <div>
            <h2>Transactions for {month}</h2>
            {loading ? (
                <p>Loading...</p> 
            ) : transactions.length > 0 ? (
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Date of Sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.title}</td>
                                <td>${transaction.price.toFixed(2)}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? "Yes" : "No"}</td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions found for {month}</p> 
            )}
        </div>
    );
};

export default TransactionsTable;
