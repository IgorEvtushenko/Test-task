const db = require('../db')

class CompanyController {
    async createCompany(req, res) {
        try{
            const {
                name,
                addres,
                service_of_activity,
                number_of_employees,
                description,
                type,
                user_id
            } = req.body
            const candidate = await db.query('SELECT * FROM companies where name = $1 AND user_id = $2', [name, user_id])
            if(candidate.rows[0]){
                return res.status(400).json({message: `Компания ${name} уже существует`})
            }
            await db.query(
                `INSERT INTO companies (
                    name,
                    addres,
                    service_of_activity,
                    number_of_employees,
                    description,
                    type,
                    user_id
                ) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [
                    name,
                    addres,
                    service_of_activity,
                    number_of_employees,
                    description,
                    type,
                    user_id
                ]
            )
            res.json({message: `Company ${name} created`})
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async getAllCompanies(req, res) {
        try{
            const user_id = req.query.user_id
            const allCompanies = await db.query('SELECT * FROM companies where user_id = $1 order by name', [user_id])
            res.json(allCompanies.rows)
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async getOneCompany(req, res) {
        try{
            const user_id = req.query.user_id
            const company_id = req.query.id
            const company = await db.query('SELECT * FROM companies where user_id = $1 AND id = $2', [user_id, company_id])
            res.json(company.rows[0])
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async updateCompany(req, res) {
        try{
            const {
                name,
                addres,
                service_of_activity,
                number_of_employees,
                description,
                type,
                user_id,
                id
            } = req.body
            const updatedCompany = await db.query(
                `UPDATE companies set 
                    name = $1,
                    addres = $2,
                    service_of_activity = $3,
                    number_of_employees = $4,
                    description = $5,
                    type = $6 where user_id = $7 AND id = $8 RETURNING *`,
                [
                    name,
                    addres,
                    service_of_activity,
                    number_of_employees,
                    description,
                    type,
                    user_id,
                    id
                ]
            )
            res.json({message: 'Update saved'})
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
    async deleteCompany(req, res) {
        try{
            const user_id = req.params.user_id
            const company_id = req.params.id
            await db.query('DELETE FROM companies where user_id = $1 AND id = $2', [user_id, company_id])
            res.json({message: "Company deleted"})
        } catch(err){
            console.log(err)
            res.json({message: "Server err"})
        }
    }
}

module.exports = new CompanyController()