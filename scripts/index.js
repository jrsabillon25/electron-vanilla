const connection = require('../main');

function testConnection(){
    connection.connection.query('SELECT * from products;', [], function(err, result){
        if(err){
            throw err;
        }
        console.log(result);
    });
}