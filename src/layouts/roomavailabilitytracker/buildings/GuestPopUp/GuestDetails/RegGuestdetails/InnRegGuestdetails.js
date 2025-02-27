// import React from 'react'
import * as React from "react";

import Box from "@mui/material/Box";
//import Paper from '@mui/material/Paper';
//import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function InnregGuestDetails(props) {
    console.log(props.guestdetails.noticeDate)
    function formatDate(checkInDate) {
        var datePart = checkInDate.match(/\d+/g),
          year = datePart[0].substring(2), // get only two digits
          month = datePart[1],
          day = datePart[2];
    
        return day + "-" + month + "-" + year;
      }
    //   if (props.guestdetails.noticeDate) {
    //     var myDate = props.guestdetails.noticeDate;
    //     myDate = myDate.split("");
    //     console.log(myDate);
    //     var date = [];
    //     date.push(myDate);
    //     console.log(date);
    //   } else {
    //     console.log("");
    //   }
    
    //   var ndate =props.guestdetails.noticeDate
    //   var ndate1 = formatDate(ndate)
    //   console.log(ndate1);
      
      var s = props.guestdetails.plannedCheckOutDate.toLocaleString("ko-KR", {
        timeZone: "Asia/Kolkata",
      });
      console.log(s);
      var da = formatDate(s)
      function createData(name, calories) {
        return { name, calories };
      }
      
      const rows = [
        createData(<h4>Guest Id</h4>, props.guestdetails.id),
        createData(<h4>Guest Name</h4>, props.guestdetails.firstName),
        createData(<h4>Mobile</h4>, props.guestdetails.personalNumber),
        createData(<h4>Email</h4>, props.guestdetails.email),
        createData(<h4>Bed ID</h4>, props.guestdetails.bedId),
        createData(<h4>Guest Status</h4>, props.guestdetails.guestStatus),
        
        createData(<h4>Occupancy Type</h4>, props.guestdetails.occupancyType),
        
    
      ];
      const rows1=[
        
        createData(<h4>Check-In Date</h4>, props.guestdetails.checkInDate),
        createData(<h4>Due Amount</h4>, 'Rs.'+props.GuestDueAmount),
        createData(<h4>Check Out Initiated Date</h4>,formatDate(props.guestdetails.noticeDate)),
        
        createData(<h4>Planned Check-Out Date</h4>,da),
        createData(<h4>AmountPaid</h4>, 'Rs.'+ props.guestdetails.amountPaid),
        
        createData(<h4>Security Deposit</h4>,'Rs.'+ props.guestdetails.securityDeposit ),
        createData(<h4>Default Rent</h4>,'Rs.'+ props.guestdetails.defaultRent )
    
      ]

      console.log('this is innotice regular guy')
  return (
    <Grid container spacing={2} columns={16} >
    <Grid item xs={8}>
{/* <TableContainer component={Paper}> */}
  <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          {/* <TableCell align="right">{row.carbs}</TableCell> */}
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
{/* </TableContainer> */}
</Grid>
<Grid item xs={8}>
{/* <TableContainer component={Paper}> */}
  <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
  
      </TableRow>
    </TableHead>
    <TableBody>
      {rows1.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
{/* </TableContainer> */}
</Grid>
</Grid>
  )
}

export default InnregGuestDetails