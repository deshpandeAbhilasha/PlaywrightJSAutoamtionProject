class HomeStayPage{

constructor(page)
{
    this.page = page;
    this.StayLocation = page.locator("//input[@id = 'city']");
     this.WhereToPlace = page.getByPlaceholder("Where do you want to stay?");
    this.availableLocations = page.locator("p.sr_city");
    this.checkin = page.locator("#checkin");


}

getRequiredLocation(location)
{
return this.page.locator("//span[contains(text() , '" + location+ "')]");
}

async enterLocation(Location)
{
    await this.StayLocation.click();
    await this.WhereToPlace.fill(Location);
}

async selectRequiredLocation(location , subLocation)
{
   await this.enterLocation(location);
   await this.getRequiredLocation(subLocation).click();
}

}
module.exports = {HomeStayPage};