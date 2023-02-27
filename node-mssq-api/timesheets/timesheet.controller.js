const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const timesheetService = require('./timesheet.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.get('/user/:userId', getByUserId);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    timesheetService.getAll()
        .then(timesheets => res.json(timesheets))
        .catch(next);
}

function getById(req, res, next) {
    timesheetService.getById(req.params.id)
        .then(timesheet => res.json(timesheet))
        .catch(next);
}

function getByUserId(req, res, next) {
    timesheetService.getByUserId(req.params.userId)
        .then(timesheets => res.json(timesheets))
        .catch(next);
}

function create(req, res, next) {
    timesheetService.create(req.body)
        .then(() => res.json({ message: 'Timesheet created' }))
        .catch(next);
}

function update(req, res, next) {
    timesheetService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Timesheet updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    timesheetService.delete(req.params.id)
        .then(() => res.json({ message: 'Timesheet deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        date:  Joi.date().required(),
        vehicle:  Joi.string().required(),
        projectNo:  Joi.number().required(),
        location:  Joi.string().required(),
        arriveTime: Joi.string().required(),
        morningBreak: Joi.number().required(),
        lunchBreak:   Joi.number().required(),
        departureTime: Joi.string().required(),
        route:  Joi.number().required(),
        compensation:  Joi.number().required(),
        sleepAtHotel:  Joi.boolean().required(),
        breakfastAtHotel:  Joi.boolean().required(),
        sleepAtHome:  Joi.boolean().required(),
        returnToAtelier:  Joi.boolean().required(),
        repMidOption: Joi.boolean().required(),
        repMidValue:  Joi.number().required(),
        repSoirOption:  Joi.boolean().required(),
        repSoirValue:  Joi.number().required(),
        description:  Joi.string().allow('').optional(),
        montant:  Joi.string().allow('').optional(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        date:  Joi.date().empty(''),
        vehicle:  Joi.string().empty(''),
        projectNo:  Joi.number().default(0),
        location:  Joi.string().empty(''),
        arriveTime: Joi.string().empty(''),
        morningBreak: Joi.number().default(0),
        lunchBreak:   Joi.number().default((0)),
        departureTime: Joi.string().empty(''),
        route:  Joi.number().default(0),
        compensation:  Joi.number().default(0),
        sleepAtHotel:  Joi.boolean().default(false),
        breakfastAtHotel:  Joi.boolean().default(false),
        sleepAtHome:  Joi.boolean().default(true),
        returnToAtelier:  Joi.boolean().default(false),
        repMidOption: Joi.boolean().default(false),
        repMidValue:  Joi.number().default(0),
        repSoirOption:  Joi.boolean().default(false),
        repSoirValue:  Joi.number().default(0),
        description:  Joi.string().empty(''),
        montant:  Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}
