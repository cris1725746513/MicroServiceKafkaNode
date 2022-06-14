//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let modelo = require('../models/blacklistmodel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('SERVER BLACK_LIST ...', () => {
  describe('/GET BLACK_LIST', () => {
      it('it should GET all the BLACK_LIST', (done) => {
            chai.request(server)
            .get('/blacklist')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
              done();
            });
      });
  });
  describe('/POST BLACK_LIST', () => {
      it('it should POST a BLACK_LIST ', (done) => {
        let  BLACK_LIST= {
            nombreBlacklist: "Cristian Prueba Post",
            id: "3",
            status: "true",
            duración: "duracion actualizacion Prueba",
            descripcion: "descripcion de actualizacion Prueba"
      }
            chai.request(server)
            .post('/blacklist')
            .send(BLACK_LIST)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('blackList Creado');

              done();
            });
      });
  });
  describe('/GET/:id BLACK_LIST', () => {
      it('it should GET a BLACK_LIST ', (done) => {
          let BLACK_LIST = new modelo({
            nombreBlacklist: "Cristian Castillo INSERTAR2 Get ixd",
            id: "1",
            status: "true",
            duración: "duracion actualizacion",
            descripcion: "descripcion de actualizacion"
          
          });
            chai.request(server)
            .get('/blacklist/' + BLACK_LIST.id)
            .send(BLACK_LIST)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
              done();
            });
         

      });
  });
  describe('/PUT/:id BLACK_LIST', () => {
      it('it should UPDATE a BLACK_LIST ', (done) => {
        let BLACK_LIST = new modelo({
            nombreBlacklist: "Sergio Castillo",
            id: "3",
          });
                chai.request(server)
                .put('/blacklist/' + BLACK_LIST.id)
                .send({nombreBlacklist:"Sergio Castillo"})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('blackList actualizado');
                     
                  done();
                
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id BLACK_LIST', () => {
      it('it should DELETE a BLACK_LIST', (done) => {
        let BLACK_LIST = new modelo({
            nombreBlacklist: "Sergio Castillo",
            id: "3",
          });
          
                chai.request(server)
                .delete('/blacklist/' + BLACK_LIST.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('blackList Eliminado');
                      
                  done();
                });
          
      });
  });
});
