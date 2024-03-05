import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import setdata from '../actions';
import axios from 'axios';

function UploadExcel({ onUploadSuccess }) {
  const [jsonData, setJsonData] = useState(null);
  const dispatch = useDispatch();
  const empData = useSelector(state => state.Empdata);

  const storeDataINDb = async (data) => {
    try {
      const response = await axios.post("http://localhost:3004/employeedata", data);
      
      console.log(response);
    } catch (error) {
      console.error("Error storing data:", error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(jsonData);
      const formattedData = formatData(jsonData); // Format data into desired format
  
      try {
        const formatedjsondata = JSON.stringify(formattedData);
        console.log("Formatted JSON Data:", formatedjsondata);
  
        await storeDataINDb(formattedData); // Sending formatted data to the backend
        // dispatch(setdata(formattedData)); // Dispatch formatted data to Redux store
        onUploadSuccess();
        
        // Clear input value
        //e.target.value = null;
      } catch (error) {
        console.error("Error processing upload:", error);
        // Handle error appropriately (e.g., show error message to user)
      }
    };
  
    reader.readAsArrayBuffer(file);
  };
  

  // Function to format the data into individual JSON objects
  const formatData = (data) => {
    const fieldNames = data[0]; // First row contains field names
    const formattedData = data.slice(1).map((row) => {
      const formattedRow = {};
      for (let i = 0; i < fieldNames.length; i++) {
        formattedRow[fieldNames[i]] = row[i];
      }
      return formattedRow;
    });
    return formattedData;
  };

  return (
    <div>
      <h1 style={{fontSize:'1rem',fontWeight:'bold'}}>Upload data</h1>
      <label htmlFor="fileInput" style={{ margin: '1px', border: '1px solid white', borderRadius: '5px', padding: '0.5rem', maxWidth: '200px', cursor: 'pointer' }}>
        Choose File
        <input type="file" id="fileInput" onChange={handleFileUpload} style={{ display: 'none' }} />
      </label>
    </div>
  );
}

export default UploadExcel;
