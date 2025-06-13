require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const urlShortener = require('node-url-shortener')
const tinyUrl = require('tinyurl');
const tinyurl = require('tinyurl');
const dns = require('dns').promises
const { URL } = require('url');
const { hostname } = require('os');
const Mongoose = require('mongoose');
const { stringify } = require('querystring');
const { count } = require('console');

Mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

url_schema = new Mongoose.Schema({
  longurl : String,
  shorturl : String
})

count_schema =new Mongoose.Schema({
  count : Number
})

let counts = new Mongoose.model("count",count_schema)

count1 = new counts({
  count : 0
})

count1.save()

let urls = Mongoose.model("Urls",url_schema)

// const testUrl = new urls({
//   longurl:"https://www.freecodecamp.org/",
//   shorturl:"https://tinyurl.com/y9f6jtk5"
// })

// testUrl.save()


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



app.post("/api/shorturl", async (req, res) => {
  let long_url = req.body.url;

  // checking if the url posted has a completely invalid structure like "abc"
  try {
    var hostname = new URL(long_url).hostname;
  } catch (err) {
    console.log(err);
    res.json({ error: "invalid url" });
    return;
  }

  // checking if the url, though having a proper structure ("https..."), is valid or not
  try {
    await dns.lookup(hostname);

    async function getshorturlandupd() {
      currentCountDoc = await counts.findById('684bf8224e816c1f58fbf140');
      currentCount = currentCountDoc.count;
      console.log("Old count: ",currentCount)
      currentCountDoc.count++;
      await currentCountDoc.save()
      return currentCountDoc.count;
    } // Rmb function not called yet

    let short_url = await getshorturlandupd();

    const urlX = new urls({
      longurl: long_url,
      shorturl: short_url,
    });

    await urlX.save();

    res.json({ original_url: long_url, short_url: short_url });
  } catch (error) {
    res.json({ error: "invalid url" });
    console.log(error);
    return;
  }
});



app.get("/api/shorturl/:short_url",(req,res,next)=>{
async function findUrl() {
  urlY = await urls.findOne({shorturl:req.params.short_url});
  if (!urlY) {res.send("No such value")} else {
    res.redirect(urlY.longurl)
  }
  
}
findUrl()
})


// npm node URL shortener package testing:

// tinyUrl.shorten("https://www.freecodecamp.org/")
//   .then(console.log)
//   .catch(console.log)


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
// test_domain_name = "aaaaa.com"
// dns.lookup(test_domain_name,(error,address)=>{
//    if (error) {console.log(error)} else {console.log(address)}
//  });

// Error Code: ENOTFOUND

// console.log(3 == null,"hallo")
// async function getUrl() {
//   try {
//     const doc = await urls.findOne({ shorturl: "hello" });
//     console.log(doc);
//     console.log(doc == null)
//   } catch (err) {
//     console.error(err);
//   }
// }
// getUrl();