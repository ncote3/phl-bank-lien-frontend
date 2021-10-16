export const constructDataSections = (propertyObject) => {
  const {
    lienBalance,
    totalAssessment,
    propertyAddress,
    councilDistrict,
  } = propertyObject;

  const bankLienInformationFirstDataColumnKeyValues = [
    ["Owed To The Banks", lienBalance],
    ["Current Assessed Property Value", totalAssessment],
  ];
  const bankLienInformationDataColumns = [
    bankLienInformationFirstDataColumnKeyValues,
  ];

  const propertyInformationirstDataColumnKeyValues = [
    ["Property Address", propertyAddress],
    ["Council District", councilDistrict],
  ];
  const propertyInformationDataColumns = [
    propertyInformationirstDataColumnKeyValues,
  ];

  return [bankLienInformationDataColumns, propertyInformationDataColumns];
};
