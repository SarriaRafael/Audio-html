var expressrafa = require('express');
var app = expressrafa();
var path = require('path');
var fs = require('fs');
var folder='./mistemas'

var mediaserver = require('mediaserver');


  function doSyncOp(op) {
    var ret;
  
    try {
      ret = op();
    } catch (e) {
      console.error("Failed to cache default project files: ", e);
    }
  
    return ret;
  }

    var contenido = doSyncOp(fs.readdirSync.bind(fs, folder));    
    console.log(contenido);  
 fs.writeFile(path.join(__dirname,'canciones.json'),JSON.stringify(contenido),(req,res)=>{
    console.log(contenido); 
    return;
 });

 //fs.readFile(path.join(__dirname,'canciones.json'),'utf8',function(){})

app.use(expressrafa.static('public'));
app.use('/jquery',expressrafa.static(path.join(__dirname,"node_modules","jquery","dist")));

app.get('/',function(req,res){
    //res.send(contenido);
    res.sendFile(path.join(__dirname,'/index.html'))
});

app.get('/canciones',function(req,res){
    fs.readFile(path.join(__dirname,'canciones.json'),'utf8', function(err,music){
        if(err)throw err;
        res.json(JSON.parse(music));
    }  )
})

app.get('/canciones/:son',function(req,res){
    var tema = path.join(__dirname,'mistemas',req.params.son);
    if(tema){
        console.log('los tenemos');
    }else console('perdimos')
    mediaserver.pipe(req,res,tema);
})



  

app.listen(3000,()=>{
    console.log("Todo bien, corriendo servidor")
});