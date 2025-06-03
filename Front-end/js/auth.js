document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("https://localhost:7085/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });

        if(response.ok) {
            const data = await response.json();
            const token = data.accessToken;

            sessionStorage.setItem('token', token);
            alert("Sucesso");
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