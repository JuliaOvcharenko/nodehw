import { JsonWebTokenError, TokenExpiredError, verify } from "jsonwebtoken";
import { ENV } from "../config/env";
import { UserService } from "./user.service";
import { UserControllerContract } from "./user.types";


export const UserController: UserControllerContract = {
    async login(req, res){
        try{
            const data = req.body

            if (!data.email){
                res.status(400).json(
                    {message: "Email is required."}
                )
                return
            }
            if (!data.password){
                res.status(400).json({message: "Password is required."})
                return
            }

            const loginToken = await UserService.login(data)
            res.status(201).json({token: loginToken})
        }
        catch(error){
            console.log(error)
            if (error instanceof Error) {
                switch (error.message) {
                    case "NOT_FOUND":
                        res.status(404).json({message:"User with this email does not exist!"})
                        return;
                    case "WRONG_CREDENTIALS":
                        res.status(401).json({message:"User with this email does not exist!"})
                        return
                    default:
                        res.status(500).json({message:'Server error. Try again later'})
                }
            }
        }
    },

    async register(req, res){
        try{
            const data = req.body

            if (!data.email){
                res.status(400).json(
                    {message: "Email is required."}
                )
                return
            }

            const registerToken = await UserService.register(data)
            res.status(201).json({token: registerToken})
        }

        catch(error){
            if (error instanceof Error) {
                switch (error.message) {
                    case "USER_EXISTS":
                        res.status(409).json({message:"User with such email already exists."})
                        return
                    case "WRONG_CREDENTIALS":
                        res.status(401).json({message:"Wrong data that passed."})
                        return
                    default:
                        res.status(500).json({message:'Server error. Try again later'})
            } 
        }
    }},

    async me(req, res){
        try{
            const authorization = req.headers.authorization

            if(!authorization){
                res.status(401).json({message: "Authorization is required"})
                return
            }

            const [type, token] = authorization.split(" ")

            if(!type  ||  type != 'Bearer' || !token){
                res.status(401).json({message:"Authorization is in wrong format"})
                return
            }

            const payload = verify(token, ENV.SECRET_KEY) 

            if(typeof(payload) == 'string'){
                res.status(401).json({message: "Error with token, try again"})
                return
            }
            
            res.status(200).json(await UserService.me(payload.id))
        }

        catch(error){

            if (error instanceof TokenExpiredError) {
                res.status(401).json({ message: "Token is expired! You must renew token!" });
                return;
            }

            if (error instanceof JsonWebTokenError) {
                res.status(401).json({ message: "Invalid token!" });
                return;
            }

            if (error instanceof Error) {

                switch (error.message) {
                    case "NOT_FOUND":
                        res.status(404).json({message:"User not found!"})
                        return
                    default:
                        res.status(500).json({message:'Server error. Try again later'})
                }
            }
        }
    }
}