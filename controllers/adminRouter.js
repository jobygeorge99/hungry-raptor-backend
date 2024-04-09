const express = require("express")
const dishModel = require("../models/dishModel")
const router = express.Router()

router.post("/addDish",async (req,res)=>{

    let data = req.body
    let dishObj = new dishModel(data)
    console.log(data)
    let result = await dishObj.save()
    res.json(
        {
            "status": "success"
        }
    )
})

router.post("/removeDish",async(req,res)=>{

    let data = req.body
    let result = await dishModel.deleteOne(data)
    res.json(
        {
            "status":"success"
        }
    )
})

router.post("/updateDishNum", async (req, res) => {
    try {
        let id = req.body._id;
        let data = await dishModel.findOne({"_id":id})
        if(data){
            data.count = req.body.count
            let result = data.save()
            if(result){
                res.json({
                    "status":"success"
                })
            }else{
                res.json({
                    "status":"failed"
                })
            }
        }
        
    } catch (error) {
        res.json({
            "status": "failed"
        });
    }
});


router.get("/viewMenu",async(req,res)=>{

    let data = await dishModel.find()
    res.json(data)
})

module.exports = router