var imageDownloader = require("../lib/image-downloader");

describe("Image downloader", function () {
	it("Init first", function () {
		expect(function () {
			imageDownloader.downloadImages("path");
		}).toThrow("Call init first!");
		expect(function () {
			imageDownloader.getProgress();
		}).toThrow("Call init first!");
		expect(function () {
			imageDownloader.getResults();
		}).toThrow("Call init first!");
	});

	it("Parse number of results", function () {
		expect(imageDownloader._checkNumber("aaa")).toBe(false);
		expect(imageDownloader._checkNumber("-1232")).toBe(false);
		expect(imageDownloader._checkNumber("-1.2")).toBe(false);
		expect(imageDownloader._checkNumber("1.2")).toBe(true);
		expect(imageDownloader._checkNumber("5")).toBe(true);
		expect(imageDownloader._checkNumber("100")).toBe(true);
		expect(imageDownloader._checkNumber("101")).toBe(false);
		expect(imageDownloader._checkNumber(null)).toBe(false);
		expect(imageDownloader._checkNumber(undefined)).toBe(false);
	});
});