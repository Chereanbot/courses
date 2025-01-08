#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <ctime>
#include <algorithm>
using namespace std;

class Inmate {
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
    Inmate(string inmateId, string inmateName, int inmateAge, string inmateGender,
           string inmCrime, string inmSentence, string admDate, string relDate)
        : id(inmateId), name(inmateName), age(inmateAge), gender(inmateGender),
          crime(inmCrime), sentence(inmSentence), admissionDate(admDate),
          releaseDate(relDate), cellBlock(""), cellNumber(-1), isReleased(false) {}

    string getId() const { return id; }
    string getName() const { return name; }
    bool getIsReleased() const { return isReleased; }
    string getCellBlock() const { return cellBlock; }
    int getCellNumber() const { return cellNumber; }

    void assignCell(const string& block, int number) {
        cellBlock = block;
        cellNumber = number;
    }

    void addBehaviorRecord(const string& record) {
        time_t now = time(0);
        string date = ctime(&now);
        date = date.substr(0, date.length() - 1);  // Remove newline
        behaviorRecords.push_back(date + ": " + record);
    }

    void addMedicalRecord(const string& record) {
        time_t now = time(0);
        string date = ctime(&now);
        date = date.substr(0, date.length() - 1);  // Remove newline
        medicalRecords.push_back(date + ": " + record);
    }

    void release() {
        isReleased = true;
        cellBlock = "";
        cellNumber = -1;
    }

    void displayInfo() const {
        cout << "\nInmate Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
        cout << "Gender: " << gender << endl;
        cout << "Crime: " << crime << endl;
        cout << "Sentence: " << sentence << endl;
        cout << "Admission Date: " << admissionDate << endl;
        cout << "Release Date: " << releaseDate << endl;
        cout << "Status: " << (isReleased ? "Released" : "Incarcerated") << endl;
        
        if (!isReleased) {
            cout << "Cell Block: " << cellBlock << endl;
            cout << "Cell Number: " << cellNumber << endl;
        }

        cout << "\nBehavior Records:" << endl;
        if (behaviorRecords.empty()) cout << "No behavior records." << endl;
        else {
            for (const auto& record : behaviorRecords) {
                cout << "- " << record << endl;
            }
        }

        cout << "\nMedical Records:" << endl;
        if (medicalRecords.empty()) cout << "No medical records." << endl;
        else {
            for (const auto& record : medicalRecords) {
                cout << "- " << record << endl;
            }
        }
    }
};

class Staff {
private:
    string id;
    string name;
    string position;
    string department;
    string phone;
    string email;
    string shift;
    vector<string> dutyRecords;

public:
    Staff(string staffId, string staffName, string pos, string dept,
          string staffPhone, string staffEmail, string staffShift)
        : id(staffId), name(staffName), position(pos), department(dept),
          phone(staffPhone), email(staffEmail), shift(staffShift) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getDepartment() const { return department; }

    void addDutyRecord(const string& record) {
        time_t now = time(0);
        string date = ctime(&now);
        date = date.substr(0, date.length() - 1);  // Remove newline
        dutyRecords.push_back(date + ": " + record);
    }

    void displayInfo() const {
        cout << "\nStaff Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Position: " << position << endl;
        cout << "Department: " << department << endl;
        cout << "Phone: " << phone << endl;
        cout << "Email: " << email << endl;
        cout << "Shift: " << shift << endl;

        cout << "\nDuty Records:" << endl;
        if (dutyRecords.empty()) cout << "No duty records." << endl;
        else {
            for (const auto& record : dutyRecords) {
                cout << "- " << record << endl;
            }
        }
    }
};

class Visitor {
private:
    string id;
    string name;
    string relation;
    string phone;
    string address;
    vector<pair<string, string>> visitHistory; // inmateId, date

public:
    Visitor(string visitorId, string visitorName, string rel,
            string visitorPhone, string visitorAddr)
        : id(visitorId), name(visitorName), relation(rel),
          phone(visitorPhone), address(visitorAddr) {}

    string getId() const { return id; }
    string getName() const { return name; }

    void addVisit(const string& inmateId) {
        time_t now = time(0);
        string date = ctime(&now);
        date = date.substr(0, date.length() - 1);  // Remove newline
        visitHistory.emplace_back(inmateId, date);
    }

