import '../../../../App.css';
import React,  { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ParticularCustomerMachineData = ({ onClose, selectedMachineData }) => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(',', '');
  };

    const filteredMachineData = selectedMachineData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by date, most recent first

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["No.", "Machine ID", "Machine Location", "Process", "Recipe", "Weight", "Mass", "Strain", "Terpene Name", "Manufacturer Name", "Injection Vol.", "Injections", "Operator", "Chamber", "Run Date"];
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
        machine.operator,
        machine.chamber,
        formatDate(machine.created_at)
      ];
      tableRows.push(machineData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Machine Data", 14, 15);
    const customer = JSON.parse(localStorage.getItem('user'));
    const customerName = `${customer.first_name}_${customer.last_name}`;
    doc.save(`${customerName}_Machines.pdf`);
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
      "Operator": machine.operator,
      "Chamber": machine.chamber,
      "Run Date": formatDate(machine.created_at)
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Machines");
    const customer = JSON.parse(localStorage.getItem('user'));
    const customerName = `${customer.first_name}_${customer.last_name}`;
    XLSX.writeFile(wb, `${customerName}_Machines.xlsx`);
  };

  return (
    <>
      <div className="listingSection">
        <div className="heading flex">
          <h1>Machine Data</h1>
        </div>
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
                <th>Operator</th>
                <th>Chamber</th>
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
                  <td>{machine.operator}</td>
                  <td>{machine.chamber}</td>
                  <td>{formatDate(machine.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal_btn_container">
          <button id='close_btn' onClick={onClose}>Close</button>
          <div>
            <button id='download_pdf_btn' onClick={downloadPDF}>Download as PDF</button>
            <button id='download_xls_btn' onClick={downloadExcel}>Download as Excel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticularCustomerMachineData;
