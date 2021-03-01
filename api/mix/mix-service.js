
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('mix')
    try {
        const mixes = await collection.find(criteria).toArray();
        return mixes
    } catch (err) {
        console.log('ERROR: cannot find mixes')
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.songName) {
        criteria.songName = { $regex: new RegExp(filterBy.songName, 'ig') }
    }
    if (filterBy.genre) {
        criteria.genre = filterBy.genre;
    }
    return criteria;
}

async function getById(mixId) {
    const collection = await dbService.getCollection('mix')
    try {
        const mix = await collection.findOne({ "_id": ObjectId(mixId) })
        return mix
    } catch (err) {
        console.log(`ERROR: while finding mix ${mixId}`)
        throw err;
    }
}

async function remove(mixId) {
    const collection = await dbService.getCollection('mix')
    try {
        await collection.deleteOne({ "_id": ObjectId(mixId) })
    } catch (err) {
        console.log(`ERROR: cannot remove mix ${mixId}`)
        throw err;
    }
}


async function update(mix) {
    const collection = await dbService.getCollection('mix')
    mix._id = ObjectId(mix._id);

    try {
        await collection.replaceOne({ '_id': mix._id }, mix)
        return mix
    } catch (err) {
        console.log(`ERROR: cannot update mix ${mix._id}`)
        throw err;
    }
}

async function add(mix) {
    const collection = await dbService.getCollection('mix')
    try {
        await collection.insertOne(mix);
        return mix;
    } catch (err) {
        console.log(`ERROR: cannot insert mix`)
        throw err;
    }
}


// CRUDL: Create, Read, Update, Delete, List
module.exports = {
    query,
    getById,
    add,
    update,
    remove
}
