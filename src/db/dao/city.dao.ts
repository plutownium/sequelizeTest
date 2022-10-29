import Apartment from "../model/Apartment";
import City from "../model/City";
//

class CityDAO {
    constructor() {}

    public createCity = async (longitude: number, latitude: number, address: string) => {
        const newCity = await City.create({ longitude, latitude, address }); // auto populate city id
        return newCity;
    };

    public getAllCities = async () => {
        const tokens: City[] = await City.findAll({ include: Apartment });
        return tokens;
    };

    public getCityByApartmentId = async (apartmentId: string) => {
        const city: City[] = await City.findAll({
            where: {
                apartmentId: apartmentId,
            },
        });
        return city;
    };
}

export default CityDAO;
