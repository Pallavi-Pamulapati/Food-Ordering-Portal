import { Grid } from "@mui/material";
import VLoginNavbar from "../templates/VloginNavbar";
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

const OrdersPlaced = (props) => {

    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    const newInfo = {
        vemail: localStorage.getItem("email")
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/order/ordersplaced", newInfo)
            .then((response) => {
                setUsers(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [count]);

    const incStatus = (user) => {
        
        if (user.status !== 4) {
            const newOrder = {
                id: user._id,
                status: user.status + 1
            }

            axios
                .post("http://localhost:4000/order/incstatus", newOrder)
                .then((response) => {
                    console.log(response.data)
                })
        }
        setCount((c) => c + 1)
    };

    const onReject = (user) => {
        const newOrder = {
            id: user._id,
            status: 5
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
            <VLoginNavbar />
            <h1>Orders Placed</h1>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Food Item</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Buyer Email</TableCell>
                                    <TableCell>Status</TableCell>
                                    {/* <TableCell></TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.quantity}</TableCell>
                                        <TableCell>{user.bemail}</TableCell>
                                        {user.status === 0 &&
                                            <Grid item xs={12}>
                                                <TableCell>PLACED</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={() => incStatus(user)}>
                                                        MOVE TO NEXT STAGE
                                                    </Button></TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={() => onReject(user)}>
                                                        REJECT
                                                    </Button>
                                                </TableCell>
                                            </Grid>
                                        }
                                        {user.status === 1 &&
                                            <Grid item xs={12}>
                                                <TableCell>ACCEPTED</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={() => incStatus(user)}>
                                                        MOVE TO NEXT STAGE
                                                    </Button></TableCell>
                                            </Grid>
                                        }
                                        {user.status === 2 &&
                                            <Grid item xs={12}>
                                                <TableCell>COOKING</TableCell>
                                                <TableCell>
                                                    <Button variant="contained" onClick={() => incStatus(user)}>
                                                        MOVE TO NEXT STAGE
                                                    </Button></TableCell>
                                            </Grid>
                                        }
                                        {user.status === 3 &&
                                            <Grid item xs={12}>
                                                <TableCell>READY FOR PICKUP</TableCell>
                                                <TableCell>
                                                    {/* <Button variant="contained" onClick={() => incStatus(user)}>
                                        MOVE TO NEXT STAGE
                                    </Button> */}
                                                </TableCell>
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

export default OrdersPlaced;