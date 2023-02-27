const bcrypt = require('bcryptjs');

const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    getByUserId,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Timesheet.findAll();
}

async function getById(id) {
    return await getTimesheet(id);
}

async function getByUserId(userId) {
    return await getTimesheets(userId);
}

async function create(params) {
    // validate
    if (await db.Timesheet.findOne({ where: { userId: params.userId, date: params.date } })) {
        throw 'Timesheet for User with userId: "' + params.userId + '" and date "' + params.date + '" is already registered';
    }

    const timesheet = new db.Timesheet(params);
    

    // save user
    await timesheet.save();
}

async function update(id, params) {
    const timesheet = await getTimesheet(id);

    // // validate
    // const emailChanged = params.email && user.email !== params.email;
    // if (emailChanged && await db.User.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already registered';
    // }

    // // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to user and save
    Object.assign(timesheet, params);
    await timesheet.save();
}

async function _delete(id) {
    const timesheet = await getTimesheet(id);
    await timesheet.destroy();
}

// helper functions

async function getTimesheet(id) {
    const timesheet = await db.Timesheet.findByPk(id);
    if (!timesheet) throw 'Timesheet not found';
    return timesheet;
}

async function getTimesheets(userId) {
    const timesheets = await db.Timesheet.findAll({
        where : {userId: userId}
    })
    return timesheets;
}