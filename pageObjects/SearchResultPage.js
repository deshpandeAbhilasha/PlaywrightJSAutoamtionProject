class SearchResultPage{

    constructor(page)
    {
        this.page = page;
        this.searchCriteria = page.locator("//span[text() = 'Pick Up Location']");
        this.tripType = page.locator("//input[@id = 'tripType']");
        this.pickupLocation = page.locator("//input[@id = 'fromCity']");
        this.pickupTime = page.locator("//input[@id = 'travelDateDepart']//..//span[contains(@class,'latoBlack')]");
        this.packageDuration = page.locator("//span[text() = 'Package Type']//..//p//span");
        this.carType = page.locator("//p[text() = 'Cab Type']/following-sibling::div//label");
        

        
    }
    getFilter(type)
    {
        return this.page.locator("//p[text() = '"+type+"']/following-sibling::div//label");
    }
    async getBookingCreteria(Key)
    {
        await this.page.waitForSelector("//p[text() = 'Select Filters']");
        if(Key.includes('tripType'))
        {
            return await this.page.locator("//input[@id = '"+ Key +"']").textContent();
        }else if(Key.includes('fromCity'))
        {
            return await this.page.locator("//input[@id = '"+ Key +"']").getAttribute('value');
        }else if(Key.includes('pickupDate'))
        {
            return await this.page.locator("//input[@id = 'travelDateDepart']//..//span[contains(@class,'latoBlack')]").textContent();
        }else if(Key.includes('pickupTime'))
        {
                    return await this.page.locator("//input[@id = 'pickTime']").getAttribute('value');
        }else if(Key.includes('Package Type'))
        {    const packageTypeLoc = await this.page.locator("//span[text() = 'Package Type']//..//p//span");
            let packageType = "";
                for(let i=0 ; i < await packageTypeLoc.count() ; i++)
                {
                    let package1 =await packageTypeLoc.nth(i).textContent();
                    packageType =  packageType+  package1.trim() + " ";
                }
                return packageType.trim(); 
        }
    }

   async selectfirstCarTypeOrFuelType(type)
   {
    if(await this.getFilter(type).nth(0).isEnabled())
    {
    await this.getFilter(type).nth(0).click();
    }
}

    async getAvailableCabs()
    {   let cabList = "";
        const cabs = this.page.locator("//div[contains(@class , 'cabListingTileWrapper')]//..//div[contains(@class , 'cabDetails')]//div//div[@class = 'makeFlex end']//span[contains(@class , 'appendRight5')]");
        for(let i=0 ; i < await cabs.count() ;i++)
        {
            cabList = cabList + await cabs.nth(i).textContent();
        }
        console.log(cabList);
    }






}

module.exports = {SearchResultPage};