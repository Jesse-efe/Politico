import createTables from './tables';
import pool from './config';


(async () => {
  await createTables();

  const addOffice = (officesData) => {
    const {
      name, type,
    } = officesData;
    const query = {
      text: 'INSERT INTO offices (name, type) VALUES ($1, $2) RETURNING id',
      values: [name, type],
    };
    pool.query(query);
  };

  const addParty = (partyData) => {
    const {
      name, abbreviation, logoUrl, hqAddress,
    } = partyData;
    const query = {
      text: 'INSERT INTO parties (name, abbreviation, logo, address) VALUES ($1, $2, $3) RETURNING id',
      values: [name, abbreviation, logoUrl, hqAddress],
    };
    pool.query(query);
  };

  const addAdmin = (adminData) => {
    const {
      firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin, password,
    } = adminData;
    pool.query('INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin, password]);
  };

  const admin = {
    firstname: process.env.firstname,
    lastname: process.env.lastname,
    othername: process.env.othername,
    email: process.env.email,
    phoneNumber: process.env.phoneNumber,
    passportUrl: process.env.passportUrl,
    isAdmin: 1,
    password: process.env.password,
  };
  const officeOne = {
    name: 'President Federal Republic Of Nigeria',
    type: 'federal',
  };
  const officeTwo = {
    name: 'Executive Governor Of Lagos state',
    type: 'state',
  };
  const officeThree = {
    name: 'Senate President Federal Republic Of Nigeria',
    type: 'federal',
  };
  const partyOne = {
    name: 'Young Democratic party',
    abbreviation: 'YDP',
    logoUrl: 'https://jesse-efe.github.io/Politico/UI/edit-party.html',
    hqAddress: 'No 34 gbagada lagos',
  };
  const partyTwo = {
    name: 'All Progressives Grand Alliance',
    abbreviation: 'APGA',
    logoUrl: 'http://www.zikoko.com/wp-content/uploads/2018/07/APGA-Logo.jpg',
    hqAddress: 'No 174 Alaba lagos',
  };
  const partyThree = {
    name: 'Accord',
    abbreviation: 'ACCORD',
    logoUrl: 'https://netstorage-legit.akamaized.net/images/vllkyt7lb83keb7ci.jpg',
    hqAddress: 'No 12 Badagry lagos',
  };

  await addAdmin(admin);
  await addOffice(officeOne);
  await addOffice(officeTwo);
  await addOffice(officeThree);
  await addParty(partyOne);
  await addParty(partyTwo);
  await addParty(partyThree);
  console.log('seeded');
})();
