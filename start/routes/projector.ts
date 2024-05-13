import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/projectors", "ProjectorsController.find");
    // en el controlador se va a buscar el id (params.id) debe ser el nombre igual
    Route.get("/projectors/:id", "ProjectorsController.find");
    Route.post("/projectors", "ProjectorsController.create");
    Route.put("/projectors/:id", "ProjectorsController.update");
    Route.delete("/projectors/:id", "ProjectorsController.delete");
})