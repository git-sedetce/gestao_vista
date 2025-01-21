const database = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { Sequelize, QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

class EventoControllers {
  static async cadastroEvento(req, res) {
    const novoEvento = req.body;
    try {
      const newEvent = await database.Evento.create(novoEvento);
      return res.status(200).json(newEvent);
    } catch (error) {
      return res.status(500).json({ message: "Evento não cadastrado!" });
    }
  }

  static async listarEventos(req, res) {
    try {
      const mostrarEventos = await database.Evento.findAll({
        order: ["id"],
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(mostrarEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosFollows(req, res) {
    try {
      const mostrarFollows = await database.Acompanhamento.findAll({
        order: ["id"],
        include: [
          {
            association: "ass_acompanhamento_evento",
            where: (database.Acompanhamento.evento_id = database.Acompanhamento.id),
            attributes: ["id", "nome_evento", "mes", "ano", "nome_evento", "descricao", "publico_alvo", "local", "periodo", "custo_previo","lead_previsto"],
            include: [
              {
                association: "ass_evento_tipo",
                where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
                attributes: ["id", "nome_evento"],
              },
              {
                association: "ass_evento_sexec",
                where: (database.Evento.sexec_id =
                  database.Secretaria_Executivas.id),
                attributes: ["id", "secretaria", "sigla"],
              },
              {
                association: "ass_evento_local",
                where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
                attributes: ["id", "local_evento"],
              },
              {
                association: "ass_evento_recursos",
                where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
                attributes: ["id", "recursos"],
              },
              {
                association: "ass_evento_participacao",
                where: (database.Evento.participacao_id =
                  database.Tipo_Participacao.id),
                attributes: ["id", "participacao"],
              }
            ],
          },          
        ],
      });
      return res.status(200).json(mostrarFollows);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEvents(req, res) {
    try {
      const mostrarEventos = await database.Evento.findAll({
        where: {
          id: {
            [database.Sequelize.Op.notIn]: database.Sequelize.literal(
              `(SELECT evento_id FROM "Acompanhamentos")`
            ),
          },
        },
        order: ["id"],
        attributes: ["id", "nome_evento"],
      });
  
      return res.status(200).json(mostrarEventos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  

  static async listarEventosbyEvento(req, res) {
    const { id } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { tipo_evento_id: Number(id) },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosbySecretaria(req, res) {
    const { id } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { sexec_id: Number(id) },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosbyLocal(req, res) {
    const { id } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { tipo_evento_id: Number(id) },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_local_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosbyRecursos(req, res) {
    const { id } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { recursos_id: Number(id) },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosbyParticipacao(req, res) {
    const { id } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { participacao_id: Number(id) },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateEvent(req, res) {
    const { id } = req.params;
    const atualiza = req.body;
    try {
      await database.Evento.update(atualiza, {
        where: { id: Number(id) },
      });
      const eventoAtualizado = await database.Evento.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(eventoAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaEvento(req, res) {
    const { id } = req.params;
    const apaga = req.body;
    try {
      await database.Evento.destroy({ where: { id: Number(id) } });
      return res.status(200).json({
        mensagem: `O evento ${apaga.id} foi bloqueado com sucesso!!`,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosByMes(req, res) {
    const { mes } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { mes:mes },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async listarEventosByAno(req, res) {
    const { ano } = req.params;
    try {
      const showEventos = await database.Evento.findAll({
        where: { ano: ano },
        include: [
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["id", "nome_evento"],
          },
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id =
              database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["id", "local_evento"],
          },
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["id", "recursos"],
          },
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id =
              database.Tipo_Participacao.id),
            attributes: ["id", "participacao"],
          },
        ],
      });
      return res.status(200).json(showEventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = EventoControllers;
