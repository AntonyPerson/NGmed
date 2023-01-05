/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import MixedChart from "examples/Charts/MixedChart";
import { Accordion, AccordionDetails, AccordionSummary, FormGroup } from "@mui/material";
import { Input, Label } from "reactstrap";
import { useState, useMemo, useEffect } from "react";
import { signin, authenticate, isAuthenticated } from "auth/index";
import axios from "axios";
import { useParams } from "react-router-dom";
import MDTypography from "components/MDTypography";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PolarChart from "examples/Charts/PolarChart";
import MDButton from "components/MDButton";

//* Graph components
import GraphicDistance from "./GraphicDistance";
import GraphicSleep from "./GraphicSleep";
import GraphicHeart from "./GraphicHeart";

const { user } = isAuthenticated();
// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function GraphPage() {
  // const [excelNames, setExcelNames] = useState({});
  const params = useParams();
  const [excelData, setExcelData] = useState([]);
  const [walkData, setWalkData] = useState({});
  const [sleepData, setSleepData] = useState({
    reagularSleep: [[], [], []],
  });
  const [heartData, setHeartData] = useState({});

  //   const createDataForCharts = async () => {
  //     if (excelData.length !== 0) {
  //       //* walk distance data in km
  //       const walkDistanceInDate = excelData.fileJason.map((excelRow, index) =>
  //         parseFloat(excelRow.distanceInKM)
  //       );
  //       // walkDistanceInDate.shift();
  //       // walkDistanceInDate.pop();
  //       // walkDistanceInDate.pop();
  //       const chartDates = excelData.fileJason.map((excelRow, index) => excelRow.calendarDate);
  //       // walkDates.shift();
  //       // walkDates.pop();
  //       // walkDates.pop();
  //       await setWalkData({
  //         chartDates,
  //         walkDistanceInDate,
  //       });
  //       console.log("walkDistanceInDate");
  //       console.log(walkData.walkDistanceInDate);
  //     }
  //   };
  useEffect(() => {
    console.log(params.idFile);
    axios
      .get(`http://localhost:5000/ExcelData/${params.idFile}`)
      .then(async (response) => {
        console.log(response.data);
        await setExcelData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useMemo(() => {
    if (excelData.length !== 0) {
      console.log(excelData);

      // ? dates of events in the charts
      const chartDates = excelData.fileJason.map((excelRow) => excelRow.calendarDate);

      //! Heart Data
      //* Avg heart rate data
      const avgHeartRates = excelData.fileJason.map((excelRow, index) =>
        parseFloat(excelRow.averageHeartRateInBeatsPerMinute)
      );
      // avgHeartRates.shift();

      //* Min heart rate data
      const minHeartRates = excelData.fileJason.map((excelRow, index) =>
        parseFloat(excelRow.minHeartRateInBeatsPerMinute)
      );
      // minHeartRates.shift();

      //* Max heart rate data
      const maxHeartRates = excelData.fileJason.map((excelRow, index) =>
        parseFloat(excelRow.maxHeartRateInBeatsPerMinute)
      );
      // maxHeartRates.shift();

      setHeartData({
        chartDates,
        avgHeartRates,
        minHeartRates,
        maxHeartRates,
      });

      //! sleep data
      const sevenHourSleep = excelData.fileJason.map((excelRow, index) => 7);

      const soldierSleepHour = excelData.fileJason.map((excelRow) =>
        parseFloat(excelRow.sleepDurationInHours)
      );

      //* Deep sleep data
      const deepSleepHour = excelData.fileJason.map((excelRow) =>
        parseFloat(excelRow.deepSleepDurationInHours)
      );

      //* REM sleep data
      const remSleepHour = excelData.fileJason.map((excelRow) =>
        parseFloat(excelRow.remSleepInHours)
      );

      setSleepData({
        chartDates,
        reagularSleep: [sevenHourSleep, soldierSleepHour],
        deepSleepHour,
        remSleepHour,
      });

      //! walk distance data in km
      const walkDistanceInDate = excelData.fileJason.map((excelRow) =>
        parseFloat(excelRow.distanceInKM)
      );
      setWalkData({
        chartDates,
        walkDistanceInDate,
      });
    }
  }, [excelData]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container mt={5} className="justify-content-center" spacing={3}>
          <Grid item xs={4} md={4} lg={4}>
            <MDBox
              variant="gradient"
              bgColor="mekatnar"
              borderRadius="lg"
              coloredShadow="mekatnar"
              mx={2}
              mt={-3}
              p={3}
              px={7}
              mb={3}
              textAlign="center"
              style={{ maxWidth: 600 }}
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mb={2}>
                בחר טווח תאריכים
              </MDTypography>
              <FormGroup row>
                <FormGroup col xs={2} md={2} lg={2}>
                  <Input
                    // placeholder={textPlaceHolderInputs[5]}
                    name="startDate"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    // value={dateRange.startDate}
                    // onChange={handleChangeDate}
                  />
                </FormGroup>

                <FormGroup col xs={2} md={2} lg={2}>
                  <Input
                    // placeholder={textPlaceHolderInputs[5]}
                    name="endDate"
                    type="date"
                    // value={dateRange.endDate}
                    // onChange={handleChangeDate}
                  />
                </FormGroup>
              </FormGroup>
              <FormGroup row>
                <MDButton
                  color="mekatnar"
                  size="large"
                  // onClick={clickSubmit}
                  className="btn-new-blue"
                  type="submit"
                  style={{ width: 150 }}
                >
                  הצג גרף
                  <Icon fontSize="small">upload</Icon>&nbsp;
                </MDButton>
              </FormGroup>
            </MDBox>
          </Grid>
        </Grid>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <Icon color="success" fontSize="small">
                monitor_heart
              </Icon>
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <MDTypography variant="h4" fontWeight="medium" textGradient color="mekatnar" mb={2}>
              גרף קצב לב
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <GraphicHeart heartObject={heartData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <Icon color="success" fontSize="small">
                hotel
              </Icon>
            }
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <MDTypography variant="h4" fontWeight="medium" textGradient color="mekatnar" mb={2}>
              גרף מדדי שינה
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <GraphicSleep sleepObject={sleepData} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <Icon color="success" fontSize="small">
                map
              </Icon>
            }
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <MDTypography variant="h4" fontWeight="medium" textGradient color="mekatnar" mb={2}>
              גרף מרחק יומי
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <GraphicDistance walkObject={walkData} />
          </AccordionDetails>
        </Accordion>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GraphPage;
