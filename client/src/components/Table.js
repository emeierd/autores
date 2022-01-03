import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Table = ({ autors, changeState }) => {
    const navigate = useNavigate();

    const edit = (e, _id) => {
        e.preventDefault();
        navigate('/edit', { state: {_id: _id} })
    }

    const remove = async (e, _id) => {
        e.preventDefault();
        const json = {id: _id};

        try {
            const res = await axios.post('/api/autor/remove', json);
            console.log(res);
            alert("Autor deleted!")
            changeState(res);
        } catch (err) {
            console.error(err);
            alert("Error, try again")
        }
    }
    
    return (
        <table>
                <thead>
                    <th>Name</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {autors.sort((a, b) => a.name.localeCompare(b.name)).map((autor, i) => <tr key={i}>
                        <td>{autor.name}</td>
                        <td><button onClick={e => edit(e, autor._id)}>Edit</button><button onClick={e => remove(e, autor._id)}>Remove</button></td>
                    </tr>
                    )}
                </tbody>
            </table>
    );
}

export default Table;
