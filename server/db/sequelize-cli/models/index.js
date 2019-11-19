// 'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'test';

const config = require(`../config/config.json`)[env];

const db = {};


const options = {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: true,
  },
}

const sequelize = new Sequelize('postgres://cjfkramzfgxebw:a8ab9c448f6d5e2060b2869f931f1eac62f2556f69028d8e6ea7330895a97257@ec2-107-21-226-44.compute-1.amazonaws.com:5432/ddju48ok87l9jp', options);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
