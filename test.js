import fs from "fs";
import pify from "pify";
import test from "ava";
import convert from "./index";
import isJpg from "is-jpg";

const fsP = pify(fs);

let fixture;

test.beforeEach(async t => {
    fixture = await fsP.readFile("./fixture.png");
    t.true(fixture.length > 0);
});

test("converts a png into a smaller buffer", async t => {
    let bufferOut = await convert()(fixture);
    t.true(bufferOut.length < fixture.length);
});

test("converts a png into a buffer that looks like a jpeg", async t => {
    let bufferOut = await convert()(fixture);
    t.true(isJpg(bufferOut));
});

test("accepts a quality parameter", async t => {
    let bufferOut100 = await convert({quality: 100})(fixture);
    let bufferOut50 = await convert({quality: 50})(fixture);
    t.true(bufferOut50.length < bufferOut100.length);
});

test("throws error if quality parameter is not valid", t => {
    t.throws(convert({quality: "50"}), /only accepts integers/);
    t.throws(convert({quality: 40.2}), /only accepts integers/);
    t.throws(convert({quality: 0}), /between 1-100/);
    t.throws(convert({quality: 101}), /between 1-100/);
});

