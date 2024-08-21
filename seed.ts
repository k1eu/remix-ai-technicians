import { db } from "./app/modules/database/db.ts";
import { technicianAvailabilityTable } from "./app/modules/database/schema.ts";
const seed = [
  {
    "id": 1,
    "technicianId": 1,
    "startTime": "2024-08-25T09:00:00Z",
    "endTime": "2024-08-25T17:00:00Z",
    "pricePerHour": "35.00",
    "currencyCode": "USD"
  },
  {
    "id": 2,
    "technicianId": 1,
    "startTime": "2024-09-05T10:00:00Z",
    "endTime": "2024-09-05T18:00:00Z",
    "pricePerHour": "35.00",
    "currencyCode": "USD"
  },
  {
    "id": 3,
    "technicianId": 1,
    "startTime": "2024-09-15T08:00:00Z",
    "endTime": "2024-09-15T16:00:00Z",
    "pricePerHour": "35.00",
    "currencyCode": "USD"
  },
  {
    "id": 4,
    "technicianId": 2,
    "startTime": "2024-08-28T11:00:00Z",
    "endTime": "2024-08-28T19:00:00Z",
    "pricePerHour": "40.00",
    "currencyCode": "USD"
  },
  {
    "id": 5,
    "technicianId": 2,
    "startTime": "2024-09-08T09:30:00Z",
    "endTime": "2024-09-08T17:30:00Z",
    "pricePerHour": "40.00",
    "currencyCode": "USD"
  },
  {
    "id": 6,
    "technicianId": 2,
    "startTime": "2024-09-18T10:30:00Z",
    "endTime": "2024-09-18T18:30:00Z",
    "pricePerHour": "40.00",
    "currencyCode": "USD"
  },
  {
    "id": 7,
    "technicianId": 3,
    "startTime": "2024-08-22T08:30:00Z",
    "endTime": "2024-08-22T16:30:00Z",
    "pricePerHour": "38.00",
    "currencyCode": "USD"
  },
  {
    "id": 8,
    "technicianId": 3,
    "startTime": "2024-09-01T09:00:00Z",
    "endTime": "2024-09-01T17:00:00Z",
    "pricePerHour": "38.00",
    "currencyCode": "USD"
  },
  {
    "id": 9,
    "technicianId": 3,
    "startTime": "2024-09-11T10:00:00Z",
    "endTime": "2024-09-11T18:00:00Z",
    "pricePerHour": "38.00",
    "currencyCode": "USD"
  },
  {
    "id": 10,
    "technicianId": 4,
    "startTime": "2024-08-24T09:30:00Z",
    "endTime": "2024-08-24T17:30:00Z",
    "pricePerHour": "42.00",
    "currencyCode": "USD"
  },
  {
    "id": 11,
    "technicianId": 4,
    "startTime": "2024-09-03T08:00:00Z",
    "endTime": "2024-09-03T16:00:00Z",
    "pricePerHour": "42.00",
    "currencyCode": "USD"
  },
  {
    "id": 12,
    "technicianId": 4,
    "startTime": "2024-09-13T11:00:00Z",
    "endTime": "2024-09-13T19:00:00Z",
    "pricePerHour": "42.00",
    "currencyCode": "USD"
  },
  {
    "id": 13,
    "technicianId": 5,
    "startTime": "2024-08-26T10:00:00Z",
    "endTime": "2024-08-26T18:00:00Z",
    "pricePerHour": "37.00",
    "currencyCode": "USD"
  },
  {
    "id": 14,
    "technicianId": 5,
    "startTime": "2024-09-05T09:00:00Z",
    "endTime": "2024-09-05T17:00:00Z",
    "pricePerHour": "37.00",
    "currencyCode": "USD"
  },
  {
    "id": 15,
    "technicianId": 5,
    "startTime": "2024-09-15T11:30:00Z",
    "endTime": "2024-09-15T19:30:00Z",
    "pricePerHour": "37.00",
    "currencyCode": "USD"
  },
  {
    "id": 16,
    "technicianId": 6,
    "startTime": "2024-08-29T08:30:00Z",
    "endTime": "2024-08-29T16:30:00Z",
    "pricePerHour": "39.00",
    "currencyCode": "USD"
  },
  {
    "id": 17,
    "technicianId": 6,
    "startTime": "2024-09-08T10:00:00Z",
    "endTime": "2024-09-08T18:00:00Z",
    "pricePerHour": "39.00",
    "currencyCode": "USD"
  },
  {
    "id": 18,
    "technicianId": 6,
    "startTime": "2024-09-18T09:30:00Z",
    "endTime": "2024-09-18T17:30:00Z",
    "pricePerHour": "39.00",
    "currencyCode": "USD"
  },
  {
    "id": 19,
    "technicianId": 7,
    "startTime": "2024-08-23T11:00:00Z",
    "endTime": "2024-08-23T19:00:00Z",
    "pricePerHour": "41.00",
    "currencyCode": "USD"
  },
  {
    "id": 20,
    "technicianId": 7,
    "startTime": "2024-09-02T09:00:00Z",
    "endTime": "2024-09-02T17:00:00Z",
    "pricePerHour": "41.00",
    "currencyCode": "USD"
  },
  {
    "id": 21,
    "technicianId": 7,
    "startTime": "2024-09-12T10:30:00Z",
    "endTime": "2024-09-12T18:30:00Z",
    "pricePerHour": "41.00",
    "currencyCode": "USD"
  },
  {
    "id": 22,
    "technicianId": 8,
    "startTime": "2024-08-27T09:30:00Z",
    "endTime": "2024-08-27T17:30:00Z",
    "pricePerHour": "36.00",
    "currencyCode": "USD"
  },
  {
    "id": 23,
    "technicianId": 8,
    "startTime": "2024-09-06T08:00:00Z",
    "endTime": "2024-09-06T16:00:00Z",
    "pricePerHour": "36.00",
    "currencyCode": "USD"
  },
  {
    "id": 24,
    "technicianId": 8,
    "startTime": "2024-09-16T10:00:00Z",
    "endTime": "2024-09-16T18:00:00Z",
    "pricePerHour": "36.00",
    "currencyCode": "USD"
  },
  {
    "id": 25,
    "technicianId": 9,
    "startTime": "2024-08-30T10:30:00Z",
    "endTime": "2024-08-30T18:30:00Z",
    "pricePerHour": "43.00",
    "currencyCode": "USD"
  },
  {
    "id": 26,
    "technicianId": 9,
    "startTime": "2024-09-09T09:00:00Z",
    "endTime": "2024-09-09T17:00:00Z",
    "pricePerHour": "43.00",
    "currencyCode": "USD"
  },
  {
    "id": 27,
    "technicianId": 9,
    "startTime": "2024-09-19T11:00:00Z",
    "endTime": "2024-09-19T19:00:00Z",
    "pricePerHour": "43.00",
    "currencyCode": "USD"
  },
  {
    "id": 28,
    "technicianId": 10,
    "startTime": "2024-08-21T09:00:00Z",
    "endTime": "2024-08-21T17:00:00Z",
    "pricePerHour": "38.00",
    "currencyCode": "USD"
  },
  {
    "id": 29,
    "technicianId": 10,
    "startTime": "2024-08-31T10:00:00Z",
    "endTime": "2024-08-31T18:00:00Z",
    "pricePerHour": "38.00",
    "currencyCode": "USD"
  },
  {
    "id": 30,
    "technicianId": 10,
    "startTime": "2024-09-10T08:30:00Z",
    "endTime": "2024-09-10T16:30:00Z",
    "pricePerHour": "38.00",
    "currencyCode": "USD"
  }
]



await db.insert(technicianAvailabilityTable).values(seed).execute();
