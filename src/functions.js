export const normalizeArrayCourse = arry => {
  let newArray = arry.reduce((accum, current) => {
    return [...accum, { [current.public_id]: current }];
  }, []);
  return newArray;
};

export const normalizeArray = arr => {
  let normalizedArray = arr.reduce((acc, current) => {
    return { ...acc, [current.public_id]: current };
  }, {});

  return normalizedArray;
};

export const denormalizeObject = obj => {
  const newObj =  !!obj ? Object.values(obj) : null;
  return newObj;
};

export const addToParticularEntryNormalizedObject = (
  obj,
  id,
  extraContent,
  extraContentName
) => {
  let oldContent = obj[id];
  let newContent = { ...oldContent, [extraContentName]: extraContent };
  return {
    ...obj,
    [id]: newContent
  };
};

export const removeParticularEntryNormalizedObject = (obj, id, contentName) => {
  let oldContent = obj[id];
  let newContent = delete oldContent[contentName];
  let value = {
    ...obj,
    [id]: newContent
  };
  return value;
};

export const removeEntryFromObject = (obj, prop) => {
  const newObj = obj;
  console.log(newObj);
  delete newObj[prop];
  console.log(newObj);
  return newObj;
};
