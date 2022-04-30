const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { UsersController } = require('../controllers');

// api/users
router.get('/', UsersController.getAll);

// api/users/:id
router.get('/:id', UsersController.getById);

// api/users
router.get('/populate/tables', UsersController.populate);

// api/users
router.put('/', auth, UsersController.updateUser);

// api/users/:id
router.delete('/:id', auth, UsersController.deleteUser)

module.exports = router;
