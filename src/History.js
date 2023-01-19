import React from "react";

function History({ cityHistory }) {
    return (
        <div>
            <h2>City History</h2>
            <table className="striped-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {cityHistory.map((city, index) => (
                        <tr key={index}>
                            <td>{index +1}</td>
                            <td>{city}</td>
                            <td>{new Date().toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default History;
