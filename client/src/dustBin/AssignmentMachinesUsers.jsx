// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { AiOutlineSwapRight } from 'react-icons/ai';
// import { BsFillShieldLockFill } from 'react-icons/bs';
// import { FaUserShield } from 'react-icons/fa';

// const AssignmentMachineUser = () => {
//   const [machines, setMachines] = useState([]);
//   const [selectedMachine, setSelectedMachine] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState('');
//   const [assignmentResult, setAssignmentResult] = useState('');

//   useEffect(() => {
//     // Fetch the list of machines
//     axios.get('http://localhost:3006/allRegisteredMachines')
//       .then(response => {
//         setMachines(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching machine data:', error);
//       });

//     // Fetch the list of users
//     axios.get('http://localhost:3006/allRegisteredUsers')
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//   }, []);

//   const handleMachineChange = (event) => {
//     setSelectedMachine(event.target.value);
//     setSelectedUser('');
//   };

//   const handleUserChange = (event) => {
//     setSelectedUser(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Check if a machine and user are selected
//     if (!selectedMachine || !selectedUser) {
//       alert('Please select a machine and a user.');
//       return;
//     }

//     // Prepare the assignment data
//     const assignmentData = {
//       machine_id: selectedMachine,
//       user_id: selectedUser,
//     };

//     // Send the assignment request
//     axios.post('http://localhost:3006/userMachineAssign', assignmentData)
//       .then(response => {
//         setAssignmentResult('Machine assigned successfully');
//       })
//       .catch(error => {
//         console.error('Error assigning machine to user:', error);
//         alert('Error assigning machine to user.');
//       });
//   };

//   return (
//     <div className="assignmentMachineUser">
//       <h2>Assign Machine to User</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="inputDiv">
//           <label htmlFor="machine">Select Machine:</label>
//           <div className="input flex">
//             <BsFillShieldLockFill className="icon" />
//             <select value={selectedMachine} onChange={handleMachineChange}>
//               <option value="">Select Machine</option>
//               {machines.map(machine => (
//                 <option key={machine.machine_id} value={machine.machine_id}>
//                   {machine.machine_name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="inputDiv">
//           <label htmlFor="user">Select User:</label>
//           <div className="input flex">
//             <FaUserShield className="icon" />
//             <select value={selectedUser} onChange={handleUserChange}>
//               <option value="">Select User</option>
//               {users.map(user => (
//                 <option key={user.user_id} value={user.user_id}>
//                   {user.username}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button type="submit" className="btn">
//           <span>Assign Machine</span>
//           <AiOutlineSwapRight className="icon" />
//         </button>
//       </form>

//       {assignmentResult && <p>{assignmentResult}</p>}
//     </div>
//   );
// };

// export default AssignmentMachineUser;
