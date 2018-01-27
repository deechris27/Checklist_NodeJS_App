var exp = require('express');
var app = exp();
var todoCont = require('./controller/todocontroller');
app.set('view engine', 'ejs');
app.use(exp.static('./public'));
todoCont(app);
console.log('You\'re listening on port 3000');
app.listen(3000);