    void displayInfo() const {
        cout << "\nVisitor Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Relation: " << relation << endl;
        cout << "Phone: " << phone << endl;
        cout << "Address: " << address << endl;

        cout << "\nVisit History:" << endl;
        if (visitHistory.empty()) cout << "No visit history." << endl;
        else {
            for (const auto& visit : visitHistory) {
                cout << "Inmate ID: " << visit.first << ", Date: " << visit.second << endl;
            }
        }
    }
};

class PrisonManagementSystem {
private:
    vector<Inmate> inmates;
    vector<Staff> staff;
    vector<Visitor> visitors;
    map<string, int> inmateIndex;    // inmateId -> index
    map<string, int> staffIndex;     // staffId -> index
    map<string, int> visitorIndex;   // visitorId -> index
    map<pair<string, int>, string> cellAssignments; // (block, number) -> inmateId

    bool isCellOccupied(const string& block, int number) const {
        return cellAssignments.find(make_pair(block, number)) != cellAssignments.end();
    }

public:
    void addInmate() {
        string id, name, gender, crime, sentence, admissionDate, releaseDate;
        int age;

        cout << "\nEnter Inmate Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (inmateIndex.find(id) != inmateIndex.end()) {
            cout << "Error: Inmate already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Age: ";
        cin >> age;
        cin.ignore();
        cout << "Gender (M/F): ";
        getline(cin, gender);
        cout << "Crime: ";
        getline(cin, crime);
        cout << "Sentence: ";
        getline(cin, sentence);
        cout << "Admission Date (DD/MM/YYYY): ";
        getline(cin, admissionDate);
        cout << "Release Date (DD/MM/YYYY): ";
        getline(cin, releaseDate);

        inmates.emplace_back(id, name, age, gender, crime, sentence, admissionDate, releaseDate);
        inmateIndex[id] = inmates.size() - 1;

        // Assign cell
        string block;
        int number;
        cout << "\nAssign Cell" << endl;
        cout << "Block: ";
        getline(cin, block);
        cout << "Number: ";
        cin >> number;

        if (isCellOccupied(block, number)) {
            cout << "Error: Cell is already occupied!" << endl;
            return;
        }

        inmates.back().assignCell(block, number);
        cellAssignments[make_pair(block, number)] = id;
        cout << "\nInmate added successfully!" << endl;
    }

    void addStaff() {
        string id, name, position, department, phone, email, shift;

        cout << "\nEnter Staff Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (staffIndex.find(id) != staffIndex.end()) {
            cout << "Error: Staff already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Position: ";
        getline(cin, position);
        cout << "Department: ";
        getline(cin, department);
        cout << "Phone: ";
        getline(cin, phone);
        cout << "Email: ";
        getline(cin, email);
        cout << "Shift: ";
        getline(cin, shift);

        staff.emplace_back(id, name, position, department, phone, email, shift);
        staffIndex[id] = staff.size() - 1;
        cout << "\nStaff added successfully!" << endl;
    }

    void addVisitor() {
        string id, name, relation, phone, address;

        cout << "\nEnter Visitor Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (visitorIndex.find(id) != visitorIndex.end()) {
            cout << "Error: Visitor already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Relation to Inmate: ";
        getline(cin, relation);
        cout << "Phone: ";
        getline(cin, phone);
        cout << "Address: ";
        getline(cin, address);

        visitors.emplace_back(id, name, relation, phone, address);
        visitorIndex[id] = visitors.size() - 1;
        cout << "\nVisitor added successfully!" << endl;
    }

    void recordVisit() {
        string visitorId, inmateId;

        cout << "\nEnter Visit Details" << endl;
        cout << "Visitor ID: ";
        cin >> visitorId;

        auto visitorIt = visitorIndex.find(visitorId);
        if (visitorIt == visitorIndex.end()) {
            cout << "Error: Visitor not found!" << endl;
            return;
        }

        cout << "Inmate ID: ";
        cin >> inmateId;

        auto inmateIt = inmateIndex.find(inmateId);
        if (inmateIt == inmateIndex.end()) {
            cout << "Error: Inmate not found!" << endl;
            return;
        }

        if (inmates[inmateIt->second].getIsReleased()) {
            cout << "Error: Inmate has been released!" << endl;
            return;
        }

        visitors[visitorIt->second].addVisit(inmateId);
        cout << "\nVisit recorded successfully!" << endl;
    }

