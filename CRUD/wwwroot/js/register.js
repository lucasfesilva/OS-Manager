//Função responsável por criar um novo login
document.getElementById('register-form').addEventListener('submit', async function(event) {
    //Previne o botão de Cadastrar de ser acessado pela tecla Enter do teclado
    event.preventDefault();

    //Obtém o E-mail, Senha e a confirmação da Senha digitados no furmulário
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Função de validação de senha forte
    function validarSenha(senha) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
        return regex.test(senha);
    }

    //Valida as senhas
    if(password !== confirmPassword){
        alert('As senhas não coincidem!');
        return;
    }

    //Valida se a senha atende aos requisitos de segurança
    if (!validarSenha(password)) {
        alert('A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial');
        return;
    }

        try {
            //Cria o corpo da requisição para cadastrar um novo Login
            const body = {
                email: email,
                password: password
            };


            //Cria a requisição do tipo "POST"
            const response = await fetch("https://localhost:7085/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            //Valida a resposta da API
            if(response.ok) {
                alert('Cadastro realizado com sucesso!');
                //Redireciona para a pagina de Login
                window.location.href = '../login.html';
            } else {
                alert('Erro ao cadastrar usuario');
            }            
        } catch (erro) {
            console.error('Erro na requisição: ', error);
        }
    
});