// ManagerSelect.jsx
import React, { useState } from "react";
import Select from "react-select";
import { useEffect } from "react";
import axios from 'axios';

const ManagerSelect = (props) => {
  const [selectedOption, setSelectedOption] = useState();
  const [managers,setManagers] = useState([]);
  
  

  // Array of manager names
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get("http://localhost:3004/getAllMangers");
        setManagers(response.data);
     
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
  
    fetchManagers();
  }, [managers]);


  function handleSelect(selectedOption) {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      
      props.handleBoxClick(selectedOption.label)
      
    }
  }

  return (
    <div className="text-white" style={{ width: "200px" }}>
      <Select
        options={managers.map((name) => ({
          value: name,
          label: name
        }))}
        placeholder="Select manager"
        value={selectedOption}
        onChange={handleSelect}
        isSearchable={true}
        styles={{
          control: (provided, state) => ({
            ...provided,
            color: "white",
            border: state.isFocused ? "2px solid gray" : "2px solid white",
            borderRadius: "8px"
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "gray" : "gray",
            color: "white"
          })
        }}
      />
    </div>
  );
};

export default ManagerSelect;