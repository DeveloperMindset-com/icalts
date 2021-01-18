import {
    COLON,
    BEGIN,
    END,

    ComponentType,
    SPACE,
    // SPACE
} from './constants'

export type KeyValue = {
    [key:string]: KeyValue[] | TreeType | string
}

export type TreeType = {
    [key:string]: KeyValue[] | TreeType | string
}

/**
 * Parses content lines according to RFC5545 {@link https://tools.ietf.org/html/rfc5545#section-3.1}
 * 
 * @remarks not exposed for external use
 * 
 * @example input:
 * 
 * ```
 * DESCRIPTION:This is a lo
 *    ng description
 *     that exists on a long line.
 * ```
 * 
 * @example output:
 * 
 * ```
 * DESCRIPTION:This is a long description that exists on a long line.
 * ```
 * 
 * @param lines array of lines
 * 
 * @returns arrays of lines with content lines merged into a single string for each occurance
 * 
 */
const preprocessing = (lines:string[]):string[] => {
    let output:string[] = []

    for(let i=0;i<lines.length;i++){
        const line = lines[i]
    
        if(line.startsWith(SPACE)){
            output[output.length-1] += line.trim()
        }else if(line){
            output.push(line)
        }
    }

    return output
}

/**
 * Returns JSON structure of processed ICS tree
 * 
 * @example output:
 * 
 * ```json
  *  {
 *    "VCALENDAR": [
 *      {
 *        "PRODID": "-//Google Inc//Google Calendar 70.9054//EN",
 *        "VERSION": "2.0",
 *        "CALSCALE": "GREGORIAN",
 *        "X-WR-CALNAME": "calmozilla1@gmail.com",
 *        "X-WR-TIMEZONE": "America/Los_Angeles",
 *        "VTIMEZONE": [
 *          {
 *            "TZID": "America/Los_Angeles",
 *            "X-LIC-LOCATION": "America/Los_Angeles",
 *            "DAYLIGHT": [
 *              {
 *                "TZOFFSETFROM": "-0800",
 *                "TZOFFSETTO": "-0700",
 *                "TZNAME": "PDT",
 *                "DTSTART": "19700308T020000",
 *                "RRULE": "FREQ=YEARLY;BYMONTH=3;BYDAY=2SU"
 *              }
 *            ],
 *            "STANDARD": [
 *              {
 *                "TZOFFSETFROM": "-0700",
 *                "TZOFFSETTO": "-0800",
 *                "TZNAME": "PST",
 *                "DTSTART": "19701101T020000",
 *                "RRULE": "FREQ=YEARLY;BYMONTH=11;BYDAY=1SU"
 *              }
 *            ]
 *          }
 *        ],
 *        "VEVENT": [
 *          {
 *            "DTSTART;TZID=America/Los_Angeles": "20120630T060000",
 *            "DTEND;TZID=America/Los_Angeles": "20120630T070000",
 *            "DTSTAMP": "20120724T212411Z",
 *            "UID": "dn4vrfmfn5p05roahsopg57h48@google.com",
 *            "CREATED": "20120724T212411Z",
 *            "DESCRIPTION": "",
 *            "LAST-MODIFIED": "20120724T212411Z",
 *            "LOCATION": "",
 *            "SEQUENCE": "0",
 *            "STATUS": "CONFIRMED",
 *            "SUMMARY": "Really long event name thing",
 *            "TRANSP": "OPAQUE",
 *            "VALARM": [
 *              {
 *                "ACTION": "EMAIL",
 *                "DESCRIPTION": "This is an event reminder",
 *                "SUMMARY": "Alarm notification",
 *                "ATTENDEE": "mailto:calmozilla1@gmail.com",
 *                "TRIGGER": "-P0DT0H30M0S"
 *              },
 *              {
 *                "ACTION": "DISPLAY",
 *                "DESCRIPTION": "This is an event reminder",
 *                "TRIGGER": "-P0DT0H30M0S"
 *              }
 *            ]
 *          }
 *        ]
 *      }
 *    ]
 *  }
 * ```
 * 
 * @param rawLines input array of string from the ICS file
 */
export const lines2tree = (rawLines:string[]):TreeType => {
    const lines:string[] = preprocessing(rawLines)
    return process(lines)
}

const process = (lines:string[], intend:number = 0):TreeType => {
    const output:TreeType = {}
    let componentName:ComponentType

    for(let i=0;i<lines.length;i++){
        const line = lines[i]
        const index = line.indexOf(COLON)

        const key = line.substr(0, index)
        const value = line.substr(index + 1)

        if(key === BEGIN){
            componentName = value as any
            const lastLine = [END, componentName].join(COLON)
            const lastIndex = lines.indexOf(lastLine, i)

            const newLines = lines.slice(i + 1, lastIndex)

            if(newLines.length){
                const tree = process(newLines, intend+1)

                if(!output[componentName])
                    output[componentName] = []

                const array:KeyValue[] = output[componentName] as any
                array.push(tree)
                output[componentName] = array

                i = lastIndex
            }
        }else if(line && !line.startsWith(END)){
            output[key] = value
        }
    }

    return output
}