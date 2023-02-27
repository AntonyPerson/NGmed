/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormGroup,
} from "@mui/material";
import { authenticate, isAuthenticated, signin } from "auth/index";
import axios from "axios";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import MixedChart from "examples/Charts/MixedChart";
import PolarChart from "examples/Charts/PolarChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Input, Label } from "reactstrap";

//* Merge jason of excel files help functions
import {
  axiosGetGdodJasonById,
  axiosGetHativaJasonById,
  axiosGetMahlakaJasonById,
  axiosGetPlogaJasonById,
} from "merageJasonExcelFiels";
//* Graph components
import GraphicDistance from "./GraphicDistance";
import GraphicHeart from "./GraphicHeart";
import GraphicSleep from "./GraphicSleep";

const { user } = isAuthenticated();
// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
/* 
? dashboardView - boolean
? typeView - only if dashboardView is true - [mahlka, ploga, gdod, hativa]
? idView - only if dashboardView is true - the ID vlue of the typeView - a params.idFile not a prop
*/
function GraphPage(props) {
  // const [excelNames, setExcelNames] = useState({});
  const params = useParams();
  const [excelData, setExcelData] = useState([]);
  const [walkData, setWalkData] = useState({});
  const [sleepData, setSleepData] = useState({
    reagularSleep: [[], [], []],
  });
  const [heartData, setHeartData] = useState({});

  const [dateRange, setDataRange] = useState({ startDate: "", endDate: "" });

  const dataCompare = (date1String, date2String) => {
    const date1 = new Date(date1String);
    const date2 = new Date(date2String);

    // (YYYY-MM-DD)
    if (date1.getTime() < date2.getTime()) {
      // date1 is lesser than date2
      return 1;
    }
    if (date1.getTime() > date2.getTime()) {
      // date1 is greater than date2
      return 2;
    }
    return 0;
    // both are equal
  };

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
    if (props.dashboardView === false || props.dashboardView === undefined) {
      console.log(params.idFile);
      axios
        .get(`http://localhost:5000/NGmedDB/ExcelData/${params.idFile}`)
        .then(async (response) => {
          console.log(response.data);
          await setExcelData(response.data);
          await setDataRange({
            startDate: response.data.fileJason[0].calendarDate,
            endDate: response.data.fileJason[response.data.fileJason.length - 1].calendarDate,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //  else {
    //   switch (props.typeView) {
    //     case "mahlka":
    //       axiosGetMahlakaJasonById(params.idFile);
    //       break;
    //     case "ploga":
    //       axiosGetPlogaJasonById(params.idFile);
    //       break;
    //     case "gdod":
    //       axiosGetGdodJasonById(params.idFile);
    //       break;
    //     case "hativa":
    //       axiosGetHativaJasonById(params.idFile);
    //       break;
    //     default:
    //       axiosGetMahlakaJasonById(params.idFile);
    //       break;
    //   }
    // }
  }, []);

  useMemo(() => {
    if (excelData.length !== 0) {
      console.log(excelData);
      const dateRangeExcelData = excelData.fileJason.filter(
        (excelRow) =>
          (dataCompare(excelRow.calendarDate, dateRange.endDate) === 1 ||
            dataCompare(excelRow.calendarDate, dateRange.endDate) === 0) &&
          (dataCompare(excelRow.calendarDate, dateRange.startDate) === 2 ||
            dataCompare(excelRow.calendarDate, dateRange.startDate) === 0)
      );
      console.log("dateRangeExcelData");
      console.log(dateRangeExcelData);

      // ? dates of events in the charts
      const chartDates = dateRangeExcelData.map((excelRow) => excelRow.calendarDate);

      //! Heart Data
      //* Avg heart rate data
      const avgHeartRates = dateRangeExcelData.map((excelRow, index) =>
        parseFloat(excelRow.averageHeartRateInBeatsPerMinute)
      );
      // avgHeartRates.shift();

      //* Min heart rate data
      const minHeartRates = dateRangeExcelData.map((excelRow, index) =>
        parseFloat(excelRow.minHeartRateInBeatsPerMinute)
      );
      // minHeartRates.shift();

      //* Max heart rate data
      const maxHeartRates = dateRangeExcelData.map((excelRow, index) =>
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
      const sevenHourSleep = dateRangeExcelData.map((excelRow, index) => 7);

      const soldierSleepHour = dateRangeExcelData.map((excelRow) =>
        parseFloat(excelRow.sleepDurationInHours)
      );

      //* Deep sleep data
      const deepSleepHour = dateRangeExcelData.map((excelRow) =>
        parseFloat(excelRow.deepSleepDurationInHours)
      );

      //* REM sleep data
      const remSleepHour = dateRangeExcelData.map((excelRow) =>
        parseFloat(excelRow.remSleepInHours)
      );

      setSleepData({
        chartDates,
        reagularSleep: [sevenHourSleep, soldierSleepHour],
        deepSleepHour,
        remSleepHour,
      });

      //! walk distance data in km
      const walkDistanceInDate = dateRangeExcelData.map((excelRow) =>
        parseFloat(excelRow.distanceInKM)
      );
      setWalkData({
        chartDates,
        walkDistanceInDate,
      });
    }
  }, [excelData, dateRange]);

  async function handleChangeDate(evt) {
    const { value } = evt.target;
    await setDataRange({ ...dateRange, [evt.target.name]: value });
    console.log(dateRange);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container mt={5} className="justify-content-center" spacing={3}>
          <Grid item xs={4} md={4} lg={4}>
            {props.dashboardView === false || props.dashboardView === undefined ? (
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
                textAlign="left"
                style={{ maxWidth: 600 }}
              >
                <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                  {`שם הקובץ: ${excelData.fileName}`}
                </MDTypography>
                <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                  {`הקובץ הועלה על ידי - מספר אישי: ${excelData.personalnumber}`}
                </MDTypography>
                <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                  {`מספר השעונים שנפרקו: ${excelData.countWatchesUsed}`}
                </MDTypography>
              </MDBox>
            ) : (
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
                textAlign="left"
                style={{ maxWidth: 600 }}
              >
                {props.typeView === "mahlka" ? (
                  <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                    סיכום מחלקתי
                  </MDTypography>
                ) : props.typeView === "ploga" ? (
                  <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                    סיכום פלוגתי
                  </MDTypography>
                ) : props.typeView === "gdod" ? (
                  <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                    סיכום גדודי
                  </MDTypography>
                ) : (
                  <MDTypography variant="h5" fontWeight="medium" color="white" mb={0.5}>
                    סיכום חטיבתי
                  </MDTypography>
                )}
              </MDBox>
            )}
          </Grid>
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
              <FormControl sx={{ m: 0.5 }} variant="standard">
                <FormGroup row>
                  <FormGroup col sx={{ mx: 0.5 }} xs={0.5} md={0.5} lg={0.5}>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="endDate"
                      type="date"
                      value={dateRange.endDate}
                      onChange={handleChangeDate}
                    />
                  </FormGroup>

                  <FormGroup col xs={2} md={2} lg={2}>
                    <Input
                      // placeholder={textPlaceHolderInputs[5]}
                      name="startDate"
                      type="date"
                      placeholder="dd-mm-yyyy"
                      value={dateRange.startDate}
                      onChange={handleChangeDate}
                    />
                  </FormGroup>
                </FormGroup>
              </FormControl>
              {/* <FormGroup row>
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
              </FormGroup> */}
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
