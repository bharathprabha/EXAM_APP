import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createQuestion } from "./helper/adminapicall";

const AddQuestion = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    //backend req fired
    createQuestion(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Question created successfully</h4>;
    }
  };
  const WarningMessage = () => {
    if (error) {
      return <h4 className="text-success">failed to add Question </h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Question</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="for example: what is node?"
        />

        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Question
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a question"
      description="Add a new question to the Exam questions"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {myCategoryForm()}
          {goBack()}
          {successMessage()}
          {WarningMessage()}
        </div>
      </div>
    </Base>
  );
};

export default AddQuestion;
