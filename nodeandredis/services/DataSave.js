const fs = require('fs');
const path = require('path');

const DataSave = async (data) => {
    const filePath=path.join(__dirname, '../data/data.json');
    fs.writeFileSync(filePath, JSON.stringify(data));
    return true;
};

const DataGet = async () => {
    const filePath=path.join(__dirname, '../data/data.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

module.exports = { DataSave, DataGet };