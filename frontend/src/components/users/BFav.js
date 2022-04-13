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

const MyFav = (props) => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    const newInfo = {
        bemail: localStorage.getItem("email")
    };

    useEffect(() => {
        axios
            .post("http://localhost:4000/user/getfav", newInfo)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [count]);

    return (
        <div align={"center"}>
            <BLoginNavbar />
            <h1>My Favourites</h1>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Food Item</TableCell>
                                    <TableCell>Food Type</TableCell>
                                    <TableCell>Vendor Email</TableCell>
                                    <TableCell>Shop Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.nv}</TableCell>
                                        <TableCell>{user.vemail}</TableCell>
                                        <TableCell>{user.shopname}</TableCell>
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

export default MyFav;