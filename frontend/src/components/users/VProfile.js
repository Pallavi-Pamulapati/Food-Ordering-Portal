import VLoginNavbar from "../templates/VloginNavbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const VProfile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const [shopname, setShop] = useState("");
  const [openning, setOpen] = useState("");
  const [closing, setClose] = useState("");
  const [progress, setProgress] = useState("false");

  const newVendor = {
    email: localStorage.getItem("email"),
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/vendor/profile",newVendor)
      .then((response) => {
        setName(response.data.name)
        setEmail(response.data.email)
        setContact(response.data.contactno)
        setShop(response.data.shopname)
        setOpen(response.data.openning)
        setClose(response.data.closing)
        setPassword(response.data.password)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact = (event) => {
    setContact(event.target.value);
  };

  const onChangeOpen = (event) => {
    setOpen(event.target.value);
  };

  const onChangeClose = (event) => {
    setClose(event.target.value);
  };
  const onStart = (event) => {
    setProgress("1");
  };
  const onSubmit = (event) => {
    event.preventDefault();

    const newVendor = {
      name: name,
      email: email,
      contactno: contactno,
      shopname: shopname,
      openning: openning,
      closing: closing,
      password: password
    };
        axios
          .post("http://localhost:4000/vendor/edit", newVendor)
          .then((response) => {
            alert(response.data)
          });

          setCount((c) => c + 1)
          setProgress("false")
  };

  return (
    <div container align={"center"}>
      <VLoginNavbar />
     {progress === "false" && <h3>
     <h2>Name: {name}</h2>
     <h2>Email: {email}</h2>
     <h2>Shop Name: {shopname}</h2>
     <h2>Contact Number: {contactno}</h2>
     <h2>Opening Time: {openning}</h2> 
     <h2>Closing Time: {closing}</h2>
     <h2>Password: {password}</h2>
    </h3>}
      {progress === "false" && <Button variant="contained" onClick={onStart}>
        Edit Profile
      </Button>}
    
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
          <Button variant="contained" onClick={onSubmit}>
            Edit
          </Button>
        </Grid>
        </Grid>}
    </div>
  );
};

export default VProfile;