var todo = require('../models/todo');

module.exports = {
  configure: function(app, connection) {
    app.get('/todo',function(req,res) {
      todo.get(connection, res);
    });
    app.get('/todo/:id',function(req,res) {
      todo.getByID(connection,req.params.id,res);
    });
    app.post('/todo',function(req,res) {
      todo.create(connection,req.body,res);
    });
    app.put('/todo/:id',function(req,res) {
      todo.update(connection,req.body.name,req.params.id,res);
    });
    app.delete('/todo/:id',function(req,res) {
      todo.delete(connection,req.params.id,res);
    });
  }
};
