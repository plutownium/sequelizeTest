import Apartment from "../model/Apartment";
import City from "../model/City";
//

class ApartmentDAO {
    constructor() {}

    public createApartment = async (userId: number, tokenString: string) => {
        const apartment = await Apartment.create({});
        return apartment;
    };

    public getAllApartments = async () => {
        const apartments: Apartment[] = await Apartment.findAll({ include: City });
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

    public bulkCreateApartmentsForCity = async(cityId: string, apartments: any[]) {
        const createdApartments = // not sure what to write here
    }
}

export default ApartmentDAO;
