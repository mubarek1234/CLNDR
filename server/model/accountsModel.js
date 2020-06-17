const bcrypt = require("bcrypt");
const {db} = require('./firebase');
const admin = require("firebase-admin");
const HASH_ROUNDS = 9;

function createAccount(username, password, securityQ, securityA) {
    const encryptPW = bcrypt.hashSync(password, HASH_ROUNDS);
    const encryptAnswer = bcrypt.hashSync(securityA, HASH_ROUNDS);
    return db.collection('users').add({
        username: username,
        password: encryptPW,
        sec_question: securityQ,
        sec_answer: encryptAnswer,
        verified: false,
        following: [],
        planned_events: []
    });
}

function createAccountMinimal(username, password) {
    return createAccount(username, password, "", "");
}

function readAccountByUsername(username) {
    return db.collection('users').where('username', '==', username).limit(1).get();
}

function readAccountByID(uid) {
    return db.collection('users').doc(uid).get();
}

function updateAccount(uid, payload) {
    var updateBody = {}
    if (payload.username !== undefined && payload.username !== '') {
        updateBody.username = payload.username;
    }
    if (payload.password !== undefined && payload.password !== '') {
        const encryptPW = bcrypt.hashSync(payload.password, HASH_ROUNDS);
        updateBody.password = encryptPW;
    }
    if (payload.sec_question !== undefined && payload.sec_question !== '') {
        updateBody.sec_question = payload.sec_question;
    }
    if (payload.sec_answer !== undefined && payload.sec_answer !== '') {
        const encryptAnswer = bcrypt.hashSync(payload.sec_answer, HASH_ROUNDS);
        updateBody.sec_answer = encryptAnswer;
    }
    
    return db.collection('users').doc(uid).update(updateBody);
}

function updateAccountVerifiedStatus(uid, payload) {
    return db.collection('users').doc(uid).update({
        verified: payload
    });
}

function verifyAccount(uid, contact_email, org_name, profile_pic_url) {
    return db.collection('users').doc(uid).update({
        contact_email: contact_email,
        hosted_events: [],
        org_name: org_name,
        profile_pic_url: profile_pic_url,
        verified: true
    });
}

function deleteAccount(uid) {
    return db.collection('users').doc(uid).delete();
}

function followHost(hostId, accountId) {
	return db.collection('users').doc(accountId).update({
		following: admin.firestore.FieldValue.arrayUnion(hostId)
	});
}

function unfollowHost(hostId, accountId) {
	return db.collection('users').doc(accountId).update({
		following: admin.firestore.FieldValue.arrayRemove(hostId)
	});
}

function planEvent(eventId, accountId) {
    return db.collection('users').doc(accountId).update({
        planned_events: admin.firestore.FieldValue.arrayUnion(eventId)
    });
}

function unplanEvent(eventId, accountId) {
    return db.collection('users').doc(accountId).update({
        planned_events: admin.firestore.FieldValue.arrayRemove(eventId)
    });
}

module.exports = {
    createAccount,
    createAccountMinimal,
    readAccountByUsername,
    readAccountByID,
    updateAccount,
    updateAccountVerifiedStatus,
    verifyAccount,
    followHost,
    unfollowHost,
    planEvent,
    unplanEvent,
    deleteAccount
};