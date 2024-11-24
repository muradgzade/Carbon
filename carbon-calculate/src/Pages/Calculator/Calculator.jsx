import React, { useState } from "react";
import "./calculator.scss";

const CarbonForms = () => {
  const [activeForm, setActiveForm] = useState("energy"); // Aktiv formanı təyin edir
  const [energyInputs, setEnergyInputs] = useState({
    electricity: 0,
    naturalGas: 0,
    heatingOil: 0,
    coal: 0,
    lpg: 0,
    propane: 0,
    wood: 0,
  });

  const [secondaryInputs, setSecondaryInputs] = useState({
    foodAndDrink: 0,
    pharmaceuticals: 0,
    clothesTextilesAndShoes: 0,
    paperBasedProducts: 0,
    computersAndITEquipment: 0,
    televisionRadioPhone: 0,
    motorVehicles: 0,
    furnitureManufacturedGoods: 0,
    hotelsRestaurantsPubs: 0,
    telephoneMobileCosts: 0,
    bankingFinance: 0,
    insurance: 0,
    education: 0,
    recreationalCulturalSportingActivities: 50,
  });

  const [transportInputs, setTransportInputs] = useState({
    bus: 0,
    coach: 0,
    localCommuterTrain: 0,
    longDistanceTrain: 0,
    tram: 0,
    subway: 0,
    taxi: 0,
  });

  const [vehicleInputs, setVehicleInputs] = useState({
    vehicleType: "CAR",
    manufactureYear: 0,
    manufactureType: "PETROL",
    model: "string",
  });

  // Form dəyişikliklərini idarə edən funksiyalar
  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId"); // userId localStorage-dən alınır
  
    if (!userId) {
      alert("User ID not found in localStorage!");
      return;
    }
  
    const data = {
      userId, // Backend-ə userId göndərilir
      energyInputs,
      secondaryInputs,
      transportInputs,
      vehicleInputs,
    };
  
    try {
      const response = await fetch("http://10.249.160.115:8083/api/v1/user-carbon-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert("Data submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting data!");
    }
  };
  

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://backend-api-url/calculate");
      const result = await response.json();
      alert(`Calculated total: ${result.total}`);
    } catch (error) {
      alert("Error calculating total!");
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case "energy":
        return (
          <div>
            <h3>Energy Inputs</h3>
            {Object.keys(energyInputs).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="number"
                  name={key}
                  value={energyInputs[key]}
                  onChange={(e) => handleChange(e, setEnergyInputs)}
                />
              </div>
            ))}
          </div>
        );
      case "secondary":
        return (
          <div>
            <h3>Secondary Inputs</h3>
            {Object.keys(secondaryInputs).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="number"
                  name={key}
                  value={secondaryInputs[key]}
                  onChange={(e) => handleChange(e, setSecondaryInputs)}
                />
              </div>
            ))}
          </div>
        );
      case "transport":
        return (
          <div>
            <h3>Transport Inputs</h3>
            {Object.keys(transportInputs).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="number"
                  name={key}
                  value={transportInputs[key]}
                  onChange={(e) => handleChange(e, setTransportInputs)}
                />
              </div>
            ))}
          </div>
        );
      case "vehicle":
        return (
          <div>
            <h3>Vehicle Inputs</h3>
            {Object.keys(vehicleInputs).map((key) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type={key === "manufactureYear" ? "number" : "text"}
                  name={key}
                  value={vehicleInputs[key]}
                  onChange={(e) => handleChange(e, setVehicleInputs)}
                />
              </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCalculate}>Calculate</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="carbon-forms">
      <nav>
        <button onClick={() => setActiveForm("energy")}>Energy</button>
        <button onClick={() => setActiveForm("secondary")}>Secondary</button>
        <button onClick={() => setActiveForm("transport")}>Transport</button>
        <button onClick={() => setActiveForm("vehicle")}>Vehicle</button>
      </nav>
      <div className="form-container">{renderForm()}</div>
    </div>
  );
};

export default CarbonForms;
