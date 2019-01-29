export const checkPartyData = (req, res, next) => {
  let {
      name, logoUrl, hqAddress,
  } = req.body;

  if (name === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'party name was not specified',
    });
  }
  if (logoUrl === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'party logo was not specified',
    });
  }
  if (hqAddress === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'party headquater address was not specified',
    });
  }

  name = name.trim();
  logoUrl = logoUrl.trim();
  hqAddress = hqAddress.trim();
  if (name === '') {
    return res.status(400).json({
      status: 400,
      error: 'party name was not specified',
    });
  }
  if (logoUrl === '') {
    return res.status(400).json({
      status: 400,
      error: 'party logo was not specified',
    });
  }
  if (hqAddress === '') {
    return res.status(400).json({
      status: 400,
      error: 'party headquater address was not specified',
    });
  }

  req.body.name = name;
  req.body.logoUrl = logoUrl;
  req.body.hqAddress = hqAddress;
  next();
};

export const checkEditPartyData = (req, res, next) => {
  let { id } = req.params;
  let {
    name,
  } = req.body;

  id = parseInt(id);
  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid party Id'
    });
  }
  if (name === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'party name was not specified',
    });
  }
  name = name.trim();
  if (name === '') {
    return res.status(400).json({
      status: 400,
      error: 'party name was not specified',
    });
  }

  req.body.name = name;
  req.params.id = id;
  next();
}

export const checkOfficeData = (req, res, next) => {
  let {
      name, type,
  } = req.body;

  if (name === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'office name was not specified',
    });
  }
  if (type === undefined) {
    return res.status(400).json({
      status: 400,
      error: 'office type was not specified',
    });
  }

  name = name.trim();
  type = type.trim();

  if (name === '') {
    return res.status(400).json({
      status: 400,
      error: 'office name was not specified',
    });
  }
  if (type === '') {
    return res.status(400).json({
      status: 400,
      error: 'office type was not specified',
    });
  }

  req.body.name = name;
  req.body.type = type;
  next();
};