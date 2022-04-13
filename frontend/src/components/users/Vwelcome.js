import VLoginNavbar from "../templates/VloginNavbar";

const Welcomev = (props) => {
    return  ( 
        <div>
            <VLoginNavbar/>
            <h1>Vendor Home Page</h1>
        </div>
    );    
}

export default Welcomev

// const UsersList = (props) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/user")
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
    //   <Grid container>
    //     <Grid item xs={12} md={9} lg={9}>
    //       <Paper>
    //         <Table size="small">
    //           <TableHead>
    //             <TableRow>
    //               <TableCell>Name</TableCell>
    //               <TableCell>Price</TableCell>
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {users.map((user, ind) => (
    //               <TableRow key={ind}>
    //                 <TableCell>{user.name}</TableCell>
    //                 <TableCell>{user.email}</TableCell>
    //               </TableRow>
    //             ))}
    //           </TableBody>
    //         </Table>
    //       </Paper>
    //     </Grid>
    //   </Grid>
//     </div>
//   );
// };
