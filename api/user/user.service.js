

const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const session = require('express-session')

module.exports = {
    getByEmail,
    add,
    query,
    getById,
    update,
    remove
}

async function getByEmail(email) {
	const collection = await dbService.getCollection('user');
	try {
		const user = await collection.findOne({ email });
		return user;
	} catch (err) {
		console.log(`ERROR: while finding user ${email}`)
		throw err;
	}
}


async function remove(userId) {
	const collection = await dbService.getCollection('user');
	try {
		await collection.deleteOne({ _id: ObjectId(userId) });
	} catch (err) {
		console.log(`ERROR: cannot remove user ${userId}`)
		throw err;
	}
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function query() {
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find().toArray();
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        console.log("getById -> user", user)
        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}


async function update(user) {
	const collection = await dbService.getCollection('user');
	user._id = ObjectId(user._id);
	console.log('user before update in service:', user);
	try {
        await collection.updateOne({ _id: user._id }, { $set: user })
		return user;
	} catch (err) {
		console.log(`ERROR: cannot update user ${user._id}`)
		throw err;
	}
}


