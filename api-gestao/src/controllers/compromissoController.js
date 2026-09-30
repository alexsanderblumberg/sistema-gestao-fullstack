const db = require('../config/db');

const compromissoController = {
    // [READ] Listar todos
    listarTodos: async (req, res) => {
        try {
            const [rows] = await db.query('SELECT * FROM compromissos ORDER BY data_hora ASC');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao buscar compromissos na base de dados.' });
        }
    },

    // [CREATE] Adicionar novo
    criar: async (req, res) => {
        const { titulo, data_hora, descricao } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO compromissos (titulo, data_hora, descricao) VALUES (?, ?, ?)',
                [titulo, data_hora, descricao]
            );
            res.status(201).json({ mensagem: 'Compromisso criado com sucesso!', id: result.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao criar compromisso.' });
        }
    },

    // [UPDATE] Atualizar um compromisso existente
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { titulo, data_hora, descricao, status } = req.body;
        try {
            const [result] = await db.query(
                'UPDATE compromissos SET titulo = ?, data_hora = ?, descricao = ?, status = ? WHERE id = ?',
                [titulo, data_hora, descricao, status, id]
            );
            if (result.affectedRows === 0) return res.status(404).json({ erro: 'Compromisso não encontrado.' });
            res.json({ mensagem: 'Compromisso atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao atualizar compromisso.' });
        }
    },

    // [DELETE] Excluir um compromisso
    excluir: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await db.query('DELETE FROM compromissos WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ erro: 'Compromisso não encontrado.' });
            res.json({ mensagem: 'Compromisso excluído com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao excluir compromisso.' });
        }
    }
};

module.exports = compromissoController;