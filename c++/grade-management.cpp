#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

class Course {
private:
    string courseCode;
    string courseName;
    int creditHours;
    double grade;

public:
    Course(string code, string name, int credits, double grade)
        : courseCode(code), courseName(name), creditHours(credits), grade(grade) {}

    string getCode() const { return courseCode; }
    string getName() const { return courseName; }
    int getCredits() const { return creditHours; }
    double getGrade() const { return grade; }
    
    void setGrade(double newGrade) { grade = newGrade; }

    // Convert numerical grade to letter grade
    string getLetterGrade() const {
        if (grade >= 90) return "A+";
        else if (grade >= 85) return "A";
        else if (grade >= 80) return "A-";
        else if (grade >= 75) return "B+";
        else if (grade >= 70) return "B";
        else if (grade >= 65) return "C+";
        else if (grade >= 60) return "C";
        else if (grade >= 55) return "D+";
        else if (grade >= 50) return "D";
        else return "F";
    }

    // Convert grade to GPA points
    double getGPAPoints() const {
        if (grade >= 90) return 4.0;
        else if (grade >= 85) return 4.0;
        else if (grade >= 80) return 3.75;
        else if (grade >= 75) return 3.5;
        else if (grade >= 70) return 3.0;
        else if (grade >= 65) return 2.5;
        else if (grade >= 60) return 2.0;
        else if (grade >= 55) return 1.5;
        else if (grade >= 50) return 1.0;
        else return 0.0;
    }
};

class Student {
private:
    string id;
    string name;
    string department;
    vector<Course> courses;

public:
    Student(string studentId, string studentName, string dept)
        : id(studentId), name(studentName), department(dept) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getDepartment() const { return department; }
    
    void addCourse(const Course& course) {
        courses.push_back(course);
    }

    bool updateGrade(string courseCode, double newGrade) {
        for (auto& course : courses) {
            if (course.getCode() == courseCode) {
                course.setGrade(newGrade);
                return true;
            }
        }
        return false;
    }

    double calculateGPA() const {
        if (courses.empty()) return 0.0;
        
        double totalPoints = 0.0;
        int totalCredits = 0;
        
        for (const auto& course : courses) {
            totalPoints += course.getGPAPoints() * course.getCredits();
            totalCredits += course.getCredits();
        }
        
        return totalCredits > 0 ? totalPoints / totalCredits : 0.0;
    }

    void displayGrades() const {
        cout << "\n=== Grade Report for " << name << " (ID: " << id << ") ===" << endl;
        cout << "Department: " << department << endl;
        cout << "\nCourse Details:" << endl;
        cout << setw(10) << "Code" << setw(30) << "Course Name" 
             << setw(15) << "Credits" << setw(15) << "Grade" 
             << setw(15) << "Letter Grade" << endl;
        cout << string(85, '-') << endl;

        for (const auto& course : courses) {
            cout << setw(10) << course.getCode()
                 << setw(30) << course.getName()
                 << setw(15) << course.getCredits()
                 << setw(15) << fixed << setprecision(2) << course.getGrade()
                 << setw(15) << course.getLetterGrade() << endl;
        }
        
        cout << string(85, '-') << endl;
        cout << "GPA: " << fixed << setprecision(2) << calculateGPA() << endl;
    }

    const vector<Course>& getCourses() const {
        return courses;
    }
};

class GradeManagementSystem {
private:
    vector<Student> students;
    map<string, pair<string, int>> courseDatabase; // courseCode -> {courseName, creditHours}

