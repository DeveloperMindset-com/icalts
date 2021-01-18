import fs from 'fs'
import { NEW_LINE } from '../src/constants'
import { lines2tree } from '../src/lines2tree'

describe("lines2tree - transform file to a json tree", () => {
    it("parses ics correctly", () => {
        const filename = `blank_description`
        const file = fs.readFileSync(`./samples/${filename}.ics`, 'utf-8')
        const json = fs.readFileSync(`./samples/${filename}.json`, 'utf-8')
        const lines = file.split(NEW_LINE)
        const obj = lines2tree(lines)

        const generatesJSON = JSON.stringify(obj, null, 2)
        expect(generatesJSON).toEqual(json)
    })
})