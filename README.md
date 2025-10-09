### Start
`npm init playwright@latest`

### Configuration
e2e:true
GitHub pipeline: true

### Commands
`npx playwright test`
Runs the end-to-end tests.

`npx playwright test --ui`
Starts the interactive UI mode.

`npx playwright test --project=chromium`
Runs the tests only on Desktop Chrome.

`npx playwright test tests/porto_seguro.spec.ts`
[Runs the tests in a specific file.]

`npx playwright test --debug`
Runs the tests in debug mode.

`npx playwright codegen https://soluevo.com/contatos/`
Auto generate tests with Codegen.

### Run specific test
`npx playwright test --ui tests/porto_seguro.spec.ts`

### More
And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\playwright.config.ts - Playwright Test configuration