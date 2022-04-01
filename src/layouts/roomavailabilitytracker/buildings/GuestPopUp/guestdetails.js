import React from 'react';
import { Grid } from '@mui/material';
import MDTypography from 'components/MDTypography';

function Guestdetails(props) {
  return (
    <div><Grid container spacing={1}>
    <Grid item xs={12}>
        <MDTypography
            // id="outlined-textarea"
            //   label="Guest Id"
            style={{ width: '65%', marginLeft: '50px', marginBottom: '20px', }}
        >Guest Id&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :   {props.guestdetails.id}</MDTypography>
    </Grid>
    <Grid item xs={12}>
        <MDTypography
            // id="outlined-textarea"
            //   label="Guest Id"
            style={{ width: '65%', marginLeft: '50px', marginBottom: '20px', }}
        >Guest Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {props.guestdetails.firstName}</MDTypography>
    </Grid>
    <Grid item xs={12} >
        <MDTypography
            // id="outlined-textarea"
            //   label="Guest Id"
            style={{ width: '65%', marginLeft: '50px', marginBottom: '20px', }}
        >Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {props.guestdetails.email}</MDTypography>

    </Grid>
    <Grid item xs={12} >
        <MDTypography
            // id="outlined-textarea"
            //   label="Guest Id"
            style={{ width: '65%', marginLeft: '50px', marginBottom: '20px', }}
        >Mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {props.guestdetails.personalNumber}</MDTypography>
    </Grid>
    <Grid item xs={12} >
        <MDTypography
            // id="outlined-textarea"
            //   label="Guest Id"
            style={{ width: '65%', marginLeft: '50px', marginBottom: '20px', }}
        >Father's Mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{props.guestdetails.fatherNumber}</MDTypography>
    </Grid>

    <Grid item xs={4}></Grid>
    <Grid item xs={5} >
        <MDTypography style={{ color: 'red', }} >
            
            Due amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 5000</MDTypography>
    </Grid>
    </Grid></div>
  )
}

export default Guestdetails