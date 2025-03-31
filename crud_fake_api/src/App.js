import axios from "axios";
import { useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigat = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3030/user')
    .then(res =>{
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    })
  },[])

  const handleDelete = (id) =>{
    console.log(typeof(id))
    const conf = window.confirm("Did you really want to delete it");
    if(conf){
      axios.delete('http://localhost:3030/user/'+id)
      .then(res => {
        alert("Record has been deleted");
        navigat('/');
        window.location.reload();
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <>
    <Link to={`/create`} className='btn btn-primary add-btn'>Add Data</Link>
    <div className="App">
      <table className="table table-hover">
        <thead>
          <tr>
            <th >Sr.No.</th>
            {columns?.map((item,index)=>{
              return (
                <th key={index}>{item.charAt(0).toUpperCase()+ item.slice(1)}</th>
              )
            })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            records?.map((item,index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.Age}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Link to={`/edit/${item.id}`} className='btn btn-primary'>Edit</Link>&nbsp;
                    <button className='btn btn-danger' onClick={e=>handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ) 
            })
          }
        </tbody>
      </table>
    </div>
    </>
  );
}

export default App;
