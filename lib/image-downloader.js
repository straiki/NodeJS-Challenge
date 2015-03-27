"use strict";

var client = require('google-images');
var downloader = require('downloader');
var path = require('path');
var fs = require('fs');

var myModule = {
	/** @private */
	_progress: 0.0,
	/** @private */
	_max: 1.0,
	/** @private */
	_step: 0.1,
	/** @private */
	_results: [],
	/** @private */
	_jsonOutput: [],
	/** @private */
	_initialized: false,
	/** @private */
	_onUpdateProgress: function () {},

	/**
	 * @public
	 * @param {string} keyword
	 * @param {number} count
	 * @param {function=} callback
	 * @param {function=} onUpdateProgress
	 */
	init: function (keyword, count, callback, onUpdateProgress) {
		var self = this,
			page = 0,
			num,
			i,
			dataCallback = function (err, data) {
				for (i = 0; i < data.length; i++) {
					self._results.push(data[i]);
					num--;
					if (num === 0) {
						break;
					}
				}
				if (num === 0) {
					if (callback) {
						callback();
					}
				} else {
					page += 8;
					client.search(keyword, {callback: dataCallback, page: page});
				}
			};
		this._initialized = true;
		if (this._checkNumber(count)) {
			num = parseInt(count);
		} else {
			console.log("Can't parse inserted number - using default.");
			num = 5;
		}


		if (onUpdateProgress && typeof onUpdateProgress === "function") {
			this._onUpdateProgress = onUpdateProgress;
		}

		this._progress = 0.0;
		this._step = 1 / num;

		client.search(keyword, {callback: dataCallback, page: ++page});
	},
	/**
	 * @public
	 * @param pathToDownload
	 * @param {function=} callback
	 */
	downloadImages: function (pathToDownload, callback) {
		var self = this,
			doneCallback = function (msg) {
				console.log(msg);
				self._updateProgress();
				if (callback && self._progress >= self._max) {
					console.log("Downloading done..");
					callback();
				} else if (self._progress >= self._max) {
					console.log("Downloading done..");
				}
			};

		if (!this._checkInitialized()) {
			throw "Call init first!";
		}

		this._checkPath(pathToDownload);

		downloader.on('done', doneCallback);
		downloader.on('error', doneCallback);

		console.log("Downloading to: " + path.resolve(pathToDownload));
		for (var i = 0; i < this._results.length; i++) {
			downloader.download(this._results[i].unescapedUrl, path.resolve(pathToDownload) + "/");
		}
	},
	/**
	 * @public
	 * @returns {Array}
	 */
	getResults: function () {
		var output = [],
			obj,
			i;

		if (!this._checkInitialized()) {
			throw "Call init first!";
		}

		for (i = 0; i < this._results.length; i++) {
			obj = this._results[i];
			output.push({url: obj.unescapedUrl});
		}
		this._jsonOutput = output;

		return output;
	},
	/**
	 * @public
	 * @returns {number}
	 */
	getProgress: function () {
		if (!this._checkInitialized()) {
			throw "Call init first!";
		}
		return this._progress;
	},
	/**
	 * @public
	 */
	clearResults: function () {
		this._results = [];
		this._jsonOutput = [];
	},
	/**
	 * @private
	 */
	_updateProgress: function () {
		if (this._progress < this._max) {
			this._progress += this._step;
		}
		this._onUpdateProgress(this.getProgress());
	},
	/**
	 * @param {string} dir
	 * @private
	 */
	_checkPath: function (dir) {
		var dirResolved = path.resolve(dir) + "/";

		if (!this._checkInitialized()) {
			throw "Call init first!";
		}

		if (!fs.existsSync(dirResolved)) {
			console.log("Directory does not exists, creating");
			fs.mkdirSync(dirResolved);
		}
	},
	/**
	 * @returns {boolean}
	 * @private
	 */
	_checkInitialized: function () {
		return this._initialized;
	},
	/**
	 * @param {number} num
	 * @private
	 */
	_checkNumber: function (num) {
		num = parseInt(num, 10);

		return !(num <= 0 || isNaN(num) || num > 100);
	}
};

module.exports = myModule;