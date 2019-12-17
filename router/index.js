const { Router } = require('express');
const router = Router();

router.use(require('./users'));
router.use(require('./friends'));
router.use(require('./comment'));

module.exports = router;