import React from "react";
import "./Home.css"
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import image from '../../../src/image.png';

const Home = () => {
  const navigate = useNavigate();
  const ColorButton = styled(Button)(({ theme }) => ({
  
    backgroundColor: "#ce3e5d",
   
  }));
  const ColorButtonManager = styled(Button)(({ theme }) => ({
  
    backgroundColor: "#008484",
   
  }));
  return (
    <div>
       <div > 
      <img src={image} alt="Snow"/>
      <div className="homebtn">
        <div className="empbtn">
        <ColorButton variant="contained" color='success' className="info" size="large" onClick={() => navigate("/employee")}  role="button"  tabIndex={0}  aria-label="Navigate to Employee">Employee</ColorButton>
        </div>
        <div className="empbtn">
        <ColorButtonManager variant="contained" color='success' size="large" onClick={() => navigate("/manager")} role="button"  tabIndex={0}  aria-label="Navigate to Manager">Manager</ColorButtonManager>
        </div>
        
        
      </div>
      </div> 
    </div>
  );
};

export default Home;
