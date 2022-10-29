import Apartment from "../model/Apartment";
import City, { CityCreationAttributes } from "../model/City";
//

class ApartmentDAO {
    constructor() {}

    public createApartment = async (cityId: number, longitude: number, latitude: number, address: string) => {
        const apartment = await Apartment.create({ cityId, longitude, latitude, address });
        return apartment;
    };

    public getAllApartments = async () => {
        const apartments: Apartment[] = await Apartment.findAll({ include: 'belongs_to_city' });
        return apartments;
    };

    public getApartmentsByCityId = async (cityId: string) => {
        const apartments: Apartment[] = await Apartment.findAll({
            where: {
                cityId: cityId,
            },
        });
        return apartments;
    };

    public bulkCreateApartmentsForCity = async(cityId: number, apartments: CityCreationAttributes[]) => {
        const createdApartments: Apartment[] = await Apartment.bulkCreate(apartments.map(ap => ({ ...ap, cityId })));
        return createdApartments;
    };
}

export default ApartmentDAO;
