import {Iaccount} from "../Interfaces/types";
import {Account} from "../dbConfig/account.model";
import {apiErrors} from "../middlewares/errors";

export class AccountServices {
    private readonly name;
    private readonly owner;

    constructor(reqbBody?: Iaccount) {
        this.name = reqbBody.name;
        this.owner = reqbBody.owner;

    };

    async creataccount() {

        const owner = await Account.findOne({where: {owner: this.owner}})
        if (owner) {
            throw  apiErrors.BadRequest(`${this.owner} already used`)
        }

        await Account.create({name: this.name, owner: this.owner});
    }

    static async readAccounts() {
        return await Account.findAll({
            attributes: ['id', 'name', "owner", "createdAt"]
        })


    };

    static async readAccountsByid(params: string | number) {

        return await Account.findOne({where: {id: params}});

    };
}