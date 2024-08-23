const database = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Sequelize, QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

class AcompanhamentoController {
  static async cadastroFollow(req, res) {
    const novoFollow = req.body;
    try {
      const newFollow = await database.Acompanhamento.create(novoFollow);
      return res.status(200).json(newFollow);
    } catch (error) {
      return res.status(500).json({ message: "Acompanhamento não cadastrado!" });
    }
  }

  static async listarFollows(req, res) {
    try {
      const mostrarFollows = await database.Acompanhamento.findAll({
        order: ["id"],
        include: [
          {
            association: "ass_acompanhamento_evento",
            where: (database.Acompanhamento.evento_id = database.Acompanhamento.id),
            attributes: ["id", "nome_evento"],
          },          
        ],
      });
      return res.status(200).json(mostrarFollows);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarFollowsbyId(req, res) {
    const { id } = req.params;
    try {
      const showFollows = await database.Evento.findOne({
        where: { id: Number(id) },
        include: [
          {
            association: "ass_acompanhamento_evento",
            where: (database.Acompanhamento.evento_id = database.Acompanhamento.id),
            attributes: ["id", "nome_evento"],
          }
        ],
      });
      return res.status(200).json(showFollows);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  
}

module.exports = AcompanhamentoController;
