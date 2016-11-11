global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);


/*var checkDatabaseName = function(index){
    Item.find(function(err, items) {
        return(items[index].name);
    });
};*/



describe('Shopping List', function() {
    
    
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
    

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
    
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Kale');
                done();
            });
    });
    
/*    it('should delete an item on delete', function(done){
        chai.request(app)
            .delete('/items/3')
            .send({'name':'durian', '_id':'3'})
            .end(function(err, res) {
               should.equal(err, null);
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.be.a('string');
               done();
            });
    });

    
    it('should edit an item on put', function(done){
        chai.request(app)
            .put('/items/1')
            .send({'name':'apple', '_id': 1})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('string');
                done();
            });
    });
    
    
    
    it('should add item when POSTing to ID that exists');
    it('should return error when POSTing without body data');
    it('should return error when POSTing with something other than valid JSON');
    it('should return error when PUTing with an ID in the endpoint');
    it('should return error when PUTing with with different ID in endpoint than the body');
    it('should add item when PUTing to ID that does not exist');
    it('should return error when PUTing without body data');
    it('should return error when PUTing with something other than valid JSON');
    it('should return error when DELETEing an ID that does not exist');
    it('should return error when DELETEing without an ID in the endpoint');*/

    
});