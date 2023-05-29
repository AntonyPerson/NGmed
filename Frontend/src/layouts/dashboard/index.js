/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-console */
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
import { ConstructionOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, Icon, Tab } from "@mui/material";
import axios from "axios";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import InfoCardWIthButton from "examples/Cards/InfoCards/InfoCardWIthButton";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Projects from "layouts/dashboard/components/Projects";
import EditCountSoliders from "layouts/Forms/EditCountSoliders";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
// import { mainExample } from "merageJasonExcelFiels";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

  const [countSoliders, setCountSoliders] = useState(0);
  const [countWatches, setCountWatches] = useState(0);
  const [countWatchesUsed, setCountWatchesUsed] = useState(0);
  const [dbError, setDbError] = useState(false);
  const [toEditCountSoliders, setToEditCountSoliders] = useState(false);
  const [toUpdateCountWatches, setToUpdateCountWatches] = useState(false);

  // ? user Choise
  const [selectedVaules, setSelectedVaules] = useState({
    mahlaka: "",
    ploga: "",
    gdod: "",
  });

  const updateCountSoliders = () => (
    <Dialog
      px={5}
      open={toEditCountSoliders}
      onClose={() => {
        setToEditCountSoliders(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <EditCountSoliders task="updateCountSoliders" mahlakaID={selectedVaules.mahlaka} />
        </DialogContent>
      </MDBox>
    </Dialog>
  );
  const updateCountWatches = () => (
    <Dialog
      px={5}
      open={toUpdateCountWatches}
      onClose={() => {
        setToUpdateCountWatches(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MDBox variant="gradient" bgColor="mekatnar" coloredShadow="mekatnar" borderRadius="l">
        <DialogContent>
          <EditCountSoliders task="updateCountWatches" mahlakaID={selectedVaules.mahlaka} />
        </DialogContent>
      </MDBox>
    </Dialog>
  );

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

    // mainExample();
  }, []);

  async function setCountSolidersMahlka(mahlakaID) {
    const count = {
      countSoldier: 0,
      countWatches: 0,
      countWatchesUsed: 0,
    };
    await axios
      .get(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/${mahlakaID}`)
      .then(
        (response) => {
          // console.log(
          //   `setCountSolidersMahlka - ${response.data.name} - ${response.data.countSoliders}`
          // );
          count.countSoldier = response.data.countSoliders;
          count.countWatches = response.data.countWatches;
          count.countWatchesUsed = response.data.countWatchesUsed;
        }

        // console.log(returnArray);
      )
      .catch((error) => 0);
    return count;
  }

  async function setCountSolidersPloga(plogaID) {
    const count = {
      countSoldier: 0,
      countWatches: 0,
      countWatchesUsed: 0,
    };
    await axios
      .post(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/mahlakaByPlogaId`, {
        ploga: plogaID,
      })
      .then((response) => {
        // console.groupCollapsed("forEach of ploga");
        response.data.forEach((mahlaka) => {
          // console.groupCollapsed("forEach - mahlaka");
          // console.log(mahlaka);
          count.countSoldier += mahlaka.countSoliders;
          count.countWatches += mahlaka.countWatches;
          count.countWatchesUsed += mahlaka.countWatchesUsed;
          // console.groupEnd();
        });
        // console.groupEnd();
        // console.log(returnArray);
        // console.log(count);
      })
      .catch((error) => 0);
    // console.log(`setCountSolidersPloga - ${plogaID} - ${count}`);
    return count;
  }

  async function setCountSolidersGdod(gdodID) {
    console.groupCollapsed("setCountSolidersGdod d");
    const count = {
      countSoldier: 0,
      countWatches: 0,
      countWatchesUsed: 0,
    };
    const temp = {};
    await axios
      .post(`http://localhost:5000/NGmedDB/treeMangment/ploga/plogaByGdodId`, {
        gdod: gdodID,
      })
      .then(async (response) => {
        console.log("-------------------count---------------------------");
        /*
        response.data.forEach(async (ploga) => {
          temp = await setCountSolidersPloga(ploga._id);
          console.log(temp);

          count.countSoldier += temp.countSoldier;
          count.countWatches += temp.countWatches;
          count.countWatchesUsed += temp.countWatchesUsed;
          // console.log(ploga);
          // console.log(count);
        });
        */
        const result = await Promise.all(
          response.data.map(async (ploga) => setCountSolidersPloga(ploga._id))
        );
        console.log("RESULT: ");
        console.log(result);
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < result.length; index++) {
          console.log(result[index]);
          count.countSoldier += result[index].countSoldier;
          count.countWatches += result[index].countWatches;
          count.countWatchesUsed += result[index].countWatchesUsed;
        }
        console.log(count);

        console.log("--------------------------------------------------");
        // console.log(returnArray);
      })
      .catch((error) => {
        const e = {
          countSoldier: 0,
          countWatches: 0,
          countWatchesUsed: 0,
        };
        return e;
      });
    console.log(`setCountSolidersGdod - ${gdodID} - ${count}`);
    console.groupEnd();
    return count;
  }
  async function setCountSolidersHativa(hativaID) {
    const count = {
      countSoldier: 0,
      countWatches: 0,
      countWatchesUsed: 0,
    };
    await axios
      .post(`http://localhost:5000/NGmedDB/treeMangment/mahlaka/mahlakaByHativaId`, {
        hativa: hativaID,
      })
      .then((response) => {
        response.data.forEach((mahlaka) => {
          count.countSoldier += mahlaka.countSoliders;
          count.countWatches += mahlaka.countWatches;
          count.countWatchesUsed += mahlaka.countWatchesUsed;
        });
        // console.log(returnArray);
      })
      .catch((error) => 0);
    console.log(`setCountSolidersHativa - ${hativaID} - ${count}`);
    return count;
  }
  useEffect(async () => {
    console.groupCollapsed("useEffect");
    console.log(tabView);
    console.log(selectedVaules);
    console.log(`before switch CountSoliders ${countSoliders}`);
    console.log(countSoliders);
    switch (tabView) {
      case 0:
        if (selectedVaules.mahlaka !== "") {
          const count = await setCountSolidersMahlka(selectedVaules.mahlaka);
          setCountSoliders(count.countSoldier);
          setCountWatches(count.countWatches);
          setCountWatchesUsed(count.countWatchesUsed);
        } else {
          setCountSoliders(0);
          setCountWatches(0);
          setCountWatchesUsed(0);
        }
        break;
      case 1:
        if (selectedVaules.ploga !== "") {
          const count = await setCountSolidersPloga(selectedVaules.ploga);
          setCountSoliders(count.countSoldier);
          setCountWatches(count.countWatches - count.countWatchesUsed);
          setCountWatchesUsed(count.countWatchesUsed);
        } else {
          setCountSoliders(0);
          setCountWatches(0);
          setCountWatchesUsed(0);
        }
        break;
      case 2:
        if (selectedVaules.gdod !== "") {
          const count = await setCountSolidersGdod(selectedVaules.gdod);
          console.log("=========================count======================");
          console.log(count);
          console.log("====================================================");
          setCountSoliders(count.countSoldier);
          setCountWatches(count.countWatches - count.countWatchesUsed);
          setCountWatchesUsed(count.countWatchesUsed);
        } else {
          setCountSoliders(0);
          setCountWatches(0);
          setCountWatchesUsed(0);
        }
        break;
      case 3:
        // eslint-disable-next-line no-case-declarations
        const count = await setCountSolidersHativa(hativa.id);
        setCountSoliders(count.countSoldier);
        setCountWatches(count.countWatches - count.countWatchesUsed);
        setCountWatchesUsed(count.countWatchesUsed);
        break;
      default:
        setCountSoliders(0);
    }
    console.log(`after switch CountSoliders ${countSoliders}`);
    console.log(countSoliders);

    console.groupEnd();
  }, [tabView, selectedVaules]);

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
        <Grid item xs={5} md={3} lg={3}>
          <Link to={`/Graphs/Summary/Mahlaka/${selectedVaules.mahlaka}`}>
            <MDButton variant="gradient" color="mekatnar">
              <Icon>leaderboard</Icon>&nbsp; סיכום מחלקתי
            </MDButton>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <InfoCardWIthButton
              color="dark"
              icon="group"
              title="מספר החיילים במחלקה"
              valueInfo={countSoliders}
              buttonInfo={{
                color: "mekatnar",
                onClickFunction: () =>
                  tabView === 0 && selectedVaules.mahlaka !== ""
                    ? setToEditCountSoliders(true)
                    : setToEditCountSoliders(false),
                icon: "edit",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="hotel"
              title="מס' שעות שינה שבועי ממוצע"
              count="7.35"
              percentage={{
                color: "success",
                amount: "",
                label: "",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="map"
              title="מרחק שבועי ממוצע (קילומטרים)"
              count="150"
              percentage={{}}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="monitor_heart"
              title="דופק לב מקסימלי ממוצע"
              count="151"
              percentage={{}}
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
                title="מדדי שינה במחלקה"
                description="ממוצע שעות השינה"
                date="עודכן כעת "
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
                    data: [countWatchesUsed, countWatches - countWatchesUsed],
                  },
                }}
                buttonInfo={{
                  color: "mekatnar",
                  onClickFunction: () =>
                    tabView === 0 && selectedVaules.mahlaka !== ""
                      ? setToUpdateCountWatches(true)
                      : setToUpdateCountWatches(false),
                  icon: "edit",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title=" קצב מרחק יומי"
                description="ממוצע מרחק מחלקתי"
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
        <Grid item xs={5} md={3} lg={3}>
          <Link to={`/Graphs/Summary/Ploga/${selectedVaules.ploga}`}>
            <MDButton variant="gradient" color="mekatnar">
              <Icon>leaderboard</Icon>&nbsp; סיכום פלוגתי
            </MDButton>
          </Link>
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
              count={countSoliders}
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
                title="מדדי שינה "
                description="ממוצע שעות שינה פלוגתית"
                date="מעודכן "
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
                    data: [countWatchesUsed, countWatches],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title=" קצב מרחק יומי"
                description="ממוצע מרחק פלוגתי"
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
        <Grid item xs={5} md={3} lg={3}>
          <Link to={`/Graphs/Summary/Gdod/${selectedVaules.gdod}`}>
            <MDButton variant="gradient" color="mekatnar">
              <Icon>leaderboard</Icon>&nbsp; סיכום גדודי
            </MDButton>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים בגדוד"
              count={countSoliders}
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
                title="מדדי שינה "
                description="ממוצע שעות שינה גדודי"
                date="מעודכן "
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
                    data: [countWatchesUsed, countWatches],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title=" קצב מרחק יומי"
                description="ממוצע מרחק גדודי"
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
        {/* <Grid item xs={5} md={3} lg={3}>
          <MDBox mb={1.5}>
            <MDTypography color="mekatnar" variant="h4" fontWeight="medium">
              {hativa.name}
            </MDTypography>
          </MDBox>
        </Grid> */}
        <Grid item xs={5} md={3} lg={3} mb={2.5}>
          <Link to={`/Graphs/Summary/Hativa/${hativa.id}`}>
            <MDButton variant="gradient" color="mekatnar">
              <Icon>leaderboard</Icon>&nbsp;{hativa.name} סיכום חטיבתי
            </MDButton>
          </Link>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="מספר החיילים חטיבה"
              count={countSoliders}
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
                title="מדדי שינה "
                description="ממוצע שעות שינה חטיבתי"
                date="מעודכן "
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
                    data: [countWatchesUsed, countWatches],
                  },
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="dark"
                title=" קצב מרחק יומי"
                description="ממוצע מרחק חטיבתי"
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
      {updateCountSoliders()}
      {updateCountWatches()}
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
      {/* {EditCountSoliders()} */}
      {/* {toEditCountSoliders === true && tabView === 0 && selectedVaules.mahlaka !== "" && (
        <EditCountSoliders mahlakaID={selectedVaules.mahlaka} />
      )} */}
      {/* <EditCountSoliders mahlakaID={selectedVaules.mahlaka} /> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
