import { useParams, Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function ProjectDetails() {
  const { id } = useParams();

  const handleDownload = (sourceCode: string, projectTitle: string) => {
    // Create a blob with the source code
    const element = document.createElement("a");
    const file = new Blob(
      [sourceCode],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = projectTitle.toLowerCase().replace(/ /g, '-') + ".cpp";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // This would typically come from a database or API
  const projects = [
    {
      id: "1",
      title: "Library Management System",
      description: "A comprehensive C++ library management system utilizing Object-Oriented Programming principles. Features include book cataloging, member management, lending operations, and fine calculations. The system uses file handling for persistent data storage and implements data structures for efficient book and member tracking.",
      longDescription: `
        The Library Management System is a robust C++ application designed to streamline library operations and enhance user experience. This system demonstrates advanced object-oriented programming concepts while providing practical functionality for library staff and members.

        Key Implementation Details:
        • Data Structure Design: Utilizes custom-designed classes for Books, Members, and Transactions
        • Database Management: Implements file-based storage with indexing for quick retrieval
        • Search Algorithms: Features efficient search mechanisms using binary search trees
        • Security: Includes user authentication and role-based access control
      `,
      difficulty: "intermediate",
      features: [
        "Book catalog with search and filter capabilities",
        "Member registration and profile management",
        "Book lending and return system with due date tracking",
        "Fine calculation based on overdue days",
        "Book reservation system",
        "Report generation for books and members",
        "Admin dashboard for system management"
      ],
      technologies: ["C++", "File Handling", "OOP", "Data Structures", "STL Containers"],
      sourceCode: `/c++/library-management.cpp`,
      fullSourceCode: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <fstream>
using namespace std;

class Book {
private:
    string isbn;
    string title;
    string author;
    bool isAvailable;
    vector<string> reservations;

public:
    Book(string isbn, string title, string author) {
        this->isbn = isbn;
        this->title = title;
        this->author = author;
        this->isAvailable = true;
    }

    bool checkOut(string memberId) {
        if (isAvailable) {
            isAvailable = false;
            return true;
        }
        reservations.push_back(memberId);
        return false;
    }

    void returnBook() {
        isAvailable = true;
        if (!reservations.empty()) {
            // Notify next member in reservation queue
            reservations.erase(reservations.begin());
        }
    }

    void addReservation(string memberId) {
        reservations.push_back(memberId);
    }
};

class DatabaseManager {
private:
    fstream bookDb;
    fstream memberDb;
    map<string, Book> bookCache;

public:
    DatabaseManager() {
        bookDb.open("books.db", ios::in | ios::out | ios::app);
        memberDb.open("members.db", ios::in | ios::out | ios::app);
    }

    bool saveBook(const Book& book) {
        // Implementation for saving book to database
        return true;
    }

    Book* getBook(string isbn) {
        // Implementation for retrieving book from database
        return nullptr;
    }

    vector<Book> searchBooks(string query) {
        // Implementation for searching books
        vector<Book> results;
        return results;
    }
};

int main() {
    DatabaseManager db;
    
    // Example usage
    Book book1("123456", "C++ Programming", "John Doe");
    db.saveBook(book1);
    
    return 0;
}`,
      concepts: [
        "Classes and Objects",
        "Inheritance and Polymorphism",
        "File I/O Operations",
        "Vector and Map Containers",
        "Exception Handling"
      ],
      implementation: [
        {
          title: "Class Structure",
          code: `class Book {
    private:
        string isbn;
        string title;
        string author;
        bool isAvailable;
        vector<string> reservations;
    
    public:
        Book(string isbn, string title, string author);
        bool checkOut(string memberId);
        void returnBook();
        void addReservation(string memberId);
};`
        },
        {
          title: "Database Handling",
          code: `class DatabaseManager {
    private:
        fstream bookDb;
        fstream memberDb;
        map<string, Book> bookCache;
    
    public:
        DatabaseManager();
        bool saveBook(const Book& book);
        Book* getBook(string isbn);
        vector<Book> searchBooks(string query);
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "File system support",
        "Basic understanding of OOP concepts",
        "Knowledge of data structures"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 library_management.cpp -o library_system",
        "Create a data directory for database files",
        "Run the executable: ./library_system",
        "Login with default admin credentials (admin/admin123)"
      ],
      icon: "📚",
      screenshots: [
        {
          title: "Main Dashboard",
          description: "Admin view of the main dashboard showing key statistics",
          url: "/screenshots/library/dashboard.png"
        },
        {
          title: "Book Management",
          description: "Interface for managing books and inventory",
          url: "/screenshots/library/books.png"
        }
      ]
    },
    {
      id: "2",
      title: "Bank Management System",
      description: "A robust C++ banking solution that handles account management, transactions, and statement generation. Features secure transaction handling, account validation, and detailed transaction history.",
      longDescription: `
        The Bank Management System is a comprehensive C++ application designed to handle banking operations securely and efficiently. This system demonstrates advanced programming concepts while providing essential banking functionality.

        Key Implementation Details:
        • Account Management: Handles different types of accounts (Savings, Current, Fixed Deposit)
        • Transaction Processing: Secure handling of deposits, withdrawals, and transfers
        • Data Security: Implements encryption and secure data storage
        • Audit Trail: Maintains detailed logs of all transactions
      `,
      difficulty: "intermediate",
      features: [
        "Multiple account type support",
        "Secure transaction processing",
        "Interest calculation",
        "Account statement generation",
        "Transaction history tracking",
        "User authentication system",
        "Automated backup system"
      ],
      technologies: ["C++", "File Handling", "OOP", "Data Structures", "Encryption"],
      sourceCode: `/c++/bank-system.cpp`,
      fullSourceCode: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <ctime>
using namespace std;

class Account {
protected:
    string accountNumber;
    string holderName;
    double balance;
    vector<string> transactions;

public:
    Account(string accNum, string name, double initialBalance) {
        accountNumber = accNum;
        holderName = name;
        balance = initialBalance;
    }

    virtual bool withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            transactions.push_back("Withdrawal: " + to_string(amount));
            return true;
        }
        return false;
    }

    virtual void deposit(double amount) {
        balance += amount;
        transactions.push_back("Deposit: " + to_string(amount));
    }

    virtual void displayBalance() {
        cout << "Account: " << accountNumber << endl;
        cout << "Holder: " << holderName << endl;
        cout << "Balance: $" << balance << endl;
    }
};

class SavingsAccount : public Account {
private:
    double interestRate;

public:
    SavingsAccount(string accNum, string name, double balance)
        : Account(accNum, name, balance) {
        interestRate = 0.025; // 2.5% interest rate
    }

    void calculateInterest() {
        double interest = balance * interestRate;
        deposit(interest);
    }
};

class CurrentAccount : public Account {
private:
    double overdraftLimit;

public:
    CurrentAccount(string accNum, string name, double balance)
        : Account(accNum, name, balance) {
        overdraftLimit = 1000;
    }

    bool withdraw(double amount) override {
        if (amount <= (balance + overdraftLimit)) {
            balance -= amount;
            transactions.push_back("Withdrawal: " + to_string(amount));
            return true;
        }
        return false;
    }
};

class Bank {
private:
    map<string, Account*> accounts;

public:
    void createAccount(string type, string accNum, string name, double balance) {
        if (type == "savings") {
            accounts[accNum] = new SavingsAccount(accNum, name, balance);
        } else if (type == "current") {
            accounts[accNum] = new CurrentAccount(accNum, name, balance);
        }
    }

    bool transfer(string fromAcc, string toAcc, double amount) {
        if (accounts[fromAcc] && accounts[toAcc]) {
            if (accounts[fromAcc]->withdraw(amount)) {
                accounts[toAcc]->deposit(amount);
                return true;
            }
        }
        return false;
    }
};

int main() {
    Bank bank;
    
    // Create accounts
    bank.createAccount("savings", "SAV001", "John Doe", 1000);
    bank.createAccount("current", "CUR001", "Jane Smith", 2000);
    
    // Perform transactions
    bank.transfer("SAV001", "CUR001", 500);
    
    return 0;
}`,
      concepts: [
        "Inheritance and Polymorphism",
        "Virtual Functions",
        "File Handling",
        "Exception Handling",
        "STL Containers"
      ],
      implementation: [
        {
          title: "Account Class Hierarchy",
          code: `class Account {
protected:
    string accountNumber;
    string holderName;
    double balance;
    vector<string> transactions;

public:
    virtual bool withdraw(double amount);
    virtual void deposit(double amount);
    virtual void displayBalance();
};

class SavingsAccount : public Account {
private:
    double interestRate;

public:
    void calculateInterest();
};`
        },
        {
          title: "Bank Management",
          code: `class Bank {
private:
    map<string, Account*> accounts;

public:
    void createAccount(string type, string accNum, string name, double balance);
    bool transfer(string fromAcc, string toAcc, double amount);
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "Basic understanding of OOP concepts",
        "Knowledge of banking operations",
        "Understanding of security principles"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 bank_system.cpp -o bank_system",
        "Run the executable: ./bank_system",
        "Follow the setup wizard for initial configuration",
        "Create admin account for system management"
      ],
      icon: "🏦",
      screenshots: [
        {
          title: "Account Dashboard",
          description: "Overview of account balances and recent transactions",
          url: "/screenshots/bank/dashboard.png"
        },
        {
          title: "Transaction History",
          description: "Detailed view of all account transactions",
          url: "/screenshots/bank/transactions.png"
        }
      ]
    },
    {
      id: "3",
      title: "Student Grade Management",
      description: "An intuitive C++ grade management system designed for educational institutions. Features comprehensive grade tracking, GPA calculation, and detailed academic performance analysis.",
      longDescription: `
        The Student Grade Management System is a powerful tool for educational institutions to manage student grades and academic performance. This system provides detailed analytics and reporting features.

        Key Implementation Details:
        • Grade Calculation: Automated GPA and CGPA calculation
        • Performance Tracking: Semester-wise progress monitoring
        • Statistical Analysis: Grade distribution and performance metrics
        • Report Generation: Detailed academic transcripts
      `,
      difficulty: "beginner",
      features: [
        "Student record management",
        "Course grade entry and modification",
        "GPA calculation",
        "Progress tracking",
        "Performance analytics",
        "Report generation",
        "Grade distribution visualization"
      ],
      technologies: ["C++", "STL", "File I/O", "Data Analysis"],
      sourceCode: `/c++/grade-management.cpp`,
      fullSourceCode: `#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <numeric>
using namespace std;

class Student {
private:
    string id;
    string name;
    map<string, double> grades;
    double gpa;

public:
    Student(string studentId, string studentName) 
        : id(studentId), name(studentName), gpa(0.0) {}

    void addGrade(string course, double grade) {
        grades[course] = grade;
        calculateGPA();
    }

    void calculateGPA() {
        if (grades.empty()) {
            gpa = 0.0;
            return;
        }

        double total = 0.0;
        for (const auto& grade : grades) {
            total += grade.second;
        }
        gpa = total / grades.size();
    }

    void displayTranscript() {
        cout << "Student ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Courses and Grades:" << endl;
        for (const auto& grade : grades) {
            cout << grade.first << ": " << grade.second << endl;
        }
        cout << "GPA: " << gpa << endl;
    }
};

class GradeManager {
private:
    vector<Student> students;
    map<string, vector<double>> courseStats;

public:
    void addStudent(string id, string name) {
        students.emplace_back(id, name);
    }

    void recordGrade(string studentId, string course, double grade) {
        for (auto& student : students) {
            if (student.id == studentId) {
                student.addGrade(course, grade);
                courseStats[course].push_back(grade);
                break;
            }
        }
    }

    void generateClassStats(string course) {
        if (courseStats[course].empty()) {
            cout << "No grades recorded for " << course << endl;
            return;
        }

        double sum = accumulate(courseStats[course].begin(), 
                              courseStats[course].end(), 0.0);
        double avg = sum / courseStats[course].size();

        cout << "Course: " << course << endl;
        cout << "Average Grade: " << avg << endl;
        cout << "Number of Students: " << courseStats[course].size() << endl;
    }
};

int main() {
    GradeManager manager;

    // Add students
    manager.addStudent("S001", "John Doe");
    manager.addStudent("S002", "Jane Smith");

    // Record grades
    manager.recordGrade("S001", "C++ Programming", 85.5);
    manager.recordGrade("S001", "Data Structures", 90.0);
    manager.recordGrade("S002", "C++ Programming", 88.0);

    // Generate statistics
    manager.generateClassStats("C++ Programming");

    return 0;
}`,
      concepts: [
        "Classes and Objects",
        "STL Containers",
        "File I/O",
        "Data Processing",
        "Basic Algorithms"
      ],
      implementation: [
        {
          title: "Student Class",
          code: `class Student {
private:
    string id;
    string name;
    map<string, double> grades;
    double gpa;

public:
    void addGrade(string course, double grade);
    void calculateGPA();
    void displayTranscript();
};`
        },
        {
          title: "Grade Manager",
          code: `class GradeManager {
private:
    vector<Student> students;
    map<string, vector<double>> courseStats;

public:
    void addStudent(string id, string name);
    void recordGrade(string studentId, string course, double grade);
    void generateClassStats(string course);
};`
        }
      ],
      requirements: [
        "C++11 or later",
        "STL library",
        "Basic understanding of GPA calculation",
        "File system support",
        "Basic math knowledge"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++11 grade_management.cpp -o grade_system",
        "Run the executable: ./grade_system",
        "Import student data (if any)",
        "Start entering grades"
      ],
      icon: "📊",
      screenshots: [
        {
          title: "Grade Overview",
          description: "Dashboard showing student grades and statistics",
          url: "/screenshots/grades/overview.png"
        },
        {
          title: "Student Transcript",
          description: "Individual student grade report",
          url: "/screenshots/grades/transcript.png"
        }
      ]
    },
    {
      id: "4",
      title: "PDF Store Management System",
      description: "A comprehensive C++ application for managing a digital PDF bookstore. Features include book management, user accounts, purchases, downloads, and review system.",
      longDescription: `
        The PDF Store Management System is a sophisticated application designed to handle digital book sales and distribution. This system demonstrates advanced file handling and user management concepts.

        Key Implementation Details:
        • Book Management: Complete digital book catalog with metadata
        • User System: Account management with balance and purchase history
        • Review System: Rating and review functionality
        • Download Tracking: Monitors and manages book downloads
      `,
      difficulty: "advanced",
      features: [
        "Digital book catalog management",
        "User registration and authentication",
        "Book purchase and download system",
        "Rating and review functionality",
        "Balance management for purchases",
        "Download history tracking",
        "Book metadata management",
        "Tag-based book categorization"
      ],
      technologies: ["C++", "File I/O", "STL Containers", "User Authentication"],
      sourceCode: `/c++/pdf-store.cpp`,
      concepts: [
        "Classes and Objects",
        "File Handling",
        "Data Structures",
        "User Authentication",
        "Transaction Management"
      ],
      implementation: [
        {
          title: "Book Class",
          code: `class Book {
private:
    string isbn;
    string title;
    string author;
    string category;
    string description;
    double price;
    string filePath;
    int pageCount;
    string language;
    string publishDate;
    vector<string> tags;
    int downloadCount;
    double rating;
    vector<pair<string, string>> reviews;

public:
    Book(string bookIsbn, string bookTitle, string bookAuthor, string cat,
         string desc, double bookPrice, string path, int pages, 
         string lang, string pubDate);
    void addTag(const string& tag);
    void addReview(const string& userId, const string& review);
    void incrementDownloads();
    void updateRating(double newRating);
};`
        },
        {
          title: "User Management",
          code: `class User {
private:
    string id;
    string name;
    string email;
    string phone;
    string password;
    double balance;
    vector<string> purchasedBooks;
    vector<pair<string, time_t>> downloadHistory;

public:
    void addBalance(double amount);
    bool deductBalance(double amount);
    void addPurchase(const string& isbn);
    void addDownload(const string& isbn);
    bool hasPurchased(const string& isbn);
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "File system support",
        "Understanding of digital commerce",
        "Knowledge of user authentication"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 pdf_store.cpp -o pdf_store",
        "Create data directory for book files",
        "Set up user database",
        "Configure payment system"
      ],
      icon: "📚",
      screenshots: [
        {
          title: "Book Catalog",
          description: "Browse and search available PDF books",
          url: "/screenshots/pdf-store/catalog.png"
        },
        {
          title: "User Dashboard",
          description: "User account management and purchase history",
          url: "/screenshots/pdf-store/dashboard.png"
        }
      ]
    },
    {
      id: "5",
      title: "Prison Management System",
      description: "A robust C++ system for managing prison operations, including inmate records, staff management, visitor tracking, and cell assignments.",
      longDescription: `
        The Prison Management System is a comprehensive application designed to handle all aspects of prison administration. This system demonstrates advanced record keeping and security management concepts.

        Key Implementation Details:
        • Inmate Management: Complete inmate records with behavior tracking
        • Staff Management: Staff records and duty assignments
        • Visitor System: Visitor registration and visit tracking
        • Cell Management: Cell block and assignment system
      `,
      difficulty: "advanced",
      features: [
        "Inmate record management",
        "Cell block assignment system",
        "Staff management and scheduling",
        "Visitor registration and tracking",
        "Behavior record management",
        "Medical record tracking",
        "Release date management",
        "Security level management"
      ],
      technologies: ["C++", "Data Structures", "File I/O", "Security Management"],
      sourceCode: `/c++/prison-management.cpp`,
      concepts: [
        "Object-Oriented Design",
        "Data Management",
        "Security Systems",
        "Record Keeping",
        "Access Control"
      ],
      implementation: [
        {
          title: "Inmate Management",
          code: `class Inmate {
private:
    string id;
    string name;
    int age;
    string gender;
    string crime;
    string sentence;
    string admissionDate;
    string releaseDate;
    string cellBlock;
    int cellNumber;
    vector<string> behaviorRecords;
    vector<string> medicalRecords;
    bool isReleased;

public:
    void assignCell(const string& block, int number);
    void addBehaviorRecord(const string& record);
    void addMedicalRecord(const string& record);
    void release();
};`
        },
        {
          title: "Staff and Visitor System",
          code: `class Staff {
private:
    string id;
    string name;
    string position;
    string department;
    string shift;
    vector<string> dutyRecords;

public:
    void addDutyRecord(const string& record);
};

class Visitor {
private:
    string id;
    string name;
    string relation;
    vector<pair<string, string>> visitHistory;

public:
    void addVisit(const string& inmateId);
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "File system support",
        "Understanding of security systems",
        "Knowledge of record management"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 prison_management.cpp -o prison_system",
        "Set up database for records",
        "Configure security clearance levels",
        "Initialize cell block system"
      ],
      icon: "🏢",
      screenshots: [
        {
          title: "Inmate Records",
          description: "Comprehensive view of inmate information",
          url: "/screenshots/prison/inmates.png"
        },
        {
          title: "Cell Management",
          description: "Cell block assignment and management",
          url: "/screenshots/prison/cells.png"
        }
      ]
    },
    {
      id: "6",
      title: "Hospital Management System",
      description: "A comprehensive C++ healthcare management system for hospitals, featuring patient records, appointment scheduling, and medical staff management.",
      longDescription: `
        The Hospital Management System is a sophisticated application designed to streamline healthcare facility operations. This system demonstrates advanced database management and scheduling concepts in a medical context.

        Key Implementation Details:
        • Patient Management: Complete electronic health records
        • Appointment System: Efficient scheduling and tracking
        • Staff Management: Doctor and nurse scheduling
        • Department Organization: Specialized unit management
      `,
      difficulty: "intermediate",
      features: [
        "Patient record management",
        "Appointment scheduling",
        "Doctor and staff management",
        "Medical history tracking",
        "Prescription management",
        "Department organization",
        "Emergency case handling",
        "Billing system integration"
      ],
      technologies: ["C++", "Data Structures", "File I/O", "Healthcare Management"],
      sourceCode: `/c++/hospital-management.cpp`,
      concepts: [
        "Object-Oriented Design",
        "Database Management",
        "Scheduling Algorithms",
        "Healthcare Workflows",
        "Security and Privacy"
      ],
      implementation: [
        {
          title: "Patient Management",
          code: `class Patient {
private:
    string id;
    string name;
    int age;
    string gender;
    string bloodGroup;
    vector<string> medicalHistory;
    vector<string> prescriptions;
    vector<Appointment> appointments;

public:
    void addMedicalRecord(const string& record);
    void addPrescription(const string& medicine, const string& dosage);
    void scheduleAppointment(const Appointment& apt);
    vector<Appointment> getUpcomingAppointments() const;
};`
        },
        {
          title: "Doctor and Appointment System",
          code: `class Doctor {
private:
    string id;
    string name;
    string specialization;
    string department;
    vector<TimeSlot> availability;
    vector<Appointment> schedule;

public:
    bool isAvailable(const TimeSlot& slot) const;
    void scheduleAppointment(const Appointment& apt);
    vector<TimeSlot> getAvailableSlots() const;
};

class Appointment {
private:
    string id;
    string patientId;
    string doctorId;
    TimeSlot slot;
    string purpose;
    bool isEmergency;

public:
    bool confirm();
    void reschedule(const TimeSlot& newSlot);
    void cancel();
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "File system support",
        "Understanding of healthcare systems",
        "Knowledge of scheduling algorithms"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 hospital_management.cpp -o hospital_system",
        "Initialize patient database",
        "Set up department structure",
        "Configure doctor schedules"
      ],
      icon: "🏥",
      screenshots: [
        {
          title: "Patient Dashboard",
          description: "Patient information and appointment management",
          url: "/screenshots/hospital/dashboard.png"
        },
        {
          title: "Doctor Schedule",
          description: "Doctor availability and appointment calendar",
          url: "/screenshots/hospital/schedule.png"
        }
      ]
    },
    {
      id: "7",
      title: "Airline Reservation System",
      description: "A feature-rich C++ airline booking system with flight management, reservation handling, and passenger services.",
      longDescription: `
        The Airline Reservation System is a comprehensive application for managing flight bookings and airline operations. This system demonstrates advanced booking algorithms and scheduling concepts.

        Key Implementation Details:
        • Flight Management: Complete flight scheduling and tracking
        • Reservation System: Efficient booking and seat allocation
        • Passenger Management: Detailed passenger records
        • Fare Calculation: Dynamic pricing and class management
      `,
      difficulty: "intermediate",
      features: [
        "Flight scheduling and management",
        "Seat reservation system",
        "Passenger information management",
        "Fare calculation and pricing",
        "Multiple class bookings",
        "Meal preference handling",
        "Cancellation management",
        "Booking history tracking"
      ],
      technologies: ["C++", "Data Structures", "File I/O", "Booking Algorithms"],
      sourceCode: `/c++/airline-reservation.cpp`,
      concepts: [
        "Object-Oriented Design",
        "Scheduling Systems",
        "Database Management",
        "Pricing Algorithms",
        "Reservation Handling"
      ],
      implementation: [
        {
          title: "Flight Management",
          code: `class Flight {
private:
    string flightNumber;
    string origin;
    string destination;
    DateTime departureTime;
    DateTime arrivalTime;
    int totalSeats;
    map<string, Seat> seatMap;
    vector<string> passengerList;

public:
    bool checkAvailability(const string& seatClass) const;
    double calculateFare(const string& seatClass) const;
    bool reserveSeat(const string& seatNumber, const string& passengerId);
    void updateSchedule(const DateTime& newDeparture, const DateTime& newArrival);
};`
        },
        {
          title: "Reservation System",
          code: `class Reservation {
private:
    string bookingId;
    string passengerId;
    string flightNumber;
    string seatNumber;
    string seatClass;
    bool isConfirmed;
    MealPreference mealChoice;
    double fare;

public:
    bool confirm();
    void cancel();
    bool changeSeat(const string& newSeatNumber);
    void updateMealPreference(const MealPreference& newChoice);
};

class Passenger {
private:
    string id;
    string name;
    string passportNumber;
    vector<string> bookingHistory;
    FrequentFlyerStatus status;

public:
    void addBooking(const string& bookingId);
    vector<Reservation> getActiveReservations() const;
    void updateFrequentFlyerStatus();
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "File system support",
        "Understanding of booking systems",
        "Knowledge of scheduling algorithms"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 airline_reservation.cpp -o airline_system",
        "Initialize flight database",
        "Set up seat configurations",
        "Configure pricing rules"
      ],
      icon: "✈️",
      screenshots: [
        {
          title: "Flight Search",
          description: "Search and book available flights",
          url: "/screenshots/airline/search.png"
        },
        {
          title: "Seat Selection",
          description: "Interactive seat map and selection",
          url: "/screenshots/airline/seats.png"
        }
      ]
    },
    {
      id: "8",
      title: "Learning Management System",
      description: "A comprehensive C++ e-learning platform for managing courses, student progress, and educational resources.",
      longDescription: `
        The Learning Management System is a robust application designed to facilitate online education. This system demonstrates advanced content management and user tracking concepts.

        Key Implementation Details:
        • Course Management: Complete course creation and organization
        • Student Progress: Detailed learning path tracking
        • Content Delivery: Structured educational material handling
        • Assessment System: Quiz and assignment management
      `,
      difficulty: "intermediate",
      features: [
        "Course content management",
        "Student enrollment system",
        "Progress tracking",
        "Quiz and assessment tools",
        "Resource management",
        "Student performance analytics",
        "Discussion forums",
        "Assignment submission system"
      ],
      technologies: ["C++", "Data Structures", "File I/O", "Content Management"],
      sourceCode: `/c++/learning-management.cpp`,
      concepts: [
        "Object-Oriented Design",
        "Content Organization",
        "User Management",
        "Progress Tracking",
        "Assessment Systems"
      ],
      implementation: [
        {
          title: "Course Management",
          code: `class Course {
private:
    string id;
    string title;
    string description;
    vector<Module> modules;
    vector<string> enrolledStudents;
    map<string, vector<Assessment>> assessments;

public:
    void addModule(const Module& module);
    void enrollStudent(const string& studentId);
    void addAssessment(const string& moduleId, const Assessment& assessment);
    vector<string> getEnrolledStudents() const;
};`
        },
        {
          title: "Student Progress Tracking",
          code: `class StudentProgress {
private:
    string studentId;
    string courseId;
    map<string, bool> completedModules;
    map<string, double> assessmentScores;
    double overallProgress;

public:
    void markModuleComplete(const string& moduleId);
    void recordAssessmentScore(const string& assessmentId, double score);
    double calculateProgress();
    void generateProgressReport();
};`
        }
      ],
      requirements: [
        "C++17 or later",
        "STL library",
        "File system support",
        "Understanding of educational systems",
        "Knowledge of content management"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++17 learning_management.cpp -o lms",
        "Initialize course database",
        "Set up user authentication",
        "Configure content storage"
      ],
      icon: "📚",
      screenshots: [
        {
          title: "Course Dashboard",
          description: "Overview of available courses and progress",
          url: "/screenshots/lms/dashboard.png"
        },
        {
          title: "Module View",
          description: "Detailed view of course modules and content",
          url: "/screenshots/lms/modules.png"
        }
      ]
    },
    {
      id: "9",
      title: "Temperature Converter",
      description: "A versatile C++ temperature conversion utility supporting multiple temperature scales and unit conversions.",
      longDescription: `
        The Temperature Converter is a practical application for converting between different temperature scales. This system demonstrates clean code principles and precise numerical calculations.

        Key Implementation Details:
        • Multiple Scale Support: Celsius, Fahrenheit, Kelvin
        • Precision Handling: Accurate floating-point calculations
        • Input Validation: Robust error checking
        • History Tracking: Conversion history management
      `,
      difficulty: "beginner",
      features: [
        "Multiple temperature scale support",
        "Precise conversion calculations",
        "Input validation",
        "Conversion history",
        "Batch conversion capability",
        "Custom scale definitions",
        "Temperature analysis tools",
        "Export functionality"
      ],
      technologies: ["C++", "Mathematical Operations", "Input Handling"],
      sourceCode: `/c++/temperature-converter.cpp`,
      concepts: [
        "Numerical Computation",
        "Input Validation",
        "Error Handling",
        "Unit Conversion",
        "User Interface Design"
      ],
      implementation: [
        {
          title: "Temperature Conversion",
          code: `class TemperatureConverter {
private:
    vector<pair<double, string>> conversionHistory;
    
public:
    double celsiusToFahrenheit(double celsius) {
        double result = (celsius * 9.0/5.0) + 32;
        recordConversion(celsius, "C", result, "F");
        return result;
    }
    
    double fahrenheitToCelsius(double fahrenheit) {
        double result = (fahrenheit - 32) * 5.0/9.0;
        recordConversion(fahrenheit, "F", result, "C");
        return result;
    }
    
    double celsiusToKelvin(double celsius) {
        double result = celsius + 273.15;
        recordConversion(celsius, "C", result, "K");
        return result;
    }
    
    void recordConversion(double from, string fromUnit, 
                         double to, string toUnit) {
        conversionHistory.push_back({from, fromUnit});
        conversionHistory.push_back({to, toUnit});
    }
};`
        },
        {
          title: "Input Validation",
          code: `class InputValidator {
private:
    const double MIN_ABSOLUTE_TEMP = -273.15; // Celsius

public:
    bool isValidTemperature(double temp, string scale) {
        if (scale == "C") {
            return temp >= MIN_ABSOLUTE_TEMP;
        } else if (scale == "F") {
            return temp >= (MIN_ABSOLUTE_TEMP * 9.0/5.0 + 32);
        } else if (scale == "K") {
            return temp >= 0;
        }
        return false;
    }
    
    bool isValidScale(string scale) {
        return scale == "C" || scale == "F" || scale == "K";
    }
};`
        }
      ],
      requirements: [
        "C++11 or later",
        "Basic understanding of temperature scales",
        "Knowledge of floating-point arithmetic",
        "Input/output handling capabilities"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++11 temperature_converter.cpp -o temp_conv",
        "Run the executable: ./temp_conv",
        "Follow the on-screen instructions",
        "Enter temperatures to convert"
      ],
      icon: "🌡️",
      screenshots: [
        {
          title: "Converter Interface",
          description: "Main conversion interface with input fields",
          url: "/screenshots/temperature/converter.png"
        },
        {
          title: "Conversion History",
          description: "Log of previous temperature conversions",
          url: "/screenshots/temperature/history.png"
        }
      ]
    },
    {
      id: "10",
      title: "Unit Converter",
      description: "A comprehensive C++ unit conversion system supporting multiple measurement types and conversion formulas.",
      longDescription: `
        The Unit Converter is a versatile application for converting between different units of measurement. This system demonstrates modular design and extensible architecture.

        Key Implementation Details:
        • Multiple Unit Types: Length, Weight, Volume, etc.
        • Custom Unit Support: User-defined unit definitions
        • Conversion Chain: Multi-step conversion handling
        • Precision Control: Accurate conversion results
      `,
      difficulty: "beginner",
      features: [
        "Multiple measurement type support",
        "Bi-directional conversion",
        "Custom unit definitions",
        "Conversion history tracking",
        "Favorite conversions",
        "Batch conversion support",
        "Export functionality",
        "Unit grouping and categorization"
      ],
      technologies: ["C++", "Mathematical Operations", "Data Structures"],
      sourceCode: `/c++/unit-converter.cpp`,
      concepts: [
        "Object-Oriented Design",
        "Mathematical Operations",
        "Data Structures",
        "User Interface",
        "Error Handling"
      ],
      implementation: [
        {
          title: "Unit Conversion System",
          code: `class UnitConverter {
private:
    map<string, map<string, double>> conversionFactors;
    vector<pair<string, pair<double, double>>> conversionHistory;

public:
    void addConversionFactor(const string& from, const string& to, 
                           double factor) {
        conversionFactors[from][to] = factor;
        conversionFactors[to][from] = 1.0 / factor;
    }
    
    double convert(double value, const string& from, 
                  const string& to) {
        if (from == to) return value;
        
        if (conversionFactors[from].find(to) != 
            conversionFactors[from].end()) {
            double result = value * conversionFactors[from][to];
            recordConversion(from, to, value, result);
            return result;
        }
        
        throw runtime_error("Conversion not supported");
    }
    
    void recordConversion(const string& from, const string& to,
                         double valueFrom, double valueTo) {
        conversionHistory.push_back({from, {valueFrom, valueTo}});
    }
};`
        },
        {
          title: "Measurement Types",
          code: `class MeasurementType {
private:
    string name;
    vector<string> units;
    map<string, string> descriptions;

public:
    MeasurementType(const string& typeName) : name(typeName) {}
    
    void addUnit(const string& unit, const string& description) {
        units.push_back(unit);
        descriptions[unit] = description;
    }
    
    vector<string> getAvailableUnits() const {
        return units;
    }
    
    string getDescription(const string& unit) const {
        return descriptions.at(unit);
    }
};`
        }
      ],
      requirements: [
        "C++11 or later",
        "STL library",
        "Basic math knowledge",
        "Understanding of unit conversions"
      ],
      setupInstructions: [
        "Clone the repository",
        "Compile using g++ -std=c++11 unit_converter.cpp -o unit_conv",
        "Run the executable: ./unit_conv",
        "Select measurement type",
        "Enter values to convert"
      ],
      icon: "📏",
      screenshots: [
        {
          title: "Converter Interface",
          description: "Main unit conversion interface",
          url: "/screenshots/unit-converter/main.png"
        },
        {
          title: "Unit Selection",
          description: "Selection of measurement types and units",
          url: "/screenshots/unit-converter/units.png"
        }
      ]
    }
  ];

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <SharedLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
            <Link to="/projects/cpp" className="text-blue-600 hover:text-blue-800">
              Return to Projects
            </Link>
          </div>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center">
              {project.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                {project.title}
              </h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-lg">{project.longDescription}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Features */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Key Features
              </h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Implementation Details */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Implementation Details
              </h2>
              <div className="space-y-6">
                {project.implementation.map((impl, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{impl.title}</h3>
                    <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-gray-800">{impl.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshots */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Screenshots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div key={index} className="space-y-2">
                    <img
                      src={screenshot.url}
                      alt={screenshot.title}
                      className="rounded-lg shadow-md w-full"
                    />
                    <h3 className="font-semibold text-gray-800">{screenshot.title}</h3>
                    <p className="text-sm text-gray-600">{screenshot.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* C++ Concepts */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                C++ Concepts
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.concepts.map((concept, index) => (
                  <span key={index} className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm">
                    {concept}
                  </span>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Requirements
              </h2>
              <ul className="space-y-2">
                {project.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Setup Instructions */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Setup Instructions
              </h2>
              <ol className="space-y-2 list-decimal list-inside">
                {project.setupInstructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))}
              </ol>
            </section>

            {/* Download Section */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Source Code
              </h2>
              <div className="space-y-4">
                <button
                  onClick={() => handleDownload(project.fullSourceCode, project.title)}
                  className="w-full text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Source Code
                </button>
                <div className="text-sm text-gray-600">
                  <p>• Click the button above to download the complete source code</p>
                  <p>• The file will be downloaded as a .cpp file</p>
                  <p>• Make sure you have a C++ compiler installed to run the code</p>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link
                to={project.sourceCode}
                className="flex-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                View Source Code
              </Link>
              <Link
                to="/projects/cpp"
                className="flex-1 text-center bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
} 