import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import VLoginNavbar from "../templates/VloginNavbar";

const Statistics = (props) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sortName, setSortName] = useState(true);
  const [top, setTop] = useState([]);
  const [progress, setProgress] = useState("false");
  const newInfo = {
    vemail: localStorage.getItem("email")
  };

  var placed = 0;
  var pending = 0;
  var complete = 0;

  useEffect(() => {
    axios
      .post("http://localhost:4000/food/vfood", newInfo)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
    axios
      .post("http://localhost:4000/order/ordersplaced", newInfo)
      .then((response) => {
          setOrders(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const sortChange = () => {
    let usersTemp = users;
   
    usersTemp.sort((a, b) =>  (b.count - a.count));
    setUsers(usersTemp);
    setTop(users.slice(0,5))
    setSortName(!sortName);
    if(progress === "false")
    setProgress("1")
    else 
    setProgress("false")
  };                  

  return (
    <div align={"center"}>
        <VLoginNavbar/>
       <h1> Statitics Page </h1>
       
       {progress === "false" && 
        <Grid>
             <Button variant="contained" onClick={sortChange}>
                 View Top 5
             </Button>
        </Grid>
        }
      {progress === "1" && <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>
                    Count
                  </TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {top.map((user, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind + 1}</TableCell>
                    <TableCell>{user.count}</TableCell>
                    <TableCell>{user.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>}
      <br/>
      {progress === "1" && <Grid>
             <Button variant="contained" onClick={sortChange}>
                 Unsee
             </Button>
        </Grid>}
      <Grid>
        {orders.map((usr, ind) => (
          <Grid>
            {(() => {
              if(usr.status === 0)
                placed = placed + 1
              else if(usr.status === 1 || usr.status === 2 || usr.status === 3)
                pending = pending + 1
              else if(usr.status === 4)
                complete = complete + 1
            })()}
          </Grid>
        ))}

        <h2>Orders Placed: {placed}</h2>
        <h2>Pending Orders: {pending}</h2>
        <h2>Completed Orders: {complete}</h2>
      
      </Grid>
    </div>
  );
};

export default Statistics;