/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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
import { FormGroup } from "@mui/material";
import { Input, Label } from "reactstrap";
import React, { useState, useMemo, useEffect, memo } from "react";
import { signin, authenticate, isAuthenticated } from "auth/index";
import axios from "axios";
import MDTypography from "components/MDTypography";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

const { user } = isAuthenticated();
// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function GraphicSleep(props) {
  const { sales, tasks } = reportsLineChartData;

  // const [excelNames, setExcelNames] = useState({});
  // const [excelData, setExcelData] = useState([]);
  // const [isError, setIsError] = useState(false);
  // const [sleepData, setSleepData] = useState({
  //   reagularSleep: [[], [], []],
  // });

  // useEffect(() => {
  //   console.log(user.personalnumber);
  //   axios
  //     .get(`http://localhost:5000/NGmedDB/ExcelData/uploadedExcelsByPersonalnumber/${user.personalnumber}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setExcelData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsError(true);
  //     });
  // }, []);

  // useMemo(() => {
  //   if (fileIndex !== -1) {
  //     //* regular sleep data
  //     const sevenHourSleep = excelData[fileIndex].fileJason.map((excelRow, index) => 7);
  //     sevenHourSleep.shift();
  //     const soldierSleepHour = excelData[fileIndex].fileJason.map(
  //       (excelRow, index) => index > 0 && parseFloat(excelRow.sleepDurationInHours)
  //     );
  //     soldierSleepHour.shift();
  //     const sleepDates = excelData[fileIndex].fileJason.map(
  //       (excelRow, index) => index > 0 && excelRow.calendarDate
  //     );
  //     sleepDates.shift();

  //     //* Deep sleep data
  //     const deepSleepHour = excelData[fileIndex].fileJason.map(
  //       (excelRow, index) => index > 0 && parseFloat(excelRow.deepSleepDurationInHours)
  //     );
  //     deepSleepHour.shift();

  //     //* REM sleep data
  //     const remSleepHour = excelData[fileIndex].fileJason.map(
  //       (excelRow, index) => index > 0 && parseFloat(excelRow.remSleepInHours)
  //     );
  //     remSleepHour.shift();

  //     setSleepData({
  //       sleepDates,
  //       reagularSleep: [sevenHourSleep, soldierSleepHour],
  //       deepSleepHour,
  //       remSleepHour,
  //     });
  //     console.log("datasetsRefularSlepp");
  //     console.log(sleepData.reagularSleep);
  //   } else {
  //     const sevenHourSleep = [];
  //     const soldierSleepHour = [];
  //     const sleepDates = [];
  //     setSleepData({ reagularSleep: [sleepDates, sevenHourSleep, soldierSleepHour] });
  //   }
  // }, [fileIndex]);

  // async function handleChange(evt) {
  //   const { value } = evt.target;
  //   await setFileIndex(parseInt(value, 10));
  //   console.log(fileIndex);
  // }
  return (
    <MDBox mt={4.5}>
      {/* <MDBox
        variant="gradient"
        bgColor="mekatnar"
        borderRadius="lg"
        coloredShadow="mekatnar"
        mx={2}
        mt={-3}
        p={3}
        mb={3}
        textAlign="center"
        style={{ maxWidth: 450 }}
      >
        <FormGroup row>
          <MDTypography variant="h4" fontWeight="medium" color="white" mb={2}>
            בחר קובץ להצגת נתונים
          </MDTypography>
          <Input
            // placeholder={textPlaceHolderInputs[5]}
            name="ExcelFileSelctor"
            type="select"
            onChange={handleChange}
          >
            <option disabled selected="selected" value={-1}>
              בחר קובץ
            </option>
            {excelData.map((excelFile, index) => (
              <option key={excelFile.id} value={index}>
                {excelFile.fileName}
              </option>
            ))}
          </Input>
        </FormGroup>
      </MDBox> */}
      <Grid container mt={5} className="justify-content-center" spacing={3}>
        <Grid item xs={12} md={9} lg={9}>
          <MDBox mb={3}>
            <MixedChart
              icon={{ color: "mekatnar", component: "hotel" }}
              title="שעות שינה"
              description="הקו האדום מייצג את 7 שעות השינה המטכליות"
              chart={{
                labels: props.sleepObject.chartDates,
                datasets: [
                  {
                    chartType: "gradient-line",
                    label: "שעות שינה מטכליות",
                    color: "error",
                    data: props.sleepObject.reagularSleep[0],
                  },
                  {
                    chartType: "bar",
                    label: "שעות שינה",
                    color: "mekatnar",
                    data: props.sleepObject.reagularSleep[1],
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
        <Grid mt={5} item xs={12} md={9} lg={9}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="mekatnar"
              title="שעות שינה עמוקה"
              // description={
              //   <>
              //     (<strong>+15%</strong>) increase in today sales.
              //   </>
              // }
              // date="updated 4 min ago"
              chart={{
                labels: props.sleepObject.chartDates,
                datasets: {
                  label: "מספר שעות",
                  data: props.sleepObject.deepSleepHour,
                },
              }}
            />
          </MDBox>
        </Grid>
        <Grid mt={5} item xs={12} md={9} lg={9}>
          <MDBox mb={3}>
            <ReportsLineChart
              color="mekatnar"
              title="שעות שינה REM"
              // description={
              //   <>
              //     (<strong>+15%</strong>) increase in today sales.
              //   </>
              // }
              // date="updated 4 min ago"
              chart={{
                labels: props.sleepObject.chartDates,
                datasets: {
                  label: "מספר שעות",
                  data: props.sleepObject.remSleepHour,
                },
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default memo(GraphicSleep);

// ? How to use Git
//* git checkout BranchName - command to switch to a differnt branch

//* git checkout -b BranchName - command to create and switch to a differnt branch

//* git pull origin BranchName - Get a remote Branch for the first time

//* git push -u origin BranchName - Push a Branch for the first time for it to be romote(In Github)

//* To save your Job in Github - push
//! Happens on the branch that you are on
// git add .
// git commit -m "Title/description"
// git push

//* Get updates from Github - pull
//! Happens on the branch that you are on
// git pull

//* Get updates from a branch to a Branch
//! Happens on the branch that you are on
// git pull origin BranchNameTopullFrom
// git push
