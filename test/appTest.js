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
                expect(res.body.error).to.equal('party name was not specified and party logo was not specified and party headquater address was not specified');
                done();
            });
        });
        
        it('party name should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: '   ',
                logoUrl: 'https://i1.wp.com/www.inecnigeria.org/inec/pix/GPN.png?w=573',
                hqAddress: 'epic',
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
                expect(res.body.error).to.equal('party logo was not specified and party headquater address was not specified');
                done();
            });
        });

        it('logo should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'ona',
                logoUrl: '',
                hqAddress: 'epic',
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
        
        it('should create a party', (done) => {
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

        it('should not create duplicate party', (done) => {
            chai.request(app)
            .post('/api/v1/parties')
            .send({
                name: 'Davids oyetunde party',
                logoUrl: 'logo.jpg',
                hqAddress: '56 baruwa str.',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('A party with this name already exist');
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
                expect(res.body.error).to.equal('Invalid party Id and party name was not specified');
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

        it('should delete a valid party', (done) => {
            chai.request(app)
            .delete('/api/v1/parties/jjj')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Invalid party Id');
                done();
            });
        });

        it('should delete an existing party', (done) => {
            chai.request(app)
            .delete('/api/v1/parties/12')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(404);
                expect(res.body.error).to.equal('That party could not be found');
                done();
            });
        });

        it('should delete a party', (done) => {
            chai.request(app)
            .delete('/api/v1/parties/100')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.data[0].message).to.equal('Party deleted sucessfully');
                done();
            });
        });
    })

    describe('/api/v1/offices', () => {
        it('office name should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .send({
                type: 'federal',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('office name was not specified');
                done();
            });
        });

        it('office name should be valid', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .send({
                name: '',
                type: 'federal',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('office name was not specified');
                done();
            });
        });

        it('office type should be defined', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .send({
                name: 'federal',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('office type was not specified');
                done();
            });
        });

        it('office type should be valid', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .send({
                name: 'federal',
                type: '  ',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('office type was not specified');
                done();
            });
        });

        it('office should be created', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .send({
                name: 'House Of Representatives Lagos Central',
                type: ' federal ',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(201);
                expect(res.body.data[0].id).to.equal(104);
                expect(res.body.data[0].name).to.equal('House Of Representatives Lagos Central');
                expect(res.body.data[0].type).to.equal('federal');
                done();
            });
        });

        it('should not create duplicate office', (done) => {
            chai.request(app)
            .post('/api/v1/offices')
            .send({
                name: 'House Of Representatives Lagos Central',
                type: ' federal ',
            })
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('An office with this name already exist');
                done();
            });
        });

        it('should get all offices', (done) => {
            chai.request(app)
            .get('/api/v1/offices')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.data[0].name).to.equal('President Federal Republic Of Nigeria');
                expect(res.body.data[2].type).to.equal('state');
                expect(res.body.data[3].id).to.equal(103);
                done();
            });
        });

        it('should get an ofice with valid id', (done) => {
            chai.request(app)
            .get('/api/v1/offices/five')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal('Invalid office Id');
                done();
            });
        });

        it('should get an existing office', (done) => {
            chai.request(app)
            .get('/api/v1/offices/120')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(404);
                expect(res.body.error).to.equal('That office could not be found');
                done();
            });
        });
        
        it('should get an office', (done) => {
            chai.request(app)
            .get('/api/v1/offices/101')
            .end((err, res) => {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.data[0].name).to.equal('Senate President Federal Republic Of Nigeria');
                expect(res.body.data[0].type).to.equal('federal');
                expect(res.body.data[0].id).to.equal(101);
                done();
            });
        });
    })
})