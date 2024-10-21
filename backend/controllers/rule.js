import rule from "../schemas/rule";



export const createRule=async(req,res,next)=>{
    const newRule=new rule(req.body);    //only required for new document not for updating
    
    try{
        const savedRule=await newRule.save();
        res.status(200).json(savedRule);
    }catch(err){
        next(err);       //this will call the next middleware which in this case is the error handling middleware in index.js
    }
};

export const updateRule=async(req,res,next)=>{

    try{
        const updatedRule=await rule.findByIdAndUpdate(req.params.id,             //we got the id to update by url
            {$set:req.body},
            {new:true});         //This will return updated (not the previous data) in response as updatedRule
        res.status(200).json(updatedRule);   //NOte it will return null if there is no rule of that id
    }catch(err){
        next(err);
    }
};

export const deleteRule=async(req,res,next)=>{
    try{
        const deletedRule=await rule.findByIdAndDelete(req.params.id);
        res.status(200).json("HOtel has been deleted");
    }catch(err){
        next(err);
    }
};

export const getRule=async(req,res,next)=>{
    try{
        const gettedRule=await rule.findById(req.params.id);
        res.status(200).json(gettedRule);
    }catch(err){
        next(err);
    }
};

export const getAllRule=async(req,res,next)=>{    //next is callback function

    /*Just a concept of error handling
    const failed=true;
    if(failed) return next(createError(401,"You are not authenticated"));     //NOTE:We have created a file error.js in utils
    */

    const {min,max,limit, ...others}=req.query;   //separates min and max from the query and stores respectively
    try{
        //const allRules=await rule.find(req.query).limit(req.query.limit);    //to find rules of requested value(eg. featured=true)  and to limit no. of items
        const allRules=await rule.find({
            ...others,
            cheapestPrice:{$gt:min || 1, $lt:max || 5000}
        }).limit(limit);

        res.status(200).json(allRules);
    }catch(err){
        next(err);
    }
};


export const countByCity=async(req,res,next)=>{    //next is callback function
    const cities=req.query.cities.split(",");    //make an array of cities by separating them in place of comma [extracted from url]
    try{
        const list =await Promise.all(cities.map(city=>{
            return rule.countDocuments({city:city});   //Mongodb count
        }))
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
};

export const countByType=async(req,res,next)=>{    //next is callback function
    try{
        const ruleCount=await rule.countDocuments({type:"rule"});
        const apartmentCount=await rule.countDocuments({type:"apartment"});
        const resortCount=await rule.countDocuments({type:"resort"});
        const dhabaCount=await rule.countDocuments({type:"Dhaba"});
        const villaCount=await rule.countDocuments({type:"villa"});

        res.status(200).json([
            {type:"rule",count:ruleCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"Dhaba",count:dhabaCount},
            {type:"villa",count:villaCount}
        ])
    }catch(err){
        next(err);
    }
};

// export const getRuleRooms=async(req,res,next)=>{
//     try{
//         const gotRule=await rule.findById(req.params.id);
//         const list=await Promise.all(
//             gotRule.rooms.map(hroom=>{
//                 return room.findById(hroom);
//             })
//         );

//         res.status(200).json(list);
//     }catch(err){
//         next(err);
//     }
// }