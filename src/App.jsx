import { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid';
import carletonLogo from "./assets/CarletonUniversityLogo.png";
import { invoke } from '@tauri-apps/api/tauri'
import "./App.css";
import BusStop from "./BusStop";

import useInterval from "./hooks/UseInterval"

function App() {
  const [schedule_data, setScheduleData] = useState({ "stops": [{ "GetRouteSummaryForStopResult": { "StopNo": "", "Error": "", "StopDescription": "Loading...", "Routes": { "Route": [{ "RouteNo": "-", "RouteHeading": "Loading...", "DirectionID": 1, "Direction": "", "Trips": [{ "Longitude": "", "Latitude": "", "GPSSpeed": "0", "TripDestination": "Loading...", "TripStartTime": "-", "AdjustedScheduleTime": "-", "AdjustmentAge": "0.48", "LastTripOfSchedule": false, "BusType": "" }, { "Longitude": "", "Latitude": "", "GPSSpeed": "", "TripDestination": "Loading...", "TripStartTime": "-", "AdjustedScheduleTime": "-", "AdjustmentAge": "0.88", "LastTripOfSchedule": false, "BusType": "" }, { "Longitude": "", "Latitude": "", "GPSSpeed": "", "TripDestination": "Loading...", "TripStartTime": "-", "AdjustedScheduleTime": "-", "AdjustmentAge": "-1", "LastTripOfSchedule": false, "BusType": "" }] }] } } }] });

  const date = new Date();
  const currTime = date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  
  // Gets initial data on mount
  useEffect(() => {
    invoke('get_schedule_data').then((data) => setScheduleData(JSON.parse(data)))
  }, [])

  // Every minute, ask the backend for more data
  useInterval(() => {
    invoke('get_schedule_data').then((data) => setScheduleData(JSON.parse(data)))
  }, 60000);

  return (
    <div className="container">
      <div className="title-bar">
        <img src={carletonLogo} className="logo react" alt="React logo" />
        <h1>Bus Schedule</h1>
        <h1 className="current-time">{currTime}</h1>
      </div>

      <div className="schedule-container">
        {schedule_data["stops"].map(function (stopData, index) {
          return (
            <BusStop key={uuidv4()} stopData={stopData["GetRouteSummaryForStopResult"]} />
          )
        })}
        
      </div>
      
    </div>
  );
}

export default App;