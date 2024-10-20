import path from 'path';

const isTest = process.env.NODE_ENV === 'test';

const baseDir = isTest ? path.join(__dirname, '..', 'public') : './public';

export const config = {
  dataDir: path.join(baseDir, 'data'),
  files: {
    foodGroups: 'foodgroups-en_ONPP.csv',
    foods: 'foods-en_ONPP_rev.csv',
    servings: 'servings_per_day-en_ONPP.csv',
    directionalStatements: 'fg_directional_statements-en_ONPP.csv',
  },
};

export const getFilePath = (fileName: keyof typeof config.files) => 
  path.join(config.dataDir, config.files[fileName]);
