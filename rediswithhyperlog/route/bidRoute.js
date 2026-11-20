const express=require('express');
const {createBid,getBids,getUserBids,getBidOfUser}=require('../controller/bid');
const router=express.Router();

router.post('/',createBid);
router.get('/',getBids);
router.get('/getUserBids/:userId',getUserBids);
router.get('/getBidOfUser/:userId',getBidOfUser);
module.exports = router;