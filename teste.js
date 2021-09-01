const credenciais = {
    email: '',
    senha: ''
}

const credenciais2 = Object.assign(credenciais, { email: 'luiz@email.com', senha: '123321' })

console.log(credenciais, credenciais2)