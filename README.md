# Lab8_Starter  

## Link: https://michaelm1.github.io/Lab8/  

## Authors: Michael Mao, Young Kim  

## Check your understanding q's (FILL OUT)  
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter): 1, within a github action.

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user: No because unit tests are meant to test individual parts of your code, and the entire "message" feature involves multiple moving parts that would be more suited for E2E testing.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters: Yes because you can test a single method that takes in a message as a parameter and see if it prevents users from entering more than 80 characters.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true? If we run our puppeteer tests with the field "headless" set to true, the tests will still run the same way but there won't be a gui.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

```  
beforeAll(async () => {  
    await page.goto('http://127.0.0.1:5500');  
    await page.waitForTimeout(500);  
    const button = await page.$("body > header > img");  
    await button.evaluate(button => button.click());  
});
```