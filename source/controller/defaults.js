class Defaults {
  static async homeResponse(req, res) {
    const response = {
      status: 200,
      data: [{
        message: 'welcome to politico',
      }],
    };
    return res.status(200).json(response);
  }
}

export default Defaults;
