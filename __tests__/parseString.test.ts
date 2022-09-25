import fs from 'fs'
import { NEW_LINE } from '../src/constants'
import { parseString } from '../src/parse'

describe("parseString - transform file to a json tree", () => {
    const filenames = [
        'blank_description',
        'blank_line_end',
        'blank_line_mid',
        'daily_recur',
        'day_long_recur_yearly',
        'duration_instead_of_dtend',
        'forced_types',
        'google_birthday',
        'minimal',
        'multiple_rrules',
        'only_dtstart_date',
        'only_dtstart_time',
        'parserv2',
        'recur_instances',
        'recur_instances_finite',
        'utc_negative_zero',
    ]
    filenames.map(filename => {
        it(`parses ${filename}.ics correctly`, () => {
            const file = fs.readFileSync(`./samples/ics/${filename}.ics`, 'utf-8')
            const json = fs.readFileSync(`./samples/json/${filename}.json`, 'utf-8')
            const lines = file.split(NEW_LINE)
            const obj = parseString(lines)
    
            const generatesJSON = JSON.stringify(obj, null, 2)
            expect(generatesJSON).toEqual(json)
        })
    })
})