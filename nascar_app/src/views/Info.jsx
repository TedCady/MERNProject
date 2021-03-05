import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Info = props => {
    const { FirstName, LastName, Team, CrewChief, Manufacturer, Sponsors} = props

const [driverInfo, setDriverInfo]=useState("")




useEffect(() =>{
    axios.get( `https://api.sportsdata.io/nascar/v2/json/driver/${props.id}?key=5251db7df8ec450dbbed05941bd4f0cf`)
    .then(response => setDriverInfo(response.data))
    .catch (err => console.log(err))
},[])
    

return (
    <div>
        <h2>{driverInfo.FirstName} {driverInfo.LastName}</h2>
        <ul>
            <li><b>Team: </b>{driverInfo.Team}</li>
            <li><b>Crew Chief: </b>{driverInfo.CrewChief}</li>
            <li><b>Manufacturer: </b>{driverInfo.Manufacturer}</li>
            <li><b>Sponsors: </b>{driverInfo.Sponsors}</li>
        </ul>
    </div>
)

};

export default Info;