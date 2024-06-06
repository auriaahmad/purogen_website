import '../../../../App.css';
import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ParticularCustomerMachineData = ({ onClose, selectedMachineData, customerProfileData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('processes');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredMachineData = selectedMachineData.filter((machine) => {
    const fieldValue = machine[selectedOption].toString().toLowerCase();
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["No.", "Machine ID", "Machine Location", "Process", "Recipe", "Weight", "Mass", "Strain", "Terpene Name", "Manufacturer Name", "Injection Vol.", "Injections", "Customer Name", "Operator", "Run Date"];
    const tableRows = [];

    filteredMachineData.forEach((machine, index) => {
      const machineData = [
        index + 1,
        machine.machine_id,
        machine.machine_location,
        machine.processes,
        machine.recipe,
        machine.weight,
        machine.mass,
        machine.strain,
        machine.terpene_name,
        machine.manufacturer_name,
        machine.injection_volume,
        machine.injections,
        machine.customer_name,
        machine.operator,
        new Date(machine.created_at).toISOString().split('T')[0],
      ];
      tableRows.push(machineData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Machine Data", 14, 15);
    doc.save(`${customerProfileData.first_name}_${customerProfileData.last_name}_Machines.pdf`);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredMachineData.map((machine, index) => ({
      "No.": index + 1,
      "Machine ID": machine.machine_id,
      "Machine Location": machine.machine_location,
      "Process": machine.processes,
      "Recipe": machine.recipe,
      "Weight": machine.weight,
      "Mass": machine.mass,
      "Strain": machine.strain,
      "Terpene Name": machine.terpene_name,
      "Manufacturer Name": machine.manufacturer_name,
      "Injection Vol.": machine.injection_volume,
      "Injections": machine.injections,
      "Customer Name": machine.customer_name,
      "Operator": machine.operator,
      "Run Date": new Date(machine.created_at).toISOString().split('T')[0]
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Machines");

    XLSX.writeFile(wb, `${customerProfileData.first_name}_${customerProfileData.last_name}_Machines.xlsx`);
  };

  return (
    <>
      <div className="lisitingSection">
        <div className="heading flex">
          <h1>
            {customerProfileData.first_name.charAt(0).toUpperCase() + customerProfileData.first_name.slice(1)}{' '}
            {customerProfileData.last_name.charAt(0).toUpperCase() + customerProfileData.last_name.slice(1)}'s Cycle Data
          </h1>
          <div className="searchBar">
            <label htmlFor="searchOptions">Search By:</label>
            <select id="searchOptions" value={selectedOption} onChange={handleSelectChange}>
              <option value="processes">Process</option>
              <option value="recipe">Recipe</option>
              <option value="weight">Weight</option>
              <option value="mass">Mass</option>
              <option value="strain">Strain</option>
              <option value="terpene_name">Terpene Name</option>
              <option value="manufacturer_name">Manufacturer Name</option>
              <option value="injection_volume">Injection Volume</option>
              <option value="injections">Injections</option>
              <option value="operator">Operator</option>
              <option value="created_at">Run Date</option>
            </select>
            <input
              type="text"
              placeholder={`Type...`}
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <br />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Machine ID</th>
                <th>Machine Location</th>
                <th>Process</th>
                <th>Recipe</th>
                <th>Weight</th>
                <th>Mass</th>
                <th>Strain</th>
                <th>Terpene Name</th>
                <th>Manufacturer Name</th>
                <th>Injection Vol.</th>
                <th>Injections</th>
                <th>Customer Name</th>
                <th>Operator</th>
                <th>Run Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredMachineData.map((machine, index) => (
                <tr key={machine.customers_machine_data_id}>
                  <td>{index + 1}</td>
                  <td>{machine.machine_id}</td>
                  <td>{machine.machine_location}</td>
                  <td>{machine.processes}</td>
                  <td>{machine.recipe}</td>
                  <td>{machine.weight}</td>
                  <td>{machine.mass}</td>
                  <td>{machine.strain}</td>
                  <td>{machine.terpene_name}</td>
                  <td>{machine.manufacturer_name}</td>
                  <td>{machine.injection_volume}</td>
                  <td>{machine.injections}</td>
                  <td>{machine.customer_name}</td>
                  <td>{machine.operator}</td>
                  <td>{new Date(machine.created_at).toISOString().split('T')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal_btn_container">
        <button id='close_btn' onClick={onClose}>Close</button>
        <div>
          <button id='download_pdf_btn' onClick={downloadPDF}>Download as PDF</button>
          <button id='download_xls_btn' onClick={downloadExcel}>Download as Excel</button>
        </div>
      </div>
    </>
  );
};

export default ParticularCustomerMachineData;
