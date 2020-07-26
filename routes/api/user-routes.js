const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser, 
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// GET all users, POST create a new user 
// /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(addUser);

// Set up GET one, PUT, and DELETE user by its id at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// POST add a new friend or DELETE friend from user's friend list at /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;