/**
 * Test hooks
 */

import expect from "expect";
import { extractCurrencies } from "../general";


describe("general", () => {

    describe("extractCurrencies", () => {
        it("s => '/'", () => {
            let s = "/";
            expect(extractCurrencies(s), null);
        });

        it("s => '/exchange/btc-eth'", () => {
            let s = "/exchange/btc-eth";
            expect(extractCurrencies(s)[1], 'btc');
            expect(extractCurrencies(s)[2], 'eth');
        });
    });
});
