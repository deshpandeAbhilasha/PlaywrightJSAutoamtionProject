//@ts-check
import { devices } from '@playwright/test';

const config = {

    testDir:  './tests'  ,
    timeout : 30 * 1000,
    expect :  {
    timeout : 5000
     
    },
    retries : 2,
    projects : 
    [
       {
         name : 'chrome',
        use : 
        {
        
          browserName : 'chromium',
          headless : true,
          screenshot : 'on',
         // viewport : {width: 1200 , height : 1500},
         // ...devices['Nokia N9 landscape'],
          ignoreHttpsError : true,
         // video: 'on'
         video : 'retain-on-failure',
         trace : 'on'
        },
      },

    //    {
    //      name : 'firefox',
    //      use : 
    //      {
        
    //        browserName : 'firefox',
    //        headless : false,
    //   screenshot : 'only-on-failure'
    //    },
    // },
      {
        name : 'safari',
        use : 
        {
        
          browserName : 'webkit',
          headless : true,
          screenshot : 'off'
        },
      }
    ]
   
    
    ,reporter : 'html',
    workers : 5
    
    
    
    }
    
    export default config;