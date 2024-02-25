import "./BusRoute.css"
import TripTime from "./TripTime.jsx"
import { v4 as uuidv4 } from 'uuid';
import { ErrorBoundary } from "react-error-boundary";

export default function BusRoute( routeData ) {

    const styles = {
        "train-support": {
            "border-color": {
                "borderColor": routeData["routeData"]["RouteNo"] !== "2" ? "#E91C23" : "#24cc14",
            },
            "background-color": {
                "backgroundColor": routeData["routeData"]["RouteNo"] !== "2" ? "#E91C23" : "#24cc14",
            }
        }
    }

    console.log(JSON.stringify(routeData));

    return (
            <div className="route-container">
                <div className="bus-num" style={styles["train-support"]["background-color"]}>
                    <h3 >{routeData["routeData"]["RouteNo"]}</h3>
                </div>
                <div className="route-data">
                    <div className="bus-heading" style={styles["train-support"]["border-color"]}>
                        <h3>{routeData["routeData"]["RouteHeading"]}</h3>
                    </div>
                    <div className="trip-times-container">
                        <div className="trip-times">
                            <ErrorBoundary fallback={<div>No trip data available</div>}>
                                {/* When octranspo sends trip info, if length is 1, they don't pack it in an array */}
                                {routeData["routeData"]["Trips"].length > 1 ? (
                                    routeData["routeData"]["Trips"].map(function (tripData) {
                                        return (
                                            <TripTime key={uuidv4()} time={tripData}></TripTime>
                                        )
                                    })
                                ) : (
                                    <TripTime key={uuidv4()} time={routeData["routeData"]["Trips"]}></TripTime>
                                )}
                            </ErrorBoundary>
                            
                        </div>
                    </div>
                </div>
            </div>
    )
} 