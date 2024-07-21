import React, { useEffect } from "react";
import axios from "axios";

const Search = ({
  setLoading,
  setError,
  setLocation,
  userInput,
  setUserInput,
  loading,
}) => {
  useEffect(() => {
    const fetchInitialLocation = async () => {
      setLoading(true);
      try {
        const userIp = (await axios.get("https://api.ipify.org?format=json"))
          .data.ip;
        const res = await axios.get(`http://ip-api.com/json/${userIp}`);
        if (res.data.status === "success") {
          setLocation({
            lat: res.data.lat,
            lon: res.data.lon,
            city: res.data.city,
            country: res.data.country,
            isp: res.data.isp,
            timezone: res.data.timezone,
            query: res.data.query,
          });
        } else {
          setError("Location not found!!!");
        }
      } catch (err) {
        setError("An error occurred please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialLocation();
  }, [setLocation, setError, setLoading]);
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const searchIp =
        userInput ||
        (await axios.get("https://api.ipify.org?format=json")).data.ip;

      const res = await axios.get(`http://ip-api.com/json/${searchIp}`);
      if (res.data.status === "success") {
        console.log(res);

        setLocation({
          lat: res.data.lat,
          lon: res.data.lon,
          city: res.data.city,
          country: res.data.country,
          isp: res.data.isp,
          timezone: res.data.timezone,
          query: res.data.query,
        });
      } else {
        setError("Location not found!!!");
      }
    } catch (err) {
      setError("An error occurred please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      {" "}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter IP or Domain"
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className={`${loading ? "loadingBtn" : ""}`}
      >
        {loading ? ">" : ">"}
      </button>
    </div>
  );
};

export default Search;
