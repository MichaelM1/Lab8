describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });


  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });
  // test 2 is given

  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);


  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const oldurl = await page.url();
    const button = await page.$("body > main > journal-entry:nth-child(1)");
    await button.evaluate(button => button.click());
    expect(page.url()).toBe(oldurl + "#entry1");
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const button = await page.$("body > main > journal-entry:nth-child(1)");
    await button.evaluate(button => button.click());
    const temp = await page.$eval('body > header > h1', element => element.innerHTML);
    expect(temp).toBe("Entry 1");
  });


  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
    */
    const obj = {
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };


    const button = await page.$("body > main > journal-entry:nth-child(1)");
    await button.evaluate(button => button.click());

    const entryContents = await page.$eval('entry-page', (entry) => {
      let entryArray = {};
      entryArray.title = entry.entry.title;
      entryArray.date = entry.entry.date;
      entryArray.content = entry.entry.content;
      entryArray.image = entry.entry.image;
      return entryArray;
    });

    expect(entryContents).toEqual(obj);
  }, 10000);


  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const button = await page.$("body > main > journal-entry:nth-child(1)");
    await button.evaluate(button => button.click());
    const temp = await page.$eval('body', (entry) => {
      return entry.className;
    });
    expect(temp).toEqual("single-entry");
  });


  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    await page.reload();
    const oldurl = await page.url();
    const button = await page.$("body > header > img");
    await button.evaluate(button => button.click());

    expect(page.url()).toBe(oldurl + "#settings");

  });


  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const button = await page.$("body > header > img");
    await button.evaluate(button => button.click());
    const temp = await page.$eval('body > header > h1', element => element.innerHTML);
    expect(temp).toBe("Settings");

  });


  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const button = await page.$("body > header > img");
    await button.evaluate(button => button.click());
    const temp = await page.$eval('body', (entry) => {
      return entry.className;
    });
    expect(temp).toEqual("settings");

  });


  it('Test10: Clicking the back button, new URL should be /#entry1', async () => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    const oldurl = await page.url();
    const button1 = await page.$("body > main > journal-entry:nth-child(1)");
    await button1.evaluate(button => button.click());
    const button2 = await page.$("body > header > img");
    await button2.evaluate(button => button.click());
    await page.goBack();

    expect(page.url()).toBe(oldurl + "#entry1");

  }, 10000);

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    await page.reload();
    const oldurl = await page.url();
    const button = await page.$("body > main > journal-entry:nth-child(1)");
    await button.evaluate(button => button.click());
    await page.goBack();

    expect(page.url()).toBe(oldurl);

  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    const temp = await page.$eval('body > header > h1', element => element.innerHTML);
    expect(temp).toBe("Journal Entries");
  });


  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    const temp = await page.$eval('body', (entry) => {
      return entry.className;
    });
    expect(temp).toBe("");

  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    await page.reload();
    const oldurl = await page.url();
    const button = await page.$("body > main > journal-entry:nth-child(2)");
    await button.evaluate(button => button.click());
    expect(page.url()).toBe(oldurl + "#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async () => {
    const button = await page.$("body > main > journal-entry:nth-child(2)");
    await button.evaluate(button => button.click());
    const temp = await page.$eval('body > header > h1', element => element.innerHTML);
    expect(temp).toBe("Entry 2");
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    /*
     implement test16: Clicking on the second journal entry should contain the following contents: 
        { 
          title: 'Run, Forrest! Run!',
          date: '4/26/2021',
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
            alt: 'forrest running'
          }
        }
    */
    const obj = {
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    };

    const button = await page.$("body > main > journal-entry:nth-child(2)");
    await button.evaluate(button => button.click());
    const entryContents = await page.$eval('entry-page', (entry) => {
      let entryArray = {};
      entryArray.title = entry.entry.title;
      entryArray.date = entry.entry.date;
      entryArray.content = entry.entry.content;
      entryArray.image = entry.entry.image;
      return entryArray;
    });
    expect(entryContents).toEqual(obj);
  }, 10000);

  // create your own test 17: forward button 
  it('Test17: Verify the url is correct when clicking fowards', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    const oldurl = await page.url();
    const button = await page.$("body > main > journal-entry:nth-child(10)");
    await button.evaluate(button => button.click());
    await page.goBack();
    await page.goForward();
    expect(page.url()).toBe(oldurl + "#entry10");
  }, 10000);

  // create your own test 18: entry with audio
  it('Test18: Verify the entry page contents is correct when clicking on an entry with audio', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    const obj = {
      title: 'No, I am your father',
      date: '5/4/2021',
      content: "A long time ago, in a galaxy far, far away... It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the Death Star, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
      audio: 'https://drive.google.com/uc?export=download&id=1luYh909US7ZBFe6uo440Vv_LNnRdnErT',
      image: {
        src: "https://starwarsblog.starwars.com/wp-content/uploads/2021/04/star-wars-may-the-4th-2021-TALL-3973202.jpg",
        alt: 'may the fourth be with you'
      }
    };

    const button = await page.$("body > main > journal-entry:nth-child(10)");
    await button.evaluate(button => button.click());
    const entryContents = await page.$eval('entry-page', (entry) => {
      let entryArray = {};
      entryArray.title = entry.entry.title;
      entryArray.date = entry.entry.date;
      entryArray.content = entry.entry.content;
      entryArray.audio = entry.entry.audio;
      entryArray.image = entry.entry.image;
      return entryArray;
    });
    expect(entryContents).toEqual(obj);
  }, 10000);

  // create your own test 19: pressing settings multiple times
  it('Test19: Make sure pressing settings when already in settings does not do anything', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    const oldurl = await page.url();
    const button1 = await page.$("body > header > img");
    await button1.evaluate(button => button.click());
    const button2 = await page.$("body > header > img");
    await button2.evaluate(button => button.click());
    expect(page.url()).toBe(oldurl + "#settings");
  });

  // create your own test 20: pressing journal entries multiple times
  it('Test20: Make sure pressing journal entries when already in journal entries does not do anything', async () => {
    const resetbutton = await page.$("body > header > h1");
    await resetbutton.evaluate(button => button.click());
    const oldurl = await page.url();
    const button = await page.$("body > header > h1");
    await button.evaluate(button => button.click());
    expect(page.url()).toBe(oldurl);
  });
});
