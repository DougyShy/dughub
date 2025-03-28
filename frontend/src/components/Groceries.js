import React, { useState, useEffect } from "react";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import "./Groceries.css";
import GroceryAccordian from "./GroceryAccordian.js";

const Groceries = ({ userName }) => {
  const [groceries, setGroceries] = useState([]);
  const [userGroceryList, setUserGroceryList] = useState([]);

  useEffect(() => {
    axios.get("/groceries").then((res) => {
      setGroceries(res.data);
    });
  }, []);

  console.log(groceries);

  return userName ? (
    <div className="groceries__wrapper">
      <div className="groceries__options">
        <div>Grocery Items</div>
        <div className="grocery__list">
          {groceries.map((grocery) => {
            return (
              <p>
                <GroceryAccordian />
              </p>
            );
          })}
        </div>
      </div>
      <div className="groceries__user__list">
        <div>{userName}'s Grocery List</div>
        <div>BOTTOM RIGHT?</div>
      </div>
    </div>
  ) : (
    <div>No User Cart</div>
  );
};

export default Groceries;
