import BLoginNavbar from "../templates/BLoginNav";
import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const MyWallet = (props) => {
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [amount, setAmount] = useState(0);
//   const [progress, setProgress] = useState("false");

  const newUser = {
    email: localStorage.getItem("email"),
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/profile", newUser)
      .then((response) => {
        setEmail(response.data.email)
        setWallet(response.data.wallet)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [count]);



  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

//   const onStart = (event) => {
//     setProgress("1");
//   };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      wallet: parseInt(wallet) + parseInt(amount),
    };
    axios
      .post("http://localhost:4000/user/editamount", newUser)
      .then((response) => {
        alert(response.data)
      });
    
    setAmount(0)
    setCount((c) => c + 1)
    // setProgress("false")
  };

  return (
    <div container align={"center"}>
      <BLoginNavbar />
      <h2>Wallet Amount: {wallet}</h2>
      {/* {progress === "false" && <Button variant="contained" onClick={onStart}>
        Add Money
      </Button>} */}

      <Grid>
      <br />
      <Grid item xs={12}>
        <TextField
          label="Amount"
          variant="outlined"
          value={amount}
          onChange={onChangeAmount}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Add Money
        </Button>
      </Grid>
      </Grid>
    </div>
  );
};

export default MyWallet;