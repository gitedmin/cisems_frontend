import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardRepresentation(props) {
  const [data, setData] = useState(null);
  const addedToShortlist = async (id) => {
    try {
      alert("Selected and added to selection list " + id);
      const response = await axios.put(`http://localhost:3004/addtoshortlist/${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  const RemoveFromList = async (id) => {
    try {
      alert("Selected and added to selection list " + id);
      const response = await axios.put(`http://localhost:3004/removefromshorlist/${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(props.data)
        const response = await axios.get(`http://localhost:3004/fetchbasedOnCondition/${props.data}`);
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchEmpOnManager = async () => {
      
      try {
        
        const response = await axios.get(`http://localhost:3004/getMangersOFEmployee/${props.data.slice(0,-7)}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    }

  
    const fetchEmpOnPrimaryskills = async () => {
      try {
        const response1 = await axios.get(`http://localhost:3004/primaryskills/${props.data.slice(0,-6)}`);
        setData(response1.data);
        // Handle the data or set it to state if you're using React
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }



   console.log(props.data  +"props")
    if (props.data.slice(-7) === "manager") {
      console.log(props.data )   //skills
      fetchEmpOnManager()
    } else if(props.data.slice(-6) === "skills"){
      console.log(props.data +"hlro")
      fetchEmpOnPrimaryskills()
    
    }
    else{
      console.log(props.data)
      fetchData()
    }
  }, [props.data]);

  return (
    <div>
      {data && (
        <div style={{padding:'20px', width: '100%'}}>
          <div style={{ height: '50vh', padding:'1rem', border:'2px solid white', overflow: 'scroll', margin: ' 10px auto', overflowX: 'hidden' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }} className='tablestyles'>
              <thead style={{ backgroundColor: '#1F4788', margin: '1rem' }}>
                <tr>
                  <th style={{ padding: '1px', textAlign: 'left' }}>S.No</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Employee ID</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Employee Name</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Band</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Account Name</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Location Descr</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Resource Type</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Primary Skill</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Skill Category for Primary Skill</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Skill Level for Primary Skill</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Tools Known</th>
                  <th style={{ padding: '1px', textAlign: 'left' }}>Selection</th>
                </tr>
              </thead>
              <tbody>
                {data.map((emp, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                    <td style={{ padding: '1px' }}>{index + 1}</td>
                    <td style={{ padding: '1px' }}>{emp['Employee ID']}</td>
                    <td style={{ padding: '1px' }}>{emp['Employee Name']}</td>
                    <td style={{ padding: '1px' }}>{emp['Band']}</td>
                    <td style={{ padding: '1px' }}>{emp['Account']}</td>
                    <td style={{ padding: '1px' }}>{emp['Location Descr']}</td>
                    <td style={{ padding: '1px' }}>{emp['Resource Type']}</td>
                    <td style={{ padding: '1px' }}>{emp['Category']}</td>
                    <td style={{ padding: '1px' }}>{emp['Primary Skill']}</td>
                    <td style={{ padding: '1px' }}>{emp['Skill Category for Primary Skill']}</td>
                    <td style={{ padding: '1px' }}>{emp['Skill Level for Primary Skill']}</td>
                    <td style={{ padding: '1px' }}>{emp['Tools Known']}</td>
                    <td style={{ padding: '1px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <button onClick={() => { addedToShortlist(emp['Employee ID']) }} className='btn btn-primary m-1'>Add</button>
                        <button onClick={() => { RemoveFromList(emp['Employee ID']) }} className='btn btn-primary m-1'>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardRepresentation;