const isTest = process.env.NODE_ENV === 'test';

const baseDir = isTest ? './public' : '';

export const config = {
  dataDir: `${baseDir}/data`,
  files: {
    foodGroups: 'foodgroups-en_ONPP.csv',
    foods: 'foods-en_ONPP_rev.csv',
    servings: 'servings_per_day-en_ONPP.csv',
    directionalStatements: 'fg_directional_statements-en_ONPP.csv',
  },
};

export const getFilePath = (fileName: keyof typeof config.files) => 
  `${config.dataDir}/${config.files[fileName]}`;
