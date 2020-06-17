const {db} = require('./firebase');

function createVerificationRequest(user_id, contact_email, org_name, profile_pic_url) {
    return db.collection('verificationRequests').add({
        user_id: user_id,
        contact_email: contact_email,
        org_name: org_name,
        profile_pic_url: profile_pic_url
    });
}

function readVerificationRequestsForUser(uid) {
    return db.collection('verificationRequests').where('user_id', '==', uid).limit(1).get();
}

function updateVerificationRequest(id, payload) {
    return db.collection('verificationRequests').doc(id).update(payload);
}

function deleteVerificationRequest(id) {
    return db.collection('verificationRequests').doc(id).delete();
}

module.exports = {createVerificationRequest, readVerificationRequestsForUser, updateVerificationRequest, deleteVerificationRequest};