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


const FoodMenu = (props) => {
    const [progress, setProgress] = useState("false");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [nv, setNv] = useState("");
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(0);

    const [fid, setFid] = useState("");
    const [users, setUsers] = useState([]);
    // const [shopname, setShop] = useState("");

    const newInfo = {
        vemail: localStorage.getItem("email")
    };

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
        .post("http://localhost:4000/food/getshop", newInfo)
        .then((response) => {
            // setShop(response.data)
            localStorage.setItem('shopname', response.data)
            // console.log(shopname);
        });
    }, [count]);



    const AddOn = () => {
        setProgress("1");
    };

    const onCancel = () => {
        setName("");
        setPrice(0);
        setNv("");
        setProgress("false");
    };

    const onChangeName = (event) => {
        setName(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeNv = (event) => {
        setNv(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        // const newEmail ={
        //     vemail: localStorage.getItem("email")
        // };

        // axios
            // .post("http://localhost:4000/food/getshop", newEmail)
            // .then((response) => {
            //     setShop(response.data)
            //     console.log(shopname);
            // });
        // console.log(shopname);

        const newFood = {
            name: name,
            price: price,
            rating: rating,
            nv: nv,
            vemail: localStorage.getItem("email"),
            shopname: localStorage.getItem("shopname"),
            count: 0
        };

        axios
            .post("http://localhost:4000/food/additem", newFood)
            .then((response) => {
                alert(response.data)
            });
        // resetInputs();
        setName("");
        setPrice(0);
        setNv("");
        setProgress("false")
        setCount((c) => c + 1)
    }

    const onDelete = (id) => {
        const newFood = {
            id: id
        };
        axios
            .post("http://localhost:4000/food/deleteitem", newFood)
            .then((response) => {
                alert(response.data)
            });
        setCount((c) => c + 1)
    }

    const onEdit = (user) => {
        setFid(user._id);
        setName(user.name);
        setPrice(user.price);
        setRating(user.rating);
        setNv(user.nv);
        setProgress("2");
    }

    const onSave = () => {
        const newFood = {
            id: fid,
            name: name,
            price: price,
            rating: rating,
            nv: nv,
            vemail: localStorage.getItem("email")
        };

        axios
            .post("http://localhost:4000/food/edititem", newFood)
            .then((response) => {
                alert(response.data)
            })
            setProgress("false")
            setName("");
            setPrice(0);
            setNv("");
            setCount((c) => c + 1)
            
    }

    return (
        <div>
            <VLoginNavbar />
            <br />
            <Grid container align={"center"} spacing={2}>
                {progress === "false" && <Grid item xs={12}>
                    <Button variant="contained" onClick={AddOn}>
                        Add Item
                    </Button>
                </Grid>}
                {progress === "1" &&
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeName}
                        />
                    </Grid>}
                {progress === "1" && <Grid item xs={12}>
                    <TextField
                        label="Price"
                        variant="outlined"
                        value={price}
                        onChange={onChangePrice}
                    />
                </Grid>}
                {progress === "1" && <Grid item xs={12}>
                    <TextField
                        label="Veg/Non-Veg"
                        variant="outlined"
                        value={nv}
                        onChange={onChangeNv}
                    />
                </Grid>}
                {progress === "1" &&
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Add
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button variant="contained" onClick={onCancel}>
                        Cancel
                    </Button>
                    </Grid>
                }
            </Grid>
            {progress == "2" &&
                <Grid container align={"center"} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            variant="outlined"
                            value={price}
                            onChange={onChangePrice}
                        />
                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            label="Veg/Non-Veg"
                            variant="outlined"
                            value={nv}
                            onChange={onChangeNv}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSave}>
                            Save
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button variant="contained" onClick={onCancel}>
                        Cancel
                    </Button>
                    </Grid>
                </Grid>
            }
                    <br />
                    {
                        <Grid container align={"center"}>
                            <Grid item xs={12} md={9} lg={9}>
                                <Paper>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Rating</TableCell>
                                                <TableCell>Food Type</TableCell>
                                                <TableCell>Edit Option</TableCell>
                                                <TableCell>Delete Option</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user, ind) => (
                                                <TableRow key={ind}>
                                                    <TableCell>{user.name}</TableCell>
                                                    <TableCell>{user.price}</TableCell>
                                                    <TableCell>{user.rating}</TableCell>
                                                    <TableCell>{user.nv}</TableCell>
                                                    <TableCell><Button variant="contained" onClick={() => onEdit(user)}>
                                                        Edit Item
                                                    </Button>
                                                    </TableCell>
                                                    <TableCell><Button variant="contained" onClick={() => onDelete(user._id)}>
                                                        Delete Item
                                                    </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    }
                </div>
    );
}

            export default FoodMenu;