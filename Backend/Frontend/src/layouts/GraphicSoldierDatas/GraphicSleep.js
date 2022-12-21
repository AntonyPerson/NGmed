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

// // Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function GraphicSleep() {
  const { sales, tasks } = reportsLineChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <MDBox mb={3} ml={40}>
                <MixedChart
                  icon={{ color: "mekatnar", component: "hotel" }}
                  title="שעות שינה"
                  description="Analytics Insights"
                  chart={{
                    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        chartType: "gradient-line",
                        label: "שעות שינה מטכליות",
                        color: "error",
                        data: [7, 7, 7, 7, 7, 7, 7, 7, 7],
                      },
                      {
                        chartType: "bar",
                        label: "שעות שינה",
                        color: "mekatnar",
                        data: [6.5, 8, 3, 8, 9, 9, 6, 4, 1],
                      },
                    ],
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="שעות שינה עמוקה"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="שעות שינה REM"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default GraphicSleep;

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
