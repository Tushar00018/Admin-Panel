const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();
const Collections = require("../models/Employee");

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new employee
router.post("/", async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    designation: req.body.designation,
    gender: req.body.gender,
    course: req.body.course,
    img: req.body.img,
  });

  try {
    await employee.save();
    res.status(200).send({
      redirect: "/show-employees",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single employee
router.get("/:id", getEmployee, (req, res) => {
  res.json(res.employee);
});

async function getEmployee(req, res, next) {
  console.log(res.employee);

  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Cannot find employee" });
    }
    res.employee = employee; // Attach employee to the response object
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

//EDIT EMPLOYEE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = req.body;
    const result = await Collections.findByIdAndUpdate(
      id,
      updatedEmployee.editForm,
      {
        new: true,
      }
    );

    if (!result) {
      return res.status(404).send({ error: "Employee not found" });
    }
    res.status(200).send({
      redirect: "/show-employees",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error has occurred" });
  }
});

// DELETE an employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Collections.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ error: "Employee Not Found" });
    } else {
      return res.status(200).send({
        message: "Employee deleted successfully",
        redirect: "/show-employees",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
