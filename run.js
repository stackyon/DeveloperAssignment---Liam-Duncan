const bot = require('./bot');
const stories = require('./stories');
const expect = require('expect');

console.log('//////////////////////////////');

bot.run_story(stories.p1, 'Problem 1');
bot.run_story(stories.p2, 'Problem 2');
//bot.run_story(stories.p3, 'Problem 3');
bot.run_story(stories.p4, 'Problem 4');
bot.run_story(stories.p5, 'Problem 5');
bot.run_story(stories.p6, 'Problem 6');

//bot.run_story(stories.main_assignment);