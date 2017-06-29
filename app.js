const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const path = require('path');
const models = require('./models');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  models.Todo.findAll().then(function (todos) {
    res.render('index', {model: todos});
  });
});

app.post('/', function (req, res) {
  var task = req.body.todo_enter;
  models.Todo.create({
    task: task,
    completed: false
  });
  res.redirect('/');
});

app.post('/completed/:id', function (req, res) {
  // get todo id
  var id = req.params.id;
  models.Todo.update(
    { completed: true },
    { where: { id: id }
  }).then(function () {
  res.redirect('/');
  });

});

app.listen(3000, function() {
  console.log('listening');
});



// var todoIdx = 0;
// var completedIdx = 0;
//
// var context = {
//   todoList: [
//     'Feed dog',
//     'Mow the lawn',
//     'Do your homework'
//   ],
//   todoId: function(){
//     return todoIdx++;
//   },
//   completed: [],
//   completedId: function(){
//     return completedIdx++;
//   }
// };

// app.get('/', function(req, res) {
//   // todoIdx = 0;
//   res.render('index', context);
// });
//
// app.post('/', function(req, res) {
//   var todo = context.todoList;
//   // todo.push(req.body.todo_enter);
//   console.log(todo);
//   res.redirect('/');
// });
//
// app.post('/todo/:id', function(req, res) {
//   console.log('working');
//   // var id = req.params.id;
//   // var completed_item = context.todo[id];
//   // var todo_removed = context.todoList.splice(id, 1);
//   // context.completed.push(todo_removed);
//   res.redirect('/');
// });
// var button = req.body.value;
// models.Todo.fineOne({
//   where: {
//     id: button
//   }).then(function (res) {
//     res.completed = true;
//     res.save().then(function () {
//
//     });
//   })
// });
// models.Todo.create({
//   task: 'do homework',
//   completed: null
// });
