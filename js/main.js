// creating a frame
const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 400;
const MARGINS = {left: 40, right: 40, top: 40, bottom: 40};


const FRAME1 = d3.select("#visGraph1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame");

// functions for point functionality

// adds a border to the point that was clicked and passes coordinates to be
// displayed as the last point clicked
function addBorder(id) {
  // toggle border
  let point = document.getElementById(id);
  point.classList.toggle("border");

  // alter text
  let p = document.getElementById("coord-id");
  p.innerHTML = "Last point clicked: " + "("
    + id.toString().charAt(0) + "," + id.toString().charAt(1) +")";
}

// adds a point with the given coordinates from the dropdown
function addPoint() {
    // get the coords
    let x = document.getElementById("x-coord").value;
    let y = document.getElementById("y-coord").value;
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
document.getElementById("submit").addEventListener("click", addPoint);

// adds event listeners to all points
let points = document.getElementsByClassName("point");
for (let i = 0; i < points.length; i++) {
     points[i].addEventListener("click", () => {
        addBorder(points[i].id);
     })
    };
