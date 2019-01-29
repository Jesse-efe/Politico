import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../source/app';

const { expect } = chai;
chai.use(chaiHttp);

describe('App.js', () => {
    describe('/api/v1/parties', () => {
        it('party name should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                logoUrl: '',
                hqAddress: '',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party name was not specified');
                done();
            });
        });
        
        it('party name should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: '   ',
                logoUrl: '',
                hqAddress: '',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party name was not specified');
                done();
            });
        });
        
        it('logo should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'ona',
                hqAddress: '',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party logo was not specified');
                done();
            });
        });

        it('logo should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'ona',
                logoUrl: '',
                hqAddress: '',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party logo was not specified');
                done();
            });
        });   

        it('hqAddress should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'ona',
                logoUrl: 'logo.jpg',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party headquater address was not specified');
                done();
            });
        });

        it('hqAddress should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'ona',
                logoUrl: 'logo.jpg',
                hqAddress: '   ',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party headquater address was not specified');
                done();
            });
        });
        
        it('should post a party', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'Davids oyetunde party',
                logoUrl: 'logo.jpg',
                hqAddress: '56 baruwa str.',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(201);
                expect(res.body.data[0].name).to.equal('Davids oyetunde party');
                expect(res.body.data[0].id).to.equal(103);
                done();
            });
        });

        
        it('should get all parties', (done) => {
            chai.request(app)
            .get('/api/v1/parties')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.data[0].name).to.equal('Green Party of Nigeria');
                expect(res.body.data[2].logoUrl).to.equal('https://i1.wp.com/www.grand.org/inec/pix/GPN.png?w=573');
                done();
            });
        });

        it('should get a valid party', (done) => {
            chai.request(app)
            .get('/api/v1/parties/j')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Invalid party Id');
                done();
            });
        });

        it('should get an existing party', (done) => {
            chai.request(app)
            .get('/api/v1/parties/12')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(404);
                expect(res.body.error).to.equal('That party could not be found');
                done();
            });
        });

        it('should get a specific party', (done) => {
            chai.request(app)
            .get('/api/v1/parties/101')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.data[0].name).to.equal('Young Democratic party');
                expect(res.body.data[0].logoUrl).to.equal('https://i1.wp.com/www.bolanle.org/inec/pix/GPN.png?w=573');
                done();
            });
        });

        it('should edit a valid party', (done) => {
            chai.request(app)
            .patch('/api/v1/parties/n/name')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Invalid party Id');
                done();
            });
        });

        it('should send along new name to edit a party', (done) => {
            chai.request(app)
            .patch('/api/v1/parties/99/name')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party name was not specified');
                done();
            });
        });

        it('should send along valid name to edit a party', (done) => {
            chai.request(app)
            .patch('/api/v1/parties/99/name')
            .send({
                name: '   ',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('party name was not specified');
                done();
            });
        });

        it('should edit an existing party', (done) => {
            chai.request(app)
            .patch('/api/v1/parties/99/name')
            .send({
                name: 'Good Party',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(404);
                expect(res.body.error).to.equal('That party could not be found');
                done();
            });
        });

        it('should edit a party', (done) => {
            chai.request(app)
            .patch('/api/v1/parties/100/name')
            .send({
                name: 'Very Good Party',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.data[0].name).to.equal('Very Good Party');
                done();
            });
        });

    })
})