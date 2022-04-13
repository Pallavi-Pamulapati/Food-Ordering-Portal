import { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  }; 

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password
    };
    
        axios
          .post("http://localhost:4000/user/login", newUser)
          .then((response) => {
            // console.log("reached")
            if(response.data.check === "false")
            {
              alert("Not Found! Please register")
              navigate("/register")
            }
            else if(response.data.check === "buyer")
            {
              localStorage.setItem('email', email)
              navigate("/buyerwelcome")
            }
            else if(response.data.check === "vendor")
            {
              localStorage.setItem('email', email)
              navigate("/vendorwelcome")
            }// else 
            //   alert(response.data.check)
            console.log(response.data);
          });
      // console.log("error");
      resetInputs();
  };

  return (
    <div container align={"center"}>    
      <Grid container align={"center"} spacing={2}>
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
            label="Password"
            variant="outlined"
            value={password}
            onChange={onChangePassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={onSubmit}>
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
