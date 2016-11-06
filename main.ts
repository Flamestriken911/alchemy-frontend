import IngredientList = require('./IngredientList');
import DataHelper = require('./DataHelper');

var dHelp = new DataHelper();

dHelp.ReadIngredients('./Data/', 'ingredient info.csv');
