function download_csv() {
    //new instance of xmlhttprequest class 
    let request = new XMLHttpRequest();

    //gets inputs from the form
    var variable = document.getElementById("variable");
    //get value from options pulled fom the element id
    var variable_value = variable.options[variable.selectedIndex].value;

    var geography = document.getElementById("geography");
    var geography_value = geography.options[geography.selectedIndex].value;

    //prefix url for which we will append the inputs from the prompts
    const url = "https://api.census.gov/data/2018/acs/acs5/subject?get=";

    //API Key
    const apiKey = "6df8ecbbdd76fb9432d628ae6178349765cba241";

    //constructs url endpoint we will make our request from
    const link = `${url}${variable_value}${",NAME&for="}${geography_value}${" :*&key="}${apiKey}`;

    //begin to access the data
    request.onreadystatechange = () => {
        let data = JSON.parse(request.response);
        //gets the html element we want to put our data in
        if (request.readyState === XMLHttpRequest.DONE) {
            console.log(data);
            
            //define csv and create new line after it
            var csv = 'Name,Title\n'
            
            //loops through each item in an array
            data.forEach( function(row) {
                    //loops through each array and concatenates into one whole string separated by commas
                    csv += row.join(',');
                    //new line
                    csv += "\n";
            }
            );
            
            //create an href element that is hiddedn
            var hiddenElement = document.createElement('a');

            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'output.csv';
            hiddenElement.click();

        } 
    }

    //opens a new connection, using the GET request on the URL endpoint
    request.open("GET", link);

    //Send request
    request.send();
}