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