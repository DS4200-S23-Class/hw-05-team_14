

//declare contsants

const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50}


// with a scale function

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select("#scatterplot") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

const FRAME2 = d3.select("#barchart")
          .append("svg")
            .attr("height", FRAME_HEIGHT)
            .attr("width", FRAME_WIDTH)
            .attr("class", "frame");


// function for scatter plot

function build_scatter_plot() {

  d3.csv("data/scatter-data.csv").then((data) => {

    const MAX_X = d3.max(data, (d) => {
            return parseInt(d.x)
    });

    const X_SCALE = d3.scaleLinear("points")
              .domain([0, MAX_X])
              .range([0, VIS_WIDTH]);


    FRAME1.selectAll("points")  
        .data(data)
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); }) 
          .attr("cy", MARGINS.top) 
          .attr("r", 20)
          .attr("class", "point");

  
  //tooltip for interactions
  const TOOLTIP = d3.select("#scatterplot")
            .append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);


  //mouseover
  function handleMouseover(event, d) {
    TOOLTIP.style("opacity", 1);
  }

  //mousemove
  function handleMousemove(event, d) {
    TOOLTIP.html("Name: " + d.name + "<br> Value: " + d.x)
        .style("left", (event.pageX + 10 + "px"))
        .style("top", (event, pageY + 50 + "px"));

  }

  //mouseleave
  function handleMouseleave(event, d) {
    TOOLTIP.style("opacity", 0);

  }

  // add event listeners to the points
  FRAME1.selectAll(".point")
      .on("mouseover", handleMouseover)
      .on("mousemove", handleMousemove)
      .on("mouseleave", handleMouseleave);

  FRAME1.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE).ticks(4)) 
            .attr("font-size", '20px'); 
            

  });
}

build_scatter_plot();

//reapeat for the bar
function build_bar_plot() {

  d3.csv("data/bar-data.csv").then((data) => {

    const MAX_X2 = d3.max(data, (d) => {
            return parseInt(d.x)
    });

    const X_SCALE2 = d3.scaleLinear("points")
              .domain([0, MAX_X2 + 10000])
              .range([0, VIS_WIDTH]);


    FRAME2.selectAll("points")  
        .data(data)
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE2(d.x) + MARGINS.left); }) 
          .attr("cy", MARGINS.top) 
          .attr("r", 20)
          .attr("class", "point");

  
  //tooltip for interactions
  const TOOLTIP = d3.select("#barchart")
            .append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);


  //mouseover
  function handleMouseover(event, d) {
    TOOLTIP.style("opacity", 1);
  }

  //mousemove
  function handleMousemove(event, d) {
    TOOLTIP.html("Name: " + d.name + "<br> Value: " + d.x)
        .style("left", (event.pageX + 10 + "px"))
        .style("top", (event, pageY + 50 + "px"));

  }

  //mouseleave
  function handleMouseleave(event, d) {
    TOOLTIP.style("opacity", 0);

  }

  // add event listeners to the points
  FRAME2.selectAll(".point")
      .on("mouseover", handleMouseover)
      .on("mousemove", handleMousemove)
      .on("mouseleave", handleMouseleave);

  FRAME2.append("g") 
          .attr("transform", "translate(" + MARGINS.left + 
                "," + (VIS_HEIGHT + MARGINS.top) + ")") 
          .call(d3.axisBottom(X_SCALE2).ticks(4)) 
            .attr("font-size", '20px'); 
            

  });
}

build_bar_plot();