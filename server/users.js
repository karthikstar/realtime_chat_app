const users = [];

const addUser = ({id, name, room}) =>{
    //Javascript Mastery -> javascriptmastery

    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser){
        return {error:'Username is taken'};
    }

    const user = {id,name,room};

    users.push(user)
    return {user}

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index!== -1){
        return users.splice(index,1)[0];
        // removing the user from the users array
    }

}

const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// exporting these 4 helper functions.

module.exports = {addUser, removeUser , getUser , getUsersInRoom};
