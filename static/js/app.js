// Load the data using D3.js
var data;
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
  .then(response => {
    data = response
    var dropdown = d3.select("#selDataset")
    var names = data.names
    for (const name of names) {
        // console.log(name)
        dropdown.append("option").text(name)

      
    }
    console.log(data)
  
    optionChanged(names[0])
  })
  .catch(error => console.log(error));

  function optionChanged(selectedValue) {
    // Implement your logic when the dropdown selection changes
    createBarChart(selectedValue);
    createBubbleChart(selectedValue);
    displayMetadata(selectedValue);
  }
// Define functions to create charts and display data
function createBarChart(selectedid) {
  const sample = data.samples.find((sample)=>sample.id== selectedid);
  // Code to create horizontal bar chart
  const trace = {
    x: sample.sample_values.slice(0, 10).reverse(),
    y: sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
    text: sample.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h",
  };

  const layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" },
  };

  // Create the bar chart using Plotly
  Plotly.newPlot("bar", [trace], layout);
}

function createBubbleChart(selectedid) {
  const sample = data.samples.find((sample)=>sample.id== selectedid)

  const trace = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: "markers",
    marker: {
      size: sample.sample_values,
      color: sample.otu_ids,
      colorscale: "Earth",
    },
  };

  const layout = {
    title: "Bubble Chart",
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Sample Values" },
  };

  // Create the bubble chart using Plotly
  Plotly.newPlot("bubble", [trace], layout);
}

function displayMetadata(selectedid) {
  const metadata = data.metadata.find((metadata)=>metadata.id== selectedid)
  const metadataDiv = d3.select("#sample-metadata"); // Assuming you have a div element with ID "sample-metadata"

  // Clear existing metadata
  metadataDiv.html("");

  // Loop through the metadata key-value pairs and display them
  Object.entries(metadata).forEach(([key, value]) => {
    metadataDiv.append("p").text(`${key}: ${value}`);
  });
}

// Optionally, you can add a function createGaugeChart(data) for the advanced part
