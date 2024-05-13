import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/screenings", "ScreeningsController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/screenings/:id", "ScreeningsController.find");
    Route.post("/screenings", "ScreeningsController.create");
    Route.put("/screenings/:id", "ScreeningsController.update");
    Route.delete("/screenings/:id", "ScreeningsController.delete");
})