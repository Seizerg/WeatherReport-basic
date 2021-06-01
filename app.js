const express= require("express");
const app= express();
const https= require("https");
const bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");})




  app.post("/",function(req,res){

    const query =req.body.city;
      const api="97f4d82f3807996b062a8e99b74c1f92";
      const unit="metric";

      https.get("https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit+"",function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
          const weatdata=JSON.parse(data);
          console.log("today's temperature is "+weatdata.main.temp);
          console.log(weatdata.weather[0].description+" -quite chill weather");
          const icon= weatdata.weather[0].icon;
          const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
          res.write("<h1>"+req.body.city+" temp is "+weatdata.main.temp+" degrees celcius</h1>");
          res.write("<h3>today its quite "+weatdata.weather[0].description+" here<h3>");
          res.write("<img src="+imgURL+">");

          res.send();


  })







})

});









app.listen(3000,function(){
  console.log("ur server got started");
})
