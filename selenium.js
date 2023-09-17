const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert'); // assert modülünü içe aktarın

async function runTest() {
  const driver = new Builder().forBrowser('chrome').build();

  // Sayfayı aç
  await driver.get('http://localhost:4000');

  // Formu doldur
  await driver.findElement(By.id('name')).sendKeys('rahime');
  await driver.findElement(By.id('surname')).sendKeys('türkmen');
  await driver.findElement(By.id('email')).sendKeys('rturkmen@ankasoft.co');
  await driver.findElement(By.id('password')).sendKeys('password123');

  // Formu gönder
  await driver.findElement(By.id('submit')).click();

  // Kullanıcı listesini kontrol et
  const userList = await driver.findElement(By.id('userList'));
  const users = await userList.findElements(By.tagName('li'));
  const userCount = users.length;
  console.log('Kullanıcı ekleme başarılı -- TEST BAŞARILII');
  // Tarayıcıyı kapat
  await driver.quit();
}

runTest().catch((error) => {
  console.error('Test sırasında bir hata oluştu:', error);
});
