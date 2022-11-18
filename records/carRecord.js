const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");

const carRecord = class CarRecord {
    constructor(obj) {
        const {id, plateNumber, brand, model, engine, productionYear} = obj;

        this.id = id ?? uuid();
        this.plateNumber = plateNumber;
        this.brand = brand;
        this.model = model;
        this.engine = engine;
        this.productionYear = productionYear;
    }

    async insert() {
        await pool.execute("INSERT INTO `cars`(`id`, `plateNumber`, `brand`, `model`, `engine`, `productionYear`) VALUES (:id, :plateNumber, :brand, :model, :engine, :productionYear)", {
            id: this.id,
            plateNumber: this.plateNumber,
            brand: this.brand,
            model: this.model,
            engine: this.engine,
            productionYear: this.productionYear
        });
    }

    static async listAll() {
        const [results] = await pool.execute("SELECT * FROM `cars`");

        return results.map(obj => new CarRecord(obj))
    }

    static async isPlateNumberTaken(plateNumber) {      //TODO zastanowić sie czy taka walidacja jest wgl potrzebna skoro mam ustawiony klucz unikalny na tablicę rejestracyjną w bazie danych..
        const [results] = await pool.execute("SELECT * FROM `cars` WHERE `plateNumber` = :plateNumber", {
            plateNumber,

        })

        return results.length > 0;
    }

};

module.exports = {
    carRecord,
}