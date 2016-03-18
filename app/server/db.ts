import * as  mongodb  from 'mongodb';

import {IFloor} from '../shared/floors/models/floor';
import {IRoom} from '../shared/rooms/models/room';
import {IWorker} from '../shared/workers/models/worker';
import {IAdmin} from '../shared/admin/models/admin';

const MONGODB_ENDPOINT = 'mongodb://82.196.2.52:27017/officeMap';

export function db() {
    return db['instance'] || (db['instance'] = mongodb.MongoClient.connect(MONGODB_ENDPOINT));
}

let insertFloor = (floor, db) => {
    return db
        .collection('floors')
        .insertOne(floor);
};

let updateFloor = (floor, db) => {
    return db
        .collection('floors')
        .replaceOne({ number: floor.number }, floor);
};

export function setFloor(floor: IFloor) {
    return db()
        .then(db => db.collection('floors').find({ number: floor.number })
            .toArray()
            .then(floors => {
                if (floors.length) {
                    updateFloor(floor, db);
                } else {
                    insertFloor(floor, db);
                }
            }));
}

export function getFloors() {
    return db()
        .then(db => db.collection('floors').find({}).toArray());
}

let insertRoom = (room, db) => {
    return db
        .collection('rooms')
        .insertOne(room);
};

let updateRoom = (room, db) => {
    return db
        .collection('rooms')
        .replaceOne({ id: room.id }, room);
};

export function setRoom(room: IRoom) {
    return db()
        .then(db => db.collection('rooms').find({ id: room.id })
            .toArray()
            .then(rooms => {
                if (rooms.length) {
                    updateRoom(room, db)
                } else {
                    insertRoom(room, db);
                }
            }));
}

export function getRooms() {
    return db()
        .then(db => db.collection('rooms').find({}).toArray());
}

let insertWorker = (worker, db) => {
    return db
        .collection('workers')
        .insertOne(worker);
};

let updateWorker = (worker, db) => {
    return db
        .collection('workers')
        .replaceOne({ id: worker.id }, worker);
};

export function getAdmin(username) {
    return db()
        .then(db => {
            return db
                .collection('admins')
                .find({ username: username })
                .next();
        });
}

export function authenticate(admin: IAdmin) {
    return db()
        .then(db => {
            return db.collection('admins')
                .find({ username: admin.username })
                .toArray();
        })
        .then(admins => {
            return admins.find((_admin: IAdmin) => _admin.password === admin.password);
        });
}

export function setWorker(worker: IWorker) {
    return db()
        .then(db => db.collection('workers').find({ id: worker.id })
            .toArray()
            .then(workers => {
                if (workers.length) {
                    updateWorker(worker, db)
                } else {
                    insertWorker(worker, db);
                }
            }));
}

export function getWorkers() {
    return db()
        .then(db => db.collection('workers').find({}).toArray());
}
