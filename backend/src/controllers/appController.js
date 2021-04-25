const search = async (req, res) => {
    try {
      // Validate URL
      const term = req.query.term;
      if (!term || term.length === 0) {
        return res.status(400).json({ error: "Missing term in Param Query!" });
      }
  
      // Response
      return res.json({
        message: "Success!",
      });
    } catch (error) {
      return res.status(400).json({ error });
    }
  };
  
  module.exports = {
    search,
  };
  