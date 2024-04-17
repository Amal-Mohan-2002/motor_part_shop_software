import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const generateRandomData = (length, min, max) => {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
};

const generateRandomDates = (length) => {
  const startDate = new Date(2022, 0, 1);
  return Array.from({ length }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + index);
    return date.toLocaleDateString();
  });
};

const generateRandomMonthlyData = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months.map((month) => ({
    month,
    revenue: Math.floor(Math.random() * 10000) + 1000, // Random revenue between 1000 and 10000
  }));
};

const generateRandomYearlyData = () => {
  const years = ["2022", "2023", "2024", "2025"]; // Modify this array based on your requirements
  return years.map((year) => ({
    year,
    revenue: Math.floor(Math.random() * 100000) + 5000, // Random revenue between 5000 and 100000
  }));
};

const Stats = () => {
  const dailyData = {
    labels: generateRandomDates(30), // 30 days of data
    datasets: [
      {
        label: "Daily Revenue",
        data: generateRandomData(30, 100, 1000), // Random data between 100 and 1000
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const monthlyData = {
    labels: generateRandomMonthlyData().map((item) => item.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: generateRandomMonthlyData().map((item) => item.revenue),
        backgroundColor: "rgba(192, 75, 192, 0.2)",
        borderColor: "rgba(192, 75, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const yearlyData = {
    labels: generateRandomYearlyData().map((item) => item.year),
    datasets: [
      {
        label: "Yearly Revenue",
        data: generateRandomYearlyData().map((item) => item.revenue),
        backgroundColor: "rgba(192, 192, 75, 0.2)",
        borderColor: "rgba(192, 192, 75, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  };

  return (
    <div>
      <h2>Daily Revenue</h2>
      <div style={containerStyle}>
        <div style={{ height: "300px", width: "400px" }}>
          <Bar data={dailyData} options={chartOptions} />
        </div>
        <div style={{ height: "300px", width: "400px" }}>
          <Bar data={monthlyData} options={chartOptions} />
        </div>
        <div style={{ height: "300px", width: "400px" }}>
          <Bar data={yearlyData} options={chartOptions} />
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/owner"
        mt={2}
      >
        Back
      </Button>
    </div>
  );
};

export default Stats;
