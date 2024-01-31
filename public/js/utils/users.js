const users = [];

const chat = [];
const User=require("../../../model/userDB")

// Join user to chat
const rooms = {}; // Object to store room-category 

function userJoin(id, username, room, count, cat, perguntas_vistas) {
  const existingRoom = rooms[room]; // Get the existing category of the room

  if (existingRoom && existingRoom !== cat) {
    // Room name is already occupied with a different category
    throw new Error("The room name is already occupied with a different category.");
  }

  const user = { id, username, room, count, cat, perguntas_vistas };
  users.push(user);

  // Store the room and its category
  rooms[room] = cat;

  return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find((user) => user.id === id);
}
function sortUsersByCount(user) {
    users.sort((a, b) => b.count - a.count);
  }

// User leaves chat
async function userLeave(id) {
    const user = getCurrentUser(id);

    if (user) {
        const { username, room, count, cat, perguntas_vistas } = user;
        const filter = { username };

        const update = {
            $inc: {
                [`total_score_${cat}`]: count,
                [`perguntas_vistas_${cat}`]: perguntas_vistas,
            },
        };

        await User.findOneAndUpdate(filter, update, { new: true, upsert: true });

        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }
}


async function userLeaveNormal(id) {
    const user = getCurrentUser(id);
    if (user) {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            return users.splice(index, 1)[0];
        }
    }
}
// Get room users
function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    sortUsersByCount, 
    userLeaveNormal,
    
};
