const database = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

class UserController {
  static async cadastraUser(req, res) {
    var enviarEmail = [
      "patricia.campos@sde.ce.gov.br",
      "daniel.araujo@sde.ce.gov.br",
    ];
    const novoUser = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(novoUser.user_password, salt);
    novoUser.user_password = hashedPassword;

    try {
      const criarUser = await database.User.create(novoUser);

      var transporter = nodemailer.createTransport({
        host: "172.26.2.26", //relay.etice.ce.gov.br
        port: 25,
        secure: false,
        tls: {
          rejectUnauthorized: false,
        },
      });

      var mailOptions = {
        from: "gestao.pessoas@sde.ce.gov.br",
        to: enviarEmail,
        subject: "Cadastro de usuário do Sistema Eventos da SDE",
        html: `<h3>Cadastro Realizado com sucesso!!</h3><p>${novoUser.nome_completo} fez o cadastrado. Verifique o perfil dele e ative para o uso do sistema.`,
      };
      //   console.log("mailOptions", mailOptions);
      var emailRetorno = null;
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          //console.log(error);
          emailRetorno = error;
        } else {
          //   console.log("Email enviado: " + info.response);
          emailRetorno = {
            messagem: "Email enviado com sucesso!",
            info: info.response,
          };
        }
      });

      const result = await criarUser.save();
      const { password, ...data } = await result.toJSON();
      res.send(data);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async login(req, res) {
    const user = req.body;

    try {
      const verificaUser = await database.User.findOne({
        where: { user_email: user.user_email },
      });
      if (!verificaUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      if (!verificaUser.user_active) {
        return res
          .status(400)
          .send({ message: "Consulte o Administrador do sistema" });
      }
      if (
        !(await bcrypt.compare(user.user_password, verificaUser.user_password))
      ) {
        return res.status(400).send({ message: "Crendenciais inválidos!" });
      }
      const token = jwt.sign(
        {
          _id: verificaUser.id,
          _profile_id: verificaUser.profile_id,
          _user_name: verificaUser.user_name,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: 24 * 60 * 60 * 1000,
        }
      );
      return res.json({ token: token });
    } catch (error) {
      res.send({ message: "Problemas ao realizar login!" });
    }
  }

  static async authenticatedUser(req, res) {
    try {
      const cookie = req.cookies["jwt"];

      const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN);

      if (!claims) {
        return res.status(401).send({ message: "Usuário não autenticado!" });
      }

      const user = await database.User.findOne({
        where: { id: claims._id },
        attributes: [
          "id",
          "nome_completo",
          "user_name",
          "user_email",
          "profile_id",
          "sexec_id",
        ],
      });

      const { password, ...data } = await user.toJSON();
      res.send(data);
    } catch (error) {
      return res.status(401).send({ message: "Usuário não autenticado!" });
    }
  }

  static async pegaUsers(req, res) {
    try {
      //    const cookie = req.cookies['jwt']
      //     const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN)
      //     if(!claims){
      //         return res.status(401).send({message: 'Usuário não autenticado!'})
      //     }
      const getUser = await database.User.findAll({
        order: ["nome_completo"],
        attributes: [
          "id",
          "nome_completo",
          "user_name",
          "user_email",
          "user_active",
          "profile_id",
          "sexec_id",
        ],
        include: [
          {
            association: "ass_user_profile",
            where: (database.User.profile_id = database.Profile.id),
            attributes: ["id", "perfil"],
          },
          {
            association: "ass_user_sexec",
            where: (database.User.sexec_id = database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json({ message: "Usuário não autenticado!" });
    }
  }

  static async atualizaUser(req, res) {
    const { id } = req.params;
    const user = req.body;
    // console.log('user', user)
    try {
      // const cookie = req.cookies['token']
      // const claims = jwt.verify(cookie, process.env.ACCESS_TOKEN)
      // if(!claims){
      //     return res.status(401).send({message: 'Usuário não autenticado!'})
      // }
      await database.User.update(user, { where: { id: Number(id) } });
      const updateUser = await database.User.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(updateUser);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async logout(req, res) {
    res.cookie("jwt", "", { maxAge: 0 });
    res.send({ message: "Logout Success!" });
  }

  static async resetPassword(req, res) {
    const user = req.body;
    //console.log('user', user)
    try {
      const verificaUser = await database.User.findOne({
        where: { user_email: user.user_email },
      });
      if (!verificaUser) {
        return res.status(404).send({ message: "Usuário não encontrado!" });
      }
      let newPassword = user.user_password;
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      newPassword = hashedNewPassword;
      //console.log('newPassword', newPassword)

      const novaSenha = await database.User.update(
        { user_password: newPassword },
        { where: { user_email: user.user_email } }
      );

      //const  result = await novaSenha.save()
      //const { password, ...data } = await result.toJSON()
      res.send({ message: "Senha alterada com sucesso!" });
    } catch (error) {
      //res.send(verificaUserEmail)
      return res.status(500).json(error.message);
    }
  }

  static async deletaUsers(req, res) {
    const { id } = req.params;
    const apaga = req.body;

    try {
      await database.User.destroy({ where: { id: Number(id) } });
      return res
        .status(200)
        .json({
          mensagem: `O Usuario ${apaga.user_name} foi excluido com sucesso!!`,
        });
    } catch (erro) {
      return res.status(500).json(error.message);
    }
  }  

  static async pegarUser(req, res) {
    const { id } = req.params;
    try {     
      const getUser = await database.User.findOne({
        where: {
            id: Number(id)},
        attributes: [
          "id",
          "nome_completo",
          "user_email",
          "profile_id",
          "sexec_id",
        ],
        include: [
          {
            association: "ass_user_profile",
            where: (database.User.profile_id = database.Profile.id),
            attributes: ["id", "perfil"],
          },
          {
            association: "ass_user_sexec",
            where: (database.User.sexec_id = database.Secretaria_Executivas.id),
            attributes: ["id", "secretaria", "sigla"],
          },
        ],
      });
      return res.status(200).json(getUser);
    } catch (error) {
      return res.status(500).json({ message: "Usuário não autenticado!" });
    }
  }

  static async pegarUserSexec(req, res) {
    const { id } = req.params;
    try {     
      const getUserSexec = await database.User.findOne({
        where: {
            id: Number(id)},
        attributes: [
          "id",
          "sexec_id",
        ],        
      });
      return res.status(200).json(getUserSexec);
    } catch (error) {
      return res.status(500).json({ message: "Usuário não autenticado!" });
    }
  }
}

module.exports = UserController