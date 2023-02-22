// creating a frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};

// adding
const FRAME1 = d3.select("#visGraph1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("id", "frame");


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
        .attr("onclick", (d) => {
          return "addBorder(" + d.x.toString() + d.y.toString() + ")";
        });

});

// functions for point functionality

// adds a border to the point that was clicked and passes coordinates to be
// displayed as the last point clicked
function addBorder(id) {
  // toggle border
  let point = d3.select("#" + id);
  point.classList.toggle("border");

  // alter text
  let p = d3.select(".coord-id");
  p.innerHTML = "Last point clicked: " + "("
    + id.toString().charAt(0) + "," + id.toString().charAt(1) +")";
}

// adds a point with the given coordinates from the dropdown
function addPoint() {
    // get the coords
    let x = d3.select(".x-coord").value;
    let y = d3.select(".y-coord").value;
    let id = x.toString() + y.toString();

    FRAME1.append("circle")
            .attr("cx", x * 40)
            .attr("cy", 400 - (y * 40))
            .attr("r", 10)
            .attr("class", "point")
            .attr("id", id)
            .attr("onclick", "addBorder(" + id +")");
}

// adds event listener to submit button
d3.select(".submit").addEventListener("click", addPoint);
