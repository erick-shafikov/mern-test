const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/user')
const router = Router();

//api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect Email').isEmail(),
        check('password', 'Minimal long of pass is 6 char').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(), 
                    message: "incorrect data for registraion"
                })
            }

            const {email, password} = req.body;
            const condidate  = await User.findOne({email});
            if(condidate) {
                return res.status(400).json({message: "this user is already exist"})
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword});

            await user.save();

            res.status(201).json({message: "new user is ready"})

        } catch (e) {
            res.status(500).json({message: "something goes wrong on server"})
        }
});
//api/auth/login
router.post(
    '/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
    
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array(), message: "incorrect data to enter"})
            }

            const {email, password} = req.body

            const user = await User.findOne({email});

            if(!user){
                return res.status(400).json({message: 'User doesnt exist'})
            }

            const isMatched = await bcrypt.compare(password, user.password);

            if(!isMatched){
                return res.status(400).json({message: "Incorrect password"});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
                )

            res.json({token, userId: user.id})


        } catch (e) {
            res.status(500).json({message: "something goes wrong"})
        }
})

module.exports = router;