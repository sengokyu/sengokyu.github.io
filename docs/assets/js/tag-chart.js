(function () {
  const svg = d3.select("#tag-chart");
  const width = svg.attr("width");
  const height = svg.attr("height");
  const radius = Math.min(width, height) / 2;
  const labelHeight = 14;
  const ulimit = Math.floor((radius * 2) / (labelHeight * 1.8)) - 1;

  const sorted = tags_count.sort((a, b) => b[1] - a[1]);

  let total_of_rest = 0;
  sorted.slice(ulimit).forEach((x) => (total_of_rest += x[1]));

  const data = sorted.slice(0, ulimit).concat([["その他", total_of_rest]]);

  const chart = svg
    .append("g")
    .attr("transform", `translate(${radius}, ${radius})`);

  const colorSeq = d3
    .scaleSequential()
    .domain([data.length, 0])
    .interpolator(d3.interpolateWarm);

  const pie = d3.pie().value((d) => d[1]);
  const pieData = pie(data);

  const arc = d3.arc().innerRadius(0).outerRadius(radius);

  chart
    .selectAll(null)
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", (d) => arc(d))
    .attr("fill", (d) => colorSeq(d.index))
    .attr("stroke", "gray")
    .style("stroke-width", "1px");

  const legend = svg
    .append("g")
    .attr("transform", `translate(${radius * 2 + 20}, 0)`);

  legend
    .selectAll(null)
    .data(pieData)
    .enter()
    .append("rect")
    .attr("y", (d) => labelHeight * d.index * 1.8)
    .attr("width", labelHeight)
    .attr("height", labelHeight)
    .attr("fill", (d) => colorSeq(d.index))
    .attr("stroke", "grey")
    .style("stroke-width", "1px");

  legend
    .selectAll(null)
    .data(pieData)
    .enter()
    .append("text")
    .text((d) => `${d.data[0]} - ${d.data[1]}件`)
    .attr("x", labelHeight * 1.2)
    .attr("y", (d) => labelHeight * d.index * 1.8 + labelHeight)
    .style("font-family", "sans-serif")
    .style("font-size", `${labelHeight}px`);
})();
