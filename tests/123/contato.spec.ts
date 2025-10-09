import { test, expect } from '@playwright/test';

test.describe('Formulário de Contato da Soluevo - História 123', () => {
  
  // Contexto: Acessar a página de contato antes de cada teste no grupo
  test.beforeEach(async ({ page }) => {
    await page.goto('https://soluevo.com/contatos/');
  });

  test('Preenchimento do formulário com sucesso', async ({ page }) => {
    // O codegen revelou que um pop-up de cookies pode aparecer.
    // Vamos tentar aceitá-lo se ele existir.
    const acceptCookiesButton = page.getByRole('button', { name: 'Aceitar' });
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }

    // Quando eu preencho os campos do formulário usando os seletores do codegen
    await page.getByRole('textbox', { name: 'Nome', exact: true }).fill('Cliente Teste');
    await page.getByRole('textbox', { name: 'E-mail' }).fill('cliente.teste@example.com');
    await page.getByRole('textbox', { name: 'Nome da Empresa' }).fill('Empresa Teste');
    await page.getByRole('textbox', { name: 'Cargo' }).fill('Analista de QA');
    await page.getByRole('textbox', { name: 'Telefone' }).fill('(11) 99999-8888');

    // E eu clico no botão "Enviar"
    await page.getByRole('button', { name: 'Enviar' }).click();

    // Então eu devo ver a mensagem de confirmação
    // O seletor foi ajustado para ser mais específico e evitar a violação do modo estrito
    const successMessage = page.getByRole('status');
    await expect(successMessage).toContainText('Obrigado por seu contato.', { timeout: 10000 });
    await expect(successMessage).toBeVisible();

    // E os campos do formulário devem ser limpos
    await expect(page.getByRole('textbox', { name: 'Nome', exact: true })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'E-mail' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Nome da Empresa' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Cargo' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Telefone' })).toHaveValue('');
  });

});
