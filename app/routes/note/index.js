// routes/note_routes.js

module.exports = function (app, db) {
    app.post('/notes', (req, res) => {

        const newNote = {
            title: req.body.title,
            body: req.body.body
        };

        console.log(newNote);

        db.note.create(newNote, {
                fields: ['title', 'body']
            })
            .then(newNote => {
                //TODO: PEGAR ID DO NOVO OBJETO
                res.json(newNote);
            });

        /*
        // You'll create your note here.
        var title = req.body.title;
        var body = req.body.body;

        db.sequelize.query("INSERT INTO [Notes] (title,body) VALUES('" + title + "','" + body + "')", function(err) {
            if(err){
                return res.json(400, {response: {code: 400, message:'An error appeared.'}});
            } else{
                console.log('success');
                res.json(201, {response: {code: 201, message: 'Note has been added'}});
            }   
        
        });

        console.log(req.body)
        res.send(req.body)
        */

        /*
        var note = {
            title: req.body.title,
            body: req.body.body //,
            //price: req.body.price
        };

        db.notes.create(note)
            .then(newNote => {
                //TODO: PEGAR ID DO NOVO OBJETO
                res.json(newNote);
            });
        */


        /*
        db.Note.create({
            title: note.title,
            body: note.body
        }).then(() => {
            console.log(`Note created`)
        }).catch((err) => {
            console.log(`Error: ${err}`)
        })
        */


        /*
        db.note.create({
            title: note.title,
            body: note.body
        }, {
            fields: ['title', 'body']
        }).then(task => {
            // you can now access the newly created task via the variable task
            // let's assume the default of isAdmin is false:
            console.log(note.get({
                plain: true
            })) // => { username: 'barfooz', isAdmin: false }
        })
        */

        /*
        db.note.create({ fields: [ 'title', 'body' ] }, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
        */

        /*
        db.note.insert(note, (err, result) => {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
        */
    });


    app.get('/notes', (req, res) => {
        
        db.note.findAll({
        }).then(
            notes => res.status(200).send(notes)
        )
        .then(
            notes => console.log()
        );


        /*
        db.note.findAll({
            attributes: ['Id', 'title', 'body']
        });
        */

        /*
        db.note.findAll(), function(err) {
            attributes: ['Id', 'title', 'body']
            if(err){
                return res.json(400, {response: {code: 400, message:'An error appeared.'}});
            } else{
                res.render(results);
                console.log('success');
                //res.json(201, {response: {code: 201, message: 'Note has been retrieved'}});
                //res.json(note);
                //console.log(note);
                //response.json( rows )
            }
        };
        */
    });

};