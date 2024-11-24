import React, { useState } from 'react';
import './calculator.scss';  

const EnergyForm = ({ userId }) => {
  const [energy, setEnergy] = useState({
    electricity: 0,
    naturalGas: 0,
    heatingOil: 0,
    coal: 0,
    lpg: 0,
    propane: 0,
    wood: 0,
  });

  const handleChange = (e) => {
    setEnergy({ ...energy, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`http://10.249.160.115:8083/api/v1/user-carbon-data`, {
      method: 'POST',
      body: JSON.stringify({ energy, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form className="form-container">
      <h2>Energy Inputs</h2>
      {Object.keys(energy).map((inputName) => (
        <div key={inputName} className="input-group">
          <label>{inputName}</label>
          <input
            type="number"
            name={inputName}
            value={energy[inputName]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const SecondaryForm = ({ userId }) => {
  const [secondary, setSecondary] = useState({
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
   SportingActivities: 50,
  });

  const handleChange = (e) => {
    setSecondary({ ...secondary, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`http://10.249.160.115:8083/api/v1/user-carbon-data`, {

      method: 'POST',
      body: JSON.stringify({ secondary, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form className="form-container">
      <h2>Secondary Inputs</h2>
      {Object.keys(secondary).map((inputName) => (
        <div key={inputName} className="input-group">
          <label>{inputName}</label>
          <input
            type="number"
            name={inputName}
            value={secondary[inputName]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const TransportForm = ({ userId }) => {
  const [transport, setTransport] = useState({
    bus: 0,
    coach: 0,
    localCommuterTrain: 0,
    longDistanceTrain: 0,
    tram: 0,
    subway: 0,
    taxi: 0,
  });

  const handleChange = (e) => {
    setTransport({ ...transport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`http://10.249.160.115:8083/api/v1/user-carbon-data`, {

      method: 'POST',
      body: JSON.stringify({ transport, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form className="form-container">
      <h2>Transport Inputs</h2>
      {Object.keys(transport).map((inputName) => (
        <div key={inputName} className="input-group">
          <label>{inputName}</label>
          <input
            type="number"
            name={inputName}
            value={transport[inputName]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const VehicleForm = ({ userId }) => {
  const [vehicle, setVehicle] = useState({
    vehicleType: 'CAR',
    manufactureYear: 0,
    manufactureType: 'PETROL',
    model: 'string',
  });

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`http://10.10.0.29:8083/api/v1/user-carbon-data/carbon/vehicle/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ vehicle, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form className="form-container">
      <h2>Vehicle Inputs</h2>
      <div className="input-group">
        <label>Vehicle Type</label>
        <input
          type="text"
          name="vehicleType"
          value={vehicle.vehicleType}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label>Manufacture Year</label>
        <input
          type="number"
          name="manufactureYear"
          value={vehicle.manufactureYear}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label>Manufacture Type</label>
        <input
          type="text"
          name="manufactureType"
          value={vehicle.manufactureType}
          onChange={handleChange}
        />
      </div>
      <div className="input-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
        />
      </div>
      <button type="button" className="submit-btn" onClick={handleSubmit}>Submit</button>
    </form>
  );
};

const Calculator = () => {
  const [activeForm, setActiveForm] = useState('energy');
  const userId = localStorage.getItem('userId'); // Get user ID from localStorage

  const handleCalculate = async () => {
    const response = await fetch(`API_ENDPOINT/calculate/${userId}`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="calculator-container">
      <div className="form-tabs">
        <button onClick={() => setActiveForm('energy')} className="tab-btn">Energy</button>
        <button onClick={() => setActiveForm('secondary')} className="tab-btn">Secondary</button>
        <button onClick={() => setActiveForm('transport')} className="tab-btn">Transport</button>
        <button onClick={() => setActiveForm('vehicle')} className="tab-btn">Vehicle</button>
      </div>

      {activeForm === 'energy' && <EnergyForm userId={userId} />}
      {activeForm === 'secondary' && <SecondaryForm userId={userId} />}
      {activeForm === 'transport' && <TransportForm userId={userId} />}
      {activeForm === 'vehicle' && <VehicleForm userId={userId} />}

      <button type="button" className="calculate-btn" onClick={handleCalculate}>Calculate</button>
    </div>
  );
};

export default Calculator;
