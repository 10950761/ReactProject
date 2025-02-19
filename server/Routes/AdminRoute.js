import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: " Qurry error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email },
                "jwt_secret_key",
                { expiresIn: '1d' }

            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        }
        else {
            return res.json({loginStatus: false, Error: "wrong email or password"})
        }
    });

});

router.get('/category',(req ,res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) 
            return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result})
    })
})


router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"; 
        con.query(sql, [req.body.category], (err, result) => {
        if (err) 
            return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true})
    });
});

router.post('/add_manageitems', (req,res) => {
    const sql = `INSERT INTO manageitems
    (itemname,clientname,telephone,numberofitems,location,category,image) VALUES (?)`;
   const values = [
        req.body.itemname,
        req.body.clientname,
        req.body.telephone,
        req.body.numberofitems,
        req.body.location,
        req.body.category,
        req.body.image
    ]

    con.query(sql, [values], (err,result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true})
    });

    
    });


export { router as adminRouter }