const tbEquipmentHistory = require('../constant/tbEquipmentHistory')
const localTime = require('../constant/localTime')
const tbEquipment = require('../constant/tbEquipment')
const { Op } = require('sequelize')

class EquipmentHistory {
    idEquipmentHistory
    idEquipment
    reason
    entryDate
    returnDate

    constructor(data) {
        this._idEquipmentHistory = data.idEquipmentHistory
        this._idEquipment = data.idEquipment
        this._reason = data.reason
        this._entryDate = data.entryDate
        this._returnDate = data.returnDate
    }

    get _idEquipmentHistory() {
        return this.idEquipmentHistory
    }

    set _idEquipmentHistory(value) {
        if(value == undefined) {
            return this.idEquipmentHistory = 0 
        }
        return this.idEquipmentHistory = value
    }

    get _idEquipment() {
        return this.idEquipment
    }

    set _idEquipment(value) {
        if(value == undefined) {
            throw new Error('Invalid idEquipment')
        }
        return this.idEquipment = value
    }

    get _reason() {
        return this.reason
    }

    set _reason(value) {
        if(value == undefined) {
           return this.reason = null
        }
        return this.reason = value
    }

    get _entryDate() {
        return this.entryDate
    }

    set _entryDate(value) {
        if(value == undefined) {
            return this.entryDate = localTime.dateLocalTime()
        }
    }

    get _returnDate() {
        return this.entryDate
    }

    set _returnDate(value) {
        if(value == undefined) {
            return this.returnDate = null
        }
        return this.returnDate = localTime.dateLocalTime()
    }

    async insertEquipmentHistory(data, res) {
       await tbEquipmentHistory.create(data)
       res.json({message: 'Add successfully'})
    }

    static async selectAllEquipmentHistory(res) {
        const result = (await tbEquipmentHistory.findAll({attributes:['idEquipmentHistory', 'reason', 'entryDate', 'returnDate'], 
            include: {model: tbEquipment, attributes: ['idEquipment','codProd', 'equipment', 'type']}})).map(
            values => values.dataValues
        )
        res.json(result)
    }

    static async selectEquipmentHistory(data, res) {
        let codProd = data.codProd ? data.codProd : '%'
        let entryDateInit = localTime.initConv(data.entryDateInit)
        let entryDateFinish = localTime.finishConv(data.entryDateFinish)
       
        const result = (await tbEquipmentHistory.findAll({where:{entryDate: {[Op.gte]: entryDateInit, [Op.lte]: entryDateFinish}},
            attributes: ['idEquipmentHistory', 'reason', 'entryDate', 'returnDate'],
            include: {model: tbEquipment, attributes: ['idEquipment', 'codProd'], where: {codProd: {[Op.like]: codProd}}}
        })).map(values => values.dataValues)
        res.json(result)
    }
}

module.exports = EquipmentHistory