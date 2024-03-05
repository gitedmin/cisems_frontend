import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TableRepresentation.css'

const TableRepresentation = (props) => {
  const [countryCounts, setCountryCounts] = useState([]);
  const columnName =props.columnname; // Your column name

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const encodedColumnName = encodeURIComponent(columnName);
        const response = await axios.get(`http://localhost:3004/getLocationCounts/${encodedColumnName}`);
        setCountryCounts(response.data);
      } catch (error) {
        console.error('Error fetching country counts:', error);
      }
    };

    fetchData();
  }, [props.isDataUploaded]);
  return (
<div className='m-2' style ={{border:'1px solid white'}}>
<h1 style={{fontSize:'1rem',fontWeight:'bold',textAlign:'center',color:'blue'}}> {columnName}</h1>
     
     <div style={{textAlign:'center',borderCollapse:'collapse',height:'300px',overflow:'scroll' }}>
    
       <table>
         <thead >
           <tr>
             <th>{columnName}</th>
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
</div>
  );
};

export default TableRepresentation;