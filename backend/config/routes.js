const admim = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admim(app.api.user.save))
        .get(admim(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admim(app.api.user.save))
        .get(admim(app.api.user.getById))
        .delete(admim(app.api.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .post(admim(app.api.category.save))
        .get(admim(app.api.category.get))

    //Cuidado com ordem! Tem que vir antes de /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admim(app.api.category.save))
        .delete(admim(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .post(admim(app.api.article.save))
        .get(admim(app.api.article.get))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admim(app.api.article.save))
        .delete(admim(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}