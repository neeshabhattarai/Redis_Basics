const express=require('express');
const {createBid,getBids,getUserBids,getBidOfUser}=require('../controller/bid');
const router=express.Router();
const {testLock}=require('../controller/test-lock');

router.post('/',createBid);
router.get('/',getBids);
router.get('/getUserBids/:userId',getUserBids);
router.get('/getBidOfUser/:userId',getBidOfUser);
router.get('/testLock',testLock);
module.exports = router;