global.$ = $;

var googleImages = require('../lib/image-downloader');
var request = require("request");
var fs = require("fs");
var path = require("path");

$(document).ready(function () {
	$("#search-input").on("keypress", function (event) {
		if (event.keyCode===13) { // enter
			$("#search").click();
		}
	});
	$("#search").on('click', function () {
		var inputData = $("#search-input").val(),
			element = $("#results"),
			num = 5;

		element.empty();
		googleImages.clearResults();

		if (num) {
			num = parseInt(num, 10);
			if (num <= 0) {
				alert("Number should be a number");
			}
		}

		googleImages.init(inputData, num, function () {
			var results = googleImages.getResults(),
				obj,
				img,
				i;

			for (i = 0; i < results.length; i++) {
				obj = results[i];
				img = $("<img/>").addClass("img-responsive").attr("src", obj.url).data('id', i);
				img.on("click", function () {
					var id = $(this).data('id');
					$("#saveAs-"+id).click();
				});
				element.append($("<div/>").addClass("col-lg-4 col-md-4 col-xs-4 thumb").append(img));
				element.append($("<input/>")
					.attr("id", "saveAs-" + i)
					.attr("type", "file")
					.attr("nwsaveas", path.basename(obj.url))
					.on("change", function () {
						var newFileName = $(this).val();
						var stream = fs.createWriteStream(newFileName);
						//noinspection JSReferencingMutableVariableFromClosure
						request(obj.url).pipe(stream);
					}).attr("style", "visibility: hidden; display: none;"));
			}

		});
	});

});