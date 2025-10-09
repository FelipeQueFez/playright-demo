import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Classe Page Object para a página de Contato da Soluevo.
 * Encapsula os seletores e as ações que podem ser realizadas na página.
 */
export class ContatoPage {
  // Propriedades da classe que representam elementos da página
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly jobInput: Locator;
  readonly phoneInput: Locator;
  readonly sendButton: Locator;
  readonly successMessage: Locator;
  readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Inicializa os seletores (locators) no construtor
    this.acceptCookiesButton = page.getByRole('button', { name: 'Aceitar' });
    this.nameInput = page.getByRole('textbox', { name: 'Nome', exact: true });
    this.emailInput = page.getByRole('textbox', { name: 'E-mail' });
    this.companyInput = page.getByRole('textbox', { name: 'Nome da Empresa' });
    this.jobInput = page.getByRole('textbox', { name: 'Cargo' });
    this.phoneInput = page.getByRole('textbox', { name: 'Telefone' });
    this.sendButton = page.getByRole('button', { name: 'Enviar' });
    this.successMessage = page.getByRole('status');
  }

  /**
   * Navega para a página de contatos.
   */
  async goto() {
    await this.page.goto('https://soluevo.com/contatos/');
  }

  /**
   * Verifica se o banner de cookies está visível e o aceita.
   */
  async handleCookies() {
    // Usamos um timeout baixo para não atrasar o teste se o banner não existir
    if (await this.acceptCookiesButton.isVisible({ timeout: 3000 })) {
      await this.acceptCookiesButton.click();
    }
  }

  /**
   * Preenche o formulário de contato com os dados fornecidos.
   */
  async fillForm(data: { name: string; email: string; company: string; job: string; phone: string; }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.companyInput.fill(data.company);
    await this.jobInput.fill(data.job);
    await this.phoneInput.fill(data.phone);
  }

  /**
   * Clica no botão para enviar o formulário.
   */
  async submitForm() {
    await this.sendButton.click();
  }

  /**
   * Verifica se a mensagem de sucesso está visível e contém o texto esperado.
   */
  async assertSuccessMessageIsVisible() {
    await expect(this.successMessage).toContainText('Obrigado por seu contato.', { timeout: 10000 });
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Verifica se todos os campos do formulário foram limpos.
   */
  async assertFormIsCleared() {
    await expect(this.nameInput).toHaveValue('');
    await expect(this.emailInput).toHaveValue('');
    await expect(this.companyInput).toHaveValue('');
    await expect(this.jobInput).toHaveValue('');
    await expect(this.phoneInput).toHaveValue('');
  }
}
