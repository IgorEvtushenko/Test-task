const db = require('../db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    async createUser(req, res) {
        try{
            const {
                email,
                password,
                phone_number,
                last_name,
                first_name,
                nick_name,
                description,
                position
            } = req.body
            const candidate = await db.query('SELECT * FROM users where email = $1', [email])
            if(candidate.rows[0]){
                return res.status(400).json({message: `User ${email} is already registered`})
            }
            await db.query(
                `INSERT INTO users (
                    email,
                    password,
                    phone_number,
                    last_name,
                    first_name,
                    nick_name,
                    description,
                    position
                ) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                [
                    email,
                    password,
                    phone_number,
                    last_name,
                    first_name,
                    nick_name,
                    description,
                    position
                ]
            )
            res.status(200).json({message: `User ${email} created`})
        } catch(err){
            console.log(err)
            return res.status(503).json({message: "Server err"})
        }
    }
    async loginUser(req, res) {
        try{
            const { email, password } = req.body
            const candidate = await db.query(
                'SELECT * FROM users where email = $1', [email]
            )
            if(!candidate.rows[0]){
                return res.status(404).json({message: `Пользователь  ${email} не найден`})
            }
            const user = candidate.rows[0]
            if(password !== user.password){
                return res.status(400).json({message: `Неправильный пароль`})
            }
            const token = jwt.sign(
                {id: user.id}, process.env.token_key, {expiresIn: "1h"}
            )
            res.json({
                token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    phone_number: user.phone_number,
                    last_name: user.last_name,
                    first_name: user.first_name,
                    nick_name: user.nick_name,
                    description: user.description,
                    position: user.position,
                    password: user.password
                }
            })
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async authUser(req, res) {
        try{
            const user = await db.query(
                'SELECT * FROM users where id = $1', [req.user.id]
            )
            const token = jwt.sign(
                {id: user.rows[0].id}, process.env.token_key, {expiresIn: '1h'}
            )
            return res.json({
                token: token,
                user: {
                    id: user.rows[0].id,
                    email: user.rows[0].email,
                    phone_number: user.rows[0].phone_number,
                    last_name: user.rows[0].last_name,
                    first_name: user.rows[0].first_name,
                    nick_name: user.rows[0].nick_name,
                    description: user.rows[0].description,
                    position: user.rows[0].position,
                    password: user.rows[0].password
                }
            })
        } catch(err){
            res.json({message: "Server err"})
        }
    }
    async getAllUsers(req, res) {
        try{
            const allUsers = await db.query('SELECT * FROM users')
            res.json(allUsers.rows)
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async getOneUser(req, res) {
        try{
            const id = req.params.id
            const user = await db.query('SELECT * FROM users where id = $1', [id])
            res.json(user.rows[0])
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async updateUser(req, res) {
        try{
            const {
                email,
                password,
                phone_number,
                last_name,
                first_name,
                nick_name,
                description,
                position,
                id
            } = req.body
            await db.query(
                `UPDATE users set 
                    email = $1,
                    password = $2,
                    phone_number = $3,
                    last_name = $4,
                    first_name = $5,
                    nick_name = $6,
                    description = $7,
                    position = $8
                    where id = $9 RETURNING *`,
                [
                    email,
                    password,
                    phone_number,
                    last_name,
                    first_name,
                    nick_name,
                    description,
                    position,
                    id
                ]
            )
            res.json({message: "User data changed!"})
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async deleteUser(req, res) {
        try{
            const id = req.params.id
            await db.query('DELETE FROM companies where user_id = $1', [id])
            await db.query('DELETE FROM users where id = $1', [id])
            res.json({message: "User deleted"})
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
}

module.exports = new UserController()