import React, { useEffect, useState } from "react";
import "./App.css";

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("planet"); // Keep track of the selected table

  useEffect(() => {
    if (!selectedTable) return;

    fetch(`http://localhost:5000/data/${selectedTable}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [selectedTable]);

  // Function to render table headers based on selected table
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
      case "asteroids":
        return (
          <tr>
            <th>Name</th>
            <th>Diameter (km)</th>
            <th>Orbit Period (days)</th>
          </tr>
        );
      case "galaxy":
        return (
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Has Life</th>
            <th>Spherical</th>
            <th>Distance from Earth (ly)</th>
            <th>Number of Stars (billions)</th>
          </tr>
        );
      case "moon":
        return (
          <tr>
            <th>Name</th>
            <th>Diameter (km)</th>
            <th>Orbit Period (days)</th>
          </tr>
        );
      case "star":
        return (
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Mass</th>
            <th>Brightness</th>
            <th>Temperature</th>
          </tr>
        );
      default:
        return null;
    }
  };

  // Function to render table rows based on selected table
  const renderTableRows = () => {
    return data.map((item, index) => (
      <tr key={index}>
        {selectedTable === "planet" && (
          <>
            <td>{item.name || "N/A"}</td>
            <td>{item.type || "N/A"}</td>
            <td>{item.diameter_km || "N/A"}</td>
            <td>{item.radius_km || "N/A"}</td>
            <td>
              {item.has_rings !== undefined ? item.has_rings.toString() : "N/A"}
            </td>
            <td>{item.distance_from_sun_in_millions_km || "N/A"}</td>
          </>
        )}
        {selectedTable === "asteroids" && (
          <>
            <td>{item.name}</td>
            <td>{item.diameter_km}</td>
            <td>{item.orbit_period_days}</td>
          </>
        )}
        {selectedTable === "galaxy" && (
          <>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              {item.has_life !== undefined ? item.has_life.toString() : "N/A"}
            </td>
            <td>
              {item.is_spherical !== undefined
                ? item.is_spherical.toString()
                : "N/A"}
            </td>
            <td>{item.distance_from_earth_in_light_years}</td>
            <td>{item.number_of_stars_in_billions}</td>
          </>
        )}
        {selectedTable === "moon" && (
          <>
            <td>{item.name}</td>
            <td>{item.diameter_km}</td>
            <td>{item.orbit_period_days}</td>
          </>
        )}
        {selectedTable === "star" && (
          <>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.mass}</td>
            <td>{item.brightness}</td>
            <td>{item.temperature}</td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <div>
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

      <video autoPlay loop muted className="background-video">
        <source
          src="/vecteezy_galaxy-and-nebula-abstract-space-background-endless_34218232.mp4"
          type="video/mp4"
        />
      </video>

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
