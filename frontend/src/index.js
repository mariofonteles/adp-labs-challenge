import './styles/main.css';
import axios from 'axios';

const baseHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
// storing references to show appropriate response messages
const successMessage = document.querySelector('.success');
const errorMessage = document.querySelector('.error');

export const getOperation = () => {
  axios.get('http://localhost:8000/task', baseHeaders).then((response) => {
    const [opLeft, opRight, opName, opId, opResult] = document.querySelectorAll('.form-control');
    opLeft.value = response.data.leftOp;
    opRight.value = response.data.rightOp;
    opName.value = response.data.operationName;
    opId.value = response.data.operationId;
    opResult.value = response.data.result;
  }).catch(() => {
    errorMessage.innerHTML = 'Failed to fetch operation, please try again.';
    errorMessage.style.display = 'block';
  });
};

export const postOperation = () => {
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  axios.post('http://localhost:8000/task',
    {
      id: document.getElementById('operationId').value,
      result: document.getElementById('operationResult').value,
    }, baseHeaders)
    .then(() => {
      successMessage.style.display = 'block';
    })
    .catch((err) => {
      errorMessage.innerHTML = err.response.data.errorMessage;
      errorMessage.style.display = 'block';
    });
};
