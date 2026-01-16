import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'medicine-tracker-next',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const getMedicationsForUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMedicationsForUser');
}
getMedicationsForUserRef.operationName = 'GetMedicationsForUser';

export function getMedicationsForUser(dc) {
  return executeQuery(getMedicationsForUserRef(dc));
}

export const toggleReminderEnabledRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ToggleReminderEnabled', inputVars);
}
toggleReminderEnabledRef.operationName = 'ToggleReminderEnabled';

export function toggleReminderEnabled(dcOrVars, vars) {
  return executeMutation(toggleReminderEnabledRef(dcOrVars, vars));
}

export const listDosesForMedicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListDosesForMedication', inputVars);
}
listDosesForMedicationRef.operationName = 'ListDosesForMedication';

export function listDosesForMedication(dcOrVars, vars) {
  return executeQuery(listDosesForMedicationRef(dcOrVars, vars));
}

