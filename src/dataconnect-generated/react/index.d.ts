import { CreateUserData, GetMedicationsForUserData, ToggleReminderEnabledData, ToggleReminderEnabledVariables, ListDosesForMedicationData, ListDosesForMedicationVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useGetMedicationsForUser(options?: useDataConnectQueryOptions<GetMedicationsForUserData>): UseDataConnectQueryResult<GetMedicationsForUserData, undefined>;
export function useGetMedicationsForUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetMedicationsForUserData>): UseDataConnectQueryResult<GetMedicationsForUserData, undefined>;

export function useToggleReminderEnabled(options?: useDataConnectMutationOptions<ToggleReminderEnabledData, FirebaseError, ToggleReminderEnabledVariables>): UseDataConnectMutationResult<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;
export function useToggleReminderEnabled(dc: DataConnect, options?: useDataConnectMutationOptions<ToggleReminderEnabledData, FirebaseError, ToggleReminderEnabledVariables>): UseDataConnectMutationResult<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;

export function useListDosesForMedication(vars: ListDosesForMedicationVariables, options?: useDataConnectQueryOptions<ListDosesForMedicationData>): UseDataConnectQueryResult<ListDosesForMedicationData, ListDosesForMedicationVariables>;
export function useListDosesForMedication(dc: DataConnect, vars: ListDosesForMedicationVariables, options?: useDataConnectQueryOptions<ListDosesForMedicationData>): UseDataConnectQueryResult<ListDosesForMedicationData, ListDosesForMedicationVariables>;
