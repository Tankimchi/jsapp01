document.getElementById('IssueInputForm').addEventListener('submit', saveIssue);
function saveIssue(e){
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueCategory = document.getElementById('issueCategoryInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    category: issueCategory,
    assignedTo: issueAssignedTo,
    status: issueStatus

  }
  if (localStorage.getItem('issues')==null){
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('IssueInputForm').reset();
  fetchIssues();

  e.preventDefault();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getitem('issues'));
  var issuesList = document.getElementByID('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i <issues.length; i++){
    var id = issues[i].id;
    var desc = issues[i].description;
    var category = issues[i].category;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML += '<div class="well">'+
                            '<h6>Issue ID: '+ id + '</h6>' +
                            '<p><span class="label label-info">'+status +'</span></p>'+
                            '<h3>' + desc +'</h3>'
                            '<p><span class="glyphicon glyphicon-time"></span>' + category + '<p>'+
                            '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo '</p>'+
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                            '</div>';
  }
}
