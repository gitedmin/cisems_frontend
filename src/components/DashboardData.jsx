import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import StatBox from '../components/StatBox';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from 'axios';
import DashboardRepresentation from './DashboardRepresentation';
import ManagerSelect from '../scenes/global/ManagerSelect';
import PrimarySkills from '../scenes/global/PrimarySkills';

function DashboardData(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [EmployeeData, setEmpData] = useState([]);
  const [EmployeeDataRepre, setEmpDataRepre] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [activeEmployeeCount, setActiveEmployeeCount] = useState(0);
  const [resourceWithValidVisaCount, setResourceWithValidVisaCount] = useState(0);
  //const [Band, setBand] = useState(0);
  //const [UstExperience, setUstExperience] = useState(0);
  //const [Country, setCountry] = useState(0);
  const [ResourceType, setResourceType] = useState(0);
  const [showRepresentation, setShowRepresentation] = useState(false);
  const [selectedBoxName, setSelectedBoxName] = useState(null);
  const [EmployeeStatus, setEmployeeStatus] = useState(0);
  const [AllocationPercentage, setAllocationPercentage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [props.isDataUploaded]);

  const handleBoxClick = (boxName) => {
    alert(boxName)
    setSelectedBoxName(boxName);
    setShowRepresentation(true);


  };

  const handleManagerSelect = (boxName) =>{
    alert(boxName+"manager")
    setSelectedBoxName(boxName+"manager");
    setShowRepresentation(true);

  }

  const handlePrimarySelect = (boxName) =>{
    alert(boxName+"skills")
    setSelectedBoxName(boxName+"skills");
    setShowRepresentation(true);

  }


  const boxstyles = {
    cursor: 'pointer'
  }


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/fetchdata');
      const data = response.data;

      setEmpData(data);

      const customerIDs = [...new Set(data.map(item => item["Customer ID"]))];
      setCustomerCount(customerIDs.length);

      const activeEmployees = data.filter(item => item["Employee Status"] === "Active");
      setActiveEmployeeCount(activeEmployees.length);

      const resourcesWithValidVisa = data.filter(item => item["Resource with Valid VISA"]);
      setResourceWithValidVisaCount(resourcesWithValidVisa.length);

      // const Band = data.filter(item => item["Band"]);
      // setBand(Band.length);

      // const UstExperience = data.filter(item => item["UST Experience"]);
      // setUstExperience(UstExperience.length);

      // const Country = data.filter(item => item["Country"]);
      // setCountry(Country.length);

      // const ResourceType = data.filter(item => item["Resource Type"]);
      // setResourceType(ResourceType.length);

      // const EmployeeStatus = data.filter(item => item["Employee Status"]);
      // setEmployeeStatus(EmployeeStatus.length);

      // const AllocationPercentage = data.filter(item => item["Allocation %tage"]);
      // setAllocationPercentage(AllocationPercentage.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const boxes = [
    { title: "Total Employees", value: EmployeeData.length, icon: <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Total Customers", value: customerCount, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Active Employee Count", value: activeEmployeeCount, icon: <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    { title: "Resources with Valid Visa", value: resourceWithValidVisaCount, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    //{ title: "Band", value: Band, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    //{ title: "UST Experience", value: UstExperience, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    //{ title: "Country", value: Country, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    //{ title: "Resource Type", value: ResourceType, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    //{ title: "Employee Status", value: EmployeeStatus, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> },
    //{ title: "Allocation %tage", value: AllocationPercentage, icon: <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} /> }
  ];

  return (
    <div>
    
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="100px"
        gap="15px"
        style={boxstyles}
      >
        {boxes.map((box, index) => (
          <Box
            key={index}
            gridColumn="span 2"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleBoxClick(box.title)}
          >
            <StatBox
              title={box.value}
              subtitle={box.title}
              icon={box.icon}
            />
          </Box>
        ))}
      </Box>
      <div className='d-flex '>
        <button className="btn btn-primary m-2 mt-3" onClick={() => { handleBoxClick("seletedlist") }}>Shorlist List</button>
        <button className="btn btn-primary m-2 mt-3" onClick={() => { handleBoxClick("removedlist") }}>Removed List</button>

       <div className='mt-3'>
      <div className='d-flex'>
      <ManagerSelect   handleBoxClick = {handleManagerSelect}  className="m-2" />
      <div style={{marginLeft:'10px'}}>
              <PrimarySkills handleBoxClick={handlePrimarySelect} className="m-52" />

      </div>
      </div>
       </div>

      </div>
      {showRepresentation && <DashboardRepresentation data={selectedBoxName} />}
    </div>
  );
}

export default DashboardData;