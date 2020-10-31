import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllUsers } from "./helper/staffapicalls";
const StaffDashBoard = () => {
  const [allUsers, setAllusers] = useState([]);
  const [userID, SetuserID] = useState("");
  const preload = () => {
    getAllUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAllusers(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title=" staffDashBoard page">
      {allUsers.map((user, index) => {
        return (
          <div key={index} className="row text-center mb-2 ">
            <div className="col-4">
              <h3 className="text-white text-left">{user.name}</h3>
            </div>

            <div className="col-4">
              <Link
                className="btn btn-success"
                to={`/staff/getanswersheet/${user._id}`}
              >
                <span className="">SELECT</span>
              </Link>
            </div>
          </div>
        );
      })}
    </Base>
  );
};

export default StaffDashBoard;
