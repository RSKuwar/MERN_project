import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import BarChartComponent from "./components/BarChart";
import PieChartComponent from "./components/PieChart";

function App() {
    const [month, setMonth] = useState("March");

    return (
        <div className="App">
            <h1>Transaction Dashboard</h1>
            <select onChange={(e) => setMonth(e.target.value)} value={month}>
                {["January", "February", "March", "April", "May", "June"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>

            <Statistics month={month} />
            <BarChartComponent month={month} />
            <PieChartComponent month={month} />
            <TransactionsTable month={month} />
        </div>
    );
}

export default App;
