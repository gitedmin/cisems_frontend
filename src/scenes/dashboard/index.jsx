import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import UploadExcel from "../../components/UploadExcel";
import { useSelector } from "react-redux";
import { useState } from "react";
import DashboardData from "../../components/DashboardData";
import { DownloadOutlined } from '@mui/icons-material';
import BandGraph from "../../components/BandGraph";
import USTExp from "../../components/USTExp";
import PrimarySkills from "../global/PrimarySkills";
import CountryCountTable from "../../components/CountryCountTable";
import TableRepresentation from "../../components/TableRepresentation";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  // State for tracking data upload
  const [isDataUploaded, setIsDataUploaded] = useState(0);

  // Handle the uploaded data
  const handleUploadSuccess = () => {
    setIsDataUploaded(isDataUploaded +1);
  };
  

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <UploadExcel onUploadSuccess={handleUploadSuccess} />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "5px 10px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <div className="d-flex ">
      <BandGraph  isDataUploaded={isDataUploaded} />
      <USTExp isDataUploaded={isDataUploaded}  />
      
  <div style={{display:'flex',marginBottom:'30px'}}>
  <TableRepresentation  columnname ="Country"  isDataUploaded={isDataUploaded}/>
     <TableRepresentation  columnname ="Employee Status" isDataUploaded={isDataUploaded}/>
     <TableRepresentation  columnname ="Allocation %tage" isDataUploaded={isDataUploaded}/>
     <TableRepresentation  columnname ="Resource Type" isDataUploaded={isDataUploaded}/>
    
      

  </div>
      

      </div>

      <DashboardData  isDataUploaded = {isDataUploaded}/>
      
   
   
    </Box>
  );
};

export default Dashboard;