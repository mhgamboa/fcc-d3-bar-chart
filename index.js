const height = 400;
const width = 1000;
const padding = 45;
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
    const barWidth = (width - padding - padding) / barData.length;

    // Create yScale which scales GDP
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d[1])])
      .range([height - padding, padding]);

    // create xScale which scales time by the year
    let minDate = new Date(barData[0][0].substr(0, 4));
    var maxDate = new Date(barData[barData.length - 1][0].substr(0, 4));

    const xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([padding, width - padding]);

    //Create and append Y AXis for GDP
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${padding}, 0)`)
      .attr("id", "y-axis");

    //Create and append xAxis for Time
    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${height - padding})`)
      .attr("id", "x-axis");
    // Create & Append Bars
    svg
      .selectAll("rect")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth + padding)
      .attr("y", (d, i) => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", (d) => height - padding - yScale(d[1]))
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1]);
  });
