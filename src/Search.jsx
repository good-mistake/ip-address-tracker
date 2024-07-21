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
        const res = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=5196ccfcd3ae4792903fec48b385b890&ip=${userIp}`
        );
        if (res.status === 200) {
          const data = res.data;
          setLocation({
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            country: data.country_name,
            isp: data.isp,
            timezone: data.time_zone.name,
            ip: data.ip,
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
  const resolveDomainToIp = async (domain) => {
    try {
      const res = await axios.get(
        `https://dns.google/resolve?name=${domain}&type=A`
      );
      const ip = res.data.Answer[0].data;
      return ip;
    } catch (error) {
      setError("Failed to resolve domain to IP.");
      return null;
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      let searchIp = userInput;
      if (!searchIp.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        searchIp = await resolveDomainToIp(userInput);
      }

      if (searchIp) {
        const res = await axios.get(
          `https://api.ipgeolocation.io/ipgeo?apiKey=5196ccfcd3ae4792903fec48b385b890&ip=${searchIp}`
        );
        if (res.status === 200) {
          console.log(res);
          const data = res.data;
          setLocation({
            lat: data.latitude,
            lon: data.longitude,
            city: data.city,
            country: data.country_name,
            isp: data.isp,
            timezone: data.time_zone.name,
            ip: data.ip,
          });
        } else {
          setError("Location not found!!!");
        }
      } else {
        setError("Failed to resolve domain to IP.");
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
