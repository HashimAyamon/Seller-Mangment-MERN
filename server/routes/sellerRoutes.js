const express = require('express');
const { getSellers, addSeller, updateSeller, deleteSeller } = require('../controllers/sellerController');

const router = express.Router();

router.get('/seller', getSellers);
router.post('/add-seller', addSeller);
router.put('/update-seller/:id', updateSeller);
router.delete('/delete-seller/:id', deleteSeller);

module.exports = router;
