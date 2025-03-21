import React, { useEffect, useState } from "react";
import "./App.css";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("planet");

  useEffect(() => {
    if (!selectedTable) return;

    console.log("Selected Table:", selectedTable);
    console.log("API URL:", process.env.REACT_APP_API_URL);
    console.log("DB Host:", process.env.DB_HOST);
    console.log("DB Port:", process.env.DB_PORT);
    console.log("DB User:", process.env.DB_USER);
    console.log("DB Password:", process.env.DB_PASSWORD);
    console.log("DB Name:", process.env.DB_NAME);

    fetch(`http://localhost:5000/data/${selectedTable}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [selectedTable]);

  const renderTableHeaders = () => {
    switch (selectedTable) {
      case "planet":
        return (
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Diameter (km)</th>
            <th>Radius (km)</th>
            <th>Rings</th>
            <th>Distance from Sun (million km)</th>
          </tr>
        );
      // Add other cases for the other tables here
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {selectedTable === "planet" && (
          <>
            <td>{item.name || "N/A"}</td>
            <td>{item.type || "N/A"}</td>
            <td>{item.diameter_km || "N/A"}</td>
            <td>{item.radius_km || "N/A"}</td>
            <td>{item.has_rings !== undefined ? item.has_rings.toString() : "N/A"}</td>
            <td>{item.distance_from_sun_in_millions_km || "N/A"}</td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div className="App">
      {/* Background Video */}
      <div className="background-video">
        <video autoPlay loop muted>
          <source
            src="/vecteezy_galaxy-and-nebula-abstract-space-background-endless_34218232.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <h1>Universe Data Display</h1>

      {/* Buttons for switching between tables */}
      <div>
        <button onClick={() => setSelectedTable("planet")}>Planets</button>
        <button onClick={() => setSelectedTable("asteroids")}>Asteroids</button>
        <button onClick={() => setSelectedTable("galaxy")}>Galaxies</button>
        <button onClick={() => setSelectedTable("moon")}>Moons</button>
        <button onClick={() => setSelectedTable("star")}>Stars</button>
      </div>

      {/* Table structure */}
      <table>
        <thead>{renderTableHeaders()}</thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <div className="attribution-link">
        <footer>
          <p>
            <a href="https://www.vecteezy.com/free-videos/live-wallpaper-space">
              Live Wallpaper Space Stock Videos by Vecteezy
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DataDisplay;
