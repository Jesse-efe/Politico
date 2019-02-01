export const checkPartyData = (req, res, next) => {
  let foundError = false;
  const error = [];

  const trimValue = value => value.trim();

  const {
    name, logoUrl, hqAddress,
  } = req.body;

  if (name === undefined || trimValue(name) === '') {
    foundError = true;
    error.push('party name was not specified');
  }
  if (logoUrl === undefined || trimValue(logoUrl) === '') {
    foundError = true;
    error.push('party logo was not specified');
  } else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(logoUrl)) {
    foundError = true;
    error.push('please provide a valid party logo url');
  }
  if (hqAddress === undefined || trimValue(hqAddress) === '') {
    foundError = true;
    error.push('party headquater address was not specified');
  }

  if (foundError) {
    const ResponseError = error.join(' and ');
    return res.status(400).json({
      status: 400,
      error: ResponseError,
    });
  }

  req.body.name = name.trim();
  req.body.logoUrl = logoUrl.trim();
  req.body.hqAddress = hqAddress.trim();
  next();
};

export const checkSignupData = (req, res, next) => {
  let foundError = false;
  const error = [];

  const trimValue = value => value.trim();

  const {
    firstname, lastname, othername, email, phoneNumber, passportUrl, password,
  } = req.body;

  if (firstname === undefined || trimValue(firstname) === '') {
    foundError = true;
    error.push('firstname');
  }
  if (lastname === undefined || trimValue(lastname) === '') {
    foundError = true;
    error.push('lastname');
  }
  if (othername === undefined || trimValue(othername) === '') {
    foundError = true;
    error.push('othername');
  }
  if (email === undefined || trimValue(email) === '') {
    foundError = true;
    error.push('email');
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    foundError = true;
    error.push('email');
  }
  if (othername === phoneNumber || trimValue(phoneNumber.toString()) === '') {
    foundError = true;
    error.push('phoneNumber');
  } else if (isNaN(Number(phoneNumber.toString()))) {
    foundError = true;
    error.push('phoneNumber');
  }
  if (passportUrl === undefined || trimValue(passportUrl) === '') {
    foundError = true;
    error.push('passport');
  } else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(passportUrl)) {
    foundError = true;
    error.push('passport');
  }
  if (password === undefined || trimValue(password) === '') {
    foundError = true;
    error.push('password');
  }

  if (foundError) {
    const ResponseError = error.join(', ');
    return res.status(400).json({
      status: 400,
      error: `please provide valid values for ${ResponseError}`,
    });
  }

  req.body.firstname = firstname.trim();
  req.body.lastname = lastname.trim();
  req.body.othername = othername.trim();
  req.body.email = email.trim();
  req.body.passportUrl = passportUrl.trim();
  req.body.password = password.trim();
  req.body.phoneNumber = phoneNumber.toString();
  next();
};


export const checkEditPartyData = (req, res, next) => {
  let foundError = false;
  const error = [];

  const trimValue = value => value.trim();

  let { id } = req.params;
  const {
    name,
  } = req.body;

  id = parseInt(id);
  if (isNaN(id)) {
    foundError = true;
    error.push('Invalid party Id');
  }
  if (name === undefined || trimValue(name) === '') {
    foundError = true;
    error.push('party name was not specified');
  }

  if (foundError) {
    const ResponseError = error.join(' and ');
    return res.status(400).json({
      status: 400,
      error: ResponseError,
    });
  }

  req.body.name = name.trim();
  req.params.id = id;
  next();
};

export const checkOfficeData = (req, res, next) => {
  let foundError = false;
  const error = [];
  const trimValue = value => value.trim();

  const {
    name, type,
  } = req.body;

  if (name === undefined || trimValue(name) === '') {
    foundError = true;
    error.push('office name was not specified');
  }
  if (type === undefined || trimValue(type) === '') {
    foundError = true;
    error.push('office type was not specified');
  }

  if (foundError) {
    const ResponseError = error.join(' and ');
    return res.status(400).json({
      status: 400,
      error: ResponseError,
    });
  }

  req.body.name = name.trim();
  req.body.type = type.trim();
  next();
};
