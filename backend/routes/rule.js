import express from 'express';
import { createRule,deleteRule, getAllRule, getRule, updateRule } from '../controllers/rule.js';

const router=express.Router();

//CREATE
router.post("/",createRule);

//UPDATE
router.put("/:id",updateRule);

//DELETE
router.delete("/:id",deleteRule);

//GET
router.get("/find/:id",getRule);       //find is added to differentiate from get of countByCity

//GET ALL
router.get("/",getAllRule);

export default router;