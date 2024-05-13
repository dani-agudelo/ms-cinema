import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/seats", "SeatsController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/seats/:id", "SeatsController.find");
    Route.post("/seats", "SeatsController.create");
    Route.put("/seats/:id", "SeatsController.update");
    Route.delete("/seats/:id", "SeatsController.delete");
})