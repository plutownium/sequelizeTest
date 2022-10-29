import express, { Request, Response } from "express";
import CityDAO from "../db/dao/city.dao";

class CityController {
    public path = "/city";
    public router = express.Router();
    private cityDAO: CityDAO;

    constructor() {
        this.cityDAO = new CityDAO();

        this.router.get("/health", this.healthCheck.bind(this));
        this.router.post("/create", this.createCity.bind(this));
        this.router.get("/all", this.getAllCities.bind(this));
        this.router.get("/by_ap_id", this.getCityByApartmentId.bind(this));
        // this.router.get("/by_city_id", this.getCityByCityId.bind(this));
    }
    public healthCheck(req: Request, res: Response) {
        return res.json({ msg: "on - city" });
    }

    public async createCity(req: Request, res: Response) {
        const { latitude, longitude, address } = req.body;
        console.log(latitude, longitude, address, "24rm");
        const createdCity = await this.cityDAO.createCity(latitude, longitude, address);
        return res.json({ city: createdCity });
    }

    public async getAllCities(req: Request, res: Response) {
        const cities = await this.cityDAO.getAllCities();
        return res.json({ cities: cities });
    }

    public async getCityByApartmentId(req: Request, res: Response) {
        const apartmentId = req.body.apartmentId;
        const city = await this.cityDAO.getCityByApartmentId(apartmentId);
        return res.json({ city: city });
    }

    // public async getCityByCityId(req: Request, res: Response) {
    //     const cityId = req.body.cityId;
    //     const city = await this.cityDAO.getCitybyCityId(cityId);
    //     return res.json({ city: city });
    // }
}
export default CityController;
// export default router;
