import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", age: "", role: "" });
  const partenaireId = localStorage.getItem("partenaireId");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee/by-partner/${partenaireId}`);
      setEmployees(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/employee/add`, { ...newEmployee, partenaireId });
      fetchEmployees();
      setNewEmployee({ name: "", age: "", role: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé :", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/employee/delete/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
    }
  };

  return (
    // garde ton interface ici aussi
    <div>... tableau des employés</div>
  );
};

export default Dashboard;
