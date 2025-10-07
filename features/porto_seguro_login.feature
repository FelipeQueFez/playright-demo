Feature: Acesso a Área do Cliente Porto Seguro

  Scenario: Tentativa de login com CPF inválido
    Given que eu acesse a página de seguro auto da Porto Seguro
    When eu clico em "Área do Cliente"
    And a página de login carregar
    And eu insiro um CPF gerado aleatoriamente
    Then eu clico em "Continuar"

  Scenario: Tentativa de login com CPF válido
    Given que eu acesse a página de seguro auto da Porto Seguro
    When eu clico em "Área do Cliente"
    And a página de login carregar
    And eu insiro um CPF válido
    Then eu clico em "Continuar"
