/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import PieChart from "examples/Charts/PieChart";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import { Tab } from "@mui/material";
import axios from "axios";
import MDTypography from "components/MDTypography";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import { mainExample } from "merageJasonExcelFiels";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import DashboardHeader from "./components/DashboardHeader";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [tabView, setTabView] = useState(0);

  // ? Our tree info all from DB
  const [mahlakot, setMahlakot] = useState([]);
  const [plogot, setPlogot] = useState([]);
  const [gdodim, setGdodim] = useState([]);
  const [hativa, setHativa] = useState({ id: "63be8ba2f3509cdcccdee91f", name: "גולני" });

  // ? user Choise
  const [selectedVaules, setSelectedVaules] = useState({
    mahlaka: "",
    ploga: "",
    gdod: "",
  });

  // useMemo(() => {
  //   if (typeof window !== "undefined") {
  //     setTabView(JSON.parse(localStorage.getItem("dashboardView")));
  //     console.log("=====================================");
  //   }
  // }, [localStorage.getItem("dashboardView")]);

  useEffect(() => {
    axios
      .post(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/mahlakaByHativaId/`, {
        hativa: hativa.id,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.length !== 0 || response.data.length !== undefined) {
          setMahlakot(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(`http://localhost:5000/NGmedDB/treeMangment/ploga/plogaByHativaId/`, {
        hativa: hativa.id,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.length !== 0 || response.data.length !== undefined) {
          setPlogot(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(`http://localhost:5000/NGmedDB/treeMangment/gdod/gdodsByHativaId/`, {
        hativa: hativa.id,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.length !== 0 || response.data.length !== undefined) {
          setGdodim(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  function handleChangeSelect(evt) {
    const { value } = evt.target;
    setSelectedVaules({ ...selectedVaules, [evt.target.name]: value });
  }
  const mahlakaView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <FormGroup>
              {/* <Label for="mahlaka">מחלקה</Label> */}
              <Input
                // placeholder={textPlaceHolderInputs[5]}
                id="mahlaka"
                name="mahlaka"
                type="select"
                value={selectedVaules.mahlaka}
                onChange={handleChangeSelect}
                // required
              >
                <option defult value="" disabled>
                  בחר מחלקה
                </option>
                {mahlakot.map((mahlaka, index) => (
                  <option key={`mahlaka-${index}`} id={index} value={mahlaka._id}>
                    {mahlaka.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים במחלקה"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );

  const plogaView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <FormGroup>
              {/* <Label for="ploga">פלוגה</Label> */}
              <Input
                // placeholder={textPlaceHolderInputs[5]}
                id="ploga"
                name="ploga"
                type="select"
                value={selectedVaules.ploga}
                onChange={handleChangeSelect}
                // required
              >
                <option defult value="" disabled>
                  בחר פלוגה
                </option>
                {plogot.map((ploga, index) => (
                  <option key={`ploga-${index}`} id={index} value={ploga._id}>
                    {ploga.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          {" "}
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים בפלוגה"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );

  const gdodView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <FormGroup>
              {/* <Label for="gdod">גדוד</Label> */}
              <Input
                // placeholder={textPlaceHolderInputs[5]}
                id="gdod"
                name="gdod"
                type="select"
                value={selectedVaules.gdod}
                onChange={handleChangeSelect}
                // required
              >
                <option defult value="" disabled>
                  בחר גדוד
                </option>
                {gdodim.map((gdod, index) => (
                  <option key={`gdod-${index}`} id={index} value={gdod._id}>
                    {gdod.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים בגדוד"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );

  const hativaView = () => (
    <MDBox py={3}>
      <Grid container spacing={3} mb={2.5}>
        <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
              {hativa.name}
            </MDTypography>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים חטיבה"
              count={281}
              percentage={{
                label: "עודכן כעת",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count="2,300"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="store"
              title="Revenue"
              count="34k"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="person_add"
              title="Followers"
              count="+91"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
      <MDBox mt={4.5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsBarChart
                color="mekatnar"
                title="website views"
                description="Last Campaign Performance"
                date="campaign sent 2 days ago"
                chart={reportsBarChartData}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <PieChart
                icon={{ color: "mekatnar", component: "watch" }}
                title="מונה שעוני פריקה"
                description="עוקב אחרי מספר השעונים שמחכים לפריקה ו/או ניפרקו"
                chart={{
                  labels: ["מספר השעונים שנפרקו", "מספר השעונים שמחכים לפריקה"],
                  datasets: {
                    label: "מונה שעונים",
                    backgroundColors: ["mekatnar", "dark"],
                    data: [20, 60],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title="completed tasks"
                description="Last Campaign Performance"
                date="just updated"
                chart={tasks}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* <MDBox>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <OrdersOverview />
        </Grid>
      </Grid>
    </MDBox> */}
    </MDBox>
  );
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <DashboardHeader tabViewValue={tabView} setTabViewValue={setTabView} />
      {mainExample()}
      {/* <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
        {tabView}
      </MDTypography> */}
      {
        tabView === 0 //* mahlaka view
          ? mahlakaView()
          : tabView === 1 //* ploga view
          ? plogaView()
          : tabView === 2 //* gdod view
          ? gdodView()
          : hativaView() //* hativa view
      }

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
