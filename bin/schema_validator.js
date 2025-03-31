#!/usr/bin/env node

const SCHEMA = './linkset-schema.json';
const Ajv = require("ajv");
const addFormats = require("ajv-formats")
const fs = require("fs");

if (process.argv.length != 3) {
    console.log(`usage: schema_validator.js file`);
    process.exit(1);
}

const schema = JSON.parse(fs.readFileSync(SCHEMA,'utf-8'));
const data = JSON.parse(fs.readFileSync(process.argv[2],'utf-8'));

const ajv = new Ajv();
addFormats(ajv)
const validate = ajv.compile(schema);
const valid = validate(data);

if (valid) {
    process.exit(0);
}
else {
    console.error(validate.errors);
    process.exit(1);
}