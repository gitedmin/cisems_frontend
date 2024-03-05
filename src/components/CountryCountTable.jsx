import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CountCountry.css'

const CountryCountTable = (props) => {
  const [countryCounts, setCountryCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3004/getLocationCounts');
        setCountryCounts(response.data);
      } catch (error) {
        console.error('Error fetching country counts:', error);
      }
    };

    fetchData();
  }, [props.isDataUploaded]);

  return (
    <div style={{textAlign:'center',borderCollapse:'collapse' ,height:'300px' ,overflow:'scroll'}}>
      <h1 style={{fontSize:'1rem',fontWeight:'bold'}}>Country Count</h1>
     
      <table style={{border:'1px solid white'}}>
        <thead >
          <tr>
            <th>Country</th>
            <th>Count</th>
          </tr>
        </thead >
        <tbody>
          {countryCounts.map((country, index) => (
            <tr key={index}  style={{border:'1px solid white'}}>
              <td style={{width:'200px'}}>{country._id}</td>
              <td>{country.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryCountTable;