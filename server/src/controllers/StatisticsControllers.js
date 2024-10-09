const database = require("../models");
const { Sequelize, QueryTypes } = require('sequelize');

class StatisticsController {  

  static async eventoPorAno(req, res) {
    try {
      const eventos = await database.Evento.findAll({
        order: ["ano"],
        attributes: [
            "ano",
            [Sequelize.fn("COUNT", Sequelize.col("ano")), "eventos" ]
        ],
        group: ["ano"]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  

  static async tipoEventoPorAno(req, res) {
    const { year } = req.params;
    try {
      const eventos = await database.Evento.findAll({
        // order: ["ano"],
        where: { ano: year },
        attributes: [
            "ano",
            "tipo_evento_id",
            [Sequelize.fn("COUNT", Sequelize.col("tipo_evento_id")), "qtd_tipo_evento" ]
        ],
        include:[
          {
            association: "ass_evento_tipo",
            where: (database.Evento.tipo_evento_id = database.Tipo_Evento.id),
            attributes: ["nome_evento"],            
          }
        ],
        group: ["ano", "tipo_evento_id", "ass_evento_tipo.id", "ass_evento_tipo.nome_evento"]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  
  
  static async respPorAno(req, res) {
    const { year } = req.params;
    try {
      const eventos = await database.Evento.findAll({
        // order: ["ano"],
        where: { ano: year },
        attributes: [
            "ano",
            "sexec_id",
            [Sequelize.fn("COUNT", Sequelize.col("sexec_id")), "qtd_resp" ]
        ],
        include:[
          {
            association: "ass_evento_sexec",
            where: (database.Evento.sexec_id = database.Secretaria_Executivas.id),
            attributes: ["secretaria", "sigla"],            
          }
        ],
        group: ["ano", "sexec_id", "ass_evento_sexec.id", "ass_evento_sexec.secretaria", "ass_evento_sexec.sigla"]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
    
  }  

  static async tipoPartPorAno(req, res) {
    const { year } = req.params;
    try {
      const eventos = await database.Evento.findAll({
        // order: ["ano"],
        where: { ano: year },
        attributes: [
            "ano",
            "participacao_id",
            [Sequelize.fn("COUNT", Sequelize.col("participacao_id")), "qtd_participacao" ]
        ],
        include:[
          {
            association: "ass_evento_participacao",
            where: (database.Evento.participacao_id = database.Tipo_Participacao.id),
            attributes: ["participacao"],            
          }
        ],
        group: ["ano", "participacao_id", "ass_evento_participacao.id", "ass_evento_participacao.participacao"]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
    
  }  

  static async tipoRecPorAno(req, res) {
    const { year } = req.params;
    try {
      const eventos = await database.Evento.findAll({
        // order: ["ano"],
        where: { ano: year },
        attributes: [
            "ano",
            "recursos_id",
            [Sequelize.fn("COUNT", Sequelize.col("recursos_id")), "qtd_recursos" ]
        ],
        include:[
          {
            association: "ass_evento_recursos",
            where: (database.Evento.recursos_id = database.Tipo_Recursos.id),
            attributes: ["recursos"],            
          }
        ],
        group: ["ano", "recursos_id", "ass_evento_recursos.id", "ass_evento_recursos.recursos"]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
    
  }  

  static async tipoLocalPorAno(req, res) {  
    const { year } = req.params;
    try {
      const eventos = await database.Evento.findAll({
        // order: ["ano"],
        where: { ano: year },
        attributes: [
            "ano",
            "tipo_local_id",
            [Sequelize.fn("COUNT", Sequelize.col("tipo_local_id")), "qtd_local" ]
        ],
        include:[
          {
            association: "ass_evento_local",
            where: (database.Evento.tipo_local_id = database.Tipo_Local.id),
            attributes: ["local_evento"],            
          }
        ],
        group: ["ano", "tipo_local_id", "ass_evento_local.id", "ass_evento_local.local_evento"]
      });
      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  
  
}

module.exports = StatisticsController;
