function todo() {
  this.get = function(connection, res) {
    connection.connection.query('select * from todo_list', function(err,result) {
      res.send(result);
      console.log("Get successful");
    });
  };
  this.getByID = function(connection, id,res) {
    connection.connection.query('select * from todo_list where id = ?', id, function(err,result) {
      res.send(result);
      console.log("Get by ID successful");
    });
  };
  this.create = function(connection, todo,res) {
    connection.connection.query('insert into todo_list set ?', todo, function(err,result) {
      if (err) {
        res.send({status:false, message:'TODO creation fail', error:err});
      } else {
        res.send({status:true, message:'TODO create success'});
        console.log("Post successful");
      }
    });
  };
  this.update = function(connection, todo,id,res) {
    connection.connection.query('update todo_list set name = ? where id = ?', [todo, id], function(err,result) {
      if (err) {
        res.send({status:false, message:'TODO update fail'});
      } else {
        res.send({status:true, message:'TODO update success'});
        console.log("Put successful");
      }
    });
  };
  this.delete = function(connection, id,res) {
    connection.connection.query('delete from todo_list where id = ?', id, function(err,result) {
      if (err) {
        res.send({status:false, message:'TODO delete fail'});
      } else {
        res.send({status:true, message:'TODO delete success'});
        console.log("Delete successful");
      }
    });
  };
};

module.exports = new todo();
