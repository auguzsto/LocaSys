const EquipmentHistory = require('../model/EquipmentHistory')

const addEquipmentHistory = async (req, res) => {
    try {
        const equipmentHistory = new EquipmentHistory(req.body)
        await equipmentHistory.insertEquipmentHistory(equipmentHistory, res)
    } catch (error) {
        res.json({message: error.message})
    }
}

const findAllEquipmentHistory = async (req, res) => {
    try {
        await EquipmentHistory.selectAllEquipmentHistory(res)
    } catch (error) {
        res.json({message: error.message})
    }
}

const findEquipamentHistory = async (req, res) => {
    try {
        await EquipmentHistory.selectEquipmentHistory(req.body, res)
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports = {addEquipmentHistory, findAllEquipmentHistory, findEquipamentHistory}