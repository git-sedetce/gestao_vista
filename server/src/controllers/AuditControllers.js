const database = require("../models");

class ReunioesControllers {
   
   static async register(req,res){
    
    const newRegister = req.body;
    console.log('newRegister', newRegister);
    try{
        const novoRegistro = await database.Audit.create(newRegister)
        return res.status(200).json(novoRegistro)
    }catch (error){
        return res.status(500).json(error.message)
    }

   }

}

module.exports = ReunioesControllers;