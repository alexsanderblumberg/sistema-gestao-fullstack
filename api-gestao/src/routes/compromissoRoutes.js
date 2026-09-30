const express = require('express');
const router = express.Router();
const compromissoController = require('../controllers/compromissoController');

router.get('/', compromissoController.listarTodos);
router.post('/', compromissoController.criar);

// Novas rotas que recebem o ID
router.put('/:id', compromissoController.atualizar);
router.delete('/:id', compromissoController.excluir);

module.exports = router;