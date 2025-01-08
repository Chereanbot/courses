#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <ctime>
#include <algorithm>
using namespace std;

class Patient {
private:
    string id;
    string name;
    int age;
    string gender;
    string phone;
    string address;
    string bloodGroup;
    vector<string> medicalHistory;
    vector<string> currentMedications;
    vector<string> allergies;

public:
    Patient(string pId, string pName, int pAge, string pGender, string pPhone, 
           string pAddress, string blood)
        : id(pId), name(pName), age(pAge), gender(pGender), phone(pPhone),
          address(pAddress), bloodGroup(blood) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getPhone() const { return phone; }

    void addMedicalHistory(const string& condition) {
        medicalHistory.push_back(condition);
    }

    void addMedication(const string& medication) {
        currentMedications.push_back(medication);
    }

    void addAllergy(const string& allergy) {
        allergies.push_back(allergy);
    }

    void displayInfo() const {
        cout << "\nPatient Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Age: " << age << endl;
        cout << "Gender: " << gender << endl;
        cout << "Phone: " << phone << endl;
        cout << "Address: " << address << endl;
        cout << "Blood Group: " << bloodGroup << endl;

        cout << "\nMedical History:" << endl;
        if (medicalHistory.empty()) cout << "No medical history recorded." << endl;
        else {
            for (const auto& condition : medicalHistory) {
                cout << "- " << condition << endl;
            }
        }

        cout << "\nCurrent Medications:" << endl;
        if (currentMedications.empty()) cout << "No current medications." << endl;
        else {
            for (const auto& medication : currentMedications) {
                cout << "- " << medication << endl;
            }
        }

        cout << "\nAllergies:" << endl;
        if (allergies.empty()) cout << "No known allergies." << endl;
        else {
            for (const auto& allergy : allergies) {
                cout << "- " << allergy << endl;
            }
        }
    }
};

class Doctor {
private:
    string id;
    string name;
    string specialization;
    string phone;
    string email;
    vector<pair<string, string>> schedule; // day, time slots
    double consultationFee;

public:
    Doctor(string dId, string dName, string spec, string dPhone, string dEmail, double fee)
        : id(dId), name(dName), specialization(spec), phone(dPhone),
          email(dEmail), consultationFee(fee) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getSpecialization() const { return specialization; }
    double getConsultationFee() const { return consultationFee; }

    void addSchedule(const string& day, const string& timeSlot) {
        schedule.emplace_back(day, timeSlot);
    }

    bool isAvailable(const string& day, const string& timeSlot) const {
        return find(schedule.begin(), schedule.end(), 
                   make_pair(day, timeSlot)) != schedule.end();
    }

    void displayInfo() const {
        cout << "\nDoctor Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Specialization: " << specialization << endl;
        cout << "Phone: " << phone << endl;
        cout << "Email: " << email << endl;
        cout << "Consultation Fee: ETB " << fixed << setprecision(2) << consultationFee << endl;

        cout << "\nSchedule:" << endl;
        if (schedule.empty()) cout << "No schedule set." << endl;
        else {
            for (const auto& slot : schedule) {
                cout << slot.first << ": " << slot.second << endl;
            }
        }
    }
};

class Appointment {
private:
    string appointmentId;
    string patientId;
    string doctorId;
    string date;
    string timeSlot;
    bool confirmed;
    string status; // Scheduled, Completed, Cancelled
    string notes;

public:
    Appointment(string appId, string pId, string dId, string appDate, string time)
        : appointmentId(appId), patientId(pId), doctorId(dId),
          date(appDate), timeSlot(time), confirmed(false), status("Scheduled") {}

    string getAppointmentId() const { return appointmentId; }
    string getPatientId() const { return patientId; }
    string getDoctorId() const { return doctorId; }
    string getDate() const { return date; }
    string getStatus() const { return status; }

    void confirm() { confirmed = true; }
    void cancel() { status = "Cancelled"; }
    void complete() { status = "Completed"; }
    void addNotes(const string& doctorNotes) { notes = doctorNotes; }

