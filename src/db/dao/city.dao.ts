import Apartment from "../model/Apartment";
import City from "../model/City";
//

class CityDAO {
    constructor() {}

    public createCity = async (longitude: number, latitude: number, address: string) => {
        console.log(longitude, latitude, address);
        const newCity = await City.create({ longitude, latitude, address }); // auto populate city id
        return newCity;
    };

    public getAllCities = async () => {
        const tokens: City[] = await City.findAll({ include: "its_apartments" });
        return tokens;
    };

    public getCityByApartmentId = async (apartmentId: string) => {
        const apartment: Apartment | null = await Apartment.findOne({
            where: {
                apartmentId: apartmentId,
            },
        });
        const city: City[] = await City.findAll({
            where: {
                cityId: apartment?.cityId,
            },
        });
        return city;
    };
}

export default CityDAO;
