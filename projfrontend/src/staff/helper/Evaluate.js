import React, { useState, useEffect } from "react";
import Base from "../../core/Base";

import { getAnswerSheet } from "./staffapicalls";

const GetAnswers = ({ match }) => {
  const [userSubmission, SetuserSubmission] = useState({});
  const [answers, Setanswers] = useState([]);
  const preload = (userId) => {
    console.log(userId);
    getAnswerSheet(userId).then((data) => {
      if (data.error) {
        console.log("error");
      } else {
        SetuserSubmission(data);
        Setanswers(data.std_answer);
      }
    });
  };
  useEffect(() => {
    preload(match.params.userID);
  }, []);

  return (
    <Base
      title={userSubmission.std_name}
      description="Award the marks the answers"
      className="container bg-warning p-4"
    >
      {console.log(answers)}
      {answers.map((answer) => (
        <div className="card mb-4">
          <ul className="list-group">
            <li className="list-group-item text-dark">
              <span className="badge badge-danger mr-2 ">Question: </span>{" "}
              {answer.qus}?
            </li>
            <li className="list-group-item text-dark">
              <span className="badge badge-secondary mr-2 ">Answer:</span>{" "}
              {answer.ans}?
            </li>
            <li className="list-group-item">
              <span className="badge badge-success mr-2">Mark: </span>
              <input type="text" className="w-100"></input>
            </li>
            <button type="button" class="btn btn-success btn-md">
              SAVE
            </button>
          </ul>
        </div>
      ))}
    </Base>
  );
};

export default GetAnswers;
