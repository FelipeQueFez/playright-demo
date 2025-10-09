# language: pt

Funcionalidade: Formulário de Contato da Soluevo
  Como um potencial cliente
  Eu quero preencher o formulário de contato
  Para solicitar informações comerciais

Contexto:
  Dado que eu estou na página de contato da Soluevo em "https://soluevo.com/contatos/"

Cenário: Preenchimento do formulário com sucesso
  Quando eu preencho o campo "Nome" com "Cliente Teste"
  E eu preencho o campo "Email" com "cliente.teste@example.com"
  E eu preencho o campo "Nome da empresa" com "Empresa Teste"
  E eu preencho o campo "Cargo" com "Analista de QA"
  E eu preencho o campo "Telefone" com "(11) 99999-8888"
  And eu clico no botão "Enviar"
  Então eu devo ver a mensagem de confirmação "Sua mensagem foi enviada com sucesso!"
  E os campos do formulário devem ser limpos

Esquema do Cenário: Validação de campos obrigatórios
  Dado que eu estou na página de contato da Soluevo
  Quando eu deixo o campo "<Campo>" em branco
  And eu clico no botão "Enviar"
  Então eu devo ver a mensagem de erro "O campo <Campo> é obrigatório"
  E os dados preenchidos nos outros campos devem ser mantidos

  Exemplos:
    | Campo           |
    | Nome            |
    | Email           |
    | Nome da empresa |
    | Telefone        |

Cenário: Validação de formato de e-mail inválido
  Quando eu preencho o campo "Email" com "email-invalido"
  And eu clico no botão "Enviar"
  Então eu devo ver a mensagem de erro "Por favor, insira um email válido"

Cenário: Validação de formato de telefone inválido
  Quando eu preencho o campo "Telefone" com "12345"
  And eu clico no botão "Enviar"
  Então eu devo ver a mensagem de erro "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX"

Cenário: Validação de nome com menos de 2 caracteres
  Quando eu preencho o campo "Nome" com "A"
  And eu clico no botão "Enviar"
  Então eu devo ver a mensagem de erro "O nome deve ter no mínimo 2 caracteres"

Cenário: Validação de nome da empresa com menos de 2 caracteres
  Quando eu preencho o campo "Nome da empresa" com "B"
  And eu clico no botão "Enviar"
  Então eu devo ver a mensagem de erro "O nome da empresa deve ter no mínimo 2 caracteres"
