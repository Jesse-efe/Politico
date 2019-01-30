export const checkPartyData = (req, res, next) => {
  let foundError = false;
  let error = [];

  const trimValue = (value) =>  value.trim();

  let {
      name, logoUrl, hqAddress,
  } = req.body;

  if (name === undefined || trimValue(name) === '') {
      foundError = true;
      error.push('party name was not specified');
  }
  if (logoUrl === undefined || trimValue(logoUrl) === '') {
    foundError = true;
    error.push('party logo was not specified');
  }else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(logoUrl)) {
    foundError = true;
    error.push('please provide a valid party logo url');
  }
  if (hqAddress === undefined || trimValue(hqAddress) === '') {
    foundError = true;
    error.push('party headquater address was not specified');
  }

  if (foundError) {
    let ResponseError = error.join(' and ');
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

export const checkEditPartyData = (req, res, next) => {
  let foundError = false;
  let error = [];

  const trimValue = (value) => value.trim();

  let { id } = req.params;
  let {
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
    let ResponseError = error.join(' and ');
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
  let error = [];
  const trimValue = (value) => value.trim();

  let {
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
    let ResponseError = error.join(' and ');
    return res.status(400).json({
      status: 400,
      error: ResponseError,
    });
  }

  req.body.name = name.trim();
  req.body.type = type.trim();
  next();
};