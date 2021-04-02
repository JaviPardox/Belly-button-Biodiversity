function charts(sample)
{
    d3.json("samples.json").then(function(data)
    {
        var samples = data.samples;
        console.log(samples);

        var result_array = samples.filter(function(data)
        {
            return data.id == sample;
        });
        console.log(result_array);

        // Extract dictionary from list of objects (len = 1)
        var result = result_array[0];
        console.log(result);

        // Dictionary notation 
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Build bubble chart
        var bubble_layout = {
            title: "Bacteria Cultures per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            margin: {t: 30}
        };

        var bubble_data = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }

            }
        ];

        Plotly.newPlot("bubble", bubble_data, bubble_layout);

        var yticks = otu_ids.slice(0,10).map(function(otu_ID)
        {
            return `OTU ${otu_ID}`;
        }).reverse();
        
        var bar_data = [
            {
                y: yticks,
                x: sample_values.slice(0,10).reverse(),
                text: otu_labels.slice(0,10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        var bar_layout = {
            title: "Top bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", bar_data, bar_layout);

    });

}

function meta_data(sample)
{
    d3.json("samples.json").then(function(data)
    {
        var metadata = data.metadata;
        // Filter data 
        var result_array = metadata.filter(function(data)
        {
            return data.id == sample;
        });

        var result = result_array[0];
        var panel = d3.select("#sample-metadata");

        // Clear existing metadata
        panel.html("");

        Object.entries(result).forEach(function([key, value])
        {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })

    });

}


function init()
{
    // Reference to select tag from index.html
    var selector = d3.select("#selDataset");
    // Grab samples.json and append names to list
    d3.json("samples.json").then(function(data)
    {
        console.log(data);
        var sample_names = data.names;

        sample_names.forEach(function(name)
        {
            // Append to the selector
            selector
            .append("option")
            .text(name)
            .property("value", name);

        });
    
        var sample = sample_names[0];
        charts(sample);
        meta_data(sample);

    });

    // Promises
    //var data = d3.json("samples.json");
    //console.log(data);

}

init();