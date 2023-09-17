const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments('headless'); // Eğer başsız (headless) bir tarayıcı kullanmak isterseniz

const driver = new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();

(async function example() {
  try {
    await driver.get('http://34.132.177.124:5000'); // Uygulamanızın URL'sini buraya ekleyin

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
