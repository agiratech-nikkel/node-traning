exports.validate = (schema) => (req, res, next) => {
const { error} = schema.validate(req.body);
    if (error) {
        res.json({ state: false, msg: "Failed", error:error.details[0].message});
    } else {
      next();
    }
};