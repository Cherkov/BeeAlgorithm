const express = require("express");
const os = require("os");
const math = require('mathjs');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var vars;
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
  vars = state.bordersArr.join(', ');
  console.log(vars);
  var result = Algo(state.razv, state.furaj, state.bestArea,state.iteration,state.topBorder,state.btmBorder, state.rangeArea, state.numberOfVars)
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
    topBorder: state.topBorder.join(', '),
    btmBorder: state.btmBorder.join(', '),
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
var rangeOfArea;
var numberOfVars;
function Dot() {
}
function Algo(numberOfScoutsP,numberOfWorkersP,numberOfAreasP,numberOfIterationsP,upperLimitP,lowerLimitP, rangeOfAreaP, numberOfVarsP) {
  numberOfScouts=parseInt(numberOfScoutsP);
  numberOfWorkers=parseInt(numberOfWorkersP);
  numberOfAreas=parseInt(numberOfAreasP);
  rangeOfArea=parseInt(rangeOfAreaP);
  numberOfIterations=parseInt(numberOfIterationsP);
  upperLimit=upperLimitP;
  lowerLimit=lowerLimitP;
  best=new Array(numberOfAreas);
  numberOfVars = parseInt(numberOfVarsP);
  console.log(upperLimit);
  initiate();
  var pobedka = numberOfIterations/10;
  var counter = 0;
  var iterC=0;
  for ( k = 0; k < numberOfIterations; k++) {
    var current=best[0];
    global();
    for (var i = 0; i < best.length; i++) {
      var split = workersSplit();
      best[i]=local(split[i], best[i]);
    }
    best=sortDots(best);
    console.log(best[0].result);
    // iterC++;
    // if(current.result==best[0].result){
    //   counter++;
    //   if(counter==pobedka){
    //     var last = best[0];
    //     best[0]=local(numberOfWorkers,best[0]);
    //     if(last.result==best[0].result){
    //       console.log("LAST", last.result)
    //       break;
    //     }
    //   }
    // }
    // else{
    //   counter=0;
    // }
  }
  console.log(iterC);
  console.log(best[0]);
  return best[0].result;    
}
function  workersSplit(){
  var sum = 0;
  for ( var i = 0; i < numberOfAreas; i++) {
    sum += best[i].result;
  }
  var workersForArea = new Array(numberOfAreas);
  for (var i = 0; i < numberOfAreas; i++) {
    workersForArea[i] =  Math.round(best[i].result / sum*numberOfWorkers);
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
function initiate(){
    var dots =new Array(numberOfScouts);
    for(i=0; i<numberOfScouts; i++){
        dots[i] = randomDotG();
    }
    best = findMax(dots, numberOfAreas);
}
function randomDotG() {
  var dot = new Dot();
  var VARS = vars.split(', ');
  for (var i = 0; i < VARS.length; i++) {
    dot[VARS[i]] = eval(lowerLimit[i] + Math.random() * (upperLimit[i] - lowerLimit[i]));
  }
  dot.result = mathModel(dot);
  console.log(dot);
  return dot;
}

function mathModel(dot){
  var func = math.eval('f('+ vars + ') = ' + f)
  var args = [];
  for(var prop in dot){
    if (toString(prop) != 'result') args.push(dot[prop])
  }
  return func(...args)
}  

function global(){
     var dots = new Array(numberOfScouts - numberOfAreas);
        for (var i = 0; i < (numberOfScouts-numberOfAreas); i++) {
            dots[i] = randomDotG();
            for (var j = 0; j < numberOfAreas; j++) {
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
        worker = randomDotL(dot);
        if (dot.result < worker.result) {
            dot=worker;
        }
    }
    return dot;
}   
    
function findMax(dots, number){
    var sorted = sortDots(dots);
    var result = new Array(number);
        for (i = 0; i < number; i++) {
            result[i] = sorted[i];
        }
        return result;
}
    


function randomDotL(dot) {
  var args = [];
  var arg = 0;
    for(var prop in dot){
      if (prop != 'result') args.push(dot[prop])
    }
    for (var i = 0; i <= args.length -1; i++) {
      while(true){
          arg = eval(args[i]-rangeOfArea + Math.random() * (2*rangeOfArea));
          if(arg<upperLimit[i] && arg>lowerLimit[i]){
            args[i] = arg;
             break;
          } 
      }
    }
  var dot = new Dot();
  var VARS = vars.split(', ');
  for (var i = 0; i < VARS.length; i++) {
    dot[VARS[i]] = args[i];
  }
  dot.result = mathModel;
  return dot;
}
    