    void displayInfo() const {
        cout << "\nAppointment Details:" << endl;
        cout << "Appointment ID: " << appointmentId << endl;
        cout << "Patient ID: " << patientId << endl;
        cout << "Doctor ID: " << doctorId << endl;
        cout << "Date: " << date << endl;
        cout << "Time: " << timeSlot << endl;
        cout << "Status: " << status << endl;
        if (!notes.empty()) {
            cout << "Notes: " << notes << endl;
        }
    }
};

class HospitalManagementSystem {
private:
    vector<Patient> patients;
    vector<Doctor> doctors;
    vector<Appointment> appointments;
    map<string, int> patientIndex;    // patientId -> index
    map<string, int> doctorIndex;     // doctorId -> index
    int lastAppointmentNumber;

    string generateAppointmentId() {
        return "APP" + to_string(++lastAppointmentNumber);
    }

public:
    HospitalManagementSystem() : lastAppointmentNumber(1000) {}

    void addPatient() {
        string id, name, gender, phone, address, bloodGroup;
        int age;

        cout << "\nEnter Patient Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (patientIndex.find(id) != patientIndex.end()) {
            cout << "Error: Patient already exists!" << endl;
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
        cout << "Phone: ";
        getline(cin, phone);
        cout << "Address: ";
        getline(cin, address);
        cout << "Blood Group: ";
        getline(cin, bloodGroup);

        patients.emplace_back(id, name, age, gender, phone, address, bloodGroup);
        patientIndex[id] = patients.size() - 1;
        cout << "\nPatient added successfully!" << endl;
    }

    void addDoctor() {
        string id, name, specialization, phone, email;
        double fee;

        cout << "\nEnter Doctor Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (doctorIndex.find(id) != doctorIndex.end()) {
            cout << "Error: Doctor already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Specialization: ";
        getline(cin, specialization);
        cout << "Phone: ";
        getline(cin, phone);
        cout << "Email: ";
        getline(cin, email);
        cout << "Consultation Fee (ETB): ";
        cin >> fee;

        doctors.emplace_back(id, name, specialization, phone, email, fee);
        doctorIndex[id] = doctors.size() - 1;

        // Add schedule
        string day, timeSlot;
        char addMore;
        cin.ignore();
        do {
            cout << "\nAdd Schedule" << endl;
            cout << "Day: ";
            getline(cin, day);
            cout << "Time Slot: ";
            getline(cin, timeSlot);
            doctors.back().addSchedule(day, timeSlot);

            cout << "Add more schedule? (Y/N): ";
            cin >> addMore;
            cin.ignore();
        } while (toupper(addMore) == 'Y');

        cout << "\nDoctor added successfully!" << endl;
    }

    void scheduleAppointment() {
        string patientId, doctorId, date, timeSlot;

        cout << "\nEnter Appointment Details" << endl;
        cout << "Patient ID: ";
        cin >> patientId;

        auto patientIt = patientIndex.find(patientId);
        if (patientIt == patientIndex.end()) {
            cout << "Error: Patient not found!" << endl;
            return;
        }

        cout << "Doctor ID: ";
        cin >> doctorId;

        auto doctorIt = doctorIndex.find(doctorId);
        if (doctorIt == doctorIndex.end()) {
            cout << "Error: Doctor not found!" << endl;
            return;
        }

        cin.ignore();
        cout << "Date (DD/MM/YYYY): ";
        getline(cin, date);
        cout << "Time Slot: ";
        getline(cin, timeSlot);

        const Doctor& doctor = doctors[doctorIt->second];
        if (!doctor.isAvailable(date, timeSlot)) {
            cout << "Error: Doctor not available at specified time!" << endl;
            return;
        }

        string appointmentId = generateAppointmentId();
        appointments.emplace_back(appointmentId, patientId, doctorId, date, timeSlot);
        appointments.back().confirm();

        cout << "\nAppointment scheduled successfully!" << endl;
        cout << "Appointment ID: " << appointmentId << endl;
    }

