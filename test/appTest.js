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

    })
})