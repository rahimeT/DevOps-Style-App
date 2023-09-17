const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:4000'); // Uygulamanızın URL'sini buraya ekleyin

    // Örnek bir test senaryosu
    await driver.findElement(By.linkText('Login')).click();
    await driver.findElement(By.name('username')).sendKeys('testuser');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.name('loginButton')).click();

    // Bekleme
    await driver.wait(until.titleIs('Ana Sayfa'), 1000);

    // Test sonuçları
    console.log('Test başarıyla tamamlandı!');
  } finally {
    await driver.quit();
  }
})();
