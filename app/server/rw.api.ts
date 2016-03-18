import * as express from 'express';
import * as db from './db';


export let rwAPI = express.Router();

rwAPI.all('*', (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
});

rwAPI.post('/setfloor', (req, res) => {
    db.setFloor(req.body)
        .then(() => res.sendStatus(200));
});


rwAPI.post('/setroom', (req, res) => {
    db.setRoom(req.body)
        .then(() => res.sendStatus(200));
});

rwAPI.post('/setworker', (req, res) => {
    db.setWorker(req.body)
        .then(() => res.sendStatus(200));
});
