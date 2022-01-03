import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Table from '../components/Table';

const Home = () => {
    const navigate = useNavigate();
    const [autors, setAutors] = useState([]);
    const [change, setChange] = useState("");

    useEffect(() => {
        const getAutors = async () => {
            try {
                const autorsDb = await axios.get('/api/autor/getAll');
                setAutors(autorsDb.data.autors);
            } catch (err) {
                console.error(err);
                navigate('/')
            }
        }
        getAutors();
    }, [change]);

    const add = (e) => {
        e.preventDefault();
        navigate('/create');
    }

    const changeState = (a) => {
        setChange(a);
    } 

    return (
        <>
            <button onClick={add}>Add</button>
            <Table autors={autors} changeState={changeState}/>
        </>
    );
}

export default Home;
