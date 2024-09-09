const { Op, or } = require('sequelize')
const tbUser = require('../constant/tbUser')
const tbSector = require('../constant/tbSector')

class User {
    idUser
    firstName
    lastName
    cpf
    username
    password
    email
    idSector
    idProfile

    constructor(data) {
        this._idUser = data.idUser
        this._firstName = data.firstName
        this._lastName = data.lastName
        this._cpf = data.cpf
        this._username = data.username
        this._password = data.password
        this._email = data.email
        this._idSector = data.idSector
        this._idProfile = data.idProfile 
    }

    get _idUser() {
        return this.idUser
    }

    set _idUser(value) {
        if(value == undefined) {
            return this.idUser = 0
        }
        return this.idUser = value
    }

    get _firstName() {
        return this.firstName
    }

    set _firstName(value) {
        if(value == undefined) {
            throw new Error('Invalid firstName')
        }
        return this.firstName = value
    }

    get _lastName() {
        return this.lastName
    }

    set _lastName(value) {
        if(value == undefined) {
            throw new Error('Invalid lastname')
        }
        return this.lastName = value
    }

    get _cpf() {
        return this.cpf
    }

    set _cpf(value) {
        if(value == undefined) {
            throw new Error('Invalid cpf')
        }
        return this.cpf = value
    }

    get _username() {
        return this.username
    }

    set _username(value) {
        if(value == undefined) {
            throw new Error('Invalid user')
        }
        return this.username = value
    }

    get _password() {
        return this.password
    }

    set _password(value) {
        
        if (value.length < 8) {
            throw new Error('our password must be at least 8 characters')
        }
        if (value.search(/[a-z]/i) < 0) {
            throw new Error("Your password must contain at least one letter."); 
        }
        if (value.search(/[0-9]/) < 0) {
            throw new Error("Your password must contain at least one digit.");
        }
        if(value.search(/^(?=.*[~`´!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0) {
            throw new Error('Your password must contain at least one Special symbol')
        }
        return this.password = value
    }

    get _email() {
        return this.email
    }

    set _email(value) {
        if(!value.match(/^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
            throw new Error('Email is not valid')
        }
        return this.email = value
    }

    get _idSector() {
        return this.idSector
    }

    set _idSector(value) {
        if(value == undefined) {
            throw new Error('Invalid idSector')
        }
        return this.idSector = value
    }

    get _idProfile() {
        return this.idProfile
    }

    set _idProfile(value) {
        if(value == undefined) {
            throw new Error('Invalid idProfile')
        }
        return this.idProfile = value
    }

   async insertUser(data, username, email, res) {
       const existUser = await tbUser.findOne({where: {[Op.or]: [{username}, {email}]}})  
            if(existUser) {
                throw new Error('User already exist')
            }
            await tbUser.create(data)
            res.json({message: 'Add successfully'})   
    }

    static async findAllUser(res) {
        const result = (await tbUser.findAll({attributes:['idUser', 'username', 'firstName', 'lastName', 'email'],
            include: {model: tbSector, attributes: ['sector']}})).map(
            allUser => allUser.dataValues
        )
        res.json(result)
    }

    static async findUser(username, password, res) {
        const existUser = await tbUser.findOne({where: {username: username, password: password}})
        if(!existUser) {
            throw new Error('Username or password invalid')
        }
        res.json({message: 'Logged in user'})  
    }

    async updateUser(data, req, res) {
        const userId = await tbUser.findByPk(req)

        userId.firstName = data.firstName
        userId.lastName = data.lastName
        userId.cpf = data.cpf
        userId.username = data.username
        userId.password = data.password
        userId.email = data.email
        userId.idSector = data.idSector
        userId.idProfile = data.idProfile

        await userId.save()
        res.json({message:'Update with successfully'})
    }

    static async removerUser(req, res) {
        await tbUser.findByPk(req).then(
            deleteUser => deleteUser.destroy()
        )
        res.json('Deleted user')
    }


}

module.exports = User