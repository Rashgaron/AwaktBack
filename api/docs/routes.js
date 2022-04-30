const { getAllUsers, getUserById } = require('./usersController');
const { registerUser, loginUser } = require('./authController'); 
module.exports = {
    paths: {
        '/api/auth/register': {
            ...registerUser,
        },
        '/api/auth/login': {
            ...loginUser,
        },
        '/api/users': {
            ...getAllUsers,
        },
        '/api/users/{id}': {
            ...getUserById,
        },
    }
}
