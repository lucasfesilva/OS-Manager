//Função responsável por validar e logar em um determinado login já existente
document.getElementById('login-form').addEventListener('submit', async function(event) {

    //Previne o botão de Login de ser acessado pela tecla Enter do teclado
    event.preventDefault();

    //Obtém o E-mail e Senha digitado no formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        //Cria a requisição do tipo "POST" 
        const response = await fetch("https://localhost:7085/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        //Valida a resposta da API
        if(response.ok) {

            //Obtém o corpo da resposta
            const data = await response.json();

            //Obtém o token da resposta
            const token = data.accessToken;

            //Armazena o token
            sessionStorage.setItem('token', token);
            alert("Sucesso");

            //Redireciona para a pagina inicial
            window.location.href = 'home.html';
        }
        else {
            const errorData = await response.json();
            alert('Erro: ' + (errorData.message || 'Login Falhou'));
        }
    } catch (error) {
        console.error('Erro na requisição: ', error);
    }
});