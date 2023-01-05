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
import { useState, useMemo, useEffect, memo } from "react";
import { signin, authenticate, isAuthenticated } from "auth/index";
import axios from "axios";
import MDTypography from "components/MDTypography";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import PolarChart from "examples/Charts/PolarChart";

const { user } = isAuthenticated();
// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function GraphicDistance(props) {
  // const [excelNames, setExcelNames] = useState({});
  // const [excelData, setExcelData] = useState([]);
  // const [isError, setIsError] = useState(false);
  // const [fileIndex, setFileIndex] = useState(-1);
  // const [walkData, setWalkData] = useState({});
  // useEffect(() => {
  //   console.log(props.walkObject);
  //   console.log(props.walkObject.walkDistanceInDate);
  //   console.log(props.walkObject.walkDates);
  // }, [props]);
  // useEffect(() => {
  //   console.log(user.personalnumber);
  //   axios
  //     .get(`http://localhost:5000/ExcelData/uploadedExcelsByPersonalnumber/${user.personalnumber}`)
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
  //     //* walk distance data in km
  //     const walkDistanceInDate = excelData[fileIndex].fileJason.map(
  //       (excelRow, index) => index > 0 && parseFloat(excelRow.distanceInKM)
  //     );
  //     walkDistanceInDate.shift();
  //     walkDistanceInDate.pop();
  //     walkDistanceInDate.pop();
  //     const walkDates = excelData[fileIndex].fileJason.map(
  //       (excelRow, index) => index > 0 && excelRow.calendarDate
  //     );
  //     walkDates.shift();
  //     walkDates.pop();
  //     walkDates.pop();
  //     setWalkData({
  //       walkDates,
  //       walkDistanceInDate,
  //     });
  //     console.log("walkDistanceInDate");
  //     console.log(walkData.walkDistanceInDate);
  //   } else {
  //     setWalkData({});
  //   }
  // }, [fileIndex]);

  // async function handleChange(evt) {
  //   const { value } = evt.target;
  //   await setFileIndex(parseInt(value, 10));
  //   console.log(fileIndex);
  // }
  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox py={3}>
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
              icon={{ color: "mekatnar", component: "map" }}
              title="מרחק יומי"
              // description="הקו האדום מייצג את 7 שעות השינה המטכליות"
              chart={{
                labels: props.walkObject.chartDates,
                datasets: [
                  {
                    chartType: "bar",
                    label: "מרחק בקילומטרים",
                    color: "mekatnar",
                    data: props.walkObject.walkDistanceInDate,
                  },
                ],
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
    //   </MDBox>
    //   <Footer />
    // </DashboardLayout>
  );
}

export default memo(GraphicDistance);
