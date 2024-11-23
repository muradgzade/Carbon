import React, { useState } from "react";
import "./calculator.scss";

const Calculator = () => {
  const storedUserId = localStorage.getItem("userId");
  const [energyinputs, setenergyInputs] = useState(
    {
        energy: {
          electricity: 0,
          naturalGas: 0,
          heatingOil: 0,
          coal: 0,
          lpg: 0,
          propane: 0,
          wood: 0
        },
        userId:storedUserId 
      });

  const [secondaryinputs, setsecondaryInputs] = useState({
    secondary: {
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
        recreationalCulturalSportingActivities: 50
      },
      userId:storedUserId
  });

  const [transportinputs, settransportInputs] = useState({
   transport: {
    bus: 0,
    coach: 0,
    localCommuterTrain: 0,
    longDistanceTrain: 0,
    tram: 0,
    subway: 0,
    taxi: 0
      },
      userId:storedUserId

  });

  const [vehicleinputs, setvehicleInputs] = useState({
    vehicle: {
        vehicleType: "CAR",
        manufactureYear: 0,
        manufactureType: "PETROL",
        model: "string"
      },
      userId:storedUserId
    
  });

  const [total, setTotal] = useState(0);

  const handleenergyChange = (e) => {
    const { name, value } = e.target;
    setenergyInputs({ ...energyinputs, [name]: value });
  };
  const handlesecondaryChange = (e) => {
    const { name, value } = e.target;
    setsecondaryInputs({ ...secondaryinputs, [name]: value });
  };

  const handletransportChange = (e) => {
    const { name, value } = e.target;
    settransportInputs({ ...transportinputs, [name]: value });
  };
  const handlevehicleChange = (e) => {
    const { name, value } = e.target;
    setvehicleInputs({ ...vehicleinputs, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const requestData = {
        energy: energyinputs,
        secondary: secondaryinputs,
        transport: transportinputs,
          vehicle: vehicleinputs,
          userId: storedUserId,
        };
        console.log("Request Data: ", requestData);
  
      const response = await fetch(`http://10.10.0.29:8083/api/v1/user-carbon-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      setTotal(data.total); // Backend-dən gələn toplam dəyər
    } catch (error) {
      console.error("Hesablama zamanı xəta baş verdi:", error);
    }
  };
  

  return (
    <div className="total-items">
      <div className="carbon-footprint">
        <h2>Carbon Footprint Calculator</h2>
        {Object.keys(energyinputs.energy).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={energyinputs.energy[key]}
              onChange={handleenergyChange}
            />
          </div>
        ))}
        <button className="calculate-btn" onClick={handleSubmit}>
          Calculate Household Footprint
        </button>
        <div className="total-output">
          Total House Footprint: <span>{total} tonnes of CO₂e</span>
        </div>
      </div>
      <div className="carbon-footprint">
        <h2>Carbon Footprint Calculator</h2>
        {Object.keys(secondaryinputs.secondary).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={secondaryinputs.secondary[key]}
              onChange={handlesecondaryChange}
            />
          </div>
        ))}
        <button className="calculate-btn" onClick={handleSubmit}>
          Calculate Household Footprint
        </button>
        <div className="total-output">
          Total House Footprint: <span>{total} tonnes of CO₂e</span>
        </div>
      </div>
      <div className="carbon-footprint">
        <h2>Carbon Footprint Calculator</h2>
        {Object.keys(transportinputs.transport).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={transportinputs.transport[key]}
              onChange={handletransportChange}
            />
          </div>
        ))}
        <button className="calculate-btn" onClick={handleSubmit}>
          Calculate Household Footprint
        </button>
        <div className="total-output">
          Total House Footprint: <span>{total} tonnes of CO₂e</span>
        </div>
      </div>
      <div className="carbon-footprint">
        <h2>Carbon Footprint Calculator</h2>
        {Object.keys(vehicleinputs.vehicle).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={vehicleinputs.vehicle[key]}
              onChange={handlevehicleChange}
            />
          </div>
        ))}
        <button className="calculate-btn" onClick={handleSubmit}>
          Calculate Household Footprint
        </button>
        <div className="total-output">
          Total House Footprint: <span>{total} tonnes of CO₂e</span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
