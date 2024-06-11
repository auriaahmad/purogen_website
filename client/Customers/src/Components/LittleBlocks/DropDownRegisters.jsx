import React, { useState } from 'react';
import '../../App.css'; 

const Dropdown = ({ label, options, optionLabel, optionValue, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option[optionLabel]);
    onSelect(option);
  };

  const filteredOptions = options.filter(option => 
    option[optionLabel].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dropdown">
      <label>{label}</label>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleSearchQueryChange} 
        placeholder={`Search ${label}`} 
      />
      <select value={selectedOption} onChange={(e) => handleOptionSelect(filteredOptions.find(option => option[optionLabel] === e.target.value))}>
        <option value="">Select {label}</option>
        {filteredOptions.map(option => (
          <option key={option[optionValue]} value={option[optionLabel]}>
            {option[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
