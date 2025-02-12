import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../services/api";

const Statistics = ({ month }) => {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const getStatistics = async () => {
            const data = await fetchStatistics(month);
            setStatistics(data);
        };
        getStatistics();
    }, [month]);

    return (
        <div className="statistics-container">
            <h2>Transactions Statistics - {month}</h2>
            {statistics ? (
                <div className="stats-boxes">
                    <div className="stat-box">
                        <h3>Total Sale Amount</h3>
                        <p>${statistics.totalSales.toFixed(2)}</p>
                    </div>
                    <div className="stat-box">
                        <h3>Total Sold Items</h3>
                        <p>{statistics.soldItems}</p>
                    </div>
                    <div className="stat-box">
                        <h3>Total Not Sold Items</h3>
                        <p>{statistics.unsoldItems}</p>
                    </div>
                </div>
            ) : (
                <p>Loading statistics...</p>
            )}
        </div>
    );
};

export default Statistics;
