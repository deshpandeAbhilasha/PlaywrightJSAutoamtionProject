class IntroductionPage{

constructor(page)
{
    this.page = page;
    this.closePopup = page.locator(".commonModal__close");
}

async GoTo()
{
    await this.page.goto('https://www.makemytrip.com/');
    await this.closePopup.click();
}

}
module.exports = {IntroductionPage};