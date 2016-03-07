// Mongo
import * as  mongodb  from 'mongodb';



import { IFloor } from '../shared/floors/models/floor';


let MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/officeMap';

let insertFloor = function(floor, db, callback) {
    db.collection('floors').insertOne(floor, function(err, result) {
        if(err) { return console.dir(err); }
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};

export function setFloor(floor: IFloor) {
    MongoClient.connect(url, function(err, db) {
        if(err) { return console.dir(err); }
        insertFloor(floor, db, function() {
            db.close();
        });
    });
}