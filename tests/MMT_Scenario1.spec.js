const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const DataSet = JSON.parse(JSON.stringify(require('../TestData/DateSelectionTestData.json')));
const {customTest} = require('../TestData/test-base');

// const {HomePage} = require('../pageObjects/HomePage');
// const {IntroductionPage} = require('../pageObjects/IntroductionPage');
// const {cabsPage} = require('../pageObjects/cabsPage');
//test.describe.configure({mode : 'parallel'});
for(const data of DataSet)
{
test(`Date Selection with ${data.expectedDate}`, async ({ page }) => {
    const poManager = new POManager(page);
    const introductionPage = poManager.getIntroductionPage();
    const homePage = poManager.getHomePage();
    // const expectedMonthYear = "November 2025";
    // const expectedDate = "20";
    const expectedMonthYear = data.expectedMonthYear;
    const expectedDate = data.expectedDate;
    let expectedDateFormat = expectedDate + "-" + expectedMonthYear.split(" ")[0].substring(0, 3) + "-" + expectedMonthYear.split(" ")[1].slice(2, 4);
    await introductionPage.GoTo();
    await page.locator('span.lbl_input').nth(2).click();
    await homePage.selectDate(expectedDate , expectedMonthYear , false);
    let actualSelectedDate = await homePage.getDepatureDate();
    console.log(actualSelectedDate);
    expect(actualSelectedDate).toEqual(expectedDateFormat);
});

}


customTest(`@Web Date Selection with playwright fixer`, async ({ page ,testDataForDates }) => {
    const poManager = new POManager(page);
    const introductionPage = poManager.getIntroductionPage();
    const homePage = poManager.getHomePage();
    // const expectedMonthYear = "November 2025";
    // const expectedDate = "20";
    const expectedMonthYear = testDataForDates.expectedMonthYear;
    const expectedDate = testDataForDates.expectedDate;
    let expectedDateFormat = expectedDate + "-" + expectedMonthYear.split(" ")[0].substring(0, 3) + "-" + expectedMonthYear.split(" ")[1].slice(2, 4);
    await introductionPage.GoTo();
    await page.locator('span.lbl_input').nth(2).click();
    await homePage.selectDate(expectedDate , expectedMonthYear , false);
    let actualSelectedDate = await homePage.getDepatureDate();
    console.log(actualSelectedDate);
    expect(actualSelectedDate).toEqual(expectedDateFormat);

});




test('Book hourly based cab' , async({page}) => {
    const poManager = new POManager(page);
    const introductionPage = poManager.getIntroductionPage();
    const homePage = poManager.getHomePage();
    const cabPage = poManager.getCabPage();
    const currentDate = new Date();
    console.log("===============" +currentDate.toISOString() + "===============");
    const fromCity = "Pune"; 
    const pickupLocation = "Pune Junction Railway Station, Agarkar Nagar, Pune, Maharashtra, India";
    const expectedMonthYear = "March 2025";
    const expectedDate = "2";
    let expectedDateFormat = expectedDate + "- " + expectedMonthYear.split(" ")[0].substring(0, 3) + "-" + expectedMonthYear.split(" ")[1].slice(2, 4);
   
    await introductionPage.GoTo();
    await homePage.clickMenu('Cabs');
    await homePage.clickByText('Hourly Rentals');
    await cabPage.selectPickup(fromCity , pickupLocation)
    await page.locator('text=Pickup Date').click();
    await homePage.selectDate(expectedDate , expectedMonthYear , 'pickup');
    let actualSelectedDate = await homePage.getDepatureDate();
    actualSelectedDate = actualSelectedDate.slice(0, 10);
    console.log(actualSelectedDate);
    expect(actualSelectedDate).toContain(expectedDateFormat);
    const expHrs = '04';
    const expMin = '45';
    const expSlot = "PM";
    await page.locator('text=Pickup-Time').click();
    await cabPage.selectPickupTime("Hr" , expHrs);
    await cabPage.selectPickupTime("Min" , expMin);
    await cabPage.selectPickupTime("Mer" , expSlot);
    const expectedDuration = "6 hrs 60 kms";
    //  await expect(async () => {
    //        await page.locator('text=Select Package').toBeEnabled() , Timeout = 500}).toPass();
    await page.waitForTimeout(2000);
    await page.locator('text=Select Package').click();
    const actualDuration = await cabPage.selectPackage(expectedDuration)
    expect(actualDuration).toEqual(expectedDuration);


});