    void updateMedicalHistory() {
        string patientId;
        cout << "\nEnter Patient ID: ";
        cin >> patientId;

        auto patientIt = patientIndex.find(patientId);
        if (patientIt == patientIndex.end()) {
            cout << "Error: Patient not found!" << endl;
            return;
        }

        Patient& patient = patients[patientIt->second];
        string condition;
        char addMore;

        cin.ignore();
        do {
            cout << "Enter medical condition: ";
            getline(cin, condition);
            patient.addMedicalHistory(condition);

            cout << "Add more conditions? (Y/N): ";
            cin >> addMore;
            cin.ignore();
        } while (toupper(addMore) == 'Y');

        cout << "\nMedical history updated successfully!" << endl;
    }

    void updateMedications() {
        string patientId;
        cout << "\nEnter Patient ID: ";
        cin >> patientId;

        auto patientIt = patientIndex.find(patientId);
        if (patientIt == patientIndex.end()) {
            cout << "Error: Patient not found!" << endl;
            return;
        }

        Patient& patient = patients[patientIt->second];
        string medication;
        char addMore;

        cin.ignore();
        do {
            cout << "Enter medication: ";
            getline(cin, medication);
            patient.addMedication(medication);

            cout << "Add more medications? (Y/N): ";
            cin >> addMore;
            cin.ignore();
        } while (toupper(addMore) == 'Y');

        cout << "\nMedications updated successfully!" << endl;
    }

    void displayPatientInfo() {
        string patientId;
        cout << "\nEnter Patient ID: ";
        cin >> patientId;

        auto patientIt = patientIndex.find(patientId);
        if (patientIt == patientIndex.end()) {
            cout << "Error: Patient not found!" << endl;
            return;
        }

        patients[patientIt->second].displayInfo();
    }

    void displayDoctorInfo() {
        string doctorId;
        cout << "\nEnter Doctor ID: ";
        cin >> doctorId;

        auto doctorIt = doctorIndex.find(doctorId);
        if (doctorIt == doctorIndex.end()) {
            cout << "Error: Doctor not found!" << endl;
            return;
        }

        doctors[doctorIt->second].displayInfo();
    }

    void displayAppointments() const {
        if (appointments.empty()) {
            cout << "\nNo appointments scheduled." << endl;
            return;
        }

        cout << "\n=== Appointments ===" << endl;
        for (const auto& appointment : appointments) {
            appointment.displayInfo();
        }
    }

    void searchDoctorsBySpecialization() {
        string specialization;
        cin.ignore();
        cout << "\nEnter Specialization: ";
        getline(cin, specialization);

        bool found = false;
        for (const auto& doctor : doctors) {
            if (doctor.getSpecialization() == specialization) {
                doctor.displayInfo();
                found = true;
            }
        }

        if (!found) {
            cout << "\nNo doctors found for the specified specialization." << endl;
        }
    }
};

int main() {
    HospitalManagementSystem system;
    int choice;

    cout << "Welcome to Hospital Management System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add Patient" << endl;
        cout << "2. Add Doctor" << endl;
        cout << "3. Schedule Appointment" << endl;
        cout << "4. Update Medical History" << endl;
        cout << "5. Update Medications" << endl;
        cout << "6. Display Patient Information" << endl;
        cout << "7. Display Doctor Information" << endl;
        cout << "8. Display All Appointments" << endl;
        cout << "9. Search Doctors by Specialization" << endl;
        cout << "10. Exit" << endl;
        cout << "Enter your choice (1-10): ";
        cin >> choice;

        switch (choice) {
            case 1:
                system.addPatient();
                break;
            case 2:
                system.addDoctor();
                break;
            case 3:
                system.scheduleAppointment();
                break;
            case 4:
                system.updateMedicalHistory();
                break;
            case 5:
                system.updateMedications();
                break;
            case 6:
                system.displayPatientInfo();
                break;
            case 7:
                system.displayDoctorInfo();
                break;
            case 8:
                system.displayAppointments();
                break;
            case 9:
                system.searchDoctorsBySpecialization();
                break;
            case 10:
                cout << "\nThank you for using Hospital Management System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 