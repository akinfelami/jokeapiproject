const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html")
    })

app.post("/", function(req, res){

    const category = req.body.category

    url = "https://v2.jokeapi.dev/joke/"+category

    https.get(url, function(response){
    console.log("StatusCode: " + response.statusCode)


    response.on("data", function(data){

        const weatherData = JSON.parse(data);
        const jokeSetup = weatherData.setup
        const jokeDelivery = weatherData.delivery
        console.log(jokeSetup + " " + jokeDelivery);
        res.write("Here's your "+category+" joke: " + weatherData.setup + " " + weatherData.delivery)
        res.send();

    })

})

})
    


app.listen(3000, function(){
    console.log('Server is now running on port 3000. Vist localhost:3000 to run')
})