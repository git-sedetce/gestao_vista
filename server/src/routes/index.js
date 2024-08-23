const express = require('express')
const evento = require('./eventoRoutes')
const acompanhamento = require('./acompanhamentoRoutes')


module.exports = app => {
    app.use(express.json(),
            express.urlencoded({ extended: false }),
            evento,
            acompanhamento
            )
}