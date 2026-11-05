const express=require('express');
const {createItem,getItem,deleteItem}=require('../services/Items');

const itemRouter=express.Router();

itemRouter.post('/createItem',async(req,res)=>{
    const {name}=req.body;
    const item={name,likes:0};
    const id=await createItem(item);
    res.status(200).json({id});
});

itemRouter.get('/getItem/:id',async(req,res)=>{
    const {id}=req.params;
    const item=await getItem(id);
    res.status(200).json(item);
});

itemRouter.delete('/deleteItem/:id',async(req,res)=>{
    const {id}=req.params;
    await deleteItem(id);
    res.status(200).json({message:'Item deleted successfully'});
});
module.exports= itemRouter;