const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// GET all thoughts
// /api/thoughts
router.route('/').get(getAllThoughts),

// POST to create a new thought
// /api/thoughts/<userId>
router.route('/:userId').post(addThought);


// GET one, PUT, and DELETE thought by its id at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 

// POST to create a reaction stored in a single thought's reactions array field
// /api/thoughts/<thoughtId>/reactions
router.route('/:thoughtId/reactions').post(addReaction)

//delete reaction by the reaction's reactionId
// /api/thoughts/<thoughtId>/reactions/<reactionID.
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;