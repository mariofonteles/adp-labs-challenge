const axios = require('axios');
const chalk = require('chalk');

module.exports = {
  async performOperation() {
    const res = await axios.get('https://interview.adpeai.com/api/v1/get-task');
    let result = 0;
    switch (res.data.operation) {
      case 'subtraction':
        result = res.data.left - res.data.right;
        break;
      case 'addition':
        result = res.data.left + res.data.right;
        break;
      case 'remainder':
        result = res.data.left % res.data.right;
        break;
      case 'multiplication':
        result = res.data.left * res.data.right;
        break;
      case 'exponentiation':
        result = res.data.left ** res.data.right;
        break;
      case 'division':
        result = res.data.left / res.data.right;
        break;
      default:
        break;
    }
    const response = {
      operationId: res.data.id,
      operationName: res.data.operation,
      leftOp: res.data.left,
      rightOp: res.data.right,
      result,
    };
    this.res.statusCode = 200;
    this.res.end(JSON.stringify(response));
  },

  async submitOperation() {
    try {
      const submitRes = await axios.post('https://interview.adpeai.com/api/v1/submit-task',
        { id: this.req.body.id, result: Number(this.req.body.result) });
      console.log(chalk.green(`Request success with status ${submitRes.status}`));
      this.res.statusCode = 200;
      this.res.end();
    } catch (err) {
      console.log(chalk.red(`ERROR ${err.response.status}: ${err.response.data}`));
      this.res.statusCode = err.response.status;
      this.res.end(JSON.stringify({ errorMessage: err.response.data }));
    }
  },
};
