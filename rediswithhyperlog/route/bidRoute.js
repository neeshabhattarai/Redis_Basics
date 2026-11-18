const express=require('express');
const {createBid,getBids,getUserBids}=require('../controller/bid');
const router=express.Router();

router.post('/',createBid);
router.get('/',getBids);
router.get('/getUserBids/:userId',getUserBids);
module.exports = router;