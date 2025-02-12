import React, { useEffect, useState } from "react";
import { fetchBarChart } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ month }) => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        const getBarChartData = async () => {
            const data = await fetchBarChart(month);
            setBarData(data);
        };
        getBarChartData();
    }, [month]);

    return (
        <div className="chart-container">
            <h2>Price Range Distribution - {month}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                    <XAxis dataKey="priceRange" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
