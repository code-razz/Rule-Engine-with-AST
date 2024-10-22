import rule from "../schemas/rule.js";

export const createRule=async(req,res)=>{
    const newRule=new rule(req.body);    //only required for new document not for updating
    // console.log(req.body)
    // console.log(newRule)
    
    try{
        const savedRule=await newRule.save();
        res.status(200).json(savedRule);
    }catch(err){
        console.log(err)       //this will call the next middleware which in this case is the error handling middleware in index.js
    }
};

export const updateRule=async(req,res)=>{

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
        res.status(200).json("Rule has been deleted");
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

// export const getAllRule=async(req,res,next)=>{    //next is callback function

//     /*Just a concept of error handling
//     const failed=true;
//     if(failed) return next(createError(401,"You are not authenticated"));     //NOTE:We have created a file error.js in utils
//     */

//     const {min,max,limit, ...others}=req.query;   //separates min and max from the query and stores respectively
//     try{
//         //const allRules=await rule.find(req.query).limit(req.query.limit);    //to find rules of requested value(eg. featured=true)  and to limit no. of items
//         const allRules=await rule.find({
//             ...others,
//             cheapestPrice:{$gt:min || 1, $lt:max || 5000}
//         }).limit(limit);

//         res.status(200).json(allRules);
//     }catch(err){
//         next(err);
//     }
// };


export const getAllRule = async (req, res, next) => {
    try {
        // Fetch all rules from the database without any filtering
        const allRules = await rule.find();

        // Send the fetched rules as a JSON response
        res.status(200).json(allRules);
    } catch (err) {
        // Pass any errors to the next middleware (error handler)
        next(err);
    }
};
