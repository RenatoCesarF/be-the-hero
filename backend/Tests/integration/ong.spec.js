const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async() => { 
        await connection.destroy();
    })

    it(' should be able to crate a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "nomequalquer",
                email: "contat@gmail.com",
                whatsapp: "12345678910",
                city: "Riu do sul",
                uf: "MS"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});