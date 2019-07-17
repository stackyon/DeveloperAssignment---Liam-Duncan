const jquery = require('jquery');

//google
const google = 'http://www.google.com';
const search_bar = '[class~=\'gLFyf\']';
const search_btn = '#tsf > div:nth-child(2) > div > div.FPdoLc.VlcLAe > center > input.gNO89b';
const search_results = 'div[class=\'srg\'] > div[class=\'g\']  div[class=\'r\'] > a';

//datatables
const datatables = 'a[href=\'https://datatables.net/\']';
const table_entry = 'tbody > tr[role=\'row\']';

exports.p1 = async function(page){
    await page.goto(google);
    return await page.$eval(search_bar, element => element.name);
};

exports.p2 = async function(page){
    await page.goto(google);
    return await page.$eval(search_bar, element => element.title);
};

//jquery notation doesn't seem to work in my environment, unresolved
exports.p3 = async function(page){
    await page.goto(google);
    const input = await $(this).find(search_bar);
    return await input.attr('title');
};

exports.p4 = async function(page){
    await page.goto(google);
    const text_input = await page.$(search_bar);
    await text_input.type('test');
    var current_value = await page.$eval(search_bar, element => element.value);
    current_value = 'robot' + current_value;
    await text_input.type(current_value);
    return current_value;
};

exports.p5 = async function(page){
    await page.goto(google);
    const text_input = await page.$(search_bar);
    const search_button = await page.$(search_btn);
    await text_input.type('test');
    await search_button.click();
    return 'ok';
};

exports.p6 = async function(page){
    await page.goto(google);
    const text_input = await page.$(search_bar);
    const search_button = await page.$(search_btn);
    await text_input.type('test');
    await search_button.click();
    await page.waitForSelector(search_results);
    const results = await page.$$eval(search_results, nodes => nodes.map(result => result.href));
    return results;
};

exports.main_assignment = async function(page){
    //find datatables page through google search
    await page.goto(google);
    const text_input = await page.$(search_bar);
    const search_button = await page.$(search_btn);
    await text_input.type('datatables');// sometimes fails because of google search autocorrect
    await search_button.click();
    await page.waitForSelector(datatables);
    const correct_result = await page.$(datatables);
    await correct_result.click();
    //extract table from home page
    await page.waitForSelector(table_entry);
    const rows = await page.$$(table_entry);
    const entries = await rows.map(row_parser);// helper function, in this module
    //TODO -- This is as far as I could make it this time:
    //  Tried many variations of this setup. It seems from the documentation that this should work
    //  but further experimentation and investigation seems to be needed.
    //export to CSV file (depends on unfinished scraping above)
    const content = entries.toArray();
    let csvFormat = 'data:text/csv;charset=utf-8,' + content;
    var encodedUri = encodeURI(csvFormat);
    window.open(encodedUri);
    return 'ok';
};

async function row_parser(context){
    var row = new Object();
    row.name = await context.$eval('td:nth-child(1)', node => node.innerText);
    row.position = await context.$eval('td:nth-child(2)', node => node.innerText);
    row.office = await context.$eval('td:nth-child(3)', node => node.innerText);
    row.age = await context.$eval('td:nth-child(4)', node => node.innerText);
    row.start = await context.$eval('td:nth-child(5)', node => node.innerText);
    return row;
};