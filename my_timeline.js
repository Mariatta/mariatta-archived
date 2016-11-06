// Create a Timeline
var source   = document.getElementById('item-template').innerHTML;
var template = Handlebars.compile(document.getElementById('item-template').innerHTML);
var container = document.getElementById('visualization');

// Configuration for the Timeline
var options = {
    width: '100%',
    template: template,
    orientation: {
        axis: "top",
        item: "top"
    },
    min: new Date(2016, 6, 1)
};

var contribItems = new vis.DataSet(contrib_data); //stored in ./contrib_data.js

var timeline = new vis.Timeline(container);
timeline.setOptions(options);
timeline.setItems(contribItems);
/**
 * Move the timeline a given percentage to left or right
 * @param {Number} percentage   For example 0.1 (left) or -0.1 (right)
 */
function move (percentage) {
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end:   range.end.valueOf()   - interval * percentage
    });
}

/**
 * Zoom the timeline a given percentage in or out
 * @param {Number} percentage   For example 0.1 (zoom out) or -0.1 (zoom in)
 */
function zoom (percentage) {
    console.log("zommed");
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end:   range.end.valueOf()   + interval * percentage
    });
}

// attach events to the navigation buttons
document.getElementById('zoomIn').onclick    = function () { zoom(-0.2); };
document.getElementById('zoomOut').onclick   = function () { zoom( 0.2); };
document.getElementById('moveLeft').onclick  = function () { move( 0.2); };
document.getElementById('moveRight').onclick = function () { move(-0.2); };