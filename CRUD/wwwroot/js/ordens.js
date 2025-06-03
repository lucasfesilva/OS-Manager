//Carrega as ordens de serviços da API e exibe na tabela
async function carregarOrdensServico(filtroStatus = '') {
    const tbody = document.getElementById('ordens-servico');

    try {
        //Obtém token do usuário autenticado
        const token = sessionStorage.getItem('token');

        //Faz a requisição GET para obter os dados da API
        const response = await fetch('https://localhost:7085/api/Order/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        //Verifica se houve erro na requisição
        if(!response.ok) {
            throw new Error('Erro ao buscar ordens de serviço');
        }

        //Converte resposta para JSON
        const ordens = await response.json();

        tbody.innerHTML = '';

        //Obtém o filtro selecionado
        const filtro = filtroStatus !== '' ? parseInt(filtroStatus) : null;
        
        //Faz a filtragem dos dados com base no filtro selecionado
        const ordensFiltradas = filtro === null ? ordens : ordens.filter(o => o.status === filtro);

        ordensFiltradas.forEach(ordem => {
            const tr = document.createElement('tr');

            let statusTexto = '';

            //Adiciona o badge conforme o status da ordem de serviço
            switch(ordem.status) {
                case 0:
                    statusTexto = 'Em Aberto';
                    badgeClass = 'bg-secondary';
                    break;
                case 1:
                    statusTexto = 'Em Andamento';
                    badgeClass = 'bg-warning text-dark';
                    break;
                case 2:
                    statusTexto = 'Concluído';
                    badgeClass = 'bg-success';
                    break;
                default:
                    statusTexto = 'Desconhecido';
                    badgeClass = 'bg-dark';
            }

            //Cria a tabela com as ordens de serviço de acordo com o filtro selecionado
            tr.innerHTML = `
                <td>${ordem.id}</td>
                <td>${ordem.client}</td>
                <td>${ordem.description}</td>
                <td>${ordem.responsible}</td>
                <td>${ordem.created_At ? new Date(ordem.created_At).toLocaleDateString() : '-'}</td>
                <td><span class="badge ${badgeClass}">${statusTexto}</span></td
                <td>${ordem.done_At ? new Date(ordem.done_At).toLocaleDateString() : '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="editarOrdem(${ordem.id})">Editar</button>
                </td>
            `;            

            //Popula a tabela com as ordens de serviço
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro: ', error);
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-danger">Erro ao carregar ordens de serviço.</td></tr>`;
    }
}


// ENVIO DA ORDEM DE SERVIÇO PARA A API

document.getElementById('formNovaOrdem').addEventListener('submit', function(e) {
    //Previne que o botão de Salvar envie os dados ao pressionar Enter no teclado
    e.preventDefault();

    //Cria e popula as variáveis com os dados presentes no formulário para envio para a API
    const cliente = document.getElementById('clienteNova').value;
    const descricao = document.getElementById('descricaoNova').value;
    const responsavel = document.getElementById('responsavelNova').value;
    const status = 0;
    const dataCricao = new Date().toISOString();

    //Cria a ordem de serviço
    const novaOrdem = {
        client: cliente,
        description: descricao,
        responsible: responsavel,
        status: status,
        created_At: dataCricao
    }

    //Obtém o token da sessão da API
    const token = sessionStorage.getItem('token');

    //Faz a requisição do tipo "POST" para a API
    fetch('https://localhost:7085/api/Order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(novaOrdem)
    })
    .then(response => {
    //Verifica a resposta da Requisição
        if (!response.ok){
            console.log('Erro ao criar ordem de serviço');
        }
        return response.json();
    })
    .then(data => {
        alert('Ordem criada com sucesso!');
    //Fecha o modal caso tenha conseguido criar a ordem de serviço
        const modalElement = document.getElementById('novaOrdemModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        carregarOrdensServico('');
    })
    .catch(error => {
        console.error('Erro: ', error);
        alert('Erro ao criar a ordem de serviço');
    })
});

//FUNÇÃO PARA OBTER A ORDEM DE SERVIÇO PARA EDIÇÃO

async function editarOrdem(id) {

    //Obtém o token da sessão
    const token = sessionStorage.getItem('token');
     try {

    //Criado a requisição do tipo "GET" para API
        const response = await fetch(`https://localhost:7085/api/Order/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        //Valida a resposta da requisição
        if(!response.ok) throw new Error('Erro ao buscar ordem.');

        //Converte a resposta para JSON
        const ordem = await response.json();


        //Popula o formulário com os dados recebidos da API
        document.getElementById('editarId').value = ordem.id;
        document.getElementById('editarCliente').value = ordem.client;
        document.getElementById('editarDescricao').value = ordem.description;
        document.getElementById('editarResponsavel').value = ordem.responsible;
        document.getElementById('editarStatus').value = ordem.status;
        document.getElementById('editarStatusAtual').value = ordem.status;
        document.getElementById('editarDataConclusao').value = ordem.done_At ? ordem.done_At.substring(0,10) : '';

        //Abre o modal exibindo os dados recebidos da API
        const modal = new bootstrap.Modal(document.getElementById('modalEditarOrdem'));
        modal.show();

     } catch(error) {
        alert('Erro ao carregar dados: ' + error);
     }
}

//FUNÇÃO PARA EDITAR A ORDEM DE SERVIÇO

document.getElementById('formEditarOrdem').addEventListener('submit', async function(e) {
    //Previne que o botão de Salvar envie os dados ao pressionar Enter no teclado
    e.preventDefault();    

    //Obtém o valor do novo status
    const statusNovo = parseInt(document.getElementById('editarStatus').value);
    //Obtém o valor do status atual
    const statusAtual = parseInt(document.getElementById('editarStatusAtual').value);

    //Valida o status atual com o status a ser enviado para a API
    if (statusNovo === 2 && statusAtual !== 1) {
        alert('Só é possível concluir uma ordem que está "Em Andamento".');
        return;
    }

    //Garante que ao clicar em Salvar, seja enviado para a API a data atual de Conclusão
    let dataConclusao = document.getElementById('editarDataConclusao').value;
    if (statusNovo === 2 && !dataConclusao) {
        const hoje = new Date().toISOString().substring(0, 10);
        dataConclusao = hoje;
        document.getElementById('editarDataConclusao').value = hoje;
    }

    //Obtém o ID da ordem de serviço à ser editada
    const id = document.getElementById('editarId').value;

    //Obtém o token da sessão
    const token = sessionStorage.getItem('token');

    //Cria o corpo da requisição(Ordem de Serviço)
    const body = {
        client: document.getElementById('editarCliente').value,
        description: document.getElementById('editarDescricao').value,
        responsible: document.getElementById('editarResponsavel').value,
        status: statusNovo,
        done_At: dataConclusao || null
    };

    try {
        //Cria requisição do tipo "PUT"
        const response = await fetch(`https://localhost:7085/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(body)
        });

        //Validaa resposta da requisição
        if(!response.ok) throw new Error('Erro ao atualizar ordem');

        //Fecha o modal após os dados serem alterados
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarOrdem'));
        modal.hide();

        //Recarrega a tabela com os registros atualizados
        carregarOrdensServico('');
    } catch(error) {
        alert('Erro ao atualizar ordem: ' + error);
    }

});

//FILTROS DO GRID
document.getElementById('btnFiltrar').addEventListener('click', () => {
    const filtro = document.getElementById('filtroStatus').value;
    carregarOrdensServico(filtro);
});

//LOGOUT
document.getElementById('btnLogout').addEventListener('click', () => {
    sessionStorage.removeItem('token');
    window.location.href = 'login.html';
});

    
// RESETA OS CAMPOS DO MODAL AO FECHAR
const novaOrdemModal = document.getElementById('novaOrdemModal');
novaOrdemModal.addEventListener('show.bs.modal', function() {
    const form = document.getElementById('formNovaOrdem');
    form.reset();
});

const modalEditarOrdem = document.getElementById('modalEditarOrdem');
modalEditarOrdem.addEventListener('hidden.bs.modal', function() {
    const form = document.getElementById('formEditarOrdem');
    form.reset();
});
