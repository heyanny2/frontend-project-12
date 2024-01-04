import {useFormik} from "formik";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import UserDataContext from "../components/context/UserDataContext";
import {useContext} from "react";
import ChannelsPanel from "../components/chat/ChannelsPanel";
import ChatPanel from "../components/chat/ChatPanel";

const Home = () => {

    const currentUser = JSON.parse(localStorage.getItem('user'))
    console.log(currentUser)
    //const token = currentUser.token;


    // axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
    //     console.log(response);
    // });


    const formik = useFormik({
        initialValues: { message: " " },
        onSubmit: {}
    });

    return (
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
                <ChannelsPanel />
                <ChatPanel />
            </div>
        </div>
    );
}

export default Home;