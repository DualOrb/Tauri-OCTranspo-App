import "./TripTime.css"

export default function TripTime( time ) {

    const date = new Date();
    
    const minute = (((parseInt(time["time"]["AdjustedScheduleTime"]) + date.getMinutes()) % 60) > 9 ? ((parseInt(time["time"]["AdjustedScheduleTime"]) + date.getMinutes()) % 60) : "0" + ((parseInt(time["time"]["AdjustedScheduleTime"]) + date.getMinutes()) % 60))

    return (
        <div key={time.time.TripStartTime} className="t-container">
            {/* No good way to add keys here it seems, as multiple time elements and all data is changing per pass through */}
            <p className="trip-time">{time["time"]["AdjustedScheduleTime"]} min{time["time"]["Longitude"] === "" ? "" : "*"} </p>
            <p className="scheduled-time">{(((parseInt(time["time"]["AdjustedScheduleTime"]) + date.getMinutes()) >= 60) ? (date.getHours() + 1) : date.getHours()) + ':' + minute}</p>
        </div>
    ) 
}