    bool isValidGrade(double grade) {
        return grade >= 0 && grade <= 100;
    }

public:
    void addStudent() {
        string id, name, department;
        
        cout << "\nEnter Student Details" << endl;
        cout << "ID: ";
        cin >> id;
        
        // Check if student already exists
        if (findStudent(id) != nullptr) {
            cout << "Error: Student with ID " << id << " already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Department: ";
        getline(cin, department);

        students.emplace_back(id, name, department);
        cout << "\nStudent added successfully!" << endl;
    }

    void addCourse() {
        string code, name;
        int credits;

        cout << "\nEnter Course Details" << endl;
        cout << "Course Code: ";
        cin >> code;

        if (courseDatabase.find(code) != courseDatabase.end()) {
            cout << "Error: Course already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Course Name: ";
        getline(cin, name);
        cout << "Credit Hours: ";
        cin >> credits;

        courseDatabase[code] = {name, credits};
        cout << "\nCourse added successfully!" << endl;
    }

    void registerCourse() {
        string studentId, courseCode;
        double grade;

        cout << "\nEnter Student ID: ";
        cin >> studentId;

        Student* student = findStudent(studentId);
        if (!student) {
            cout << "Error: Student not found!" << endl;
            return;
        }

        cout << "Enter Course Code: ";
        cin >> courseCode;

        auto courseIt = courseDatabase.find(courseCode);
        if (courseIt == courseDatabase.end()) {
            cout << "Error: Course not found!" << endl;
            return;
        }

        cout << "Enter Grade (0-100): ";
        cin >> grade;

        if (!isValidGrade(grade)) {
            cout << "Error: Invalid grade!" << endl;
            return;
        }

        Course newCourse(courseCode, courseIt->second.first, 
                        courseIt->second.second, grade);
        student->addCourse(newCourse);
        cout << "\nCourse registered successfully!" << endl;
    }

    void updateGrade() {
        string studentId, courseCode;
        double newGrade;

        cout << "\nEnter Student ID: ";
        cin >> studentId;

        Student* student = findStudent(studentId);
        if (!student) {
            cout << "Error: Student not found!" << endl;
            return;
        }

        cout << "Enter Course Code: ";
        cin >> courseCode;

        cout << "Enter New Grade (0-100): ";
        cin >> newGrade;

        if (!isValidGrade(newGrade)) {
            cout << "Error: Invalid grade!" << endl;
            return;
        }

        if (student->updateGrade(courseCode, newGrade)) {
            cout << "\nGrade updated successfully!" << endl;
        } else {
            cout << "Error: Course not found for this student!" << endl;
        }
    }

    void generateReport() {
        string studentId;

        cout << "\nEnter Student ID (or 'all' for all students): ";
        cin >> studentId;

        if (studentId == "all") {
            displayAllStudents();
        } else {
            Student* student = findStudent(studentId);
            if (student) {
                student->displayGrades();
            } else {
                cout << "Error: Student not found!" << endl;
            }
        }
    }

    void displayAllStudents() const {
        if (students.empty()) {
            cout << "\nNo students registered!" << endl;
            return;
        }

        cout << "\n=== All Students Report ===" << endl;
        for (const auto& student : students) {
            student.displayGrades();
            cout << "\n";
        }
    }

    void showStatistics() {
        if (students.empty()) {
            cout << "\nNo students registered!" << endl;
            return;
        }

        cout << "\n=== Grade Statistics ===" << endl;
        
        // Calculate overall statistics
        double totalGPA = 0.0;
        int totalStudents = students.size();
        map<string, int> gradeDistribution;
        
        for (const auto& student : students) {
            totalGPA += student.calculateGPA();
            
            for (const auto& course : student.getCourses()) {
                gradeDistribution[course.getLetterGrade()]++;
            }
        }

        // Display statistics
        cout << "Total Students: " << totalStudents << endl;
        cout << "Average GPA: " << fixed << setprecision(2) 
             << (totalGPA / totalStudents) << endl;

        cout << "\nGrade Distribution:" << endl;
        for (const auto& grade : gradeDistribution) {
            cout << grade.first << ": " << grade.second << " students" << endl;
        }
    }

private:
    Student* findStudent(const string& id) {
        for (auto& student : students) {
            if (student.getId() == id) {
                return &student;
            }
        }
        return nullptr;
    }
};

int main() {
    GradeManagementSystem system;
    int choice;

    cout << "Welcome to Student Grade Management System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add New Student" << endl;
        cout << "2. Add New Course" << endl;
        cout << "3. Register Course for Student" << endl;
        cout << "4. Update Grade" << endl;
        cout << "5. Generate Grade Report" << endl;
        cout << "6. Show Statistics" << endl;
        cout << "7. Exit" << endl;
        cout << "Enter your choice (1-7): ";
        cin >> choice;

        switch (choice) {
            case 1:
                system.addStudent();
                break;
            case 2:
                system.addCourse();
                break;
            case 3:
                system.registerCourse();
                break;
            case 4:
                system.updateGrade();
                break;
            case 5:
                system.generateReport();
                break;
            case 6:
                system.showStatistics();
                break;
            case 7:
                cout << "\nThank you for using Student Grade Management System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 