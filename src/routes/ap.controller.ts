import express, { Request, Response } from "express";
import ApartmentDAO from "../db/dao/apartment.dao";

class ApartmentController {
    public path = "/apartment";
    public router = express.Router();
    private apartmentDAO: ApartmentDAO;

    constructor() {
        this.apartmentDAO = new ApartmentDAO();

        this.router.get("/health", this.healthCheck.bind(this));
        this.router.get("/", this.getAllApartments.bind(this));
        this.router.post("/create", this.createApartmentForCity.bind(this));
        this.router.get("/all", this.getAllApartments.bind(this));
        this.router.get("/by_city_id", this.getApartmentsByCityId.bind(this));
        // this.router.get("/by_ap_id", this.getApartmentsByApartmentId.bind(this));
    }
    public healthCheck(req: Request, res: Response) {
        return res.json({ msg: "on - apartment" });
    }

    public async createApartmentForCity(req: Request, res: Response) {
        //
        const cityId = req.body.cityId;
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const address = req.body.address;
        const newAp = await this.apartmentDAO.createApartment(cityId, longitude, latitude, address);
        return res.json({ newAp: newAp });
    }

    public async getAllApartments(req: Request, res: Response) {
        const aps = await this.apartmentDAO.getAllApartments();
        return res.json({ aps: aps });
    }

    public async getApartmentsByCityId(req: Request, res: Response) {
        const cityId = req.body.cityId;
        const aps = await this.apartmentDAO.getApartmentsByCityId(cityId);
        return res.json({ aps: aps });
    }

    // public async getApartmentByApartmentId(req: Request, res: Response) {
    //     //
    //     return res.json({ token: f });
    // }

    public async bulkCreateApartments(req: Request, res: Response) {
        const cityId = req.body.cityId;
        const aps = req.body.aps;
        const created = await this.apartmentDAO.bulkCreateApartmentsForCity(cityId, aps);
        return res.json({ cityId: cityId, newAps: created });
    }
}
export default ApartmentController;
