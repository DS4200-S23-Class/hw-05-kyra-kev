// creating a frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// adding frame for the first viz
const FRAME1 = d3.select("#visGraph1")
                .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                .append("g")
                    .attr("transform", "translate(" + MARGINS.left + ", "
                     + MARGINS.top + ")");;
                   // .attr("id", "frame");

// adding frame for the first viz
const FRAME2 = d3.select("#visGraph2");

const FRAME3 = d3.select("#visGraph1")
                .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "rect")
                .append("g")
                    .attr("transform", "translate(" + MARGINS.left + ", "
                     + MARGINS.top + ")");

// LEFT COLUMN

// adding data from the csv for scatter plot
d3.csv("data/scatter-data.csv").then((data) => {
    const x = d3.scaleBand()
      .range([0, VIS_WIDTH])
      .domain([1, 2, 3, 4, 5, 6, 7, 8])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => {return d.y;})])
      .range([VIS_HEIGHT, 0]);

  FRAME1.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", (d) => {
          return d.x * 36;
        })
        .attr("cy", (d) => {
          return VIS_HEIGHT - (d.y * 35);
        })
        .attr("r", 10)
        .attr("class", "point")
        .attr("id", (d) => {
          return d.x.toString() + d.y.toString();
        })
        .on("click", addBorder);
    // add axises/ticks
    FRAME1.append("g")
        .attr("transform", "translate(0," + VIS_HEIGHT + ")" )
            .call(d3.axisBottom(x))
            .attr("font-size", "15px");

    FRAME1.append("g")
        .call(d3.axisLeft(y))
        .attr("font-size", "15px");

    console.log(x);
});

// adds a border to the point that was clicked and passes coordinates to be
// displayed as the last point clicked
function addBorder() {
  // toggle border
  const point = d3.select(this);
  point.classed("border", !d3.select(this).classed("border"));

  // alter text
  const id = point.attr("id");
  const p = d3.select("#coord-id");
  p.text("Last point clicked: " + "("
    + id.toString().charAt(0) + "," + id.toString().charAt(1) +")");
}

// adds a point with the given coordinates from the dropdown
function addPoint() {
    // get the coords
    let x = dropdownButtonX.property("value");
    let y = dropdownButtonY.property("value");

    // create unique id
    let id = x.toString() + y.toString();

    // add circle with functionality
    FRAME1.append("circle")
            .attr("cx", x * 36)
            .attr("cy", VIS_HEIGHT - (y * 35))
            .attr("r", 10)
            .attr("class", "point")
            .attr("id", id)
            .on("click", addBorder);
}

function build_plot() {
// adding data from the csv for barplot
    d3.csv("data/bar-data.csv").then((data) => {

    const x = d3.scaleBand()
      .range([0, VIS_WIDTH])
      .domain(data.map(d => d.category))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => {return d.amount;})])
      .range([VIS_HEIGHT, 0]);

      FRAME3.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => { return x(d.category); })
        .attr("y", (d) => { return y(d.amount); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return VIS_HEIGHT - y(d.amount); })
        .attr("class", "bar")

        // add axises/ticks
        FRAME3.append("g")
                .attr("transform", "translate(0," + VIS_HEIGHT + ")" )
                .call(d3.axisBottom(x).ticks(7))
                    .attr("font-size", "15px");

        FRAME3.append("g")
                .call(d3.axisLeft(y))
                .attr("font-size", "15px");

        const TOOLTIP = d3.select("#visGraph1")
                            .append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0);

        function handleMouseover(event, d) {
            TOOLTIP.style("opacity", 1);
        }

        function handleMousemove(event, d) {
            TOOLTIP.html("Category: " + d.category + "<br>Value: " + d.amount)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 50) + "px");
        }

        function handleMouseleave(event, d) {
            TOOLTIP.style("opacity", 0);
        }

        FRAME3.selectAll(".bar")
                .on("mouseover", handleMouseover)
                .on("mousemove", handleMousemove)
                .on("mouseleave", handleMouseleave);

    });

}

// call scatterplot
build_plot();

// RIGHT COLUMN

// list of all coords
var allCoords = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

var text = d3.select("#coord-id2")
    .text("Select the (x,y) coordinate you would like to add:");

// creates dropdown for x-coords
var dropdownButtonX = d3.select("#visGraph2")
.append('select');

// adds all coords to button
dropdownButtonX
  .selectAll('myOptions')
    .data(allCoords)
  .enter()
    .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

// same for y-coords
var dropdownButtonY = d3.select("#visGraph2")
  .append('select');

dropdownButtonY 
  .selectAll('myOptions')
    .data(allCoords)
  .enter()
    .append('option')
  .text(function (d) { return d; })
  .attr("value", function (d) { return d; }) 

// creates button to add points
var addPointButton = d3.select("#visGraph2")
                        .append("button")
                        .text("Submit")
                        .attr("class", "button");

// functionality for submit button
addPointButton.on("click", addPoint);
