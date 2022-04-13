import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function Register(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [progress, setProgress] = useState("false");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batchname, setBatch] = useState("");
  const [password, setPassword] = useState("");

  const [shopname, setShop] = useState("");
  const [openning, setOpen] = useState("");
  const [closing, setClose] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buyer = () => {
    setProgress("2");
  };

  const Vendor = () => {
    setProgress("1");
  };

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShop(event.target.value);
  };

  const onChangeOpen = (event) => {
    setOpen(event.target.value);
  };

  const onChangeClose = (event) => {
    setClose(event.target.value);
  };

  const resetbuyerInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setAge("");
    setBatch("");
    setPassword("");
  };

  const resetVendorInputs = () => {
    setName("");
    setShop("");
    setEmail("");
    setContact("");
    setOpen("");
    setClose("");
    setPassword("");
  };
 
  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      contactno: contactno,
      age: age,
      batchname: batchname,
      password: password,
      wallet: 0,
    };
     
        axios
          .post("http://localhost:4000/user/register", newUser)
          .then((response) => {
            if(response.data.check === "true")
              alert("Registration Sucessfull")
            else if(response.data.check === "error")
              alert("Error!!")
            else if(response.data.check === "false")
              alert("Email Already Exists");
            console.log(response.data);
          });
      // console.log("error");
      resetbuyerInputs();
  };

  const onSubmitVendor = (event) => {
    event.preventDefault();
    const newVendor = {
      name: name,
      shopname: shopname,
      email: email,
      contactno: contactno,
      openning: openning,
      closing: closing,
      password: password
    }

    axios
      .post("http://localhost:4000/vendor/vregister", newVendor)
      .then((response) => {
        if(response.data.check === "0")
          alert("Registration Sussessfull !!");
        else if(response.data.check === "1")
          alert("Email Alreay Exists !!")
        else if(response.data.check === "2")
          alert("Shop Name Already Exists !!")
        else if(response.data.check === "3")
          alert("Error !!")
        console.log(response.data);
      });
    // console.log("error");
    resetVendorInputs();
  };

  return (
    <div container align={"center"}>
      {progress === "false" && <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Click here to Select Role
      </Button>}
      {progress === "false" && <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={Vendor}>Vendor</MenuItem>
        <MenuItem onClick={buyer} >Buyer</MenuItem>
      </Menu>}

      {progress === "2" && <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={contactno}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Batch Name"
            variant="outlined"
            value={batchname}
            onChange={onChangeBatch}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Register
          </Button>
        </Grid>
      </Grid>}
      {/* vendor details */}
      {progress === "1" && <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={onChangeUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Shop Name"
            variant="outlined"
            value={shopname}
            onChange={onChangeShopName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contact Number"
            variant="outlined"
            value={contactno}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Openning time"
            variant="outlined"
            value={openning}
            onChange={onChangeOpen}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Clossing Time"
            variant="outlined"
            value={closing}
            onChange={onChangeClose}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmitVendor}>
            Register
          </Button>
        </Grid>
      </Grid>}
    </div>
  );
};

export default Register;

