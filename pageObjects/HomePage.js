class HomePage{

constructor(page)
{
    this.page = page;
    this.departureDates  = page.locator('span.lbl_input')
    this.MonthYear = page.locator("//div[@class = 'DayPicker-Months']//div[@class = 'DayPicker-Caption']//div");
    this.nextMonth = page.locator('[aria-label="Next Month"]');
    this.SelectedDepartureDate = page.locator('.dates p.blackText span');
}

async selectDate(expectedDate , expectedMonthYear , Field)
{
    
    let actualMonthYear = "";
    let flag = false;
    while (actualMonthYear !== expectedMonthYear) {
        for (let i = 0; i < await this.MonthYear.count(); i++) {
            actualMonthYear = await this.MonthYear.nth(i).textContent();
            console.log(actualMonthYear);
            if (actualMonthYear === expectedMonthYear) {
                if(Field === 'pickup')
                {
                    await this.page.locator("//div[text() = '" + expectedMonthYear + "']/ancestor::div[@class = 'DayPicker-Month']//div[@aria-disabled = 'false' and text() = '" + expectedDate + "']").click();
                 
                }else if(Field === 'CheckIn'){
                    let leng = actualMonthYear.length;
                    let year = actualMonthYear.substring(leng-4 , leng);
                    let month = actualMonthYear.split(year)[0];
                    console.log(month);
                    console.log(year);
                  await this.page.locator("//div[text() = '"+month+"']//span[text() = '"+year + "']/ancestor::div[@class = 'DayPicker-Month']//div[@aria-disabled = 'false' and text() = '"+expectedDate+"']").click();
                  const checkoutdate = ++expectedDate;
                  console.log(checkoutdate);
                  await  this.page.locator("//span[contains(text() , 'Select Checkout Date')]/ancestor::div[contains(@class , 'dayPickerHeader')]/following-sibling::div/descendant::div[text() = '"+month+"']/parent::div/following-sibling::div[@class = 'DayPicker-Body']//div//div[contains(@class , 'DayPicker-Day') and text() = '"+checkoutdate+"']").click();
               
//span[contains(text() , 'Select Checkout Date')]/ancestor::div[contains(@class , 'dayPickerHeader')]/following-sibling::div/descendant::div[text() = 'June']/parent::div/following-sibling::div[@class = 'DayPicker-Body']//div//div[contains(@class , 'DayPicker-Day') and text() = '20']

                } else{

                await this.page.locator("//div[text() = '" + expectedMonthYear + "']/ancestor::div[@class = 'DayPicker-Month']//div[@aria-disabled = 'false']//p[text() = '" + expectedDate + "']").click();
               } 
            
            
            flag = true;
                break;
            }

        }
        if (flag === false) {
            await this.nextMonth.click();
            this.MonthYear =  this.MonthYear ;
        }
    }

}

async getDepatureDate()
{
    let actualFinalDate = "";
    await this.SelectedDepartureDate.first().waitFor();
    const actualDate = this.SelectedDepartureDate;
    for (let i = 0; i < await actualDate.count(); ++i) {

        actualFinalDate = actualFinalDate.concat(await actualDate.nth(i).textContent()).trim();
        if ((i + 1) !== await actualDate.count()) {
            actualFinalDate = actualFinalDate.concat("-");
        }

    }
    return actualFinalDate;
}

async clickMenu(menu)
{
    let menuTobeClicked = '.menu_' + menu ;
    if(menu === 'Cabs')
    {
      await this.page.locator(menuTobeClicked).click();
    }else if (menu === 'Homestays')
    {
        await this.page.locator(menuTobeClicked).click();
    }

}
async clickByText(Text)
{
   await this.page.locator('text=' + Text).click();
}


}

module.exports = {HomePage};