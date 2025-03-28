import React, { useState } from "react";

const YardCare = ({ userName }) => {
  const [yard, setYard] = useState([]);

  return userName ? (
    <div>User Yard Care for {userName}</div>
  ) : (
    <div>No User Yard</div>
  );
};

export default YardCare;
