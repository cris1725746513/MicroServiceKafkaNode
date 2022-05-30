process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let modelo = require('../models/blacklistmodel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);