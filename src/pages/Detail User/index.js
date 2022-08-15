import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import './styles.css'

const Detail = (props) => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`).then((res) => setUser(res.data.data)).catch((err) => console.log(err))
    }, [])

    return (
        <div className="detail-form">
            <label id="email">Email</label>
            <input
                placeholder={user.email}
                type="text"
                id="email"
                name="email"
            ></input>
            <label id="first-name">First Name</label>
            <input
                placeholder={user.first_name}
                type="text"
                id="first-name"
                name="first-name"
            ></input>
            <label id="last-name">Last Name</label>
            <input
                placeholder={user.last_name}
                type="text"
                id="last-name"
                name="last-name"
            ></input>
            <button>Update</button>
        </div>
    )
}

export default Detail