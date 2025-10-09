import { test } from '@playwright/test';
import { ContatoPage } from '../page-objects/ContatoPage';

test.describe('Formulário de Contato da Soluevo - História 123 (POM)', () => {
  
  let contatoPage: ContatoPage;

  // Antes de cada teste, inicializa a Page Object
  test.beforeEach(async ({ page }) => {
    contatoPage = new ContatoPage(page);
    await contatoPage.goto();
  });

  test('Preenchimento do formulário com sucesso', async () => {
    // Dados de teste
    const testData = {
      name: 'Cliente Teste POM',
      email: 'cliente.pom@example.com',
      company: 'Empresa POM',
      job: 'Arquiteto de Testes',
      phone: '(11) 95555-4444'
    };

    // Ações na página, agora encapsuladas pela Page Object
    await contatoPage.handleCookies();
    await contatoPage.fillForm(testData);
    await contatoPage.submitForm();

    // Verificações, também encapsuladas
    await contatoPage.assertSuccessMessageIsVisible();
    await contatoPage.assertFormIsCleared();
  });

});