    void releaseInmate() {
        string inmateId;
        cout << "\nEnter Inmate ID: ";
        cin >> inmateId;

        auto inmateIt = inmateIndex.find(inmateId);
        if (inmateIt == inmateIndex.end()) {
            cout << "Error: Inmate not found!" << endl;
            return;
        }

        Inmate& inmate = inmates[inmateIt->second];
        if (inmate.getIsReleased()) {
            cout << "Error: Inmate has already been released!" << endl;
            return;
        }

        // Remove cell assignment
        cellAssignments.erase(make_pair(inmate.getCellBlock(), inmate.getCellNumber()));
        inmate.release();
        cout << "\nInmate released successfully!" << endl;
    }

    void addBehaviorRecord() {
        string inmateId, record;
        cout << "\nEnter Inmate ID: ";
        cin >> inmateId;

        auto inmateIt = inmateIndex.find(inmateId);
        if (inmateIt == inmateIndex.end()) {
            cout << "Error: Inmate not found!" << endl;
            return;
        }

        cin.ignore();
        cout << "Enter behavior record: ";
        getline(cin, record);

        inmates[inmateIt->second].addBehaviorRecord(record);
        cout << "\nBehavior record added successfully!" << endl;
    }

    void addMedicalRecord() {
        string inmateId, record;
        cout << "\nEnter Inmate ID: ";
        cin >> inmateId;

        auto inmateIt = inmateIndex.find(inmateId);
        if (inmateIt == inmateIndex.end()) {
            cout << "Error: Inmate not found!" << endl;
            return;
        }

        cin.ignore();
        cout << "Enter medical record: ";
        getline(cin, record);

        inmates[inmateIt->second].addMedicalRecord(record);
        cout << "\nMedical record added successfully!" << endl;
    }

    void displayInmateInfo() {
        string inmateId;
        cout << "\nEnter Inmate ID: ";
        cin >> inmateId;

        auto inmateIt = inmateIndex.find(inmateId);
        if (inmateIt == inmateIndex.end()) {
            cout << "Error: Inmate not found!" << endl;
            return;
        }

        inmates[inmateIt->second].displayInfo();
    }

    void displayStaffInfo() {
        string staffId;
        cout << "\nEnter Staff ID: ";
        cin >> staffId;

        auto staffIt = staffIndex.find(staffId);
        if (staffIt == staffIndex.end()) {
            cout << "Error: Staff not found!" << endl;
            return;
        }

        staff[staffIt->second].displayInfo();
    }

    void displayVisitorInfo() {
        string visitorId;
        cout << "\nEnter Visitor ID: ";
        cin >> visitorId;

        auto visitorIt = visitorIndex.find(visitorId);
        if (visitorIt == visitorIndex.end()) {
            cout << "Error: Visitor not found!" << endl;
            return;
        }

        visitors[visitorIt->second].displayInfo();
    }

    void searchInmates() {
        string searchTerm;
        cin.ignore();
        cout << "\nEnter search term (name or ID): ";
        getline(cin, searchTerm);

        bool found = false;
        for (const auto& inmate : inmates) {
            if (inmate.getName().find(searchTerm) != string::npos ||
                inmate.getId() == searchTerm) {
                inmate.displayInfo();
                found = true;
            }
        }

        if (!found) {
            cout << "\nNo inmates found matching the search term." << endl;
        }
    }
};

int main() {
    PrisonManagementSystem system;
    int choice;

    cout << "Welcome to Prison Management System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add Inmate" << endl;
        cout << "2. Add Staff" << endl;
        cout << "3. Add Visitor" << endl;
        cout << "4. Record Visit" << endl;
        cout << "5. Release Inmate" << endl;
        cout << "6. Add Behavior Record" << endl;
        cout << "7. Add Medical Record" << endl;
        cout << "8. Display Inmate Information" << endl;
        cout << "9. Display Staff Information" << endl;
        cout << "10. Display Visitor Information" << endl;
        cout << "11. Search Inmates" << endl;
        cout << "12. Exit" << endl;
        cout << "Enter your choice (1-12): ";
        cin >> choice;

        switch (choice) {
            case 1:
                system.addInmate();
                break;
            case 2:
                system.addStaff();
                break;
            case 3:
                system.addVisitor();
                break;
            case 4:
                system.recordVisit();
                break;
            case 5:
                system.releaseInmate();
                break;
            case 6:
                system.addBehaviorRecord();
                break;
            case 7:
                system.addMedicalRecord();
                break;
            case 8:
                system.displayInmateInfo();
                break;
            case 9:
                system.displayStaffInfo();
                break;
            case 10:
                system.displayVisitorInfo();
                break;
            case 11:
                system.searchInmates();
                break;
            case 12:
                cout << "\nThank you for using Prison Management System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 