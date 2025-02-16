import { React, useState, useEffect } from "react";
import { ReactComponent as Location } from "./images/icon-location.svg";
import { ReactComponent as Arrow } from "./images/icon-arrow.svg";
import axios from "axios";

import Map from "./Map.jsx";
import Search from "./Search.jsx";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="container">
      <header>
        <h1>IP Address Tracker</h1>
        <Search
          setLoading={setLoading}
          setError={setError}
          setLocation={setLocation}
          userInput={userInput}
          setUserInput={setUserInput}
          loading={loading}
        />
      </header>
      <main>
        <section>
          {error ? (
            <ul>
              <li>{error}</li>
            </ul>
          ) : !loading ? (
            <ul>
              <li>
                <span>IP ADDRESS</span>
                {location?.ip ? location?.ip : "No Ip Found"}
              </li>
              <li>
                <span>Location</span>
                {location?.city
                  ? location?.city
                  : "No Location Found!" || location?.country
                  ? location?.country
                  : "No Location Found!"}
              </li>
              <li>
                <span>Timezone</span>
                {location?.timezone
                  ? location?.timezone
                  : "NO Time Zone Found!"}
              </li>
              <li>
                <span>Isp</span>
                {location?.isp ? location?.isp : "No Isp Found!"}
              </li>
            </ul>
          ) : (
            <ul className="skeleton">
              <li>
                <span>ip address</span>
              </li>
              <li>
                <span>location</span>
              </li>
              <li>
                <span>timezone</span>
              </li>
              <li>
                <span>isp</span>
              </li>
              {error && <li>{error}</li>}
            </ul>
          )}
        </section>
        {location && <Map location={location} />}
      </main>
    </div>
  );
};

export default App;
