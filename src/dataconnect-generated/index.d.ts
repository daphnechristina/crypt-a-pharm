import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateUserData {
  user_insert: User_Key;
}

export interface Dose_Key {
  id: UUIDString;
  __typename?: 'Dose_Key';
}

export interface GetMedicationsForUserData {
  medications: ({
    id: UUIDString;
    name: string;
    dosage: string;
    frequency: string;
    startDate: DateString;
    endDate?: DateString | null;
  } & Medication_Key)[];
}

export interface ListDosesForMedicationData {
  doses: ({
    id: UUIDString;
    scheduledTime: TimestampString;
    actualTakenTime?: TimestampString | null;
    taken?: boolean | null;
    notes?: string | null;
  } & Dose_Key)[];
}

export interface ListDosesForMedicationVariables {
  medicationId: UUIDString;
}

export interface Medication_Key {
  id: UUIDString;
  __typename?: 'Medication_Key';
}

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface ToggleReminderEnabledData {
  reminder_update?: Reminder_Key | null;
}

export interface ToggleReminderEnabledVariables {
  reminderId: UUIDString;
  enabled: boolean;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface GetMedicationsForUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMedicationsForUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMedicationsForUserData, undefined>;
  operationName: string;
}
export const getMedicationsForUserRef: GetMedicationsForUserRef;

export function getMedicationsForUser(): QueryPromise<GetMedicationsForUserData, undefined>;
export function getMedicationsForUser(dc: DataConnect): QueryPromise<GetMedicationsForUserData, undefined>;

interface ToggleReminderEnabledRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ToggleReminderEnabledVariables): MutationRef<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ToggleReminderEnabledVariables): MutationRef<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;
  operationName: string;
}
export const toggleReminderEnabledRef: ToggleReminderEnabledRef;

export function toggleReminderEnabled(vars: ToggleReminderEnabledVariables): MutationPromise<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;
export function toggleReminderEnabled(dc: DataConnect, vars: ToggleReminderEnabledVariables): MutationPromise<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;

interface ListDosesForMedicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListDosesForMedicationVariables): QueryRef<ListDosesForMedicationData, ListDosesForMedicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListDosesForMedicationVariables): QueryRef<ListDosesForMedicationData, ListDosesForMedicationVariables>;
  operationName: string;
}
export const listDosesForMedicationRef: ListDosesForMedicationRef;

export function listDosesForMedication(vars: ListDosesForMedicationVariables): QueryPromise<ListDosesForMedicationData, ListDosesForMedicationVariables>;
export function listDosesForMedication(dc: DataConnect, vars: ListDosesForMedicationVariables): QueryPromise<ListDosesForMedicationData, ListDosesForMedicationVariables>;

