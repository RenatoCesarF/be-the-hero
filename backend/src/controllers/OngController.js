const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    
    async create(request, response) {                   //Criação de uma ONG
        const { name, email, whatsapp, city, uf} =  request.body;

        const id = generateUniqueId(); //criação de um ID
    
        await connection('ongs').insert({  //dados para a ONG preencher
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
    
        return response.json({ id }); //devolução do ID ao usuário
    }
};