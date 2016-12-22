'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  adapter: {
    mysql: {
      host: 'localhost',
      port: '3306',
      database: 'dssq',
      user: 'root',
      password: '123456',
      prefix: 'ds_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};