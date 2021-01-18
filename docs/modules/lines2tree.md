[icalts](../README.md) / [Exports](../modules.md) / lines2tree

# Module: lines2tree

## Table of contents

### Type aliases

- [KeyValue](lines2tree.md#keyvalue)
- [TreeType](lines2tree.md#treetype)

### Functions

- [lines2tree](lines2tree.md#lines2tree)

## Type aliases

### KeyValue

Ƭ **KeyValue**: { [key: string]: [*KeyValue*](lines2tree.md#keyvalue)[] \| [*TreeType*](lines2tree.md#treetype) \| *string*;  }

Defined in: [lines2tree.ts:11](https://github.com/eugenehp/icalts/blob/d408871/src/lines2tree.ts#L11)

___

### TreeType

Ƭ **TreeType**: { [key: string]: [*KeyValue*](lines2tree.md#keyvalue)[] \| [*TreeType*](lines2tree.md#treetype) \| *string*;  }

Defined in: [lines2tree.ts:15](https://github.com/eugenehp/icalts/blob/d408871/src/lines2tree.ts#L15)

## Functions

### lines2tree

▸ `Const`**lines2tree**(`rawLines`: *string*[]): [*TreeType*](lines2tree.md#treetype)

Returns JSON structure of processed ICS tree

**`example`** output:

```json
 {
   "VCALENDAR": [
     {
       "PRODID": "-//Google Inc//Google Calendar 70.9054//EN",
       "VERSION": "2.0",
       "CALSCALE": "GREGORIAN",
       "X-WR-CALNAME": "calmozilla1@gmail.com",
       "X-WR-TIMEZONE": "America/Los_Angeles",
       "VTIMEZONE": [
         {
           "TZID": "America/Los_Angeles",
           "X-LIC-LOCATION": "America/Los_Angeles",
           "DAYLIGHT": [
             {
               "TZOFFSETFROM": "-0800",
               "TZOFFSETTO": "-0700",
               "TZNAME": "PDT",
               "DTSTART": "19700308T020000",
               "RRULE": "FREQ=YEARLY;BYMONTH=3;BYDAY=2SU"
             }
           ],
           "STANDARD": [
             {
               "TZOFFSETFROM": "-0700",
               "TZOFFSETTO": "-0800",
               "TZNAME": "PST",
               "DTSTART": "19701101T020000",
               "RRULE": "FREQ=YEARLY;BYMONTH=11;BYDAY=1SU"
             }
           ]
         }
       ],
       "VEVENT": [
         {
           "DTSTART;TZID=America/Los_Angeles": "20120630T060000",
           "DTEND;TZID=America/Los_Angeles": "20120630T070000",
           "DTSTAMP": "20120724T212411Z",
           "UID": "dn4vrfmfn5p05roahsopg57h48@google.com",
           "CREATED": "20120724T212411Z",
           "DESCRIPTION": "",
           "LAST-MODIFIED": "20120724T212411Z",
           "LOCATION": "",
           "SEQUENCE": "0",
           "STATUS": "CONFIRMED",
           "SUMMARY": "Really long event name thing",
           "TRANSP": "OPAQUE",
           "VALARM": [
             {
               "ACTION": "EMAIL",
               "DESCRIPTION": "This is an event reminder",
               "SUMMARY": "Alarm notification",
               "ATTENDEE": "mailto:calmozilla1@gmail.com",
               "TRIGGER": "-P0DT0H30M0S"
             },
             {
               "ACTION": "DISPLAY",
               "DESCRIPTION": "This is an event reminder",
               "TRIGGER": "-P0DT0H30M0S"
             }
           ]
         }
       ]
     }
   ]
 }
```

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`rawLines` | *string*[] | input array of string from the ICS file    |

**Returns:** [*TreeType*](lines2tree.md#treetype)

Defined in: [lines2tree.ts:134](https://github.com/eugenehp/icalts/blob/d408871/src/lines2tree.ts#L134)
