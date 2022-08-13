import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Modal, Box, Typography } from "@mui/material";

const Dashboard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  });

  const getData = () => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };

//   const handleDelete = (id) => {
//     axios
//       .delete(`https://reqres.in/api/users/${id}`)
//       .then((res) => {
//         if (res.status === 204) {
//           console.log(`user ${id} berhasil di hapus`);
//           handleClose();
//         }
//       })
//       .catch((err) => console.log(err));
//   };

  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`https://reqres.in/api/users/${id}`)
        if (res.status === 204) {
            console.log(`data berhasil di hapus`);
            handleClose();
        }
    } catch(error) {
        console.log(error)
    }
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="dashboard">
      {data.map((item) => (
        <div className="card">
          <p>{item.first_name}</p>
          <img src={item.avatar} />
          <button onClick={handleOpen}>Delete</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </Box>
          </Modal>
          <Link to={`/dashboard/${item.id}`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
