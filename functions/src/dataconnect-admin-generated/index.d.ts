import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface CreateMedicationData {
  medication_insert: Medication_Key;
}

export interface CreateMedicationVariables {
  name: string;
  dosage: string;
  frequency: string;
  instructions?: string | null;
  notes?: string | null;
  refillReminderDays?: number | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  displayName: string;
  email?: string | null;
  photoUrl?: string | null;
}

export interface DoseRecord_Key {
  id: UUIDString;
  __typename?: 'DoseRecord_Key';
}

export interface GetCurrentUserMedicationsData {
  medications: ({
    id: UUIDString;
    name: string;
    dosage: string;
    frequency: string;
    instructions?: string | null;
    notes?: string | null;
    refillReminderDays?: number | null;
  } & Medication_Key)[];
}

export interface Medication_Key {
  id: UUIDString;
  __typename?: 'Medication_Key';
}

export interface RecordDoseData {
  doseRecord_insert: DoseRecord_Key;
}

export interface RecordDoseVariables {
  medicationId: UUIDString;
  notes?: string | null;
  status: string;
}

export interface Schedule_Key {
  id: UUIDString;
  __typename?: 'Schedule_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to execute without passing in DataConnect. */
export function createUser(dc: DataConnect, vars: CreateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;
/** Generated Node Admin SDK operation action function for the 'CreateUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function createUser(vars: CreateUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateUserData>>;

/** Generated Node Admin SDK operation action function for the 'GetCurrentUserMedications' Query. Allow users to execute without passing in DataConnect. */
export function getCurrentUserMedications(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserMedicationsData>>;
/** Generated Node Admin SDK operation action function for the 'GetCurrentUserMedications' Query. Allow users to pass in custom DataConnect instances. */
export function getCurrentUserMedications(options?: OperationOptions): Promise<ExecuteOperationResponse<GetCurrentUserMedicationsData>>;

/** Generated Node Admin SDK operation action function for the 'CreateMedication' Mutation. Allow users to execute without passing in DataConnect. */
export function createMedication(dc: DataConnect, vars: CreateMedicationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMedicationData>>;
/** Generated Node Admin SDK operation action function for the 'CreateMedication' Mutation. Allow users to pass in custom DataConnect instances. */
export function createMedication(vars: CreateMedicationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateMedicationData>>;

/** Generated Node Admin SDK operation action function for the 'RecordDose' Mutation. Allow users to execute without passing in DataConnect. */
export function recordDose(dc: DataConnect, vars: RecordDoseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordDoseData>>;
/** Generated Node Admin SDK operation action function for the 'RecordDose' Mutation. Allow users to pass in custom DataConnect instances. */
export function recordDose(vars: RecordDoseVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<RecordDoseData>>;

