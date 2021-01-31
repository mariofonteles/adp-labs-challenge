var director = require('director');
var operations = require('./controllers/operations');

const router = new director.http.Router({
    '/task': {
      get: operations.performOperation,
      post: operations.submitOperation
    }
  });

module.exports = router;