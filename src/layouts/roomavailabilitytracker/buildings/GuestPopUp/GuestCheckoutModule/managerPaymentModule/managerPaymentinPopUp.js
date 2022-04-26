import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import axios from "../../../../../../Uri";
import { Container, Grid, InputLabel } from "@mui/material";
import MDTypography from "components/MDTypography";

import { makeStyles } from "@mui/styles";

import Textfield from "layouts/profile/GuestLoginForm/components/TextField";
import Select from "layouts/profile/GuestLoginForm/components/Select";
import ManagerPaymentPurpose from "./ManagerPaymentPurpose";

import Button from "layouts/profile/GuestLoginForm/components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Backdrop,CircularProgress } from "@mui/material";
import "./managerPaymentinPopUp.css";


import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import MDTypography from "components/MDTypography";
// import { height } from "@mui/system";

const useStyles = makeStyles({
  root: {
    height: 40,
  },
  size: {
    width: 40,
    height: 30,
  },
  gap: {
    paddingLeft: 20,
    height: 100,
  },
});

const FORM_VALIDATION = Yup.object().shape({
  paymentPurpose: Yup.string().required("Required"),
  amountPaid: Yup.number().required("Required"),
  transactionId: Yup.string().required("Required"),
});
const notify = () => toast();

const ManagerPaymentsinPopup = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  // var GuestID = props.guestdetails.id;
  var INITIAL_FORM_STATE = {
    paymentPurpose: "",
    paymentmethod: "",
    amountPaid: "",
    transactionId: "",
    // guestId: GuestID,
  };

  const classes = useStyles();

  return (
    <div className="record-payment">
 <Grid container>
   <Grid item xs={12}><MDTypography>REFUND TO THE GUEST :</MDTypography></Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div>
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION} 
              onSubmit={async (guest, { resetForm }) => {
                console.log(guest);
                handleToggle()

                const res = await axios.post("/payment/addPaymentAtOnBoarding", guest)
                .catch((err) => {
                  toast.error("Server error");
                });
                console.log(res.data);
               
                if(res.data!==null){
                  handleClose()
                  toast.success("Payment Recorded Successfully");
                
                }

                       
              
                setTimeout(() => {
                  resetForm();
                }, 50);
              }}
            >
              {(formProps) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Textfield name="amountPaid" label="Amount Paid" />
                    </Grid>
                    <Grid item xs={6}>
                      <Textfield name="transactionId" label="Transaction ID" />
                    </Grid>

                    <Grid item xs={6}>
                      <InputLabel id="demo-simple-select-label">
                        &nbsp; Payment Method
                      </InputLabel>

                      <Select
                        // IconComponent={(Purpose) => (
                        //   <ArrowDropDownIcon className={classes.size} />
                        // )}
                        name = "paymentMethod"
                        options = {ManagerPaymentPurpose}
                        className={classes.root}
                      />
                    </Grid>

                    <Grid item xs={6} sx={{ marginTop: 2 }}>
                      <Button  >REFUND</Button>
                    </Grid>
                  </Grid>
                  <ToastContainer  maxWidth="sx"
               position="top-right"
               autoClose={3000}
               type="toast.TYPE.SUCCESS"
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               />
                </Form>
              )}
            </Formik>
          </div>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
        </Container>
      </Grid>
    </Grid>

    </div>
      );
};

export default ManagerPaymentsinPopup;