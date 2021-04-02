

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