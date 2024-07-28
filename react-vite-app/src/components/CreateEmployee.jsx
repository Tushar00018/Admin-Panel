import React, { useState } from "react";
import axios from "axios";
import "./CreateEmployee.css";
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        employee
      );
      navigate(response.data.redirect);
    } catch (error) {
      console.error("There was an error creating the employee!", error);
    }
  };

  return (
    <div className="create-employee">
      <h1>Create Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            id="name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile</label>
          <br />
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={employee.mobile}
            onChange={handleChange}
            max={10}
            min={10}
            required
          />
        </div>
        <div>
          <label htmlFor="designation">Designation</label>
          <br />
          <select
            name="designation"
            id="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <br />
          <select
            name="gender"
            id="gender"
            value={employee.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="course">Course</label>
          <br />
          <select
            name="course"
            id="course"
            value={employee.course}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="MBA">MBA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </div>
        <div>
          <label htmlFor="img">Image URL</label>
          <br />
          <input
            type="text"
            name="img"
            id="img"
            value={employee.img}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" id="create-button">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateEmployee;
