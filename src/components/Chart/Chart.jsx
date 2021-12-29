import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2"; //old versionS
import styles from "./Chart.module.css";

const Chart = ({ data }) => {
  //dailyData is the global data for the line chart. destructered 'data' is for bar chart for
  //individual country
  const [dailyData, setDailyData] = useState([]);

  const fetchAPI = async () => {
    const modifiedData = await fetchDailyData();
    setDailyData(modifiedData);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  //   data takes time to load so we handle it
  const LineChart = (
    dailyData.length !== 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null
    );

  const BarChart = (
    data.confirmed ? (
    <Bar
      data={{
        //the first { is for making the code dynamic and second is for making an object}
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data:[data.confirmed.value, 25000, data.deaths.value]
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current State in ${data.country}` },
      }}
    />
  ) : null
  );

  return(
    <div className={styles.container}>
      {((typeof data.country === 'undefined')  || (data.country ==="Global")) ? LineChart : BarChart}
    </div>
  ) 
};

//As data.country is now "" so data.country ? BarChart : LineChart
//This works better becuase if we select global in the dropdown the card is set to orignal text
//Rather than the Global Infected one

export default Chart;
