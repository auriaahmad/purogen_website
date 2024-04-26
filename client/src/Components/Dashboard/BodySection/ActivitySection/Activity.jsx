// import React from 'react'
// import '../../../../App.css'
// import { BsArrowRightShort } from 'react-icons/bs'
// import user from '../../../../Assets/aldi.jpg'


// const Activity = ({ selectedUserData, userProfileData }) => {
//   return (
//     <div className="activitySection">
//       <br />
//       <div className="heading flex">
//         <h1>Client's Data</h1>
//         {/* <button className="btn flex">
//           See All
//           <BsArrowRightShort className="icon" />
//         </button> */}
//       </div>


//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Recipe</th>
//               <th>Weight</th>
//               <th>Mass</th>
//               <th>Process</th>
//               <th>Strain</th>
//               <th>Operator</th>
//               <th>Terpene Name</th>
//               <th>Manufacturer Name</th>
//               <th>Injection Vol.</th>
//               <th>Injections</th>
//               <th>Customer Name</th>
//               <th>Machine ID</th>
//               <th>Machine Location</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedUserData.map((user, index) => (
//               <tr key={user.user_data_id}>
//                 <td>{index + 1}</td>
//                 <td>{user.recipe}</td>
//                 <td>{user.weight}</td>
//                 <td>{user.mass}</td>
//                 <td>{user.process}</td>
//                 <td>{user.strain}</td>
//                 <td>{user.operator_name}</td>
//                 <td>{user.terpene_name}</td>
//                 <td>{user.manufacturer_name}</td>
//                 <td>{user.injection_volume}</td>
//                 <td>{user.injections}</td>
//                 <td>{user.customer_name}</td>
//                 <td>{user.Machine_ID}</td>
//                 <td>{user.Machine_Location}</td>
//                 <td>{new Date(user.created_at).toISOString().split('T')[0]}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Activity;

import React, { useState } from 'react';
import '../../../../App.css';
import { BiSearchAlt } from 'react-icons/bi';

const Activity = ({ onClose, selectedUserData, userProfileData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('Machine_ID');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Filter the selectedUserData based on searchQuery and selectedOption
  const filteredData = selectedUserData.filter((user) => {
    const fieldValue = user[selectedOption].toString().toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="lisitingSection">
        {/* <small>Username: {userProfileData.username}</small> */}
        <div className="heading flex">
          <h1>
            {userProfileData.first_name.charAt(0).toUpperCase() + userProfileData.first_name.slice(1)}{" "} 
            {userProfileData.last_name.charAt(0).toUpperCase() + userProfileData.last_name.slice(1)}'s Data
          </h1>
          <div className="searchBar">
            <label htmlFor="searchOptions">Search By:</label>
            <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
              <option value="Machine_ID">Machine ID</option>
              <option value="Machine_Location">Machine Location</option>
              <option value="created_at">Created At</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${selectedOption}`}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <BiSearchAlt className="icon" />
          </div>
        </div>
        <br />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Recipe</th>
                <th>Weight</th>
                <th>Mass</th>
                <th>Process</th>
                <th>Strain</th>
                <th>Operator</th>
                <th>Terpene Name</th>
                <th>Manufacturer Name</th>
                <th>Injection Vol.</th>
                <th>Injections</th>
                <th>Customer Name</th>
                <th>Machine ID</th>
                <th>Machine Location</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={user.user_data_id}>
                  <td>{index + 1}</td>
                  <td>{user.recipe}</td>
                  <td>{user.weight}</td>
                  <td>{user.mass}</td>
                  <td>{user.process}</td>
                  <td>{user.strain}</td>
                  <td>{user.operator_name}</td>
                  <td>{user.terpene_name}</td>
                  <td>{user.manufacturer_name}</td>
                  <td>{user.injection_volume}</td>
                  <td>{user.injections}</td>
                  <td>{user.customer_name}</td>
                  <td>{user.Machine_ID}</td>
                  <td>{user.Machine_Location}</td>
                  <td>{new Date(user.created_at).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={onClose}>Close</button>
    </>
  );
};

export default Activity;
