import '../../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const MachinesListing = () => {
    const [machines, setMachines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('machine_id');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [machineData, setMachineData] = useState({});

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity to your preference
            zIndex: 1000 // Ensure the modal is on top of other elements
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '80%',
            width: '30%',
            hight: '50px',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3006/allRegisteredMachines', { withCredentials: true })
            .then(response => {
                const machines = response.data;
                setMachines(machines);
            })
            .catch(error => {
                console.error('Error fetching machine data:', error);
            });
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const filteredMachines = machines.filter((machine) => {
        const fieldValue = machine[selectedOption].toString().toLowerCase();
        return fieldValue.includes(searchQuery.toLowerCase());
    });

    const openDeleteModal = (machine) => {
        setSelectedMachine(machine);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedMachine(null);
    };

    const handleDeleteMachine = async () => {
        try {
            await axios.delete(`http://localhost:3006/deleteMachine/${selectedMachine.machine_register_id}`, { withCredentials: true });
            setMachines(machines.filter(machine => machine.machine_register_id !== selectedMachine.machine_register_id));
            closeDeleteModal();
            alert('Machine deleted successfully');
        } catch (error) {
            console.error('Error deleting machine:', error);
            alert('Error deleting machine');
        }
    };

    const openEditModal = (machine) => {
        setSelectedMachine(machine);
        setMachineData({
            machine_id: machine.machine_id,
            machine_location: machine.machine_location
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedMachine(null);
    };

    const handleEditInputChange = (event) => {
        const { name, value } = event.target;
        setMachineData({
            ...machineData,
            [name]: value
        });
    };

    const handleUpdateMachine = async () => {
        try {
            await axios.put(`http://localhost:3006/editMachine/${selectedMachine.machine_register_id}`, machineData, { withCredentials: true });
            setMachines(machines.map(machine => (machine.machine_register_id === selectedMachine.machine_register_id ? { ...machine, ...machineData } : machine)));
            closeEditModal();
            alert('Machine updated successfully');
        } catch (error) {
            console.error('Error updating machine:', error);
            alert('Error updating machine');
        }
    };

    return (
        <div className='mainContent'>
            <div className="lisitingSection">
                <div className="heading flex">
                    <h1>Machines</h1>
                    <div className="searchBar">
                        <label htmlFor="searchOptions">Search By:</label>
                        <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
                            <option value="machine_id">Machine ID</option>
                            <option value="machine_location">Machine Location</option>
                        </select>
                        <input
                            type="text"
                            placeholder={`Type...`}
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Machine ID</th>
                                <th>Machine Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMachines.map((machine, index) => (
                                <tr key={machine.machine_register_id}>
                                    <td>{index + 1}</td>
                                    <td>{machine.machine_id}</td>
                                    <td>{machine.machine_location}</td>
                                    <td className="actions">
                                        <div className='action_buttons_container'>
                                            <button id='action_btn_edit' onClick={() => openEditModal(machine)}>Edit</button>
                                            <button id='action_btn_delete' onClick={() => openDeleteModal(machine)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Delete Machine Modal */}
            <Modal isOpen={isDeleteModalOpen} onRequestClose={closeDeleteModal} style={customStyles}>
                <div className="modal_size_action">
                    <h2>Confirm Delete</h2>
                    <br />
                    {selectedMachine && (
                        <p>Are you sure you want to delete machine {selectedMachine.machine_id}?</p>
                    )}
                    <div className="modal-delete-buttons">
                        <button onClick={handleDeleteMachine}>Yes</button>
                        <button onClick={closeDeleteModal}>No</button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isEditModalOpen} onRequestClose={closeEditModal} style={customStyles}>
                <h2>Edit Machine</h2>
                <br />
                {selectedMachine && (
                    <form className="modal-form">
                        <label>
                            Machine ID:
                            <input type="text" name="machine_id" value={machineData.machine_id} onChange={handleEditInputChange} />
                        </label>
                        <label>
                            Machine Location:
                            <input type="text" name="machine_location" value={machineData.machine_location} onChange={handleEditInputChange} />
                        </label>
                        <div className="modal-form-buttons">
                            <button type="button" onClick={handleUpdateMachine}>Submit</button>
                            <button type="button" onClick={closeEditModal}>Cancel</button>
                        </div>
                    </form>
                )}
            </Modal>

        </div>
    );
};

export default MachinesListing;
