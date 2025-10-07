import { test, expect } from '@playwright/test';

function generateCPF() {
  const rnd = (n: number) => Math.round(Math.random() * n);
  const mod = (a: number, b: number) => Math.round(a - Math.floor(a / b) * b);

  const n1 = rnd(9);
  const n2 = rnd(9);
  const n3 = rnd(9);
  const n4 = rnd(9);
  const n5 = rnd(9);
  const n6 = rnd(9);
  const n7 = rnd(9);
  const n8 = rnd(9);
  const n9 = rnd(9);

  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - mod(d1, 11);
  if (d1 >= 10) d1 = 0;

  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - mod(d2, 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

test.describe('Acesso a Área do Cliente Porto Seguro', () => {
  test('tentativa de login com CPF inválido', async ({ page }) => {
    await page.goto('https://www.portoseguro.com.br/seguro-auto');
    await page.getByRole('button', { name: 'Área do Cliente' }).click();
    
    await page.waitForURL('**/login**');

    const cpf = generateCPF();
    await page.getByRole('textbox', { name: 'Insira seu CPF ou CNPJ' }).fill(cpf);
    await page.getByRole('button', { name: 'Continuar' }).click();
    
    // Exemplo de asserção: verificar se uma mensagem de erro está visível
    // await expect(page.locator('text=CPF inválido')).toBeVisible();
  });

  test('tentativa de login com CPF válido', async ({ page }) => {
    await page.goto('https://www.portoseguro.com.br/seguro-auto');
    await page.getByRole('button', { name: 'Área do Cliente' }).click();

    await page.waitForURL('**/login**');

    // TODO: Substitua pelo CPF correto
    const cpfValido = 'CPF_VALIDO_AQUI'; 
    await page.getByRole('textbox', { name: 'Insira seu CPF ou CNPJ' }).fill(cpfValido);
    await page.getByRole('button', { name: 'Continuar' }).click();

    // Exemplo de asserção: verificar se o próximo passo (ex: campo de senha) está visível
    // await expect(page.locator('#password')).toBeVisible();
  });
});