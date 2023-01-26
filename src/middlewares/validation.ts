import {body} from "express-validator"
export function validBody(){
    return [
        body("name")
            .isLength({min:2}).withMessage('name must be at least 2 chars long')
           .isLength({max: 30}).withMessage('name must be at max 30 chars long'),
        body("owner")
            .isLength({min:2}).withMessage('owner must be at least 2 chars long')
            .isLength({max: 30}).withMessage('owner must be at max 30 chars long'),

    ]
}