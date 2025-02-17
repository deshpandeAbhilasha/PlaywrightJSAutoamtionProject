const {IntroductionPage} = require('./IntroductionPage');
const {HomePage} = require('./HomePage');
const {cabsPage} = require('./cabsPage');
const {SearchResultPage} = require('./SearchResultPage');
const {HomeStayPage} = require('./HomeStayPage');


class POManager{

constructor(page)
{
    this.page = page;
    this.introductionPage = new IntroductionPage(page);
    this.homePage = new HomePage(page);
    this.cabsPage = new cabsPage(page);
    this.searchResultPage = new SearchResultPage(page);
    this.homeStayPage = new HomeStayPage(page);
}

getIntroductionPage()
{
    return this.introductionPage;
}

getHomePage()
{
    return this.homePage;
}

getCabPage()
{
    return this.cabsPage;
}

getSearchResultPage()
{
    return this.searchResultPage;
}

getHomeStayPage()
{
    return this.homeStayPage;
}

}

module.exports = {POManager};