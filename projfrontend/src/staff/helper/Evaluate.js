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
      title="category update!"
      description="Welcome to category updation section"
      className="container bg-warning p-4"
    >
      {console.log(answers)}
      <form class="form-inline">
        <div class="form-group mx-sm-3 mb-2">
          <label class="m-4">Mark</label>

          <label class="">Mark2</label>
          <input type="text" class="form-control" id="" placeholder="" />
        </div>
        <button type="submit" class="btn btn-primary mb-2">
          Confirm identity
        </button>
      </form>
    </Base>
  );
};

export default GetAnswers;
