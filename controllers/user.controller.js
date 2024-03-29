const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err) => {
            if (err) return next()
            req.flash('success', 'Welcome to Yelp Camp!!')
            res.redirect('/campgrounds')
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    redirectUrl =  req.session.returnTo
    delete req.session.returnTo
    res.render('users/login')
}

module.exports.userLogin = async (req, res) => {
    redirectUrl = redirectUrl || '/campgrounds'
    req.flash('success', 'Welcome back!!!')
    res.redirect(redirectUrl)
}

module.exports.userLogout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err) }
    })
    req.flash('success', 'Good Bye!!!')
    res.redirect('/campgrounds')
}
