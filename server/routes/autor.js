const router = require("express").Router();
const autorController = require("../controllers/autor.controller");

router.post('/create', autorController.create);
router.patch('/edit', autorController.edit);
router.post('/get', autorController.get);
router.get('/getAll', autorController.getAll);
router.post('/remove', autorController.remove);

module.exports = router;