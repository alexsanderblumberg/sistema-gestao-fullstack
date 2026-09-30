import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './App.css'; 

function App() {
  const [compromissos, setCompromissos] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const carregarCompromissos = () => {
    axios.get('http://localhost:3001/api/compromissos')
      .then(response => setCompromissos(response.data))
      .catch(error => console.error("Erro ao buscar dados:", error));
  };

  useEffect(() => { carregarCompromissos(); }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:3001/api/compromissos', data);
      Swal.fire({ title: 'Sucesso!', text: 'Compromisso guardado.', icon: 'success', confirmButtonColor: '#007bff' });
      reset();
      carregarCompromissos();
    } catch (error) {
      Swal.fire({ title: 'Erro!', text: 'Falha ao guardar.', icon: 'error', confirmButtonColor: '#d33' });
    }
  };

  const concluirCompromisso = async (comp) => {
    try {
      await axios.put(`http://localhost:3001/api/compromissos/${comp.id}`, {
        ...comp,
        data_hora: new Date(comp.data_hora).toISOString().slice(0, 19).replace('T', ' '),
        status: 'Concluído'
      });
      carregarCompromissos();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  const apagarCompromisso = async (id) => {
    const confirmacao = await Swal.fire({
      title: 'Tem a certeza?',
      text: "Esta ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    });

    if (confirmacao.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/compromissos/${id}`);
        Swal.fire('Apagado!', 'O compromisso foi removido.', 'success');
        carregarCompromissos();
      } catch (error) {
        console.error("Erro ao apagar:", error);
      }
    }
  };

  // --- LÓGICA DO DASHBOARD ---
  const total = compromissos.length;
  const pendentes = compromissos.filter(c => c.status === 'Pendente').length;
  const concluidos = compromissos.filter(c => c.status === 'Concluído').length;

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Sistema de Gestão</h1>
      
      {/* --- DASHBOARD --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', gap: '15px' }}>
        <div style={{ background: '#242424', padding: '20px', borderRadius: '8px', flex: 1, textAlign: 'center', borderBottom: '4px solid #007bff' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#aaa' }}>Total</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>{total}</p>
        </div>
        <div style={{ background: '#242424', padding: '20px', borderRadius: '8px', flex: 1, textAlign: 'center', borderBottom: '4px solid #ffc107' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#aaa' }}>Pendentes</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>{pendentes}</p>
        </div>
        <div style={{ background: '#242424', padding: '20px', borderRadius: '8px', flex: 1, textAlign: 'center', borderBottom: '4px solid #28a745' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#aaa' }}>Concluídos</h3>
          <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>{concluidos}</p>
        </div>
      </div>

      <div style={{ background: '#242424', padding: '30px', borderRadius: '8px', marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 20px 0' }}>Novo Compromisso</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
          <input type="text" placeholder="Título" {...register("titulo", { required: true })} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#333', color: 'white' }} />
          {errors.titulo && <span style={{ color: '#ff6b6b', fontSize: '13px' }}>Obrigatório.</span>}

          <input type="datetime-local" {...register("data_hora", { required: true })} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#333', color: 'white' }} />
          {errors.data_hora && <span style={{ color: '#ff6b6b', fontSize: '13px' }}>Obrigatório.</span>}

          <textarea placeholder="Descrição..." rows="3" {...register("descricao")} style={{ padding: '12px', borderRadius: '6px', border: '1px solid #444', background: '#333', color: 'white', resize: 'vertical' }} />

          <button type="submit" style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
            Guardar Compromisso
          </button>
        </form>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Meus Compromissos</h2>
      {compromissos.length === 0 ? <p style={{ textAlign: 'center' }}>A carregar...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {compromissos.map(comp => (
            <li key={comp.id} style={{ border: '1px solid #444', margin: '15px 0', padding: '20px', borderRadius: '8px', background: '#1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', textDecoration: comp.status === 'Concluído' ? 'line-through' : 'none' }}>
                  {comp.titulo}
                </h3>
                <p style={{ margin: '0', color: '#ccc' }}><strong>Data:</strong> {new Date(comp.data_hora).toLocaleString('pt-PT')}</p>
                <p style={{ margin: '0', color: '#ccc' }}><strong>Descrição:</strong> {comp.descricao}</p>
                <span style={{ 
                  background: comp.status === 'Concluído' ? '#28a745' : '#007bff', 
                  color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', marginTop: '8px', fontWeight: 'bold'
                }}>
                  {comp.status}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                {comp.status !== 'Concluído' && (
                  <button onClick={() => concluirCompromisso(comp)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Marcar como Concluído">
                    <FaCheck />
                  </button>
                )}
                <button onClick={() => apagarCompromisso(comp.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Apagar">
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;