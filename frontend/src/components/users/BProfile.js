import BLoginNavbar from "../templates/BLoginNav";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const BProfile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactno, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batchname, setBatch] = useState("");
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const [wallet, setWallet] = useState(0);

  const [progress, setProgress] = useState("false");

  const newUser = {
    email: localStorage.getItem("email"),
  };
  useEffect(() => {
    axios
      .post("http://localhost:4000/user/profile", newUser)
      .then((response) => {
        setName(response.data.name)
        setEmail(response.data.email)
        setContact(response.data.contactno)
        setAge(response.data.age)
        setBatch(response.data.batchname)
        setPassword(response.data.password)
        setWallet(response.data.wallet)
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

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onStart = (event) => {
    setProgress("1");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: name,
      email: email,
      contactno: contactno,
      age: age,
      batchname: batchname,
      password: password
    };
    axios
      .post("http://localhost:4000/user/edit", newUser)
      .then((response) => {
        alert(response.data)
      });

    setCount((c) => c + 1)
    setProgress("false")
  };

  return (
    <div container align={"center"}>
      <BLoginNavbar />
      {progress === "false" && <h3>
      <h2>Name: {name}</h2>
      <h2>Email: {email}</h2>
      <h2>Contact Number: {contactno}</h2>
      <h2>Age: {age}</h2>
      <h2>Batch Name: {batchname}</h2>
      <h2>Password: {password}</h2>
      <h2>Wallet Amount: {wallet}</h2>
      </h3>}
      {progress === "false" && <Button variant="contained" onClick={onStart}>
        Edit Profile
      </Button>}

      {progress === "1" && <Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <TextField
          label="Contact Number"
          variant="outlined"
          value={contactno}
          onChange={onChangeContact}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <TextField
          label="Batch Name"
          variant="outlined"
          value={batchname}
          onChange={onChangeBatch}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Edit
        </Button>
      </Grid>
      </Grid>}
    </div>
  );
};

export default BProfile;