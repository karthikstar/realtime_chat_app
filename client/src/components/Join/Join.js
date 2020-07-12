import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';


const Join = () => {
    //declare hooks inside the function based components.
    //pass in a var, and setter function. in the useState(''), pass in the inital value of var.
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /></div>
                
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;

// the link onclick handler bhasically checks that if theres no name or room entered prevent the event from occuring. 
//Link has a to property - pass in parameters using question mark . first param is name, then use & to divide the param, then next param is room .
