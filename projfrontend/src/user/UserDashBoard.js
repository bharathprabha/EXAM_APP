import React from "react";
import { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { getCategories } from "../admin/helper/adminapicall";
import { API } from "../backend.js";
import * as faceapi from "face-api.js";
import ImageHelper from "../core/helper/ImageHelper";
import Webcam from "react-webcam";

const UserDashBoard = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState({});
  const { user, token } = isAuthenticated();
  console.log(user);
  ///image from buffer
  const buffer = user.photo.data;
  const b64 = new Buffer(buffer).toString("base64");
  const mimeType = "image/jpeg";
  const webcamRef = React.useRef(null);

  const {
    user: { name, email, role },
  } = isAuthenticated();
  const loadAllQuestions = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setQuestions(data);
      }
    });
  };

  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
  ]).then(console.log("completed"));

  async function detectfade() {
    let blob = webcamRef.current.getScreenshot();
    let img = await faceapi.fetchImage(blob);
    const imageString = `data:${mimeType};base64,${b64}`;
    console.log("first");
    const image = await faceapi.fetchImage(imageString);
    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!detections.length) {
      return;
    }

    console.log("second");

    const faceMatcher = new faceapi.FaceMatcher(detections);

    console.log("3");

    const singleResult = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    console.log("4");

    if (singleResult) {
      const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
      console.log(bestMatch.toString());
    }
  }

  const onSave = (event) => {
    event.preventDefault();
    setAnswers([...answers, answer]);
  };

  const sendAnswer = (event) => {
    event.preventDefault();
    let data = { std_id: user._id, std_name: user.name, std_answer: answers };
    fetch(`${API}post/answers`, {
      method: "POST",
      headers: {
        Accept: "applicationjson",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
    alert("successfully submitted");
  };

  useEffect(() => {
    loadAllQuestions();
  }, []);

  return (
    <Base title=" UserDashBoard page">
      {/* {console.log(user.photo.data)} */}

      {mimeType ? <img src={`data:${mimeType};base64,${b64}`} /> : ""}
      {questions.length == 0 ? <h6>hi {name} the test will start soon</h6> : ""}
      <button type="button" onClick={detectfade}>
        hello
      </button>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
      />
      {questions.map((question) => {
        return (
          <div className="card mb-4">
            <ul className="list-group">
              <li className="list-group-item text-dark">
                <span className="badge badge-danger mr-2 ">Question:</span>{" "}
                {question.name}?
              </li>
              <li className="list-group-item">
                <span className="badge badge-success mr-2">Answer: </span>
                <input
                  type="text"
                  onChange={(e) =>
                    setAnswer({ qus: question.name, ans: e.target.value })
                  }
                  className="w-100"
                ></input>
              </li>

              <button
                onClick={onSave}
                type="button"
                class="btn btn-success btn-md"
              >
                SAVE
              </button>
            </ul>
          </div>
        );
      })}
      <button
        onClick={sendAnswer}
        type="button"
        className="btn btn-success btn-lg btn-block"
      >
        SUBMIT
      </button>
    </Base>
  );
};

export default UserDashBoard;
