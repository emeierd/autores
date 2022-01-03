import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createform = () => {
    const [nameValidation, setNameValidation] = useState({ valid: false, text: null });
    const navigate = useNavigate();

    const validate = (e) => {
        switch (e.target.name) {
            case "name":
                if (e.target.value.length < 3) {
                    setNameValidation({ valid: false, text: <p>Name should have at least 3 characters</p> });
                    break;
                } else {
                    setNameValidation({ valid: true, text: null });
                    break;
                }
            default:
                return null;
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nameValidation.valid) {
            const formEl = e.target.closest('form');
            const formData = new FormData(formEl);
            const entries = {};
            for (let [key, value] of formData.entries()) entries[key] = value.trim();

            console.log(entries)

            try {
                const res = await axios.post('/api/autor/create', entries);
                console.log(res);
                alert("Autor created!")
                e.target.reset();
            } catch (err) {
                console.error(err);
                alert("Error, try again")
            }
        } else {
            alert("Form doesn't match all requirements")
        }
    };

    const cancel = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <>
            <form className='form' onSubmit={onSubmit}>
                <div><label htmlFor='name'>Name</label> {nameValidation.text}</div>
                <input type="text" id="name" name="name" onChange={validate} />
                <button>Submit</button>
            </form>
            <button onClick={cancel}>Cancel</button>
        </>
    );
}

export default Createform;
