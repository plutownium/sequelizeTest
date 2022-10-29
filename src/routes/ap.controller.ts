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
        this.router.get("/by_ap_id", this.getApartmentByApartmentId.bind(this));
    }
    public healthCheck(req: Request, res: Response) {
        return res.json({ msg: "on - apartment" });
    }

    public async createApartmentForCity(req: Request, res: Response) {
        //
        const cityId = req.body.cityId;
        const long = req.body.long;
        const lat = req.body.lat;
        const addr = req.body.addr;
        const newAp = await this.apartmentDAO.createApartmentForCity(cityId, long, lat, addr);
        return res.json({ newAp: newAp });
    }

    public async getAllApartments(req: Request, res: Response) {
        const aps = await this.apartmentDAO.getAllApartments();
        return res.json({ aps: aps });
    }

    public async getApartmentsByCityId(req: Request, res: Response) {
        const cityId = req.body.cityId;
        const aps = await this.apartmentDAO.getApartmentsByCityId(cityId);
        return res.json({ token: f });
    }

    public async getApartmentByApartmentId(req: Request, res: Response) {
        //
        return res.json({ token: f });
    }
}
export default ApartmentController;
