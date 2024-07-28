import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditEmplyoee.css";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    img: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`
        );
        setEditForm(response.data);
      } catch (error) {
        console.error("There was an error fetching the employee data!", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        { editForm }
      );

      if (response) {
        navigate(response.data.redirect);
      } else {
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="edit-form">
      <form onSubmit={handleEditSubmit}>
        <h2>Edit Employee</h2>
        {/* <div className="edit-Form"> */}
        <br />
        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleEditChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <br />
          <input
            type="email"
            name="email"
            value={editForm.email}
            onChange={handleEditChange}
            required
          />
        </label>
        <br />
        <label>
          Mobile:
          <br />
          <input
            type="text"
            name="mobile"
            value={editForm.mobile}
            onChange={handleEditChange}
            required
          />
        </label>
        <br />
        <label>
          Designation:
          <br />
          <select
            name="designation"
            value={editForm.designation}
            onChange={handleEditChange}
            required
          >
            <option value="" disabled>
              Select your designation
            </option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </label>
        <br />
        <label>
          Gender:
          <br />
          <select
            name="gender"
            value={editForm.gender}
            onChange={handleEditChange}
            required
          >
            <option value="" disabled></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Course:
          <br />
          <select
            name="course"
            value={editForm.course}
            onChange={handleEditChange}
          >
            <option value="" disabled></option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
          </select>
        </label>
        <br />
        <label>
          Image URL:
          <img
            src={editForm.img}
            alt="Employee"
            style={{ height: "30px", width: "30px" }}
          />
          <br />
          <input
            type="text"
            name="img"
            value={editForm.img}
            onChange={handleEditChange}
            required
          />
        </label>
        <br />

        <button type="submit" id="save-button">
          Save
        </button>
        <button
          type="button"
          id="cancel-button"
          onClick={() => navigate("/show-employees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
