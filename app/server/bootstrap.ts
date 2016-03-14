import * as express from 'express';
import * as db from "./db";
import * as bodyParser from 'body-parser';


let app = express();
let jsonParser = bodyParser.json();

app.set('views', `${process.cwd()}/app/shared/`);
app.set('view engine', 'jade');

app.use(express.static(process.cwd()));

app.get('/', (req, res) => {
    res.render('index');
});

//app.get('/floor/:floorNumber', (req, res) => {
//    console.log(req.params.floorNumber);
//});

app.get('/getfloors', (req, res) => db.getFloors(res));

app.post('/setfloor', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    db.setFloor(req.body);
    res.sendStatus(200);
});

app.get('/getrooms', (req, res) => db.getRooms(res));

app.post('/setroom', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    return db.setRoom(req.body);
});

app.get('/getworkers', (req, res) => db.getWorkers(res));

app.post('/setworker', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    return db.setWorker(req.body);
});

app.listen(3000, () => {
    console.log('Listen on http://localhost:3000');
});
