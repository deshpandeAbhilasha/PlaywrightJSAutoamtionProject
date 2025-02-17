class cabsPage{

    constructor(page)
    {
        this.page = page;
        this.fromCity = page.locator('#fromCity');
        this.from = page.getByPlaceholder('From');
        this.listOfLocation  = page.locator("span.sr_city");
        this.hrs = page.locator("//ul[@class ='newTimeSlotHrUl' ]//li//span");
        this.min = page.locator("//ul[@class ='newTimeSlotMinUl' ]//li//span");
        this.slot = page.locator("//ul[@class ='newTimeSlotMerUl']//li//span");
        this.durationList = page.locator("//ul[contains(@class , 'durationTimePopup')]//li");
        this.actualDur = page.locator("//input[@id = 'durationTime']/following-sibling::div");
        this.applybtn = page.locator("//span[text() = 'APPLY']");
        this.pickup = page.locator('#departure');
        this.search = page.locator("//a[text() = 'Search']");


    }

    async selectPickup(fromCity , pickupLocation)
    {
        await this.fromCity.click();
        await this.from.fill(fromCity);
        await this.page.waitForTimeout(3000);
        const pickupList = this.listOfLocation;
        for(let i=0 ; i < await pickupList.count() ; i++)
        {
        const pickup = await pickupList.nth(i).textContent();
        if(pickup === pickupLocation)
        {
            await pickupList.nth(i).click();
            break;
        }

        }
    }
//Hr,Min,Mer - dropdown
    getDropDownList(dropdown)
    {
        return this.page.locator("//ul[@class ='newTimeSlot" +dropdown+"Ul' ]//li//span");
    }

    
    async selectPickupTime(dropdown, expectedValue)
    {
        await this.page.locator("//span[text() ='Pickup-Time']").click();
        this.page.waitForTimeout(2000);
        const Options = await this.getDropDownList(dropdown);
        for(let i=0 ; i < await Options.count() ; i++)
        {
        const eachOption = await Options.nth(i).textContent();
            if(eachOption.includes(expectedValue))
            {
                await Options.nth(i).click();
                break;
            }
        }
    await this.applybtn.click();
    }


    async selectPackage(expectedDuration)
    {
        const DurationList = this.durationList;
        for(let i=0; i < await DurationList.count() ; i++)
        {
            if(await DurationList.nth(i).textContent() === expectedDuration){
                await DurationList.nth(i).click();
                break;
            }
        }
        const actualDuration = await this.actualDur.textContent();
        return actualDuration;
    }


async clickSearch()
{
    return this.search.click();
}
}

module.exports = {cabsPage};