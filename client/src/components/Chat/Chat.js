import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import Messages from '../Messages/Messages';

import TextContainer from '../TextContainer/TextContainer'

let socket; 


const Chat = ({location}) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState();
    const [users,setUsers] = useState('');

    const ENDPOINT = 'https://realtimechatapp-react.herokuapp.com/';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT);

        // console.log(location.search);
        // console.log(name, room);
        setName(name);
        setRoom(room);
        
        socket.emit('join',{name , room} , () =>{
        
        
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        // its es6 syntax - same as name:name, room:room
    },[ENDPOINT,location.search] );
    // only if endpt or location.search then only re-render our useEffect

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);

        })
        socket.on("roomData",({users}) => {
            setUsers(users);
        });

    }, [messages])
    // only run this if messages array changes 

    // function for sending messages 
    const sendMessage = (event) => {
        event.preventDefault(); // prevent the page from refeshing - default behaviour of keypress or btn
        if (message){
            socket.emit('sendMessage', message, () => setMessage(''));

        }
    }

    console.log(message, messages);

    return(
        <div className="outerContainer">
            <div className="container">
            <InfoBar room= {room}/>
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>


            </div>
            <TextContainer users={users}/>
        </div>

        )
}

export default Chat;

// useEffect is similar to componentDidMount and componentDidUnmount 
// in line 8, we are trying to retrieve the data that users have entered while joining 
// location comes from react-router,and it gives us a prop called location which we can use in this file
// location.search gives ?name=karthik&room=123
// queryString parses this to give a object {name: "karthik", room: "123"}name: "karthik"room: "123"
