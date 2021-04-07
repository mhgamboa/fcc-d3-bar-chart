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
    // let xScale = d3
    //   .scaleTime()
    //   .domain([d3.min(yearsDate), xMax])
    //   .range([0, width]);

    const barWidth = width / barData.length;

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d[1])])
      .range([0, height - padding]);

    svg
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * ((width - 100) / barData.length) + padding)
      .attr("y", (d, i) => height - yScale(d[1]) - padding)
      .attr("width", barWidth)
      .attr("height", (d) => yScale(d[1]))
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .append("tooltip")
      .attr("data-date", (d) => d[0])
      .attr("id", "tooltip")
      .text((d) => d[1]);
  });
