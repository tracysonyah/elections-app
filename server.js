const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const PORT = 2000;
const ejs = require('ejs')


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');




const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./election.db')

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS "users" (
	    "id"	INTEGER,
	    "first_name"	VARCHAR(50) NOT NULL,
	    "middle_name"	VARCHAR(50),
	    "last_name"	VARCHAR(50) NOT NULL,
	    "DOB"	DATE,
	    "role_id"	INT,
	    "photo"	BLOB,
	    "party"	VARCHAR(50),
	    PRIMARY KEY("id" AUTOINCREMENT))`  
    );

    db.run(`CREATE TABLE IF NOT EXISTS "roles" (
	    "id"	INTEGER,
	    "role_id"	TEXT,
	    PRIMARY KEY("id" AUTOINCREMENT))`  
    );

    db.run(`CREATE TABLE IF NOT  EXISTS parties(
        id INT AUTO_INCREMENT PRIMARY KEY,
        party VARCHAR(50),
        logo BLOB)`  
    );

    db.run(`CREATE TABLE IF NOT EXISTS positions(
        id INT AUTO_INCREMENT PRIMARY KEY,
        position VARCHAR(50))`  
    );

    db.run(`CREATE TABLE IF NOT EXISTS candidates(
        id INT AUTO_INCREMENT PRIMARY KEY,
        position_id INT,
        fisrt_name VARCHAR(50) NOT NULL, 
        middle_name VARCHAR(50),
        last_name VARCHAR(50) NOT NULL,
        photo BLOB,
        party_id INT)`  
    );

    db.run(`CREATE TABLE IF NOT EXISTS votes(
        id INT AUTO_INCREMENT PRIMARY KEY,
        candidate_id INT,
        votes INT)`  
    );
//   const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

//   for (let i = 0; i < 10; i++) {
//     stmt.run(`Ipsum ${i}`)
//   }

//   stmt.finalize()

//   db.each('SELECT * FROM users', (err, row) => {
//     console.log(row)
//   })
})

// db.close()
























let registrationData = {}


// app.get('/registration', (req, res) => {
//     res.render('register.ejs')
// });

// app.post('/registration', (req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                              
//     const {username, password, email} = req.body;

//     registeredData = {
//         username,
//         password,
//         email
//     }

//     res.send('Success!')
// });



app.get('/registration', (req, res) => {
    db.all("SELECT * FROM roles", (err, rows) => {
        console.log(rows)

        res.render('voter_registration', {roles : rows})
    })


});

app.post('/registration', (req, res) => {
    const {first_name, middle_name, last_name, DOB, photo} = req.body;

    const db = new sqlite3.Database('./election.db')

    // db.serialize(() => {
        const stmt = db.prepare('INSERT INTO users(first_name, middle_name, last_name, DOB, photo) VALUES (?, ?, ?, ?, ?)')

        // console.log(stmt)

        stmt.run(first_name, middle_name, last_name, DOB, photo, (err) => {
            if(err) {
                console.error(err.message)
                res.send('an error occured')
            }
            else {
                res.send('Signin successful!')
            }
        })
        
        stmt.finalize()
        
    })
// });
// db.close()


app.get('/login', (req, res) => {
    res.render('login.ejs')
});

// app.post('/login', (req, res) => {
//     const {username, password} = req.body;

//     const db = new sqlite3.Database('./elections.db')

//     db.serialize({
//         const stmt = db.prepare('INSERT INTO ')
//     })
// })

app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs')
});

app.post('/login', (req, res) => {
    res.render('dashboard.ejs')
});







app.listen(PORT, () => {
    console.log("App is listening on port " + PORT )
});
