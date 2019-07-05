Encurtador de URLs
===========================

Criar um serviço capaz de encurtar e atender requisições em urls encurtadas (redirecionamento)

## Encurtamento
Seu serviço irá receber inicialmente como parâmetro uma URL que deverá ser encurtada seguindo as seguintes regras:

1. Mínimo de 5 e máximo de 36 caracteres.

2. Apenas letras e números.

A url retornada deverá ser salva no banco de dados e possui prazo de validade. Você poderá escolher quanto tempo (em dias, horas,etc...) uma URL dura após a sua criação. Esse tempo de expiração pode ser uma constante no APP/banco, ou então até configurável via API, fica a seu critério como faze-lo.

#### Exemplo ao encurtar
- Seu sitema recebe uma chamada para encurtar a url `http://www.zambas.com.br` e retorna o seguinte json

```
{
  newUrl: "http://localhost:8081/abc123ab",
  expiresAt: "3423423424"
}
```

Não pode haver colisão de urls encurtadas. Isso quer dizer que a probabilidade de colisão tem que ser zero ou insignificante

## Redirecionamento

Seu app deve ser capaz de redirecionar chamadas GET para urls encurtadas. Seguindo o exemplo da url encurtada anteriormente:

GET  `http://localhost:8081/abc123ab` => GET `http://www.zambas.com.br`

#### Exemplo ao redirecionar
- Ao receber uma chamada GET para `http://localhost:8081/abc123ab` você irá retorna um redirecionamento GET para a url salva no banco (`http://www.zambas.com.br`), caso não seja encontrada, retornar HTTP 404. Caso tenha expirado HTTP 410.

**OBS:**
No exemplo acima http://localhost:8081/abc123ab só poderia haver um redirecionamento para zambas.com.br, enquanto estiver válida (não expirada). Após o período de expiração outro host pode ser apontado por essa url encurtada.

#### O que será avaliado
- Cobertura de testes: é esperado que você saiba criar testes automatizados para o seu código. Ex: unitários e integração
- Performance: conforme você vai encurtando urls pode ficar mais dificil verificar colisões. Procure soluções que tenham tempo de resposta mais constante.
- Qualidade de código: Clean Code, SOLID e Design Patterns

### Premissas/dica
- Stack: preferencialmente Java + Springboot. Mas se realmente não estiver confortável com essa stack use outra. Justifique sua decisão.
- Banco de dados: pode ser em memória ou usar uma imagem docker com uma instância do banco de sua preferência, como preferir.
- Documentação: queremos apenas saber como rodar seu projeto (ex: wiki/readme no github). Não precisa documentar código.
- Repositório: crie um repo no github e coloque o fonte lá. Não precisa forkar esse repo, pode ser um repo novo.

### O que seria legal
- Rodar o projeto com o mínimo de configuração/setup. Gostamos de projetos que rodam de forma simples e rápida.
- Hospedar o serviço na nuvem. Ex: heroku, aws, azure, o que preferir
- Configurar monitoramento e log. Ex: logdna, newRelic. Se fizer isso, coloque na documentação.
- Se sua solução estivesse apta para rodar em vários nós/instâncias. Stateless please.