const User = require("../models/user");
const answercollections = require("../models/answers");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //TODO: get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

//update
exports.UpdateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.SubmitAnswers = (req, res) => {
  const dbMessage = req.body;
  answercollections.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(data);
    }
  });
};

exports.SubmitedAnswers = (req, res) => {
  const user_id = req.body.userId;
  var arr = [];
  answercollections.find({ std_id: user_id }).exec((err, ans) => {
    if (err) {
      return res.status(400).json({
        error: "ans not found in DB",
      });
    }
    console.log(ans[ans.length - 1]);
    res.json(ans[ans.length - 1]);
  });
};

exports.getAllUsers = (req, res) => {
  User.find({ role: 0 }, { _id: 1, name: 1 }).exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "NO users found",
      });
    }
    res.json(users);
  });
};
