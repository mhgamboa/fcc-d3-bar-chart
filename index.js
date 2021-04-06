const height = 400;
const width = 1000;
const padding = 50;
const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    let barData = data.data;
    let dummyData = [
      [0, 300],
      [0, 400],
      [0, 500],
      [0, 600],
      [0, 700],
    ];
    // const xScale = d3
    //   .scaleLinear()
    //   .domain([0, d3.max(dummyData, (d) => d[0])])
    //   .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dummyData, (d) => d[1])])
      .range([height - padding, padding]);

    console.log(data);
    svg
      .selectAll("rect")
      .data(dummyData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * (width / dummyData.length))
      .attr("y", (d, i) => yScale(d[1]))
      .attr("width", width / dummyData.length - 1)
      .attr("height", (d) => yScale(d[1]))
      .attr("color", "blue");
  });
