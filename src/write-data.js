const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: new AWS.Endpoint('http://localhost:8000'),
  region: 'us-west-2',
  // what could you do to improve performance?
});

const tableName = 'SchoolStudents';

/**
 * The entry point into the lambda
 *
 * @param {Object} event
 * @param {string} event.schoolId
 * @param {string} event.schoolName
 * @param {string} event.studentId
 * @param {string} event.studentFirstName
 * @param {string} event.studentLastName
 * @param {string} event.studentGrade
 */
exports.handler = (event) => {
  // TODO validate that all expected attributes are present (assume they are all required)

  const expectedAttributes = ['schoolId', 'schoolName', 'studentId', 'studentFirstName', 'studentLastName', 'studentGrade'];

  const missingAttributes = expectedAttributes.every((studentRecord) => {
    return studentRecord.isEmpty();                  //returns true if empty
  });
  if (missingAttributes)
    return new Error("Error: Not all expected attributes are present.");

  // TODO use the AWS.DynamoDB.DocumentClient to save the 'SchoolStudent' record
  // The 'SchoolStudents' table key is composed of schoolId (partition key) and studentId (range key).
  const params = {
    TableName: tableName,
    Item: {
      schoolId: event.schoolId,
      studentId: event.studentId,
      schoolName: event.schoolName,
      studentFirstName: event.studentFirstName,
      studentLastName: event.studentLastName,
      studentGrade: event.studentGrade
    }
  };

  dynamodb.put(params, function(err, data) {
    if (err) return new Error("Error.");
    return data;
  });



};