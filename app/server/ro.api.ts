import * as express from 'express';
import * as db from './db';


export let roAPI = express.Router();

roAPI.get('/getfloors', (req, res) => {
    db.getFloors()
        .then(floors => res.json(floors));
});
roAPI.get('/getrooms', (req, res) => {
    db.getRooms()
        .then(rooms => res.json(rooms))
});

roAPI.get('/getworkers', (req, res) => {
    db.getWorkers()
        .then(workers => res.json(workers));
});
