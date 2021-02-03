import axios from 'axios';
import constants from '../constants.json';

let userInfo = {
  username: null,
  password: null
}

let myAuth = {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        axios.get(constants.baseAddress + '/users/auth',
          {
              auth: {
              username: email,
              password: password
            }
          })
          .then(result => {
            userInfo = {
              username: email,
              password: password
            }
            console.log(result)
            resolve();
          })
          .catch(error =>
            {
              console.log(error);
              reject();
            }
          )
      });
    },
    getAxiosAuth: () => {
      return {
        auth: userInfo
      }
    }
}

export default myAuth;
