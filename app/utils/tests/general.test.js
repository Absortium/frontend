/**
 * Test hooks
 */

import expect from "expect";
import { extractCurrencies } from "../general";


describe("general", () => {

    describe("extractCurrencies", () => {
        it("s => '/'", () => {

            let s = "/"
            expect(extractCurrencies(s),);
        });
    });
});
