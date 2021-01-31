var http = require('http');
var router = require('../router');
var axios = require('axios');

module.exports = {
    async performOperation() {
        let res = await axios.get('https://interview.adpeai.com/api/v1/get-task');
        console.log(res.data);
        this.res.writeHead(200, { 'Content-Type': 'text/plain' });
        let result = 0;

        switch(res.data.operation) {
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
        }
        let submitRes = await axios.post('https://interview.adpeai.com/api/v1/submit-task', 
                                {id: res.data.id, result: result});
        console.log(submitRes.satus)
        this.res.end('object consists of id:' + res.data.id + ' and operation is ' + res.data.operation + ' and result was ' + result + ' and POST status was '+ submitRes.status);
    },

    submitOperation() {

    }
}