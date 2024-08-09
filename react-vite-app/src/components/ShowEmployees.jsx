import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowEmployees.css";
import { useNavigate } from "react-router-dom";

function ShowEmployees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://admin-panel-zjjm.onrender/api/employees"
        );
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("There was an error fetching the employees!", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredEmployees(employees);
    } else {
      setFilteredEmployees(
        employees.filter((employee) =>
          employee.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, employees]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://admin-panel-zjjm.onrender/api/employees/${id}`
      );
      if (response.status === 200) {
        setEmployees(employees.filter((employee) => employee._id !== id));
        setFilteredEmployees(
          filteredEmployees.filter((employee) => employee._id !== id)
        );
        navigate("/show-employees");
      }
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <br />
      <div className="headings">
        <h1>Employee List</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>
      <br />
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>
                  <a href={`mailto:${employee.email}`}>{employee.email}</a>
                </td>
                <td>{employee.mobile}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>
                  <img
                    src={employee.img}
                    alt={employee.name}
                    style={{
                      width: "50px",
                      height: "75px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <div className="show-buttons">
                    <button
                      id="edit-button"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Edit
                    </button>
                    <button
                      id="delete-button"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowEmployees;
