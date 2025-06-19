import React, { useState, useEffect } from "react";
import API from "./api";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", age: "", role: "" });
  const partenaireId = localStorage.getItem("partenaireId");

  const fetchEmployees = async () => {
    try {
      const response = await API.get(`/api/employee/by-partner/${partenaireId}`);
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
      await API.post("/api/employee/add", { ...newEmployee, partenaireId });
      fetchEmployees();
      setNewEmployee({ name: "", age: "", role: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé :", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await API.delete(`/api/employee/delete/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'employé :", error);
    }
  };

  return (
    <div>
      <h1>Dashboard Partenaire</h1>
      <div>
        <input
          placeholder="Nom"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          placeholder="Âge"
          value={newEmployee.age}
          onChange={(e) => setNewEmployee({ ...newEmployee, age: e.target.value })}
        />
        <input
          placeholder="Rôle"
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Ajouter Employé</button>
      </div>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.age} - {emp.role}
            <button onClick={() => handleDeleteEmployee(emp._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
