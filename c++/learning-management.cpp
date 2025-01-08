#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <ctime>
#include <algorithm>
using namespace std;

class Assignment {
private:
    string title;
    string description;
    time_t dueDate;
    int maxScore;
    bool submitted;
    int score;

public:
    Assignment(string t, string desc, time_t due, int max)
        : title(t), description(desc), dueDate(due), maxScore(max), 
          submitted(false), score(0) {}

    string getTitle() const { return title; }
    string getDescription() const { return description; }
    time_t getDueDate() const { return dueDate; }
    int getMaxScore() const { return maxScore; }
    bool isSubmitted() const { return submitted; }
    int getScore() const { return score; }

    void submit() { submitted = true; }
    void grade(int s) { score = min(s, maxScore); }

    bool isLate() const {
        return time(0) > dueDate;
    }

    void displayInfo() const {
        cout << "\nAssignment: " << title << endl;
        cout << "Description: " << description << endl;
        cout << "Due Date: " << ctime(&dueDate);
        cout << "Maximum Score: " << maxScore << endl;
        cout << "Status: " << (submitted ? "Submitted" : "Pending") << endl;
        if (submitted) {
            cout << "Score: " << score << "/" << maxScore << endl;
        }
        if (isLate() && !submitted) {
            cout << "Warning: Assignment is overdue!" << endl;
        }
    }
};

class Course {
private:
    string courseId;
    string title;
    string instructor;
    string description;
    vector<Assignment> assignments;
    vector<string> enrolledStudents;
    map<string, vector<int>> studentGrades; // studentId -> grades for each assignment

public:
    Course(string id, string t, string inst, string desc)
        : courseId(id), title(t), instructor(inst), description(desc) {}

    string getId() const { return courseId; }
    string getTitle() const { return title; }
    string getInstructor() const { return instructor; }

    void addAssignment(const Assignment& assignment) {
        assignments.push_back(assignment);
    }

    void enrollStudent(const string& studentId) {
        if (find(enrolledStudents.begin(), enrolledStudents.end(), studentId) 
            == enrolledStudents.end()) {
            enrolledStudents.push_back(studentId);
            studentGrades[studentId] = vector<int>(assignments.size(), 0);
        }
    }

    bool isEnrolled(const string& studentId) const {
        return find(enrolledStudents.begin(), enrolledStudents.end(), studentId) 
               != enrolledStudents.end();
    }

    void submitAssignment(const string& studentId, int assignmentIndex) {
        if (isEnrolled(studentId) && assignmentIndex < assignments.size()) {
            assignments[assignmentIndex].submit();
        }
    }

    void gradeAssignment(const string& studentId, int assignmentIndex, int score) {
        if (isEnrolled(studentId) && assignmentIndex < assignments.size()) {
            assignments[assignmentIndex].grade(score);
            studentGrades[studentId][assignmentIndex] = score;
        }
    }

    double calculateStudentGrade(const string& studentId) const {
        if (!isEnrolled(studentId)) return 0.0;
        
        const auto& grades = studentGrades.at(studentId);
        if (grades.empty()) return 0.0;
        
        int totalScore = 0, totalMaxScore = 0;
        for (size_t i = 0; i < grades.size(); ++i) {
            totalScore += grades[i];
            totalMaxScore += assignments[i].getMaxScore();
        }
        
        return totalMaxScore > 0 ? (100.0 * totalScore / totalMaxScore) : 0.0;
    }

    void displayInfo() const {
        cout << "\nCourse Details:" << endl;
        cout << "ID: " << courseId << endl;
        cout << "Title: " << title << endl;
        cout << "Instructor: " << instructor << endl;
        cout << "Description: " << description << endl;
        cout << "Enrolled Students: " << enrolledStudents.size() << endl;
        cout << "Assignments: " << assignments.size() << endl;
    }

