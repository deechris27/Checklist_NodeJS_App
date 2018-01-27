var bop = require('body-parser');
var mongo = require('mongoose');
var urlEncodedParser = bop.urlencoded({extended:false});

//connect to database
mongo.connect('mongodb://test:test1@ds117148.mlab.com:17148/checklist_thingstodo');

//create a schema

var todoSchema = mongo.Schema({
item: String
});

var Todo = mongo.model('Todo', todoSchema);
var itemOne = Todo({item:'wake up early'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});

var data = [{item:'dog'},{item:'cat'},{item:'donkey'}];

module.exports = function(app){

app.get('/todo', function(req, res){
//get data from mongodb and pass to to view
Todo.find({}, function(err, data){
  if(err) throw err;
  res.render('todo',{todos:data});
});

});

app.post('/todo', urlEncodedParser, function(req, res){
  //get data from the view and post into MongoDB
  var newTodo = Todo(req.body).save(function(err, data){
    if(err) throw err;
    res.json(data);
  });

});

app.delete('/todo/:item', function(req, res){
  //delete the requested item from MongoDB
  Todo.find({item: req.params.item.replace(/\-/g,"-")}).remove(function(err, data){
    if(err) throw err;
    res.json(data);
  });

});

};
