import { Chart } from "react-google-charts";

export const data = [
  ["Day", "Amount"],
  ["0", 0],

];


const BarChart = ({ chartData, color }) => {
  const options = {
    curveType: "function",
    legend: { position: "none" },
    hAxis: { textPosition: "none" },
    colors: [color],
  };
  const feed = chartData.length > 1 ? chartData : data;
  return (
    <div>
      <Chart
        chartType="LineChart"
        width="100%"
        height="150px"
        data={feed}
        options={options}
      />
    </div>
  );
};

export default BarChart;