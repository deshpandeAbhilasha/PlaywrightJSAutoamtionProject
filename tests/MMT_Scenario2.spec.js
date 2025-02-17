const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
const DataSet = JSON.parse(JSON.stringify(require('../TestData/DateSelectionTestData.json')));
const {customTest} = require('../TestData/test-base');

test('Get Options for Homestays and Villas' , async({page})=>{

    const poManager = new POManager(page);
    const introductionPage = poManager.getIntroductionPage();
    const homePage = poManager.getHomePage();
    const homeStayPage = poManager.getHomeStayPage();

    let expectedMonthYear = "May2025";
    let expectedDate = "5";
    await introductionPage.GoTo();
    await homePage.clickMenu('Homestays');
    await homeStayPage.selectRequiredLocation("Yavatmal" , "Prasad Nagar");
    await homePage.selectDate(expectedDate , expectedMonthYear , 'CheckIn');

    //await page.pause();
});