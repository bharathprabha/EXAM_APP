import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import StaffRoute from "./auth/helper/staffRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddQuestion from "./admin/AddQuestion";
import ManageQuestions from "./admin/ManageQuestions";

import UpdateCategory from "./admin/UpdateCategory";

import StaffDashBoard from "./staff/CorrectAnswers";
import GetAnswers from "./staff/helper/Evaluate";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <StaffRoute path="/staff/dashboard" exact component={StaffDashBoard} />

        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddQuestion}
        />
        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageQuestions}
        />

        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <StaffRoute
          path="/staff/getanswersheet/:userID"
          exact
          component={GetAnswers}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
