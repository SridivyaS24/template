import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "../../../../Uri";
import { Container, Grid, Typography, InputLabel } from "@mui/material";
import moment from "moment";
import { makeStyles } from "@mui/styles";
import Occupancytype from "./OccupancyType";
import Textfield from "./TextField";
import Select from "./Select";
import Gender from "./Gender";
import state from "./State";
import DateTimePicker from "./DataTimePicker";
import Button from "./Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import days from "./Days";
import months from "./Months";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: 35,
  },
  size: {
    width: 40,
    height: 30,
  },
});
var bid = null;
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  personalNumber: "",
  secondaryPhoneNumber: "",
  fatherName: "",
  fatherNumber: "",
  bloodGroup: "",
  occupation: "",
  gender: "",
  aadharNumber: "",
  buildingId: "",
  bedId: "",
  occupancyType: "",
  duration: "",
  amountPaid: "",
  transactionId: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  city: "",
  state: "",
  amountToBePaid: "",
  defaultRent: "",
  securityDeposit: "",
  checkinNotes: "",
};

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid FirstName ")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid LastName ")
    .required("Required"),
  fatherName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid LastName ")
    .required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  dateOfBirth: Yup.date()
    .required("DOB is Required")
    .test(
      "DOB",
      "Please choose a valid date of birth",
      (date) =>
        moment().diff(moment(date), "years") >= 12 &&
        moment().diff(moment(date), "years") <= 80
    ),
  bloodGroup: Yup.string()
    .matches(/^(A|B|AB|O)[+-]$/, {
      message: "Please enter valid Blood Group.",
      excludeEmptyString: false,
    })
    .required("Required"),

  occupation: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Occuaption ")
    .required("Required"),
  gender: Yup.string().required("Required"),
  personalNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Please enter Valid Mobile Number",
      excludeEmptyString: false,
    })
    .required("Required"),
  secondaryPhoneNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Please enter Valid Mobile Number",
      excludeEmptyString: false,
    })
    .required("Required"),
  fatherNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Please enter Valid Mobile Number",
      excludeEmptyString: false,
    })
    .required("Required"),

  aadharNumber: Yup.string()
    .matches(/^\d{4}\d{4}\d{4}$/, "Invalid Aadhar Number")
    .required("Required"),
  pincode: Yup.string()
    .matches(/^\d{2}\d{2}\d{2}$/, "Invalid PinCode Number")
    .required("Required"),

  bedId: Yup.string().required("Required"),

  addressLine1: Yup.string().required("Required"),
  city: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid City Name")
    .required("Required"),
  addressLine2: Yup.string().required("Required"),
  state: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Invalid State ")
    .required("Required"),
  buildingId: Yup.number().required("Required"),
  occupancyType: Yup.string().required("Required"),
  amountPaid: Yup.number().required("Required"),
  transactionId: Yup.string()
    .test(
      "len",
      "can be empty or with string at least 10 characters and not more than 30",
      (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || (val.length >= 10 && val.length <= 30);
      }
    )
    .required("Required"),
});

console.log(JSON.parse(sessionStorage.getItem("userdata")));

