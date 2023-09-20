import React from 'react'
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import Button from '@mui/material/Button';
import Employee from "../Employee/Employee";
import DateRange from '../../mock-data/DateRange.json';
import { useState, useEffect } from 'react';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Details = () => {  
  localStorage.setItem("role", 'manager');
  const naviagate = useNavigate();
  const BacktoManagerApprove = () => {
    settoastOpen(true);
    setTimeout(() => naviagate("/manager"), 1000);
  }  
  const BacktoManagerRejected = () => {
    setrejectoast(true);
    setTimeout(() => naviagate("/manager"), 1000);

  }

 
  const BacktoManager = () => {
    
    naviagate("/manager")

  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    settoastOpen(false);
    setrejectoast(false);
  };
  var vertical = "top";
  var horizontal = "center";
  const [toastOpen, settoastOpen] = React.useState(false);
  const [rejectoast, setrejectoast] = React.useState(false);
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={toastOpen} autoHideDuration={6000} onClose={handleClose}  role="alertdialog" aria-labelledby="Approve-toast-message">
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Applied successfully
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={rejectoast} autoHideDuration={6000} onClose={handleClose}  role="alertdialog" aria-labelledby="reject-toast-message">
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Rejected successfully
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
      
        <Grid item xs={7}>
          <Button onClick={(e) => BacktoManager()} aria-label="Go Back to Manager" role='button' tabIndex={0}><ArrowBackIcon /></Button>
       
        </Grid>
        <Grid item xs={4}>

          <Grid item xs={6}>
            
          </Grid>
        </Grid >
        
        <Employee/>
        
        <Grid>
    
        </Grid>

      </Grid>
    </div>
  )
}



export default Details;