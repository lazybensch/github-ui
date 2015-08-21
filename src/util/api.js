'use strict';

const read = require('read')
const request = require('request');

function API() {
  this.userAgent = 'lazybensch';
  this.baseUrl = 'https://api.github.com';
  this.headers = {
    'User-Agent': this.userAgent,
  }
}

module.exports = API;

API.prototype.auth = function(username, password) {
  return new Promise((resolve, reject)=> {
    request({
      url: this.baseUrl+'/user',
      headers: this.headers,
    }, (err, resp, body)=> {
      if (resp.statusCode === 200) {
        resolve(body);
      } else {
        reject(body);
      }
    }).auth(username, password, true);
  });
};

API.prototype.get = function(path) {
  return new Promise((resolve, reject) => {
    request({
      url: `${this.baseUrl}/${path}`,
      headers: this.headers
    }, (err, resp, body)=> {
      console.log(resp.statusCode);
      if (`${resp.statusCode}`.match(/2../)) {
        resolve(body);
      } else {
        reject(body);
      }
    }).auth(this.username, this.password, true);
  });
}
