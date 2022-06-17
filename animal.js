'use strict';

const axios = require("axios");
const BodyParser = require("body-parser");
const express = require("express");
const fs = require('fs');

const router = express.Router();

function getAnimal(req, res) {
    try {
        const rawdata = fs.readFileSync('data.json');
        const animals = JSON.parse(rawdata);
        const animal = animals.find(animal => animal.name.toLowerCase().replaceAll(/\s/g, '') === req.params.name.toLowerCase().replaceAll(/\s/g, ''))
        if (animal) return res.send({ animal })
        else { res.status(500).send(`ENOTEXIST: cannot find animal ${req.params.name}`) }
    } catch (error) {
        console.error(error);
        res.send(error);
    }
}

function getAnimals(req, res) {
    try {
        const rawdata = fs.readFileSync('data.json');
        const animals = JSON.parse(rawdata);
        let picked = {animals: []};
        animals.forEach(animal => {
            picked.animals.push(animal)
        });
        if (picked) return res.send(picked)
        else { res.status(500).send(`ENOTEXIST: cannot find animal ${req.params.name}`) }
    } catch (error) {
        console.error(error);
        res.send(error);
    }
}
router
    .use(BodyParser.json())
    .get("/", getAnimals)
    .get("/:name", getAnimal)

module.exports = { router };