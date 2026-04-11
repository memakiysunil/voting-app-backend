const express = require('express');
const router = express.Router();
const candidateConroller = require('../controllers/candidate.controller');
const {jwtauthmiddleware} = require('../middlewares/auth.middleware');
const checkAdminRole = require('../middlewares/admin.middleware');
const {strictLimiter} = require('../middlewares/rateLimiter.middleware');

router.post('/', jwtauthmiddleware,checkAdminRole,candidateConroller.addCandidate);
router.put('/:candidateID',jwtauthmiddleware,checkAdminRole,candidateConroller.updateCandidate);
router.delete('/:candidateID',jwtauthmiddleware,checkAdminRole,candidateConroller.deleteCandidate);
router.post('/vote/:candidateID',jwtauthmiddleware,candidateConroller.voteCandidate);
router.get('/vote/count',jwtauthmiddleware,checkAdminRole,candidateConroller.voteCount);
router.get('/',jwtauthmiddleware,strictLimiter,candidateConroller.getCandidate);

module.exports = router;