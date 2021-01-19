export interface VBase {
    [key:string]:string
}

export type CalScale = 'GREGORIAN'

export interface VCalendarInterface extends VBase {
    prodid:string;
    version:string;
    scale:CalScale;
    name:string;
    timezoneName:string;

// X-WR-CALNAME:Revolution Parties
// X-WR-CALDESC:Celebrations of various revolutionary activities.
// X-WR-RELCALID:3E26604A-50F4-4449-8B3E-E4F4932D05B5
// X-WR-TIMEZONE:US/Pacific
}