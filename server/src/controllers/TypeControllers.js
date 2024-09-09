const database = require("../models");

class TypeControllers {  

  static async listarSexec(req, res) {
    try {
      const mostrarSexec = await database.Secretaria_Executivas.findAll({
        order: ["id"],
        attributes: ["id", "secretaria", "sigla"],
      });
      return res.status(200).json(mostrarSexec);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  

  static async listarTipoEvento(req, res) {
    try {
      const mostrarEvento = await database.Tipo_Evento.findAll({
        order: ["id"],
        attributes: ["id", "nome_evento"],
      });
      return res.status(200).json(mostrarEvento);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }   

  static async listarLocal(req, res) {
    try {
      const mostrarLocal = await database.Tipo_Local.findAll({
        order: ["id"],
        attributes: ["id", "local_evento"],
      });
      return res.status(200).json(mostrarLocal);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  

  static async listarParticipacao(req, res) {
    try {
      const mostrarParticipacao = await database.Tipo_Participacao.findAll({
        order: ["id"],
        attributes: ["id", "participacao"],
      });
      return res.status(200).json(mostrarParticipacao);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  

  static async listarRecursos(req, res) {
    try {
      const mostrarRecursos = await database.Tipo_Recursos.findAll({
        order: ["id"],
        attributes: ["id", "recursos"],
      });
      return res.status(200).json(mostrarRecursos);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  
}

module.exports = TypeControllers;
