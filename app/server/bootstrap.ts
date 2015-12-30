import * as express from 'express';

let app = express();

app.set('views', `${process.cwd()}/app/shared/`);
app.set('view engine', 'jade');

app.use(express.static(process.cwd()));

app.use('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Listen on http://localhost:3000');
});
