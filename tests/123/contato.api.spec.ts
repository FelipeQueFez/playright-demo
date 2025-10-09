import { test, expect } from '@playwright/test';

test.describe('API de Contato da Soluevo (Contact Form 7) - História 123', () => {

  // Endpoint e dados extraídos da captura cURL
  const FORM_ENDPOINT = 'https://soluevo.com/wp-json/contact-form-7/v1/contact-forms/212/feedback';

  test('Deve enviar o formulário de contato com sucesso via API', async ({ request }) => {
    
    // Envia a requisição POST com o formato multipart/form-data
    const response = await request.post(FORM_ENDPOINT, {
      multipart: {
        '_wpcf7': '212',
        '_wpcf7_version': '6.1.2',
        '_wpcf7_locale': 'pt_BR',
        '_wpcf7_unit_tag': 'wpcf7-f212-o1',
        '_wpcf7_container_post': '0',
        '_wpcf7_posted_data_hash': '',
        'your-name': 'Cliente API Teste CF7',
        'your-email': 'cliente.api.cf7@example.com',
        'your-company': 'Empresa API Teste CF7',
        'your-job': 'Analista de API CF7',
        'your-tel': '(11) 97777-6666',
        'pagina': 'Contatos'
      },
      headers: {
        // O 'Origin' e 'Referer' são importantes para a validação do lado do servidor
        'Origin': 'https://soluevo.com',
        'Referer': 'https://soluevo.com/contatos/'
      }
    });

    // 1. Verifica se a resposta da API foi bem-sucedida (status 200 OK)
    expect(response.ok()).toBeTruthy();

    // 2. Converte a resposta para JSON
    const responseBody = await response.json();

    // 3. Verifica a resposta específica do Contact Form 7
    expect(responseBody.status).toBe('mail_sent');
    expect(responseBody.message).toContain('Obrigado por seu contato.');
  });

});
