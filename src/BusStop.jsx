import BusRoute from "./BusRoute"
import "./BusStop.css"
import { v4 as uuidv4 } from 'uuid';

export default function BusStop( stopData ) {

    return (
        <div className="stop-container">
            <div className="stop-title-container">
                <span>
                    <h2>{stopData.stopData["StopDescription"]} {stopData.stopData["StopNo"]} </h2>
                </span> 
            </div>
            {stopData.stopData["Routes"]["Route"].map((data) => {
                return (
                    <BusRoute key={uuidv4()} routeData={data} />
                )
            })}
            <br />
        </div>
    )
    

}

