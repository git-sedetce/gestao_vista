const database = require("../models");
const path = require("path");
const fs = require("fs");
const baseUrl = process.cwd() + "/src"; //__dirname + '.
const { Sequelize, QueryTypes } = require('sequelize');

class AnexoController {
  static async uploadImgs(req, res) {
    var imgs = [];
    const file = req.files;
    // console.log('files', file)
    const { id } = req.params;
    if (file.length > 0) {
      for (let image = 0; image < file.length; image++) {
        const img = file[image].path.split("src")[1];
        const nome_arquivo = file[image].filename;
        const type = file[image].mimetype;
        imgs.push(nome_arquivo);
        await database.Anexo.create({
          mimetype: type,
          filename: nome_arquivo,
          path: img,
          evento_id: id,
        });
      }
      return res
        .status(200)
        .json({ message: "Imagem(ns) anexado(s) com sucesso!" });
    } else {
      return res
        .status(500)
        .json({ message: "Problemas em anexar o(s) imagem(ns)" });
    }
  }

  static async pegaImgById(req, res) {
    const { id } = req.params;
    try {
      const mostraImagens = await database.Anexo.findAll({
        order: ["id"],
        where: { evento_id: Number(id) },
        attributes: [
          "id",
          "mimetype",
          "filename",
          "path",          
        ],
        include: [
          {
            association: "ass_anexo_evento",
            where: (database.Evento.id = database.Anexo.evento_id),
            attributes: [
              "id",
              "nome_evento",
            ],
          },
        ]
      });

      // console.log('mostraImagens', mostraImagens)

      if(!mostraImagens || mostraImagens.length === 0){
        return res.status(404).send({
          message: "Imagens não encontradas"
        })
      }

      const imagensData = [];
      for(const imagem of mostraImagens){
        const acesso = path.join(baseUrl, imagem.path)

        const data = fs.readFileSync(acesso, 'base64');
        imagensData.push({
          id: imagem.id,
          mimetype: imagem.mimetype,
          nome_evento: imagem.ass_anexo_evento.nome_evento,
          base64: data
        })
      }

      return res.status(200).json(imagensData)

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar as imagens'})
    }
  }
  static async qtdImgensByID(req, res) {
    // const { id } = req.params;
    try {
      const qtd = await database.Anexo.findAll({
        // order: ["ano"],
        // where: { evento_id: id },
        attributes: [
            "evento_id",
            [Sequelize.fn("COUNT", Sequelize.col("evento_id")), "qtd_imgs" ]
        ],
        group: ["evento_id"]
      });
      return res.status(200).json(qtd);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }  
}

module.exports = AnexoController;