    void displayAssignments() const {
        cout << "\nAssignments for " << title << ":" << endl;
        for (size_t i = 0; i < assignments.size(); ++i) {
            cout << "\n" << (i + 1) << ". ";
            assignments[i].displayInfo();
        }
    }

    const vector<Assignment>& getAssignments() const { return assignments; }
};

class Student {
private:
    string id;
    string name;
    string email;
    vector<Course*> enrolledCourses;

public:
    Student(string studentId, string studentName, string studentEmail)
        : id(studentId), name(studentName), email(studentEmail) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getEmail() const { return email; }

    void enrollInCourse(Course* course) {
        if (course) {
            enrolledCourses.push_back(course);
            course->enrollStudent(id);
        }
    }

    void displayInfo() const {
        cout << "\nStudent Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Email: " << email << endl;
        cout << "Enrolled Courses: " << enrolledCourses.size() << endl;
        
        if (!enrolledCourses.empty()) {
            cout << "\nCourse Grades:" << endl;
            for (const auto& course : enrolledCourses) {
                cout << course->getTitle() << ": " 
                     << fixed << setprecision(2)
                     << course->calculateStudentGrade(id) << "%" << endl;
            }
        }
    }
};

class LearningManagementSystem {
private:
    vector<Course> courses;
    vector<Student> students;
    map<string, int> courseIndex;  // courseId -> index
    map<string, int> studentIndex; // studentId -> index

public:
    void addCourse() {
        string id, title, instructor, description;

        cout << "\nEnter Course Details" << endl;
        cout << "Course ID: ";
        cin >> id;

        if (courseIndex.find(id) != courseIndex.end()) {
            cout << "Error: Course already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Title: ";
        getline(cin, title);
        cout << "Instructor: ";
        getline(cin, instructor);
        cout << "Description: ";
        getline(cin, description);

        courses.emplace_back(id, title, instructor, description);
        courseIndex[id] = courses.size() - 1;
        cout << "\nCourse added successfully!" << endl;
    }

    void addStudent() {
        string id, name, email;

        cout << "\nEnter Student Details" << endl;
        cout << "Student ID: ";
        cin >> id;

        if (studentIndex.find(id) != studentIndex.end()) {
            cout << "Error: Student already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Email: ";
        getline(cin, email);

        students.emplace_back(id, name, email);
        studentIndex[id] = students.size() - 1;
        cout << "\nStudent added successfully!" << endl;
    }

    void addAssignment() {
        string courseId, title, description;
        int maxScore;
        time_t dueDate;

        cout << "\nEnter Course ID: ";
        cin >> courseId;

        auto courseIt = courseIndex.find(courseId);
        if (courseIt == courseIndex.end()) {
            cout << "Error: Course not found!" << endl;
            return;
        }

        cin.ignore();
        cout << "Assignment Title: ";
        getline(cin, title);
        cout << "Description: ";
        getline(cin, description);
        cout << "Maximum Score: ";
        cin >> maxScore;
        cout << "Days until due: ";
        int days;
        cin >> days;
        dueDate = time(0) + (days * 24 * 3600);

        Assignment assignment(title, description, dueDate, maxScore);
        courses[courseIt->second].addAssignment(assignment);
        cout << "\nAssignment added successfully!" << endl;
    }

    void enrollStudent() {
        string studentId, courseId;

        cout << "\nEnter Student ID: ";
        cin >> studentId;
        cout << "Enter Course ID: ";
        cin >> courseId;

        auto studentIt = studentIndex.find(studentId);
        auto courseIt = courseIndex.find(courseId);

        if (studentIt == studentIndex.end()) {
            cout << "Error: Student not found!" << endl;
            return;
        }
        if (courseIt == courseIndex.end()) {
            cout << "Error: Course not found!" << endl;
            return;
        }

        students[studentIt->second].enrollInCourse(&courses[courseIt->second]);
        cout << "\nStudent enrolled successfully!" << endl;
    }

    void submitAssignment() {
        string studentId, courseId;
        int assignmentIndex;

        cout << "\nEnter Student ID: ";
        cin >> studentId;
        cout << "Enter Course ID: ";
        cin >> courseId;

        auto courseIt = courseIndex.find(courseId);
        if (courseIt == courseIndex.end()) {
            cout << "Error: Course not found!" << endl;
            return;
        }

        Course& course = courses[courseIt->second];
        if (!course.isEnrolled(studentId)) {
            cout << "Error: Student not enrolled in this course!" << endl;
            return;
        }

        course.displayAssignments();
        cout << "\nEnter Assignment Number: ";
        cin >> assignmentIndex;
        assignmentIndex--; // Convert to 0-based index

        if (assignmentIndex < 0 || assignmentIndex >= course.getAssignments().size()) {
            cout << "Error: Invalid assignment number!" << endl;
            return;
        }

        course.submitAssignment(studentId, assignmentIndex);
        cout << "\nAssignment submitted successfully!" << endl;
    }

    void gradeAssignment() {
        string studentId, courseId;
        int assignmentIndex, score;

        cout << "\nEnter Student ID: ";
        cin >> studentId;
        cout << "Enter Course ID: ";
        cin >> courseId;

        auto courseIt = courseIndex.find(courseId);
        if (courseIt == courseIndex.end()) {
            cout << "Error: Course not found!" << endl;
            return;
        }

        Course& course = courses[courseIt->second];
        if (!course.isEnrolled(studentId)) {
            cout << "Error: Student not enrolled in this course!" << endl;
            return;
        }

        course.displayAssignments();
        cout << "\nEnter Assignment Number: ";
        cin >> assignmentIndex;
        assignmentIndex--; // Convert to 0-based index

        if (assignmentIndex < 0 || assignmentIndex >= course.getAssignments().size()) {
            cout << "Error: Invalid assignment number!" << endl;
            return;
        }

        cout << "Enter Score: ";
        cin >> score;

        course.gradeAssignment(studentId, assignmentIndex, score);
        cout << "\nAssignment graded successfully!" << endl;
    }

    void displayCourseInfo() {
        string courseId;
        cout << "\nEnter Course ID: ";
        cin >> courseId;

        auto courseIt = courseIndex.find(courseId);
        if (courseIt == courseIndex.end()) {
            cout << "Error: Course not found!" << endl;
            return;
        }

        courses[courseIt->second].displayInfo();
        courses[courseIt->second].displayAssignments();
    }

    void displayStudentInfo() {
        string studentId;
        cout << "\nEnter Student ID: ";
        cin >> studentId;

        auto studentIt = studentIndex.find(studentId);
        if (studentIt == studentIndex.end()) {
            cout << "Error: Student not found!" << endl;
            return;
        }

        students[studentIt->second].displayInfo();
    }
};

int main() {
    LearningManagementSystem lms;
    int choice;

    cout << "Welcome to Online Learning Management System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add Course" << endl;
        cout << "2. Add Student" << endl;
        cout << "3. Add Assignment" << endl;
        cout << "4. Enroll Student in Course" << endl;
        cout << "5. Submit Assignment" << endl;
        cout << "6. Grade Assignment" << endl;
        cout << "7. Display Course Information" << endl;
        cout << "8. Display Student Information" << endl;
        cout << "9. Exit" << endl;
        cout << "Enter your choice (1-9): ";
        cin >> choice;

        switch (choice) {
            case 1:
                lms.addCourse();
                break;
            case 2:
                lms.addStudent();
                break;
            case 3:
                lms.addAssignment();
                break;
            case 4:
                lms.enrollStudent();
                break;
            case 5:
                lms.submitAssignment();
                break;
            case 6:
                lms.gradeAssignment();
                break;
            case 7:
                lms.displayCourseInfo();
                break;
            case 8:
                lms.displayStudentInfo();
                break;
            case 9:
                cout << "\nThank you for using Online Learning Management System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 