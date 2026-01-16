# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMedicationsForUser*](#getmedicationsforuser)
  - [*ListDosesForMedication*](#listdosesformedication)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*ToggleReminderEnabled*](#togglereminderenabled)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMedicationsForUser
You can execute the `GetMedicationsForUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMedicationsForUser(): QueryPromise<GetMedicationsForUserData, undefined>;

interface GetMedicationsForUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMedicationsForUserData, undefined>;
}
export const getMedicationsForUserRef: GetMedicationsForUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMedicationsForUser(dc: DataConnect): QueryPromise<GetMedicationsForUserData, undefined>;

interface GetMedicationsForUserRef {
  ...
  (dc: DataConnect): QueryRef<GetMedicationsForUserData, undefined>;
}
export const getMedicationsForUserRef: GetMedicationsForUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMedicationsForUserRef:
```typescript
const name = getMedicationsForUserRef.operationName;
console.log(name);
```

### Variables
The `GetMedicationsForUser` query has no variables.
### Return Type
Recall that executing the `GetMedicationsForUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMedicationsForUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMedicationsForUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMedicationsForUser } from '@dataconnect/generated';


// Call the `getMedicationsForUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMedicationsForUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMedicationsForUser(dataConnect);

console.log(data.medications);

// Or, you can use the `Promise` API.
getMedicationsForUser().then((response) => {
  const data = response.data;
  console.log(data.medications);
});
```

### Using `GetMedicationsForUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMedicationsForUserRef } from '@dataconnect/generated';


// Call the `getMedicationsForUserRef()` function to get a reference to the query.
const ref = getMedicationsForUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMedicationsForUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.medications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.medications);
});
```

## ListDosesForMedication
You can execute the `ListDosesForMedication` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listDosesForMedication(vars: ListDosesForMedicationVariables): QueryPromise<ListDosesForMedicationData, ListDosesForMedicationVariables>;

interface ListDosesForMedicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListDosesForMedicationVariables): QueryRef<ListDosesForMedicationData, ListDosesForMedicationVariables>;
}
export const listDosesForMedicationRef: ListDosesForMedicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listDosesForMedication(dc: DataConnect, vars: ListDosesForMedicationVariables): QueryPromise<ListDosesForMedicationData, ListDosesForMedicationVariables>;

interface ListDosesForMedicationRef {
  ...
  (dc: DataConnect, vars: ListDosesForMedicationVariables): QueryRef<ListDosesForMedicationData, ListDosesForMedicationVariables>;
}
export const listDosesForMedicationRef: ListDosesForMedicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listDosesForMedicationRef:
```typescript
const name = listDosesForMedicationRef.operationName;
console.log(name);
```

### Variables
The `ListDosesForMedication` query requires an argument of type `ListDosesForMedicationVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListDosesForMedicationVariables {
  medicationId: UUIDString;
}
```
### Return Type
Recall that executing the `ListDosesForMedication` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListDosesForMedicationData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListDosesForMedicationData {
  doses: ({
    id: UUIDString;
    scheduledTime: TimestampString;
    actualTakenTime?: TimestampString | null;
    taken?: boolean | null;
    notes?: string | null;
  } & Dose_Key)[];
}
```
### Using `ListDosesForMedication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listDosesForMedication, ListDosesForMedicationVariables } from '@dataconnect/generated';

// The `ListDosesForMedication` query requires an argument of type `ListDosesForMedicationVariables`:
const listDosesForMedicationVars: ListDosesForMedicationVariables = {
  medicationId: ..., 
};

// Call the `listDosesForMedication()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listDosesForMedication(listDosesForMedicationVars);
// Variables can be defined inline as well.
const { data } = await listDosesForMedication({ medicationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listDosesForMedication(dataConnect, listDosesForMedicationVars);

console.log(data.doses);

// Or, you can use the `Promise` API.
listDosesForMedication(listDosesForMedicationVars).then((response) => {
  const data = response.data;
  console.log(data.doses);
});
```

### Using `ListDosesForMedication`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listDosesForMedicationRef, ListDosesForMedicationVariables } from '@dataconnect/generated';

// The `ListDosesForMedication` query requires an argument of type `ListDosesForMedicationVariables`:
const listDosesForMedicationVars: ListDosesForMedicationVariables = {
  medicationId: ..., 
};

// Call the `listDosesForMedicationRef()` function to get a reference to the query.
const ref = listDosesForMedicationRef(listDosesForMedicationVars);
// Variables can be defined inline as well.
const ref = listDosesForMedicationRef({ medicationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listDosesForMedicationRef(dataConnect, listDosesForMedicationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.doses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.doses);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## ToggleReminderEnabled
You can execute the `ToggleReminderEnabled` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
toggleReminderEnabled(vars: ToggleReminderEnabledVariables): MutationPromise<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;

interface ToggleReminderEnabledRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ToggleReminderEnabledVariables): MutationRef<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;
}
export const toggleReminderEnabledRef: ToggleReminderEnabledRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
toggleReminderEnabled(dc: DataConnect, vars: ToggleReminderEnabledVariables): MutationPromise<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;

interface ToggleReminderEnabledRef {
  ...
  (dc: DataConnect, vars: ToggleReminderEnabledVariables): MutationRef<ToggleReminderEnabledData, ToggleReminderEnabledVariables>;
}
export const toggleReminderEnabledRef: ToggleReminderEnabledRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the toggleReminderEnabledRef:
```typescript
const name = toggleReminderEnabledRef.operationName;
console.log(name);
```

### Variables
The `ToggleReminderEnabled` mutation requires an argument of type `ToggleReminderEnabledVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ToggleReminderEnabledVariables {
  reminderId: UUIDString;
  enabled: boolean;
}
```
### Return Type
Recall that executing the `ToggleReminderEnabled` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ToggleReminderEnabledData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ToggleReminderEnabledData {
  reminder_update?: Reminder_Key | null;
}
```
### Using `ToggleReminderEnabled`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, toggleReminderEnabled, ToggleReminderEnabledVariables } from '@dataconnect/generated';

// The `ToggleReminderEnabled` mutation requires an argument of type `ToggleReminderEnabledVariables`:
const toggleReminderEnabledVars: ToggleReminderEnabledVariables = {
  reminderId: ..., 
  enabled: ..., 
};

// Call the `toggleReminderEnabled()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await toggleReminderEnabled(toggleReminderEnabledVars);
// Variables can be defined inline as well.
const { data } = await toggleReminderEnabled({ reminderId: ..., enabled: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await toggleReminderEnabled(dataConnect, toggleReminderEnabledVars);

console.log(data.reminder_update);

// Or, you can use the `Promise` API.
toggleReminderEnabled(toggleReminderEnabledVars).then((response) => {
  const data = response.data;
  console.log(data.reminder_update);
});
```

### Using `ToggleReminderEnabled`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, toggleReminderEnabledRef, ToggleReminderEnabledVariables } from '@dataconnect/generated';

// The `ToggleReminderEnabled` mutation requires an argument of type `ToggleReminderEnabledVariables`:
const toggleReminderEnabledVars: ToggleReminderEnabledVariables = {
  reminderId: ..., 
  enabled: ..., 
};

// Call the `toggleReminderEnabledRef()` function to get a reference to the mutation.
const ref = toggleReminderEnabledRef(toggleReminderEnabledVars);
// Variables can be defined inline as well.
const ref = toggleReminderEnabledRef({ reminderId: ..., enabled: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = toggleReminderEnabledRef(dataConnect, toggleReminderEnabledVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reminder_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reminder_update);
});
```

