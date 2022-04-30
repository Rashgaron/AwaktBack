const Users = require("../models/User");
/* istanbul ignore next */ 
const getByEmail = (email) => {
    return Users.findOne({ email });
}

/* istanbul ignore next */ 
const getById = (_id) => {
    return Users.findById(_id);
}

/* istanbul ignore next */ 
const create = (user) => {
    return Users.create(user);
}

/* istanbul ignore next */ 
const getAll = () => {
    return Users.find();
}

/* istanbul ignore next */ 
const deleteUser = (_id) => {
    VehicleInstances.deleteMany({ user_id: _id });
    return Users.findByIdAndDelete(_id);
}

/* istanbul ignore next */ 
const updateUser = (id, user) => {
    if(user?.nickname)
        user.name = user.nickname;
    return Users.findByIdAndUpdate(id, user);
}

const setProfilePicture = async (id, imageURL) => {  
    return Users.findByIdAndUpdate(id, {profilePicture: imageURL});
}

module.exports = {
    getByEmail,
    getById,
    create,
    getAll,
    deleteUser,
    updateUser,
    setProfilePicture,
};
