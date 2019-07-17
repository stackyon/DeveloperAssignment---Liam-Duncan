const puppeteer = require('puppeteer');

exports.run_story = function(story, name){
    puppeteer.launch({headless : false, args:['--disable-physical-keyboard-autocorrect']}).then(async chrome_instance => {
        try{
            const page = await chrome_instance.newPage();
            const return_value = await story(page);
            console.log('The result of ' + name + ' is: ' + return_value);
            await chrome_instance.close();
        } catch(err) {
            console.log('\nAn issue has occured =>\n'
                + err.stack + '\n');
            await chrome_instance.close();
        }
    })
};