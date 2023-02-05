import {Controller} from "../controllers/controller";
import express, {Router} from "express";
import {validBody} from "../middlewares/validation";
const router:Router=express.Router()


const controller = new Controller
router.get('/',controller.sendhtmlPage)
 router.get('/accounts',controller.accounts)
 router.get('/accounts/:id',controller.accountbyId);
 router.post('/createAccount',validBody(),controller.createAccount);


export default router;
