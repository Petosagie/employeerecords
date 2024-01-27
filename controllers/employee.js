const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = (req, res) => {
    //#swagger.tags=['employee']  
    const result = mongodb.getDatabase().db().collection('employee').find();
    result.toArray()
        .then(employee => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employee);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });
};


const getSingle = (req, res) => {
    //#swagger.tags=['employee']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid employee id to find an employee.');
    }

    const employeeId = new ObjectId(req.params.id);
    const result = mongodb.getDatabase().db().collection('employee').find({ _id: employeeId });

    result.toArray()
        .then(employee => {
            if (employee.length === 0) {
                return res.status(404).json('Employee not found.');
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(employee[0]);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });
};


const createEmployee = async (req, res) => {
    //#swagger.tags=['employee']
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        birthdate: req.body.birthdate,
        position: req.body.position,
        department: req.body.department,
        salary: req.body.salary,
        employmentDate: req.body.employmentDate,
        employmentStatus: req.body.employmentStatus
    };

    try {
        const response = await mongodb.getDatabase().db().collection('employee').insertOne(employee);

        if (response.acknowledged > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('Failed to insert the employee. No documents were created.');
        }
    } catch (error) {
        console.error('Error during employee creation:', error);
        res.status(500).json(error.message || 'Some error occurred while creating the employee.');
    }
};



const updateEmployee = async (req, res) => {
    //#swagger.tags=['employee']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to find an employee.');
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employeeId: req.body.employeeId,
        birthdate: req.body.birthdate,
        position: req.body.position,
        department: req.body.department,
        salary: req.body.salary,
        employmentDate: req.body.employmentDate,
        employmentStatus: req.body.employmentStatus
                
    };
    const response = await mongodb.getDatabase().db().collection('employee').replaceOne({ _id: employeeId}, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the employee.');
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags=['employee']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid employee id to find an employee.');
    }
    const employeeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('employee').deleteOne({ _id: employeeId});
    if (response.deletedCount > 0) {
        res.status(204).send();        
    }
    else {
        res.status(500).json(response.error || 'Some error occurred while updating the employee.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
}