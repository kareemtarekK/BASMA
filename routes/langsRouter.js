const express = require("express");
const langsController = require("./../controllers/langsController");
const langsRouter = express.Router();
langsRouter
  .route("/")
  .post(langsController.createLanguage)
  .get(langsController.getAllLangs);

langsRouter
  .route("/:language_id")
  .get(langsController.getOneLang)
  .patch(langsController.updateLanguage)
  .delete(langsController.deleteLanguage);
module.exports = langsRouter;
