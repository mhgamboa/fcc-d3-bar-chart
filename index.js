const height = 400;
const width = 1000;
const padding = 45;
const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

// const tooltip = svg.append("g").attr("id", "tooltip");

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
)
  .then((response) => response.json())
  //Once data is received create everything
  .then((data) => {
    let barData = data.data;
    const barWidth = (width - padding - padding) / barData.length;

    // Create yScale which scales GDP
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d[1])])
      .range([height - padding, padding]);

    // create xScale which scales time by the year
    let minDate = new Date(barData[0][0]);
    let maxDate = new Date(barData[barData.length - 1][0]);

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
    // yAxisLabel
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -229)
      .attr("y", 70)
      .text("Gross Domestic Product");
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
      .attr("data-gdp", (d) => d[1])
      // Mouse Events for bars
      .on("mouseover", (e, i) => {
        if (e.layerX < 700) {
          tooltip.setAttribute("x", e.layerX + 5);
        } else {
          tooltip.setAttribute("x", e.layerX - 233);
        }
        tooltip.setAttribute("y", e.layerY - 20);
        tooltip.setAttribute("data-date", i[0]);
        tooltip.textContent = `Date: ${i[0]} GDP:${i[1]}`;
        tooltip.classList.toggle("hidden");
      })
      .on("mousemove", (e, i) => {
        if (e.layerX < 700) {
          tooltip.setAttribute("x", e.layerX + 5);
        } else {
          tooltip.setAttribute("x", e.layerX - 233);
        }

        tooltip.setAttribute("y", e.layerY - 20);
      })
      .on("mouseout", (e, i) => {
        tooltip.classList.toggle("hidden");
      });
    // Create ToolTip
    svg
      .append("text")
      .attr("id", "tooltip")
      .attr("width", "45")
      .attr("height", "30")
      .attr("x", "100")
      .attr("y", "100")
      .attr("class", "hidden")
      .text("test");
  });
