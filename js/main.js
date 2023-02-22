// creating a frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};

// adding frame for the first viz
const FRAME1 = d3.select("#visGraph1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("id", "frame");

// adding data from the csv
d3.csv("data/scatter-data.csv").then((data) => {
  FRAME1.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
        .attr("cx", (d) => {
          return d.x * 40;
        })
        .attr("cy", (d) => {
          return 400 - (d.y * 40);
        })
        .attr("r", 10)
        .attr("class", "point")
        .attr("id", (d) => {
          return d.x.toString() + d.y.toString();
        })
        .on("click", addBorder);

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
    let x = d3.select("#x-coord").node().value;
    let y = d3.select("#y-coord").node().value;

    // create unique id
    let id = x.toString() + y.toString();

    // add circle with functionality
    FRAME1.append("circle")
            .attr("cx", x * 40)
            .attr("cy", 400 - (y * 40))
            .attr("r", 10)
            .attr("class", "point")
            .attr("id", id)
            .on("click", addBorder);
}

// functionality for submit button
d3.select("#submit").on("click", addPoint);
