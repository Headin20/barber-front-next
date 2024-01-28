const noOperations = () => {};
const noAsyncOperation = async () => {};
const noChanges = values => values;
const joinClassNames = (...classNames) => classNames.filter(item => item).join(' ');

const getDeepValue = (object, path) =>
    path
        .replace(/\[|\]\.?/g, ".")
        .split(".")
        .filter(s => s)
        .reduce((acc, val) => acc && acc[val], object);

const formFieldReducer = (formField, nameField = 'name') => Object.entries(formField)
    .reduce((acc,[key, value]) => ({ ...acc, [key]: { [nameField]: key, ...value }}), {});

const reduceTextToLocalizations = (text, translator) => {
    const wordArray = text.split(' ');
    return wordArray.map(word => translator(word)).join(' ');
}

const reduceFormFieldToLocalizations = ( formFields = {}, fieldToTranslateArray = [], translator ) => {
    const toLocalizations = formField => {
        fieldToTranslateArray.forEach(propertyName => {
            if (formField.hasOwnProperty(propertyName)) {
                formField[propertyName] = reduceTextToLocalizations(formField[propertyName], translator);
            }
        });
        return formField;
    }
    return Object.entries(formFields).reduce((acc, [key, formField]) => ({ ...acc, [key]: toLocalizations(formField) }), {})
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getColorByArray = (array = [])=> array.map(() => `${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}`)

const generateRandomObjectToServer = ({provide, generator, count = 10 }) => {
    while (count > 0) {
        provide(generator())
        count--
    }
}

const fetchingAllInfo = ({provider, filters = {}, transformer = noChanges }) => {
    let allData = [];

    function fetchingData(offset = 0) {
        return new Promise((resolve, reject) => {
            provider({ ...filters, offset })
                .then(({ data, limit, offset, totalRecords }) => {
                    allData = allData.concat(transformer(data));
                    resolve(totalRecords > offset ? fetchingData(offset + limit) : allData)
                })
                .catch(error => reject(error))
        })
    }

    return fetchingData()
}

export {
    generateRandomObjectToServer,
    noOperations,
    formFieldReducer,
    noAsyncOperation,
    noChanges,
    getDeepValue,
    joinClassNames,
    reduceTextToLocalizations,
    reduceFormFieldToLocalizations,
    getRandomNumber,
    fetchingAllInfo,
    getColorByArray,
}