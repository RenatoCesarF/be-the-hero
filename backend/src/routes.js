const express = require('express');
const {celebrate, Segments, Joi } = require('celebrate')
const connection = require('./database/connection');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionsController');

const routes = express.Router();

routes.post('/sessions', SessionsController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({               //Validação das informações do resgistro
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(9).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
}),ProfileController.index);

routes.get ('/incidents', IncidentsController.index);

routes.post('/incidents', IncidentsController.create);

routes.delete('/incidents/:id', celebrate({      //Validação das informações da ONG ao deletar um caso
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncidentsController.delete);

module.exports = routes;