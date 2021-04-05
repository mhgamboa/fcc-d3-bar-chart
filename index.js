import * as d3 from "d3";

const height = "500px";
const width = "500px";
const svg = d3
  .select("body")
  .append("svg")
  .attr("height", height)
  .attr("width", width);

console.log(svg);
console.log("hi");
