const express= require("express");
const router= express.Router();
const Note= require("./model");

router.route("/create").post(async (req,res)=>{
    const to_do= req.body.to_do;
    const new_todo= new Note({
        to_do
    })
    try{
       await Note.insertMany(new_todo)
        res.json({status:"success",result:to_do})
    }
    catch(e){
        res.json({status:"failed",result:e.message})
    }
})

router.route("/todos").get( async (req,res)=>{
    await Note.find().then((data)=>res.json(data))
    .catch((e)=>res.json(e.message))
})
router.route("/change/:id").put(async (req,res)=>{
    try{
    await Note.updateOne({_id:req.params.id},{$set:{to_do:req.body.to_do}})
    res.json({status:"success"})
    }
    catch(e){
        res.json({status:"failed"})
    }
})

router.route("/change/:id").delete(async (req,res)=>{
    try{
        await Note.deleteOne({_id:req.params.id})
        res.json({status:"success"})
    }
    catch(e){
        res.json({status:"failed"})
    }
})
module.exports= router;