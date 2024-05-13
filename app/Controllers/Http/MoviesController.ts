import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Movie from 'App/Models/Movie';

export default class MoviesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMovie: Movie = await Movie.findOrFail(params.id);

            await theMovie.load("screenings", actualScreening => {
                actualScreening.preload('theater', actualTheater => {
                    actualTheater.preload('projector').preload('seats')
                })
            })
            return theMovie;
        } else {
            // data es un objeto que contiene los parametros de la peticion
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                // la pagina por defecto es 1 y el per_page por defecto es 20
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                // .query() es para hacer una consulta a la base de datos
                // .paginate() es para paginar la consulta
                return await Movie.query().paginate(page, perPage)
            } else {
                return await Movie.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMovie: Movie = await Movie.create(body);
        return theMovie;
    }

    /**
     * Update a movie.
     *
     * @param params - The route parameters.
     * @param request - The HTTP request object.
     * @returns The updated movie.
     */
    public async update({ params, request }: HttpContextContract) {
        const theMovie: Movie = await Movie.findOrFail(params.id);
        const body = request.body();
        theMovie.name = body.name;
        theMovie.year = body.year;
        theMovie.duration = body.duration;
        return await theMovie.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMovie: Movie = await Movie.findOrFail(params.id);
        response.status(204);
        return await theMovie.delete();
    }
}
