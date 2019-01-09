// Generated by CoffeeScript 2.3.2
var ADDR, axios, delay, fs, keys, log, read, read_sum, read_vesting;

fs = require('fs').promises;

axios = require('axios');

keys = require('../keys.js');

ADDR = 'http://api.etherscan.io/api';

log = console.log;

delay = function(ms) {
  return new Promise((resolve, reject) => {
    return setTimeout(resolve, ms);
  });
};

read = async function(file_name, res_file_name) {
  var arr, i, id, len, res, summ, tmp, val;
  res = (await fs.readFile(file_name));
  res = String(res);
  arr = res.split('\n');
  id = 3000;
  res = '';
  summ = 0;
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    tmp = val.split('\t');
    if (tmp[0].length === 42) {
      res += `${id}\t${tmp[0]}\t${tmp[1]}\n`;
      id += 1;
      summ += parseInt(tmp[1]);
    } else {
      log(tmp);
    }
  }
  log(file_name, summ);
  return (await fs.writeFile(res_file_name, res));
};

read_vesting = async function(file_name, res_file_name) {
  var arr, i, id, len, res, summ, time, tmp, val, vesting_time;
  res = (await fs.readFile(file_name));
  res = String(res);
  arr = res.split('\r\n');
  time = 1544572800;
  id = 1700;
  res = '';
  summ = 0;
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    tmp = val.split('\t');
    //		if tmp[1].length is 42
    //			vesting_time = time + parseInt(tmp[3]) * 30 * 24 * 60 * 60
    //			res += "#{id}\t#{tmp[0]}\t#{tmp[1]}\t#{tmp[2]}\t#{vesting_time}\n"
    if (tmp[0].length === 42) {
      vesting_time = time + parseInt(tmp[2]) * 30 * 24 * 60 * 60;
      res += `${id}\t${id}\t${tmp[0]}\t${tmp[1]}\t${vesting_time}\n`;
      id += 1;
      summ += parseInt(tmp[1]);
    }
  }
  log(file_name, summ);
  return (await fs.writeFile(res_file_name, res));
};

read_sum = async function(file_name, spl, pos) {
  var arr, i, len, res, strings, summ, tmp, val;
  res = (await fs.readFile(file_name));
  res = String(res);
  arr = res.split(spl);
  strings = 0;
  summ = 0;
  for (i = 0, len = arr.length; i < len; i++) {
    val = arr[i];
    tmp = val.split('\t');
    if (tmp.length === 1) {
      tmp = val.split('  ');
    }
    summ += parseInt(tmp[pos]);
  }
  return log(file_name, summ);
};

//# sourceMappingURL=data.js.map