const GuestLoginForm = () => {
  const [building, setBuilding] = React.useState([]);
  const [oneBuilding, setoneBuilding] = React.useState([]);
  const [bed, setBed] = React.useState([]);
  const [availableBeds, setAvailableBeds] = React.useState([]);
  const [rent, setRent] = React.useState([]);
  const [duration, setDuration] = React.useState([]);
  const [defaultRentofBed, setDefaultRentofBed] = React.useState([]);
  const [amountTooPay, setAmountToPay] = React.useState([]);
  const [occtype, setOcctype] = React.useState([]);
  const [amt, setAmt] = React.useState([]);
  const [secureDepo, setSecureDepo] = React.useState([]);
  const [buildId, setBuildId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  let buildingNamesArray = [];
  let availableBedsByBuidlingName = [];
  let empty = [];
  const classes = useStyles();
  let userData = JSON.parse(sessionStorage.getItem("userdata"));

  let userBuildingId = userData.data.buildingId;
  let userType = userData.data.userType;
  var userID = userData.data.userId;
  useEffect(() => {
    axios

      .get("/bed/getAvailableBedsByBuildings")
      .then((res) => {
        setoneBuilding(res.data);
        console.log(res.data);

        res.data.map((data) => {
          if (userBuildingId === data.buildingId) {
            console.log("this is manager");
            buildingNamesArray.push(data.buildingName);
            console.log(buildingNamesArray);
          }
          // else if (userBuildingId === 0) {
          //   console.log("this is admin");
          //   buildingNamesArray.push(data.buildingName);
          // }
          else {
            console.log("hi");
          }
        });
        console.log(userID);
        console.log(buildingNamesArray);
        setBuilding(buildingNamesArray);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  var obje1 = oneBuilding.reduce(function (acc, cur, i) {
    acc[cur.buildingId] = cur.buildingName;

    return acc;
  }, {});
  console.log(obje1);

  const notify = () => toast();

  const handleClick = (id) => {
    console.log(id);
    if (userType !== "manager") {
      bid = id.target.dataset.value;
      console.log(bid);
      setBuildId(bid);
    } else {
      bid = userBuildingId;
      console.log(bid);
      setBuildId(bid);
    }

    const bool = oneBuilding.filter(
      (buildingData) => buildingData.buildingName == id.target.outerText
    );

    bool.map((bed) => setAvailableBeds(bed.beds));
  };

  availableBeds.map((item) => {
    availableBedsByBuidlingName.push(item.bedId);
  });

  const selectBed = (e) => {
    setBed(e.target.outerText);

    const bedRent = availableBeds.filter(
      (bed) => bed.bedId == e.target.outerText
    );

    bedRent.map((post) => {
      setRent(post.defaultRent);
      setDefaultRentofBed(post.defaultRent);
      setSecureDepo(post.securityDeposit);
    });
  };
  const occupency = (i) => {
    setOcctype(i.target.outerText);
    if (i.target.outerText == "Daily") {
      setDuration(days);
      var checkInAmount = amt * (defaultRentofBed / 30);
      setAmountToPay(checkInAmount.toFixed(0));
    } else if (i.target.outerText == "Monthly") {
      setOcctype(i.target.outerText);
      setDuration(months);
      var checkInAmount = amt * defaultRentofBed;
      setAmountToPay(checkInAmount);
    } else {
      setDuration(empty);
      setAmountToPay(defaultRentofBed + secureDepo);
    }
  };

  const calculateCheckAmount = (a) => {
    var occupencyTypeis = Object.keys(duration).length;
    setAmt(a.target.outerText);

    if (occupencyTypeis == 12) {
      var checkInAmount = a.target.outerText * defaultRentofBed;
      setAmountToPay(checkInAmount);
    } else if (occupencyTypeis == 15) {
      var checkInAmount = a.target.outerText * (defaultRentofBed / 30);
      setAmountToPay(checkInAmount.toFixed(0));
    } else {
      setAmountToPay(defaultRentofBed + secureDepo);
    }
  };

  const obj = { bedId: bed };
  const OnBoarding = "OnBoarding";
  const obj4 = { createdBy: userID };
  const objee = { defaultRent: rent };
  const obj1 = { securityDeposit: secureDepo };
  const obj2 = { amountToBePaid: amountTooPay };
  const obj3 = { paymentPurpose: OnBoarding };
  const obj5 = { buildingId: buildId };
  const amountNeedToPay = (n) => {};
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <Grid container onClick={handleClose}>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={(guest, { resetForm }) => {
                  handleToggle();

                  const gustes = Object.assign(guest, obj);

                  const gusting = Object.assign(gustes, objee);
                  const gusting1 = Object.assign(gusting, obj1);
                  const guestdata1 = Object.assign(gusting1, obj2);
                  const guestdata2 = Object.assign(guestdata1, obj4);
                  const guestdata3 = Object.assign(guestdata2, obj5);
                  const guestdata = Object.assign(guestdata3, obj3);

                  console.log(guestdata);
                  console.log(gusting.amountPaid);
                  console.log(amountTooPay);
                  if (guestdata.amountPaid == amountTooPay) {
                    const res = axios
                      .post(
                        "/guest/addGuest",

                        guestdata
                      )

                      .catch((err) => {
                        handleClose();
                        toast.error("Server error");
                      });

                    //console.log(res.data);
                    if (res.data !== null) {
                      handleClose();

                      toast.success("OnBoarded Successfully");

                      resetForm();
                      setTimeout(() => {
                        refreshPage();
                      }, 4000);
                    }
                  } else {
                    handleClose();
                    toast.error(" Need to pay full Amount");
                  }
                }}
              >
                {(formProps) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>
                          <br />
                          <h4 align="center">Allocate Room</h4>
                          <br />
                        </Typography>
                        <InputLabel id="demo-simple-select-labe">
                          {" "}
                          * Indicates fields are Required
                        </InputLabel>
                      </Grid>
                      {userType !== "manager" ? (
                        <Grid item xs={6}>
                          <h6>Select Building *</h6>

                          <Select
                            className={classes.root}
                            name="buildingId"
                            options={obje1}
                            onClick={handleClick}
                            required
                          ></Select>

                          <Grid item xs={6}></Grid>
                        </Grid>
                      ) : (
                        <Grid item xs={6}>
                          <h6>Select Building *</h6>

                          <Select
                            className={classes.root}
                            name="buildingId"
                            options={building}
                            onClick={handleClick}
                            required
                          ></Select>

                          <Grid item xs={6}></Grid>
                        </Grid>
                      )}

                      <Grid item xs={6}>
                        <h6>Select Bed *</h6>
                        <Select
                          className={classes.root}
                          name="bedId"
                          options={availableBedsByBuidlingName}
                          onClick={selectBed}
                        ></Select>
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-labe">
                          {" "}
                          OccupancyType *
                        </InputLabel>
                        <Select
                          className={classes.root}
                          name="occupancyType"
                          options={Occupancytype}
                          onClick={occupency}
                        />
                      </Grid>

                      {occtype === "Daily" || occtype === "Monthly" ? (
                        <Grid item xs={6}>
                          <InputLabel id="demo-simple-select-labe">
                            {" "}
                            Duration
                          </InputLabel>
                          <Select
                            className={classes.root}
                            name="duration"
                            options={duration}
                            onClick={calculateCheckAmount}
                          />
                        </Grid>
                      ) : (
                        console.log("")
                      )}

                      <Grid item xs={6}></Grid>
                      {occtype === "Daily" || occtype === "Monthly" ? (
                        console.log("")
                      ) : (
                        <Grid item xs={6}>
                          <Textfield
                            name="securityDeposit"
                            label="Security Deposit"
                            value={secureDepo}
                          />
                        </Grid>
                      )}

                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="defaultRent"
                          label="Default Rent"
                          value={defaultRentofBed}
                        />
                      </Grid>
                      <Grid item xs={6}></Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="amountToBePaid"
                          label="Amount To Be Paid"
                          value={amountTooPay}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <br />
                          <h4 align="center">Booking/Payment Details</h4>
                          <br />
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="amountPaid"
                          label="Amount Paid"
                          required
                          onClick={amountNeedToPay}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="transactionId"
                          label="Transaction ID"
                          required
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography>
                          <br />
                          <h4 align="center">Guest's Personal Information</h4>
                          <br />
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="firstName"
                          label="First Name"
                          required
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="lastName" label="Last Name" required />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield name="email" label="Email" required />
                      </Grid>
                      <Grid item xs={6}>
                        <DateTimePicker
                          maxdate={new Date()}
                          name="dateOfBirth"
                          label="Date of Birth"
                          required
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield
                          name="personalNumber"
                          label="Personal Phone"
                          required
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="secondaryPhoneNumber"
                          label="Secondary Phone"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield name="fatherName" label="Father's Name" />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield name="fatherNumber" label="Father's Phone" />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="bloodGroup" label="Blood Group" />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield name="occupation" label="Occupation" />
                      </Grid>
                      <br />

                      <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">
                          Select Gender *
                        </InputLabel>

                        <Select
                          IconComponent={(Gender) => (
                            <ArrowDropDownIcon className={classes.size} />
                          )}
                          name="gender"
                          options={Gender}
                          className={classes.root}
                        ></Select>
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield
                          name="aadharNumber"
                          label="Aadhar Number"
                          required
                        />
                      </Grid>

                      <Grid item xs={12} />

                      <Grid item xs={12}>
                        <Typography>
                          <h4 align="center">Permanent Address</h4>
                          <br />
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Textfield
                          name="addressLine1"
                          label="Address Line 1"
                          required
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="addressLine2" label="Address Line 2" />
                      </Grid>
                      <Grid item xs={6}>
                        <Textfield name="pincode" label="Pincode" required />
                      </Grid>

                      <Grid item xs={6}>
                        <Textfield name="city" label="City" required />
                      </Grid>

                      <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">
                          Select state *
                        </InputLabel>

                        <Select
                          IconComponent={(Gender) => (
                            <ArrowDropDownIcon className={classes.size} />
                          )}
                          name="state"
                          options={state}
                          className={classes.root}
                        ></Select>
                      </Grid>

                      <Grid item xs={12}>
                        <Textfield
                          name="checkinNotes"
                          label="Check-in Notes"
                          multiline
                          rows={3}
                        />
                      </Grid>

                      <Grid item xs={3} sx={{ paddingBottom: 3 }}>
                        <Button onClick={notify}>Submit</Button>
                      </Grid>
                    </Grid>
                    <ToastContainer
                      position="top-right"
                      min-width="2%"
                      autoClose={3000}
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
          </Container>
        </Grid>
      </Grid>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default GuestLoginForm;
