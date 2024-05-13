import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/theaters", "TheatersController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/theaters/:id", "TheatersController.find");
    Route.post("/theaters", "TheatersController.create");
    Route.put("/theaters/:id", "TheatersController.update");
    Route.delete("/theaters/:id", "TheatersController.delete");
})//.middleware(["security"]) //security es el nombre del middleware que se puso en kernel.ts