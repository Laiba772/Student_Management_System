#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    ID;
    name;
    coursesEnrolled;
    feesAmount;
    constructor(name, ID, coursesEnrolled, feesAmount) {
        this.ID = ID;
        this.name = name;
        this.coursesEnrolled = coursesEnrolled;
        this.feesAmount = feesAmount;
    }
}
let baseID = 10000;
let studentID = "";
let continueEnrollment = true;
let students = [];
do {
    let { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: (" Please select an action:\n"),
        choices: ["Enroll a student", "Show student status"]
    });
    if (action === "Enroll a student") {
        let { studentName } = await inquirer.prompt({
            type: "input",
            name: "studentName",
            message: ("Enter your name:"),
        });
        let trimmedStudentName = studentName.trim().toLowerCase();
        let studentNamesCheck = students.map((obj) => obj.name);
        if (studentNamesCheck.includes(trimmedStudentName) === false) {
            if (trimmedStudentName !== "") {
                baseID++;
                studentID = "STID" + baseID;
                console.log("\n\t Your account has been created.");
                console.log(`\t\tWelcome, ${trimmedStudentName}!\n`);
                let { course } = await inquirer.prompt({
                    type: "list",
                    name: "course",
                    message: (" Please select a course:"),
                    choices: ["English", "IT", "Cooking"],
                });
                let courseFees = 0;
                switch (course) {
                    case "English":
                        courseFees = 500;
                        break;
                    case "IT":
                        courseFees = 1000;
                        break;
                    case "Cooking":
                        courseFees = 200;
                        break;
                    default:
                        break;
                }
                let { courseConfirmation } = await inquirer.prompt({
                    type: "confirm",
                    name: "courseConfirmation",
                    message: (`Do you want to enroll in the ${course} course for $${courseFees}?`),
                });
                if (courseConfirmation === true) {
                    let student = new Student(trimmedStudentName, studentID, [course], courseFees);
                    students.push(student);
                    console.log("\n\t You have successfully enrolled in the course!\n");
                }
            }
            else {
                console.log("\n\t Invalid name.\n");
            }
        }
        else {
            console.log("\n\t Name already exists.\n");
        }
    }
    else if (action === ("Show student status")) {
        if (students.length !== 0) {
            let studentNames = students.map((student) => student.name);
            let { selectedStudent } = await inquirer.prompt({
                type: "list",
                name: "selectedStudent",
                message: ("\n Please select a student:"),
                choices: studentNames,
            });
            let foundStudent = students.find((student) => student.name === selectedStudent);
            console.log("\n\t Student Information:");
            console.log(foundStudent);
            console.log("\n");
        }
        else {
            console.log("\n\t Record is Empty, First Enroll a Student.\n");
        }
    }
    let { userConfirmation } = await inquirer.prompt({
        type: "confirm",
        name: "userConfirmation",
        message: ("Do you want to continue?"),
    });
    if (userConfirmation === false) {
        continueEnrollment = false;
    }
} while (continueEnrollment);
