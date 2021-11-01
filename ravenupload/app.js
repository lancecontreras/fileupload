const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.get('/',(req, res)=> {
  console.log("test");
  res.send("ok")
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;


  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.ravenlog; 
  uploadPath = __dirname + '/downloads/' + sampleFile.name 

  console.log(sampleFile.name); 

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});


app.listen(3000, ()=> console.log("listening to port 3000")); 
