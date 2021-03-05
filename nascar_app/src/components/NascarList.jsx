import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from '@reach/router';


const NascarList = (props) => {
    console.log("*********", "this is the list")
    const [drivers, setDrivers] = useState([]);
    


    useEffect(() => {
        axios.get('https://api.sportsdata.io/nascar/v2/json/drivers?key=5251db7df8ec450dbbed05941bd4f0cf')
        .then(response => setDrivers(response.data))
        .catch(err => console.log(err))

    },[])


    return(
        <div>
            <h1>List of all the Drivers</h1>

            <table className = "table  col-8 m-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Actions</th>
                        </tr>
                </thead>
                    <tbody>

                        {
                        drivers.map((drivers, i)=>{
                        return <tr key = {i}>
                                    <td>{drivers.FirstName} {drivers.LastName}</td>
                                    <td>{drivers.Number}</td>
                                    <td><Link className = "btn btn-info" to = {`/driver/${drivers.DriverID}`}>View Driver</Link>
                                    
                                    
                                    
                                    
                                    </td>
                                    
                                </tr>
                        })
                        }
                    </tbody>
            </table>
        </div>
    )
}
    export default NascarList;