const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'medicine-tracker-next',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const getMedicationsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMedicationsForUser');
}
getMedicationsForUserRef.operationName = 'GetMedicationsForUser';
exports.getMedicationsForUserRef = getMedicationsForUserRef;

exports.getMedicationsForUser = function getMedicationsForUser(dc) {
  return executeQuery(getMedicationsForUserRef(dc));
};

const toggleReminderEnabledRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ToggleReminderEnabled', inputVars);
}
toggleReminderEnabledRef.operationName = 'ToggleReminderEnabled';
exports.toggleReminderEnabledRef = toggleReminderEnabledRef;

exports.toggleReminderEnabled = function toggleReminderEnabled(dcOrVars, vars) {
  return executeMutation(toggleReminderEnabledRef(dcOrVars, vars));
};

const listDosesForMedicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDosesForMedication', inputVars);
}
listDosesForMedicationRef.operationName = 'ListDosesForMedication';
exports.listDosesForMedicationRef = listDosesForMedicationRef;

exports.listDosesForMedication = function listDosesForMedication(dcOrVars, vars) {
  return executeQuery(listDosesForMedicationRef(dcOrVars, vars));
};
