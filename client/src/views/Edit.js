import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editform from '../components/Editform';

const Edit = () => {
    const [autor, setAutor] = useState("");
    const { state } = useLocation();
    const entries = {"id": state._id};
    const navigate = useNavigate();

    useEffect(() => {
        const getAutor = async () => {
            try {
                const autorDb = await axios.post('/api/autor/get',entries);
                setAutor(autorDb.data.autor);
            } catch (err) {
                console.error(err);
                navigate('/')
            }
        }
        getAutor();
    }, []);

    return (
        <Editform autor={autor}/>
    );
}

export default Edit;
