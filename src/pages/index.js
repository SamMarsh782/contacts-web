import './pages.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getStopStatuses } from '../utils/apis/getStopStatuses.tsx';

import MapView from '../components/divs/mapview.js';
import Header from '../components/divs/header';
import MenuButton from '../components/buttons/menuButton';
import ItemBar from '../components/divs/itemBar';

function Home() {

  const navigate = useNavigate();

  const [stops, setStops] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedStop, setSelectedStop] = useState([]);
  const [currRoute, setCurrRoute] = useState("");
  const [latestStop, setLatestStop] = useState("");
  const [latestStopNum, setLatestStopNum] = useState("");
  const [latestStopTime, setLatestStopTime] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState();
  const [focused, setFocused] = useState();

  const fetchStops = () => {
    getStopStatuses()
      .then((stops) => {
        setStops(stops);
        setFilteredSuggestions(stops);
      })
      .catch((error) => {
        setSaving(false);
        console.error('Error fetching stops:', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStops();
  }, []);

  useEffect(() => {
    setFilteredSuggestions(
      stops.filter(item =>
        item.DESCRIPTION.toLowerCase().includes(search.toLowerCase()) ||
        item.ACTUAL_SEQUENCE_NUM.toString().includes(search.toLowerCase()) ||
        item.ROUTE_ID.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [stops, search]);

  const setLatest = (route) => {
    const filteredStops = stops.filter(stop => stop.ROUTE_ID === route);
    if (filteredStops.length === 0) return;

    const arrivals = filteredStops.map(stop => ({
      ...stop,
      utcDate: new Date(`${stop.ACTUAL_ARRIVAL}Z`)
    }));

    const latest = arrivals.reduce((a, b) => (b.utcDate > a.utcDate ? b : a));

    const latestEST = latest.utcDate.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    setLatestStop(latest.DESCRIPTION);
    setLatestStopNum(latest.ACTUAL_SEQUENCE_NUM);
    setLatestStopTime(latestEST);

    console.log("Latest arrival in EST (24-hour):", latestEST);
  };


  if(loading) {
    return (
      <div className="background">
        <Header title="Home" />
        <div className="body">
          <p>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="background">
      <Header title="Home" />
      <div className="body">
        <div className="half-wide">
          <div className="details-window">
            <div className="half-viewing-window">
              <p className="item-text">
                <span className="item-label">Stop:</span>{' '}
                <span className="item-value">{selectedStop?.DESCRIPTION}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Stop #:</span>{' '}
                <span className="item-value">{selectedStop?.ACTUAL_SEQUENCE_NUM}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Projected Arrival:</span>{' '}
                <span className="item-value">
                  {selectedStop?.PROJECTED_ARRIVAL
                    ? new Date(`${selectedStop.PROJECTED_ARRIVAL}Z`).toLocaleTimeString('en-US', {
                        timeZone: 'America/New_York',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })
                    : '--:--'}
                </span>
              </p>
              <p className="item-text">
                <span className="item-label">Actual Arrival:</span>{' '}
                <span className="item-value">
                  {selectedStop?.ACTUAL_ARRIVAL
                    ? new Date(`${selectedStop.ACTUAL_ARRIVAL}Z`).toLocaleTimeString('en-US', {
                        timeZone: 'America/New_York',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })
                    : '--:--'}
                </span>
              </p>
              <p className="item-text">
                <span className="item-label">Address:</span>{' '}
                <span className="item-value">{selectedStop?.ADDR_LINE1}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Region:</span>{' '}
                <span className="item-value">{selectedStop?.REGION1}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Location ID:</span>{' '}
                <span className="item-value">{selectedStop?.LOCATION_ID}</span>
              </p>
            </div>
            <div className="half-viewing-window">
              <p className="item-text">
                <span className="item-label">Route:</span>{' '}
                <span className="item-value">{selectedStop?.ROUTE_ID}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Last Stop:</span>{' '}
                <span className="item-value">{latestStopTime !== "Invalid Date" ? latestStop : ""}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Last Stop #:</span>{' '}
                <span className="item-value">{latestStopTime !== "Invalid Date" ? latestStopNum : ""}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Last Time:</span>{' '}
                <span className="item-value">{latestStopTime !== "Invalid Date" ? latestStopTime?.slice(-5) || "--:--" : "--:--"}</span>
              </p>
              <p className="item-text">
                <span className="item-label">Date:</span>{' '}
                <span className="item-value">{selectedStop?.ROUTE_DATE?.slice(5, 7) || "--"}/{selectedStop?.ROUTE_DATE?.slice(8, 10) || "--"}</span>
              </p>
            </div>
          </div>
          <div className="map-window">
            <MapView stops={stops.filter((stop) => stop.ROUTE_ID === selectedStop.ROUTE_ID)} setSearch={setSearch} selected={selectedStop} setSelected={setSelectedStop} />
          </div>
          <div className="search-container">
            <div className="search-bar">
              <input
                className="search-input"
                type="string"
                placeholder="Customer"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => {
                  setFocused(true);
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setFocused(false);
                  }, 100);
                }}
              />
            </div>
            <div className="search-results-container">
              {filteredSuggestions
              .sort((a, b) => a.ACTUAL_SEQUENCE_NUM - b.ACTUAL_SEQUENCE_NUM)
              .sort((a, b) => a.ROUTE_ID.localeCompare(b.ROUTE_ID))
              .map((stop, index) => (
                <ItemBar
                  key={index}
                  onClick={() => {
                    setFocused(false);
                    setSelectedStop(stop);
                    setCurrRoute(stop.ROUTE_ID);
                    setSearch(stop.DESCRIPTION);
                    setLatest(stop.ROUTE_ID);
                  }}
                  items={[
                    {"field":"Route", "value":stop.ROUTE_ID},
                    {"field":"Description", "value":stop.DESCRIPTION},
                    {"field":"Stop #", "value":stop.ACTUAL_SEQUENCE_NUM}
                  ]}
                  visible={focused}
                  name={stop.DESCRIPTION}
                  guid={stop.DESCRIPTION}
                  deleteContact={() => {
                    console.log("What?");
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="half-wide">
          <MenuButton label="Contacts" icon="☎️" onClick={() => {navigate('/contacts')}} />
        </div>
      </div>
    </div>
  );
}

export default Home;