customTest.skip(`Book hourly based cab using PO` , async({page , bookCabTestData}) => {
    const poManager = new POManager(page);
    const introductionPage = poManager.getIntroductionPage();
    const homePage = poManager.getHomePage();
    const cabPage = poManager.getCabPage();
    const searchResultPage = poManager.getSearchResultPage();

    const fromCity = bookCabTestData.fromCity; 
    const pickupLocation = bookCabTestData.pickupLocation
    let expectedMonthYear = bookCabTestData.JourneyDate.split("/")[1] + " " +bookCabTestData.JourneyDate.split("/")[2];
    let expectedDate = bookCabTestData.JourneyDate.split("/")[0];
    let expectedDateFormat = expectedDate + "- " + expectedMonthYear.split(" ")[0].substring(0, 3) + "-" + expectedMonthYear.split(" ")[1].slice(2, 4);
    let JourDate = expectedDate + " " + expectedMonthYear.split(" ")[0].substring(0, 3) + " " + expectedMonthYear.split(" ")[1];
    let tripType = 'Hourly Rentals';
    await introductionPage.GoTo();
    await homePage.clickMenu('Cabs');
    await homePage.clickByText(tripType);
    await cabPage.selectPickup(fromCity , pickupLocation)
    await homePage.clickByText('Pickup Date');
    await homePage.selectDate(expectedDate , expectedMonthYear , 'pickup');
    let actualSelectedDate = await homePage.getDepatureDate();
    actualSelectedDate = actualSelectedDate.slice(0, 10);
    expect(actualSelectedDate).toContain(expectedDateFormat);
    const expHrs = bookCabTestData.JourneyTime.split(":")[0];
    const expMin = bookCabTestData.JourneyTime.split(":")[1].split(" ")[0];
    const expSlot = bookCabTestData.JourneyTime.split(" ")[1];
    await page.locator('text=Pickup-Time').click();
    await cabPage.selectPickupTime("Hr" , expHrs);
    await cabPage.selectPickupTime("Min" , expMin);
    await cabPage.selectPickupTime("Mer" , expSlot);
    const expectedDuration = bookCabTestData.JourneyDuration;
    await page.waitForTimeout(2000);
    await page.locator('text=Select Package').click();
    const actualDuration = await cabPage.selectPackage(expectedDuration)
    expect(actualDuration).toEqual(expectedDuration);
    await cabPage.clickSearch();
    await page.waitForTimeout(30000);
    const SearchPagetripType = await searchResultPage.getBookingCreteria('trip');
    const SearchPagepickupLocation = await searchResultPage.getBookingCreteria('from');
    const SearchPagepickupTime = await searchResultPage.getBookingCreteria('pickupTime');
    const SearchPagePickupDate = await searchResultPage.getBookingCreteria('pickupDate');
    const SearchPagePackageType = await searchResultPage.getBookingCreteria('Package Type');
    expect(tripType).toContain(SearchPagetripType);
    expect(pickupLocation).toEqual(SearchPagepickupLocation);
    expect(bookCabTestData.JourneyTime).toEqual(SearchPagepickupTime);
    expect(SearchPagePickupDate.trim()).toContain(JourDate);
    expect(bookCabTestData.JourneyDuration.replace(' hrs' , 'hrs')).toContain(SearchPagePackageType);
    await searchResultPage.selectfirstCarTypeOrFuelType('Cab Type');
    await searchResultPage.selectfirstCarTypeOrFuelType('Fuel Type');


   await searchResultPage.getAvailableCabs();


});


test('Handle calender selection' , async({page})=>{

    const expectedMonthYear = "August 2025";
    const expectedDate = "25";
    let expectedFinalDate = "";
    await page.goto('https://www.makemytrip.com/');
    await page.locator(".commonModal__close").click();
    await page.locator('span.lbl_input').nth(2).click();
    let MonthYear = page.locator("//div[@class = 'DayPicker-Months']//div[@class = 'DayPicker-Caption']//div");
    let actualMonthYear = "";
    let flag = false;
    while(actualMonthYear !== expectedMonthYear)
    {
    for(let i=0 ; i < await MonthYear.count() ; i++ )
    {
        actualMonthYear = await MonthYear.nth(i).textContent();
        console.log(actualMonthYear);
        if(actualMonthYear === expectedMonthYear)
        {
            await page.locator("//div[text() = '" + expectedMonthYear + "']/ancestor::div[@class = 'DayPicker-Month']//div[@aria-disabled = 'false']//p[text() = '" + expectedDate + "']").click();
            flag = true;
            break;
        }

    }
    if(flag === false)
    {
    await page.locator('[aria-label="Next Month"]').click();
    MonthYear = page.locator("//div[@class = 'DayPicker-Months']//div[@class = 'DayPicker-Caption']//div");
    }
    }
await page.locator('.dates p.blackText span').first().waitFor();
const actualDate = await page.locator('.dates p.blackText span');
console.log(await actualDate.count());
for(let i=0 ; i < await actualDate.count() ; ++i)
{   expectedFinalDate = expectedFinalDate.concat(await actualDate.nth(i).textContent()).trim();
    if((i+1) !== await actualDate.count())
    {
        expectedFinalDate =  expectedFinalDate.concat("-");
    }
   
}
console.log(expectedFinalDate);
});