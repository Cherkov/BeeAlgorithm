const express = require("express");
const os = require("os");
const math = require('mathjs');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/bee";
var name;
app.get('/api/getReport', function(req, res) {
  console.log(name);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("bee");
    dbo.collection("data").find({name: name}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
    db.close();
    });
  });
});
app.use(express.static("dist"));
app.use(bodyParser.json()); // for parsing application/json
app.post("/api/getUsername", function(req, res) {
  var state = req.body
  f = state.func;
  var result = Algo(state.razv, state.furaj, state.bestArea,state.iteration,state.topBorder,state.btmBorder, state.rangeArea)
  res.send({ result:  result })
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("bee");
  name = state.name;
  console.log(name);
  
  var myobj = {
    function: f,
    ravedchiki: state.razv,
    furajiri: state.furaj,
    numberOfAreas: state.bestArea,
    iteration: state.iteration,
    topBorder: state.topBorder,
    btmBorder: state.btmBorder,
    rangeArea: state.rangeArea,
    result: result,
    name: state.name
  } ;
  dbo.collection("data").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  db.close();

});
} );
app.listen(20017, () => console.log("Listening on port 8080!"));
var best;
var numberOfScouts;
var numberOfAreas;
var numberOfIterations;
var upperLimit;
var lowerLimit;


function Algo(numberOfScoutsP,numberOfWorkersP,numberOfAreasP,numberOfIterationsP,upperLimitP,lowerLimitP) {
  numberOfScouts=parseInt(numberOfScoutsP);
   numberOfWorkers=parseInt(numberOfWorkersP);
   numberOfAreas=parseInt(numberOfAreasP);
   numberOfIterations=parseInt(numberOfIterationsP);
    upperLimit=parseFloat(upperLimitP);
  lowerLimit=parseFloat(lowerLimitP);
  best=new Array(numberOfAreas);
    
 initiate();
 var pobedka = numberOfIterations/10;
        for ( k = 0; k < numberOfIterations; k++) {
            global();
            console.log();
            for (i = 0; i < best.length - 1; i++) {
                var split = workersSplit(best);
                local(split[i], best[i]);
            }

        }
        return best[0].result;    
    
  }

function initiate(){
    var dots =new Array(numberOfScouts);
    for(i=0; i<numberOfScouts; i++){
        dots[i] = randomDotG(lowerLimit, upperLimit);
    }
    best = findMax(dots, numberOfAreas);
}
    
function global(){
     var dots = new Array(numberOfScouts - numberOfAreas);
        for (i = 0; i < (numberOfScouts-numberOfAreas); i++) {
            dots[i] = randomDotG(lowerLimit, upperLimit);
            for (j = 0; j < numberOfAreas; j++) {
                if (dots[i].result > best[best.length - j - 1].result){
                    best[numberOfAreas - j-1] = dots[i];
                    continue;
                }
            }
        }
}        

function local(number, dot) {
      var worker;
        for (let i = 0; i < number; i++) {
            worker = randomDotL(dot.x, dot.y, rangeOfArea);
            if (dot.result < worker.result) {
                dot=worker;
            }
        }
}   
    
function findMax(dots, number){
    var sorted = sortDots(dots);
    var result = new Array(number);
        for (i = 0; i < number; i++) {
            result[i] = sorted[i];
        }
        return result;
}
    
function  workersSplit(){
  var part = 0;
  for ( i = 0; i < numberOfAreas; i++) {
    part += best[i].result;
  }
  part = part / numberOfAreas;
  var workersForArea = new Array(numberOfAreas);
  for (i = 0; i < best.length - 1; i++) {
    workersForArea[i] =  Math.round(best[i].result / part);
  }
  return workersForArea;
}  
    
function sortDots(dots) {
  var n = dots.length;
  for ( let i = 0; i < n; i++) {
      for ( let j = 1; j < (n - i); j++) {
          if (dots[j - 1].result > dots[j].result) {
              var temp;   
              temp = dots[j - 1];
              dots[j - 1] = dots[j];
              dots[j] = temp;
          }
      }
  }
  return dots;
}
    
function randomDotG(lowerLimit, upperLimit) {
  return new Dot(eval(lowerLimit + Math.random() * (upperLimit - lowerLimit)), eval(lowerLimit + Math.random() * (upperLimit - lowerLimit)));
}

function randomDotL(x, y, area) {
  return new Dot(eval(x + Math.random() * (2*area)),  eval(y + Math.random() * (2*area)));
}
    
function Dot(x,y) {
  this.result=mathModel(x,y);
}
  
function mathModel(x,y){
  var func = math.eval('f(x, y) = ' + f)
  return func(x,y)
}