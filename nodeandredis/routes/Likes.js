const express=require('express');
const {addLikeByUser,removeLikeByUser}=require('../services/Items');

const likesRouter=express.Router();

likesRouter.post('/addLike',async(req,res)=>{
    const {userId,itemId}=req.body;
    await addLikeByUser(userId,itemId);
    res.status(200).json({message:'Like added successfully'});
});

likesRouter.post('/removeLike',async(req,res)=>{
    const {userId,itemId}=req.body;
    await removeLikeByUser(userId,itemId);
    res.status(200).json({message:'Like removed successfully'});
});
module.exports= likesRouter;