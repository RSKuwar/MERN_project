import React, { useEffect, useState } from "react";
import { fetchPieChart } from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A028FF", "#28FFBF"];

const PieChartComponent = ({ month }) => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const getPieChartData = async () => {
            try {
                const data = await fetchPieChart(month);
                setPieData(data || []); 
            } catch (error) {
                console.error("Error fetching pie chart data:", error);
                setPieData([]); 
            }
        };
        getPieChartData();
    }, [month]);

    return (
        <div className="chart-container">
            <h2>Category-wise Distribution - {month}</h2>
            {pieData.length > 0 ? ( 
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="count"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p>Loading data or no data available...</p> 
            )}
        </div>
    );
};

export default PieChartComponent;
