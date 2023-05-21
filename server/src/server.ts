import 'dotenv/config'

import fastify from 'fastify' // import fastify library
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'path'

const app = fastify() // declare  app  as a fastify object to use its functions

// QUANDO EU ACESSO UMA URL DENTRO DE UM BROWSER ELE SEMPRE IRÁ USAR O HTTP Method: get
// HTTP Method: get - para listar algo, post - para criar algo, put - para atualizar algo, patch - para atualizar informação específica dentro de um recurso, delete - para deletar algo
// exemplo: é uma rota que vai criar um usuário - usa post, vai listar os usuários, usa get

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // com origin: true todas URLs de front-end poderão acessar nosso back-end, dps que tiver a URL de produção(site real com domínio), trocaria o true
})

app.register(jwt, {
  secret: 'spacetime',// secret é o que garante que o meu jwt não seja igualç a outro jwt possivelmente existente, para ambiente de PROD, colcar algo que não será facilmente igual a outro
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    // método para que o servidor http fique apto a receber requisições dentro de um endereço específico]
    port: 3333, // significa  acessando o localhost:3333 eu bato nesse servidor criado pelo node
    host: '0.0.0.0',
  })
  .then(() => {
    // o metodo listen tem a opção de uma Promisse(algo que pode demorar para executar, toda Proimise, pode contatenar o método .then) "Assim que o servidor estiver no ar(antes do then) então..(dps do then)"
    console.log('🚀 HTTP running on http://localhost:3333')
  })
