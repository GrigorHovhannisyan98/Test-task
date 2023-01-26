import {Request, Response, NextFunction} from "express";
import {AccountServices} from "../services/account.services";
import {validationResult} from "express-validator";
import {apiErrors} from "../middlewares/errors"
import path from "path";

export class Controller {
    senthtmlPage(req: Request, res: Response, next: NextFunction){
        res.send(path.resolve("/client/index.html"))
    }
    async accounts(req: Request, res: Response, next: NextFunction) {
        try {
            const accounts = await AccountServices.readAccounts();

            res.status(200).json(accounts);
        } catch (e) {
            next(e);
        }
    };

    async accountbyId(req: Request, res: Response, next: NextFunction) {

        try {
            const account = await AccountServices.readAccountsByid(req.params.id);
            res.status(200).json(account)
        } catch (e) {
            next(e)
        }
    };

    async createAccount(req: Request, res: Response, next: NextFunction) {

        try {
            const errors: any = validationResult(req);
            if (!errors.isEmpty()) {
                return next(apiErrors.BadRequest("validation error", errors.array()))
            }
            const accountServices = new AccountServices(req.body);
           await accountServices.creataccount();

            res.status(200).json({message:"account created"})
        } catch (e) {
        next(e)
        }
    }


}