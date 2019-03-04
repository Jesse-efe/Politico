import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../source/app';
import createTables from '../source/models/tables';

const { expect } = chai;
chai.use(chaiHttp);

describe('App.js', () => {
  let adminToken;
  let userToken;

  before(async () => {
    await createTables();
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'jesse@gmail.com',
        password: 'adminpass',
      });
    adminToken = res.body.data[0].token;
  });

  describe('/api/v1/auth/signup', () => {
    it('cant signup without any data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide valid values for firstname, lastname, othername, email, phoneNumber, passport, password');
          done();
        });
    });

    it('passport should be a valid url', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          othername: 'ben',
          email: 'very@email.drn',
          phoneNumber: 5678392,
          passportUrl: 'hgjknds',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide valid values for passport');
          done();
        });
    });

    it('email should be a valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          othername: 'ben',
          email: 'veryemaildrn',
          phoneNumber: 5678392,
          passportUrl: 'hgjknds.jg',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide valid values for email');
          done();
        });
    });

    it('phone number should be number', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          othername: 'ben',
          email: 'veryemaildr@gmail.ion',
          phoneNumber: 'fgch',
          passportUrl: 'hgjknds.jg',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide valid values for phoneNumber');
          done();
        });
    });

    it('should sign user up', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          othername: 'ben',
          email: 'johnDoe@gmail.com',
          phoneNumber: 5678392,
          passportUrl: 'hgjknds.jg',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          userToken = res.body.data[0].token;
          expect(res.body.data[0].user.id).to.equal(2);
          expect(res.body.data[0].user.email).to.equal('johnDoe@gmail.com');
          done();
        });
    });

    it('should not sign user up twice', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'john',
          lastname: 'doe',
          othername: 'ben',
          email: 'johnDoe@gmail.com',
          phoneNumber: 5678392,
          passportUrl: 'hgjknds.jg',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('a user with this email already exists');
          done();
        });
    });
  });

  describe('/api/v1/auth/login', () => {
    it('should not login without any credential', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide a valid value for email and password');
          done();
        });
    });

    it('should not login with invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'vermaildrn',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide a valid value for email');
          done();
        });
    });

    it('should not login unregistered user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johnkkDoe@gmail.com',
          password: 'hxdfghdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('You are not a registered please signup');
          done();
        });
    });

    it('should not login with invalid password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johnDoe@gmail.com',
          password: 'hghdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('Email and password do not match');
          done();
        });
    });

    it('should log user in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'johnDoe@gmail.com',
          password: 'hdbsj',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.data[0].user.email).to.equal('johnDoe@gmail.com');
          done();
        });
    });
  });

  describe('/api/v1/parties', () => {
    it('only admin can create a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .send({
          logoUrl: 'ggjbh.jpg',
          hqAddress: 'gckvhbbjjkn',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('party name should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          logoUrl: '',
          hqAddress: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('party name was not specified and party name abbreviation was not specified and party logo was not specified and party headquater address was not specified');
          done();
        });
    });

    it('party name should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: '   ',
          nameAbbreviation: 'GGG',
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
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'ona',
          nameAbbreviation: 'GGG',
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
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'ona',
          nameAbbreviation: 'GGG',
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

    it('logo should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'ona',
          nameAbbreviation: 'GGG',
          logoUrl: 'picture url',
          hqAddress: 'epic',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide a valid party logo url');
          done();
        });
    });

    it('hqAddress should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'ona',
          nameAbbreviation: 'GGG',
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
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'ona',
          nameAbbreviation: 'GGG',
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
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'Davids oyetunde party',
          nameAbbreviation: 'DOP',
          logoUrl: 'logo.jpg',
          hqAddress: '56 baruwa str.',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.data[0].name).to.equal('Davids oyetunde party');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });

    it('should not create duplicate party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'Davids oyetunde party',
          nameAbbreviation: 'DOP',
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

    it('should not create duplicate party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'Davids oyetunde partyy',
          nameAbbreviation: 'DOP',
          logoUrl: 'logo.jpg',
          hqAddress: '56 baruwa str.',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('A party with this name abbreviation already exist');
          done();
        });
    });


    it('should get all parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].name).to.equal('Davids oyetunde party');
          expect(res.body.data[0].logoUrl).to.equal('logo.jpg');
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
        .get('/api/v1/parties/1')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].name).to.equal('Davids oyetunde party');
          expect(res.body.data[0].logoUrl).to.equal('logo.jpg');
          done();
        });
    });

    it('only admin can edit a party', (done) => {
      chai.request(app)
        .patch('/api/v1/parties/n/name')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('should edit a valid party', (done) => {
      chai.request(app)
        .patch('/api/v1/parties/n/name')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid party Id and party name was not specified and party name abbreviation was not specified');
          done();
        });
    });

    it('should send along valid name to edit a party', (done) => {
      chai.request(app)
        .patch('/api/v1/parties/99/name')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: '   ',
          nameAbbreviation: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('party name was not specified and party name abbreviation was not specified');
          done();
        });
    });

    it('should edit an existing party', (done) => {
      chai.request(app)
        .patch('/api/v1/parties/99/name')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'Good Party',
          nameAbbreviation: 'GP',
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
        .patch('/api/v1/parties/1/name')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'Very Good Party',
          nameAbbreviation: 'VGP',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].name).to.equal('Very Good Party');
          expect(res.body.data[0].nameAbbreviation).to.equal('VGP');
          done();
        });
    });

    it('only admin can delete a party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/jjj')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('should delete a valid party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/jjj')
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('That party could not be found');
          done();
        });
    });

    it('should delete a party', (done) => {
      chai.request(app)
        .delete('/api/v1/parties/1')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].message).to.equal('Party deleted sucessfully');
          done();
        });
    });

    it('should create a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties')
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'Davids oyetunde party',
          nameAbbreviation: 'DOP',
          logoUrl: 'logo.jpg',
          hqAddress: '56 baruwa str.',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.data[0].name).to.equal('Davids oyetunde party');
          expect(res.body.data[0].id).to.equal(2);
          done();
        });
    });
  });

  describe('/api/v1/parties/:partyId/join', () => {
    it('must be logged in to join a party', (done) => {
      chai.request(app)
        .post('/api/v1/parties/1/join')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('party id should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/parties/t3/join')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid party Id');
          done();
        });
    });

    it('party should exist', (done) => {
      chai.request(app)
        .post('/api/v1/parties/9/join')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('That party could not be found');
          done();
        });
    });

    it('should join party', (done) => {
      chai.request(app)
        .post('/api/v1/parties/2/join')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].message).to.equal('successful');
          done();
        });
    });

    it('should not join for a user already a party member', (done) => {
      chai.request(app)
        .post('/api/v1/parties/2/join')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('you are already a member of a party');
          done();
        });
    });
  });

  describe('/api/v1/offices', () => {
    it('only admin can create an office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .send({
          type: 'federal',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('office name should be defined', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
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
        .set('Authorization', `bearer ${adminToken}`)
        .send({
          name: 'House Of Representatives Lagos Central',
          type: ' federal ',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.data[0].id).to.equal(1);
          expect(res.body.data[0].name).to.equal('House Of Representatives Lagos Central');
          expect(res.body.data[0].type).to.equal('federal');
          done();
        });
    });

    it('should not create duplicate office', (done) => {
      chai.request(app)
        .post('/api/v1/offices')
        .set('Authorization', `bearer ${adminToken}`)
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
          expect(res.body.data[0].name).to.equal('House Of Representatives Lagos Central');
          expect(res.body.data[0].type).to.equal('federal');
          expect(res.body.data[0].id).to.equal(1);
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
        .get('/api/v1/offices/1')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].name).to.equal('House Of Representatives Lagos Central');
          expect(res.body.data[0].type).to.equal('federal');
          expect(res.body.data[0].id).to.equal(1);
          done();
        });
    });
  });

  describe('/api/v1/offices/:userId/:officeId', () => {
    it('must be logged in to express interest', (done) => {
      chai.request(app)
        .post('/api/v1/offices/ty/7')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('user id should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/offices/ty/7')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid user Id');
          done();
        });
    });

    it('office id should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/offices/7/two')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid office Id');
          done();
        });
    });

    it('cant express interest with another user id', (done) => {
      chai.request(app)
        .post('/api/v1/offices/7/8')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Auth failed');
          done();
        });
    });

    it('office should exist', (done) => {
      chai.request(app)
        .post('/api/v1/offices/2/8')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('that office does not exist');
          done();
        });
    });

    it('should express interest sucessfully', (done) => {
      chai.request(app)
        .post('/api/v1/offices/2/1')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].message).to.equal('successful');
          done();
        });
    });

    it('should not express interest more than once', (done) => {
      chai.request(app)
        .post('/api/v1/offices/2/1')
        .set('Authorization', `bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('You have already expressed interest to run for an office');
          done();
        });
    });
  });

  describe('/api/v1/offices/:id/register', () => {
    it('must be an admin to access this route', (done) => {
      chai.request(app)
        .post('/api/v1/offices/5/register')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('user id should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/offices/five/register')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid user Id');
          done();
        });
    });

    it('should register only interested users', (done) => {
      chai.request(app)
        .post('/api/v1/offices/17/register')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('This user is not interested in running for an office');
          done();
        });
    });

    it('should register a user', (done) => {
      chai.request(app)
        .post('/api/v1/offices/2/register')
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.data[0].user).to.equal(2);
          done();
        });
    });
  });

  describe('/api/v1/votes', () => {
    it('must be logged in to vote', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .send({
          office: 1, candidate: 1,
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(401);
          expect(res.body.error).to.equal('token is required for authentication');
          done();
        });
    });

    it('office and candidate id should be valid', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('Authorization', `bearer ${userToken}`)
        .send({
          office: 'one', candidate: '',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('please provide a valid value for office and candidate');
          done();
        });
    });

    it('candidate must be a registered candidate', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('Authorization', `bearer ${userToken}`)
        .send({
          office: '1', candidate: '6',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('your candidate is not a registered candidate');
          done();
        });
    });

    it('vote for the same office candidate is running for', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('Authorization', `bearer ${userToken}`)
        .send({
          office: '3', candidate: '2',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('your candidate is not running for that office');
          done();
        });
    });

    it('should vote for candidate', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('Authorization', `bearer ${userToken}`)
        .send({
          office: '1', candidate: '2',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.data[0].candidate).to.equal(2);
          done();
        });
    });

    it('should not vote twice for same office', (done) => {
      chai.request(app)
        .post('/api/v1/votes')
        .set('Authorization', `bearer ${userToken}`)
        .send({
          office: '1', candidate: '3',
        })
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('you have already voted for this office');
          done();
        });
    });
  });

  describe('/api/v1/offices/:id/result', () => {
    it('office id should be valid', (done) => {
      chai.request(app)
        .get('/api/v1/offices/t3/result')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(400);
          expect(res.body.error).to.equal('Invalid office Id');
          done();
        });
    });

    it('office should exist', (done) => {
      chai.request(app)
        .get('/api/v1/offices/3/result')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(404);
          expect(res.body.error).to.equal('That office could not be found');
          done();
        });
    });

    it('should get result', (done) => {
      chai.request(app)
        .get('/api/v1/offices/1/result')
        .end((err, res) => {
          expect(res).to.be.json;
          expect(res).to.have.status(200);
          expect(res.body.data[0].office).to.equal(1);
          done();
        });
    });
  });
});
