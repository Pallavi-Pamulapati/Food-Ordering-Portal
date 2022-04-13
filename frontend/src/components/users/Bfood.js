import { Grid } from "@mui/material";
import BLoginNavbar from "../templates/BLoginNav";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

const FoodItems = (props) => {
  const [users, setUsers] = useState([]);
  const [progress, setProgress] = useState("false");

  const [cont, setCont] = useState(0);

  const [fid, setFid] = useState(0);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [vemail, setVemail] = useState("");
  const [shopname, setShop] = useState("");
  const [status, setStatus] = useState(0);
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [prog, setProg] = useState("false");

  const newBie = {
    bemial: localStorage.getItem("email")
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [cont]);

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const onOrder = (user) => {
    setName(user.name)
    setVemail(user.vemail)
    setShop(user.shopname)
    setPrice(user.price)
    setFid(user._id)
    setCount(user.count)
    setProgress("1");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setCost(parseInt(price) * parseInt(quantity))
    const newOrder = {
      name: name,
      quantity: quantity,
      bemail: localStorage.getItem("email"),
      vemail: vemail,
      shopname: shopname,
      status: status,
      cost: quantity * price,
      fid: fid
    };

    const newBuy = {
      bemial: localStorage.getItem("email")
    }
    axios
      .post("http://localhost:4000/order/addorder", newOrder)
      .then((response) => {
        alert(response.data)
      })

    setProgress("false")
    setQuantity(1);
    setCont((c) => c + 1)
  }

  const onCancel = () => {
    setProgress("false");
  };
  const addFav = (user) => {
    const newFav = {
      name: user.name,
      bemail: localStorage.getItem("email"),
      vemail: user.vemail,
      nv: user.nv,
      shopname: user.shopname,
      fid: user._id
    }

    axios
      .post("http://localhost:4000/user/addfav", newFav)
      .then((response) => {
        if (response.data.check === "true")
          alert("Added to Favorites")
        else if (response.data.check === "error")
          alert("Error!!")
        else if (response.data.check === "false")
          alert("Already Added")

        console.log(response.data)
      })
  };

  const checkAvail = (user) => {
    const newAvail = {
      vemail: user.vemail
    } 

    axios
      .post("http://localhost:4000/vendor/checkavail", newAvail)
      .then((response) => {
        alert(response.data)
      })
  }

  const deleteFav = (user) => {
    const newFav = {
      name: user.name,
      bemail: localStorage.getItem("email"),
      vemail: user.vemail,
      nv: user.nv,
      shopname: user.shopname,
      fid: user._id
    }

    axios
      .post("http://localhost:4000/user/deletefav", newFav)
      .then((response) => {
        alert(response.data)
        console.log(response.data)
      })
  };
  return (
    <div align={"center"}>
      <BLoginNavbar />
      {/* <h2>Wallet Amount: </h2> */}
      {progress === "1" &&
        <Grid item xs={12}>
          <h1>
            <TextField
              label="Quantity"
              variant="outlined"
              value={quantity}
              onChange={onChangeQuantity}
            />
          </h1>
        </Grid>
      }
      {progress === "1" &&
        <Grid ><Button variant="contained" onClick={onSubmit}>
          Submit Order
        </Button>&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      }
      <h1>Food Items List </h1>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Food Type</TableCell>
                  <TableCell>Vendor Email</TableCell>
                  <TableCell>Shop Name</TableCell>
                  <TableCell>Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.price}</TableCell>
                    <TableCell>{user.rating}</TableCell>
                    <TableCell>{user.nv}</TableCell>
                    <TableCell>{user.vemail}</TableCell>
                    <TableCell>{user.shopname}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => checkAvail(user)}>
                        Check
                      </Button>
                    </TableCell>
                      <TableCell>
                      <Button variant="contained" onClick={() => onOrder(user)}>
                        Buy
                      </Button>
                    </TableCell>
                    <TableCell>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => addFav(user)}>
                        Add to Favorites
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => deleteFav(user)}>
                        Delete From Favourites
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default FoodItems;