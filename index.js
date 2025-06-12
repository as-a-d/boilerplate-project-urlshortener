require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const urlShortener = require('node-url-shortener')
const tinyUrl = require('tinyurl');
const tinyurl = require('tinyurl');
const dns = require('dns')
const { URL } = require('url');
const { hostname } = require('os');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}))

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post("/api/shorturl",(req,res)=>{
let long_url = req.body.url



// checking if the url posted has a completely invalid structure like "abc"
try {
   var hostname = new URL(long_url).hostname
}

catch (err) {
    console.log(err)
    res.json({error: "invalid url"})
    return

};

//checking if the url, though having a proper structure ("https..."), is valid or not
dns.lookup(hostname,(error,address)=>{
  if (error) {
    res.json({error: 'invalid url'})
    return
  } 

  else {
    tinyurl.shorten(long_url)
    .then((url)=>{
      short_url = url
      res.json({
        original_url: long_url,
        short_url: short_url
      })
      return
    })
  };
})



// tinyurl.shorten(long_url)
//   .then((url)=>{
//     short_url = url
//     res.json({
//       original_url: long_url,
//       short_url: short_url
//     })
//     return
//   })


});

// npm node URL shortener package testing:

tinyUrl.shorten("https://www.freecodecamp.org/")
  .then(console.log)
  .catch(console.log)


// urlShortener.short("https://www.freecodecamp.org/",(err,url)=>{
//   if (err) {console.log(url)} else {console.log(url)}
// })


console.log("Hello")
// "https://www.hackerearth.com/challenges/"
// let url = new URL("asasasasa",(err)=>{console.log(err)})
// console.log(url.hostname )

// dns.lookup(url.hostname, (error)=> {
//   if (error.code === "ENOTFOUND") {
//     console.log(WOORKKKSS)
//   }
// })
test_domain_name = "aaaaa.com"
dns.lookup(test_domain_name,(error,address)=>{
   if (error) {console.log(error)} else {console.log(address)}
 });

// Error Code: ENOTFOUND

