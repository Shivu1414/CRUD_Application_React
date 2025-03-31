import React from 'react'
import './App.css';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Add() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');

    const navigat = useNavigate();


    const handleClear = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setContact('');
    }

    const handleSave = (e) => {
        e.preventDefault();
        axios.get('http://localhost:3030/user')
        .then(res => {
            const users = res.data;
            let maxId = users.length>0 ? Math.max(...users.map(us => us.id)) : 0;
            maxId = JSON.stringify(maxId);
            const newObject = {
              id: (maxId+1),
              firstName: firstName,
              lastName: lastName,
              Age: age,
              contact: contact
            }
            axios.post('http://localhost:3030/user', newObject)
            .then(res => {
                alert("Data Added Successfully!");
                navigat('/');
            })
            .catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

  return (
    <>
    <div className='div-opn'>
        <div>
          <label>First Name : 
            &nbsp;<input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name : 
            &nbsp;<input type='text' placeholder='Enter Last Name' onChange={(e)=> setLastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Age :
            &nbsp;<input type='text' placeholder='Enter Age' onChange={(e)=> setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          <label>Contact :
            &nbsp;<input type='number' placeholder='Enter phone no.' onChange={(e)=> setContact(e.target.value)} value={contact} />
          </label>
        </div>
    </div>
    <div className='div-btn'>
      <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
      &nbsp;<button className='btn btn-danger' onClick={() => handleClear()} >Clear</button>
    </div>
    </>
  )
}

export default Add