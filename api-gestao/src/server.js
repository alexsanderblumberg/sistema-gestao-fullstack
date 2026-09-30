const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Importar as rotas de compromissos
const compromissoRoutes = require('./routes/compromissoRoutes');
app.use('/api/compromissos', compromissoRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});