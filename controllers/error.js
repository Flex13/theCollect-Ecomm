exports.get404 = (req, res) => {
    res.render('404', {
        pageTitle: 'Add Product',
        path: '/404',
        isAuthenticated: req.session.isLoggedIn
    })
}