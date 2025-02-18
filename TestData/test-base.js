const base = require('@playwright/test');

exports.customTest = base.test.extend(
{
    testDataForDates :  {

        expectedMonthYear : "May 2025",
        expectedDate : "5"
    },


    bookCabTestData :
    {
        fromCity : "Pune",
        pickupLocation : "Pune Junction Railway Station, Agarkar Nagar, Pune, Maharashtra, India",
        JourneyDate : "23/March/2025",
        JourneyTime : "04:45 PM",
        JourneyDuration : "6 hrs 60 kms"
    }
}
)
