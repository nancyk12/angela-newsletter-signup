

const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },

        }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/62fcf608eb";

  const options = {
    method: "POST",
    auth: "nancyk12:6ba1811b4c7cb311af128b8d1c1a76cf-us21"
  }

const request = https.request(url, options, function(response) {
   
   if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
   } else {
    res.sendFiles(__dirname + "/failure.html!");

   };
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
});

request.write(jsonData);
request.end();
});




app.post("/failue", function(req,res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3005, function() {
    console.log("Server is running on port 3005.");
});

// mailchimp api key = 6ba1811b4c7cb311af128b8d1c1a76cf-us21
//mailchimp unique id for the list Nancy Kolde = 62fcf608eb