import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/movies", "MoviesController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    // Resumen: metodo, ruta, controlador.metodo
    Route.get("/movies/:id", "MoviesController.find");
    Route.post("/movies", "MoviesController.create");
    Route.put("/movies/:id", "MoviesController.update");
    Route.delete("/movies/:id", "MoviesController.delete");
})