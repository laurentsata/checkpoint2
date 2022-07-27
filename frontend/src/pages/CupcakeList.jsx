/* eslint-disable prettier/prettier */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

export default function CupcakeList() {
  // Step 1: get [all] cupcakes
  
  const [cupcakes, setCupcakes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [cupcakesFilter, setCupcakesFilter] = useState("");

  const getCupcakes = () => {
    axios
      .get("http://localhost:4000/cupcakes")
      .then((response) => response.data)
      .then((data) => setCupcakes(data));
  };
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/cupcakes")
  //         .then(response => response.data)
  //         .then(data => setCupcakes(data))
  // }, []);
  // Step 3: get all accessories
  // const [accessories, setAccessories] = useState("");
  // useEffect(()=> {
  //     axios.get("http://localhost:4000/accessories")
  //         .then(response => response.data)
  //         .then(data => setAccessories(data));
  // }, []);
  const getAccessories = () => { axios.get("http://localhost:4000/accessories")
                                      .then((response) => response.data)
                                      .then((data) => setAccessories(data));
};
  useEffect(() => getCupcakes(), []);
  useEffect(() => getAccessories(), []);
  return (
    <div>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select" onChange={(e) => setCupcakesFilter(e.target.value)}>
            <option value=" ">---</option>
            {/* <option value="">Cherry</option>
            <option value="2">Donut</option>
            <option value="3">Chocolate</option>
            <option value="4">Wild</option>
            <option value="5">Christmas Candy</option> */}
            {/* Step 4: add an option for each accessory */}
            {accessories && accessories.map((accessory) => (
                  <option value={accessory.id} key={accessory.id}>
                    {accessory.name}
                  </option>
                ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes && cupcakes.filter((cupcake) => !cupcakesFilter || cupcake.accessory_id === cupcakesFilter)
                             .map((cupcake) => (<li key={cupcake.id} className="cupcake-item">

                                                    <Link to={`/cupcakes/${cupcake.id}`}>
                                                      <Cupcake cupcake={cupcake} />
                                                    </Link>
                                                  </li>
))}
        {/* end of block */}
      </ul>
    </div>
  );
}
