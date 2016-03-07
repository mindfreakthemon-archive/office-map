import * as express from 'express';
//import * as db from "./db";

let app = express();

app.set('views', `${process.cwd()}/app/shared/`);
app.set('view engine', 'jade');

app.use(express.static(process.cwd()));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/floor/:floorNumber', (req, res) => {
    console.log(req.params.floorNumber);
});

app.post('/send', (req, res) => {
    console.dir(req.query);
});


app.listen(3000, () => {
    console.log('Listen on http://localhost:3000');
});
