// Mongo
import * as  mongodb  from 'mongodb';

import { IFloor } from '../shared/floors/models/floor';
import { IRoom } from '../shared/rooms/models/room';
import { IWorker } from '../shared/workers/models/worker';


let MongoClient = mongodb.MongoClient;
var url = 'mongodb://82.196.2.52:27017/officeMap';

let insertFloor = (floor, db) => {
    db.collection('floors').insertOne(floor, (err, result) => {
        if(err) { return console.dir(err); }
        db.close();
    });
};

let updateFloor = (floor, db) => {
    db.collection('floors').replaceOne({'number': floor.number}, floor, (err, result) => {
        if(err) { return console.dir(err); }
        db.close();
    });
};

export function setFloor(floor: IFloor) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        db.collection('floors').find({number: floor.number}).toArray(function(err, floors){
            if(floors.length) {
                updateFloor(floor, db)
            } else {
                insertFloor(floor, db);
            }
        });
    });
}

export function getFloors(res) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        db.collection('floors').find({}, { _id: 0 }).toArray((err, floors) => {
            res.json(floors);
            db.close();
        });
    });
}

let insertRoom = (room, db) => {
    db.collection('rooms').insertOne(room, (err, result) => {
        if(err) { return console.dir(err); }
        db.close();
    });
};

let updateRoom = (room, db) => {
    db.collection('rooms').replaceOne({'id': room.id}, room, (err, result) => {
        if(err) { return console.dir(err); }
        db.close();
    });
};

export function setRoom(room: IRoom) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        db.collection('rooms').find({id: room.id}).toArray(function(err, rooms){
            if(err) { return console.dir(err); }

            if(rooms.length) {
                updateRoom(room, db)
            } else {
                insertRoom(room, db);
            }
        });
    });
}

export function getRooms(res) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        db.collection('rooms').find({}, { _id: 0 }).toArray((err, rooms) => {
            res.json(rooms);
            db.close();
        });
    });
}

let insertWorker = (worker, db) => {
    db.collection('workers').insertOne(worker, (err, result) => {
        if(err) { return console.dir(err); }
        db.close();
    });
};

let updateWorker = (worker, db) => {
    db.collection('workers').replaceOne({'id': worker.id}, worker, (err, result) => {
        if(err) { return console.dir(err); }
        db.close();
    });
};

export function setWorker(worker: IWorker) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        db.collection('workers').find({id: worker.id}).toArray(function(err, workers){
            if(err) { return console.dir(err); }

            if(workers.length) {
                updateWorker(worker, db)
            } else {
                insertWorker(worker, db);
            }
        });
    });
}

export function getWorkers(res) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        db.collection('workers').find({}, { _id: 0 }).toArray((err, workers) => {
            res.json(workers);
            db.close();
        });
    });
}