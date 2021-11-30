import { ReturnModelType } from "@typegoose/typegoose";
import { Request,response,Response } from "express";
import { nanoid } from "nanoid";
import { config } from "../config/Constants";
import { URLModel } from "../database/model/URL";

export class UrlController {
    public async shorten(req: Request, res: Response): Promise<void> {
        //Verificação de existencia da URL
        const { originURL} = req.body
        const url = await URLModel.findOne({originURL})
        if (url) {
            res.json(url)
            return
        }
        //Criar a hash para a URL
        const hash = nanoid()
        const shortURL = `${config.API_URL}/${hash}`
        //Salvar a URL no banco
        const newUrl = await URLModel.create({hash, shortURL, originURL})
        //Retorno da URL salva
        res.json(newUrl)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        //Pegar o hash da URL
        const { hash } = req.params
        //Encontrar a URL original pelo hash
        const url = {
            originURL: "https://cloud.mongodb.com/v2/6158f8c760ca870cc72c447a#clusters",
            hash: "NKKJKdfSc6pckSuFZerya",
            shortURL: "http://localhost:3000/NKKJKdfSc6pckSuFZerya"
        }
        //Redirecionar para a URL original a partir do que encontramos no DB
        res.redirect(url.originURL)
    }
}