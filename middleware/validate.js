const validator = require('../helpers/validate');

const saveEmployee = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    employeeId: 'required|string',
    birthdate: 'required|date',
    position: 'required|string',
    department: 'required|string',
    salary: 'required|numeric',
    employmentDate: 'required|string',
    employmentStatus: 'required|string'    
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveUser = (req, res, next) => {
    const validationRule = {
      employeeId: 'required|string',
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|email',
      password: 'required|min:8',           
        
    };

    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveEmployee,
  saveUser
};