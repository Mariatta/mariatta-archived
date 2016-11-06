
var source   = $("#timeline-template").html();
var template = Handlebars.compile(source);

contrib_data.sort(function(left, right) {
    return (moment(left.start).isBefore(moment(right.start))) ? 1 : (moment(left.start).isAfter(moment(right.start))  ? -1 : 0);});

var context = {'contrib_data': contrib_data};

var html    = template(context);

var entryPoint = document.getElementById('timeline-entry-point');
entryPoint.innerHTML = html;

var commitSummarySource   = $("#commit-summary").html();
var commitSummaryTemplate = Handlebars.compile(commitSummarySource);

var result = {};
for (var i =0; i < contrib_data.length; i++) {
    var data = contrib_data[i];
    if (!result.hasOwnProperty(data.repo_name)) {
        result[data.repo_name] = 0;
    }
    result[data.repo_name] = result[data.repo_name] + 1;
}
var commitSummaryContext = result;

var commitSummaryHtml    = commitSummaryTemplate(commitSummaryContext);

var commitSummaryEntryPoint = document.getElementById('commit-summary-entry-point');
commitSummaryEntryPoint.innerHTML = commitSummaryHtml;