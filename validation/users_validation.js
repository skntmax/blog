const router = require('express').Router();
const swal = require('sweetalert');
const bodyParser = require('body-parser');
const { append } = require('express/lib/response');
const mac = require('./../model/database')
router.use(bodyParser.urlencoded({ extended: false }))
const bcrypt = require('bcrypt');
var session = require('express-session')
const jwt = require('jsonwebtoken');

const { LocalStorage } = require('node-localstorage');

// constructor function to create a storage directory inside our project for all our localStorage setItem.
var localStorage = new LocalStorage('./scratch');

//Setting localStorage Item


// const passport = require('passport');
// const localstrategy = require('passport-local');
// router.local.users_model=mac.users_model; 
// app.use(new localstrategy(
//     (email , password , authCheckDone)=>{
//     router.local.users_model.findOne({email}).then(email=>{
//          if(!email){
//               return authCheckDone(null,false)
//          }
//     })
// }));



router.use(require('express').json());

// router.use(passport.initialize())
// router.use(passport.session())

authmiddleware = async(req, res, next) => {


    const all_data = await mac.users_model.find({ email: req.session.email }) // other than admin 
    const all_users_data = await mac.users_model.find({});
    const admin_data = await mac.users_model.find({ email: req.session.email });
    try {

        await jwt.verify(admin_data[0].jwt, "kSMS8UZxjwziGySMMkDxO0aVgsj0oBs", (err, varifiedjwt) => {
            if (err)
                res.send(err);
            else {
                console.log("hii")
                res.render('dashboard/dashboard', { all_data, all_users_data });
            }
        })

    } catch (err) {
        console.log(err)
    }
    next()
}



router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: 1 * 60 * 60 * 1000
    }
}))


// mac.users_model.statics.jwttoken = async function() {
// try {
//     const token = jwt.sign({ _id: this._id }, "kSMS8UZxjwziGySMMkDxO0aVgsj0oBs");
//     console.log(token);
//     return token;
// } catch (err) {
//     console.log(err)
// }

// }



router.get('/signup', (req, res) => {
    const warning = (req.query.duplicate_user);
    const pass_match = (req.query.pass_match);
    const adminalert = (req.query.adminalert);
    res.render('signup', { warning, pass_match, adminalert });
})



// -------------user registration ----------------
router.post('/register', async(req, res) => {

    req.session.username = req.body.username;
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    req.session.cpassword = req.body.cpassword;

    let all_data = await mac.users_model.find({ $or: [{ email: req.session.email }, { content_writer: req.session.username }] });

    if (all_data != "") {
        if (all_data[0].content_writer == 'admin') {
            res.redirect('/signup?adminalert=' + 1)
        }
    } else {
        if (req.session.cpassword != req.session.password) {
            res.redirect('/signup?pass_match=' + 0)
            console.log("password not matched ");

        } else {
            const hash_pass = await bcrypt.hash(req.session.password, 5);
            const user_schema = new mac.users_model({
                email: req.session.email,
                password: hash_pass,
                content_writer: req.session.username
            });

            // let token = await mac.users_model.jwttoken();

            const result = await user_schema.save();
            if (result) {
                console.log("new user record saved ")
                const jwt_data = await mac.users_model.find({ email: req.session.email });
                try {
                    const token = await jwt.sign({ _id: jwt_data[0]._id }, "kSMS8UZxjwziGySMMkDxO0aVgsj0oBs");
                    console.log(token);
                    await mac.users_model.findOneAndUpdate({ email: jwt_data[0].email }, { jwt: token });
                } catch (err) {
                    console.log(err)
                }
                res.redirect('/?succesfull=' + 1);
            } else
                console.log("some err occured")
        }


    }


});



// -------------user registration ----------------


// ------------user signin -------------------

router.post('/user_login', async(req, res) => {

    req.session.email = req.body.email;
    req.session.password = req.body.password;

    const all_data = await mac.users_model.find({ email: req.session.email }) // other than admin 
    const all_users_data = await mac.users_model.find({}); //  for admin 

    if (all_data != "") {
        const ismatch = await bcrypt.compare(req.session.password, all_data[0].password)
        console.log(ismatch);

        if (ismatch) {
            if (all_data[0].content_writer == "admin") {
                const admin_data = await mac.users_model.find({ email: all_data[0].email });
                res.cookie('admin', admin_data[0].jwt);
                // req.session.save()
                local_email = localStorage.setItem('email', req.session.email)
                res.render('dashboard/dashboard', { all_data, all_users_data });
            } else {
                const not_admin = await mac.users_model.find({ email: all_data[0].email });
                res.cookie('not_admin', not_admin[0].jwt);
                // req.session.save()
                res.render('dashboard/dashboard', { all_data });

            }

        } else {
            res.redirect('/?invalid_credentials=' + 1)
        }

    } else {
        res.redirect('/?incorrect_credentials=' + 1)
    }


})


router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        if (err)
            console.log(err)
        console.log("session destroyed")
        res.redirect('/')
    })
});

router.post('/articles', async(req, res) => {
    let net_user = { content_writer: req.query.content_writer, blogs: "blog 5" }
        // const users_article = await new mac.users_model({ blogs_list: net_user }).save()
        // res.redirect('/user_login');

})


// generating jwt toke 


// ------------user signin -------------------

module.exports = router;