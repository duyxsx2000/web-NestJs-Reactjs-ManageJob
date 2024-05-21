const apiUrl = ''
const apiGetGroup = 'http://localhost:3002/group/getGroup/admin/g';
const apiCreateRoom = 'http://localhost:3002/room/createRoom';
const apiCreateTable = 'http://localhost:3002/table/createTable';
const apiCreateAccount = 'http://localhost:3002/users/createAccount';
const apiGetDataRoomById = 'http://localhost:3002/room/getRoom';
const apifetchTable = 'http://localhost:3002/table/fetchTable';
const apiGetDataTaskById = 'http://localhost:3002/task/getTask';
const apiEditTable = 'http://localhost:3002/group/editTable/t';
const apiUpdateRoom = 'http://localhost:3002/room/updateRoom';
const apiUpdateTable = 'http://localhost:3002/table/updateTable';
const apiCreateTask = 'http://localhost:3002/task/create';
const apiUpdateTask = 'http://localhost:3002/task/updataTask';
const apiUpdateMemberTask = 'http://localhost:3002/task/setMember/t';
const apijoinRoom = 'http://localhost:3002/room/waiting/joinRoom';
const  apiAddMemberForRoom = 'http://localhost:3002/room/addMember/joinRoom';
const  apiDeleteMemberByRoom = 'http://localhost:3002/room/deleteMember';
const apiDelateRoom = 'http://localhost:3002/room/delete';
const apiAcceptMember = 'http://localhost:3002/room/acceptMember';


export {
    apiUrl,
    apiGetGroup,
    apiCreateRoom,
    apiAcceptMember,
    apiUpdateMemberTask,
    apiDelateRoom,
    apiAddMemberForRoom,
    apiGetDataRoomById,
    apiCreateAccount,
    apiCreateTable,
    apijoinRoom,
    apiEditTable,
    apiUpdateRoom,
    apifetchTable,
    apiCreateTask,
    apiUpdateTask,
    apiGetDataTaskById,
    apiUpdateTable,
    apiDeleteMemberByRoom
    
}
