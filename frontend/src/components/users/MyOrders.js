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

const MyOrders = (props) => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    const newInfo = {
        bemail: localStorage.getItem("email")
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/getorders", newInfo)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [count]);

    const incStatus = (user) => {
        const newOrder = {
            id: user._id,
            status: 4
        }

        axios
            .post("http://localhost:4000/order/incstatus", newOrder)
            .then((response) => {
                console.log(response.data)
            })
        
            setCount((c) => c + 1)
    };

    return (
        <div align={"center"}>
            <BLoginNavbar />
            <h1>My Orders</h1>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Food Item</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Vendor Email</TableCell>
                                    <TableCell>Shop Name</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.quantity}</TableCell>
                                        <TableCell>{user.vemail}</TableCell>
                                        <TableCell>{user.shopname}</TableCell>
                                        <TableCell>{user.cost}</TableCell>
                                        {user.status === 0 &&
                                        <TableCell>PLACED</TableCell>
                                        }
                                        {user.status === 1 &&
                                        <TableCell>ACCEPTED</TableCell>
                                        }
                                        {user.status === 2 &&
                                            <TableCell>COOKING</TableCell>
                                        }
                                        {user.status === 3 &&
                                        <Grid>
                                        <TableCell>READY FOR PICKUP</TableCell>
                                        <TableCell><Button variant="contained" onClick={() => incStatus(user)}>
                                        PICKED UP
                                    </Button></TableCell>
                                        </Grid>
                                        }
                                        {user.status === 4 &&
                                    <Grid item xs={12}>
                                        <TableCell>COMPLETED</TableCell>
                                    </Grid>
                                    }
                                    {user.status === 5 &&
                                    <Grid item xs={12}>
                                        <TableCell>REJECTED</TableCell>
                                    </Grid>
                                    }
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

export default MyOrders;