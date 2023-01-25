/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-unresolved */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
// import RegulsrUserRequestsTable from "layouts/tables/regulsrUserRequestsTable";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import RTL from "layouts/rtl";

// @mui icons
import Icon from "@mui/material/Icon";
//my components
import ExcelToJasonFileUploader from "layouts/Forms/ExcelToJasonFileUploader";
import HozlaPrintRequestForm from "layouts/Forms/HozlaPrintRequestForm";
import GraphicDistance from "layouts/GraphicSoldierDatas/GraphicDistance";
import GraphicHeart from "layouts/GraphicSoldierDatas/GraphicHeart";
import GraphicSleep from "layouts/GraphicSoldierDatas/GraphicSleep";
import GraphPage from "layouts/GraphicSoldierDatas/GraphPage";
import AllFielsTable from "layouts/tables/allFielsTable";
import UserFielsTable from "layouts/tables/userFielsTable";
import AboutPage from "views/aboutpage/AboutPage";
// eslint-disable-next-line import/no-absolute-path

const routes = [
  // {
  //   type: "collapse",
  //   name: "Graphs",
  //   key: "Graphs",
  //   icon: <Icon fontSize="small">equalizer</Icon>,
  //   route: "/Graphs",
  //   component: <GraphPage />,
  // },
  // {
  //   type: "collapse",
  //   name: "קצב לב",
  //   key: "Heart",
  //   icon: <Icon fontSize="small">monitor_heart</Icon>,
  //   route: "/Heart",
  //   component: <GraphicHeart />,
  // },
  // {
  //   type: "collapse",
  //   name: "שעות שינה",
  //   key: "Sleep",
  //   icon: <Icon fontSize="small">hotel</Icon>,
  //   route: "/Sleep",
  //   component: <GraphicSleep />,
  // },
  // {
  //   type: "collapse",
  //   name: "מרחק יומי",
  //   key: "Distance",
  //   icon: <Icon fontSize="small">map</Icon>,
  //   route: "/Distance",
  //   component: <GraphicDistance />,
  // },
  // {
  //   type: "collapse",
  //   name: "העלת קובץ",
  //   key: "FileUpload",
  //   icon: <Icon fontSize="small">description</Icon>,
  //   route: "/FileUpload",
  //   component: <ExcelToJasonFileUploader />,
  // },
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "הקבצים שלי",
    key: "UserFilesTable",
    icon: <Icon fontSize="small">contact_page</Icon>,
    route: "/UserFilesTable",
    component: <UserFielsTable />,
  },
  {
    type: "collapse",
    name: "קבצי המערכת",
    key: "FilesTable",
    icon: <Icon fontSize="small">content_paste_search</Icon>,
    route: "/FilesTable",
    component: <AllFielsTable />,
  },
  // {
  //   type: "collapse",
  //   name: "אודות",
  //   key: "about-us",
  //   icon: <Icon fontSize="small">info</Icon>,
  //   route: "/about-us",
  //   component: <AboutPage />,
  // },
];

export default routes;
