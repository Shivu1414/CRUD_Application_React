import logo from './logo.svg';
import './App.css';
import {employeeData} from './EmployeeData';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  const [totalId, setTotalId] = useState(0);

  useEffect(() => {
    setData(employeeData);
    setTotalId(employeeData.length);
  },[]);

  const handleEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if(dt !== undefined){
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
      setContact(dt[0].contact);
    }
  }

  const handleDelete = (id) => {
    if(id > 0){
      if(window.confirm("Are you sure to delete this item")){
        const dt = data.filter((item) => {
          return item.id !== id;
        })
        setData(dt);
      }
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    const dt = [...data];

    const newObject = {
      id: totalId + 1,
      firstName: firstName,
      lastName: lastName,
      age: age,
      contact: contact
    }
    setTotalId(totalId+1);
    console.log(totalId);

    dt.push(newObject);
    setData(dt);
    handleClear();
  }

  const handleUpdate = () => {
    const index = data.map((item, index) => {
      return item.id;
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    dt[index].contact = contact;

    setData(dt);
    handleClear();
  }

  const handleClear = () => {
      setId(0);
      setFirstName('');
      setLastName('');
      setAge('');
      setContact('');
      setIsUpdate(false);
  }

  return (
    <div className="App">
      <div className='div-opn'>
        <div>
          <label>First Name : 
            &nbsp;<input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name : 
            &nbsp;<input type='text' placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Age :
            &nbsp;<input type='text' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          <label>Contact :
            &nbsp;<input type='number' placeholder='Enter phone no.' onChange={(e) => setContact(e.target.value)} value={contact} />
          </label>
        </div>
        <div>
          {
            !isUpdate ?
            <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
            :
            <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
          }
          &nbsp;<button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item,index) => {
              return(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>{item.contact}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
