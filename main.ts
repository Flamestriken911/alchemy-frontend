import DataHelper = require('./Backend/Data/DataHelper');
import Ingredient = require('./Backend/Components/Ingredient');
import ConsoleInterface = require('./ConsoleInterface');

var dataHelper = new DataHelper();
var consoleInterface = new ConsoleInterface();
var filePath = './Data/';
var fileName = 'ingredient info.csv';

//dataHelper.GetMatches(filePath, fileName, 'Taproot', () => console.log('Done'));
//dataHelper.GetDiscoveries(filePath, fileName, 'Taproot');

consoleInterface.UserQuestion();