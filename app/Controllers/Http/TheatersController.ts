import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Theater from 'App/Models/Theater'
import TheaterValidator from 'App/Validators/TheaterValidator';

export default class TheatersController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            // cargar la relacion
            let theTheater: Theater = await Theater.findOrFail(params.id);
            await theTheater.load('projector');
            await theTheater.load('seats');
            await theTheater.load('screenings', actualScreening => {
                actualScreening.preload('movie')
            })
            return theTheater;
        } else {
            const data = request.all()
            // si se envia page y per_page en el request se usa paginate
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                // se usa preload y no load porque se esta usando paginate
                // la diferencia es que preload no carga los datos de la relacion, es decir, no se hace un join
                return await Theater.query().preload("projector").paginate(page, perPage)
            } else {
                return await Theater.query().preload("projector")
            }

        }
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        console.log("body",request.body());
        //* se valida el request y no directamente el body
        const body= await request.validate(TheaterValidator);
        const theTheater: Theater = await Theater.create(body);
        return theTheater;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
        const body = await request.validate(TheaterValidator);
        theTheater.location = body.location;
        theTheater.capacity = body.capacity;
        return await theTheater.save();
    }
    public async delete({ params, response }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
        await theTheater.load('projector');
        if (theTheater.projector) {
            response.status(400);
            return { message: "No se puede eliminar el teatro porque tiene proyectores asociados" };
        } else {
            response.status(204);
            return await theTheater.delete();
        }
    }
}
