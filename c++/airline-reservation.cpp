#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <ctime>
#include <algorithm>
using namespace std;

class Passenger {
private:
    string id;
    string name;
    string phone;
    string email;
    string passportNumber;

public:
    Passenger(string passId, string pName, string pPhone, string pEmail, string passport)
        : id(passId), name(pName), phone(pPhone), email(pEmail), passportNumber(passport) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getPhone() const { return phone; }
    string getPassport() const { return passportNumber; }

    void displayInfo() const {
        cout << "\nPassenger Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Phone: " << phone << endl;
        cout << "Email: " << email << endl;
        cout << "Passport: " << passportNumber << endl;
    }
};

class Flight {
private:
    string flightNumber;
    string origin;
    string destination;
    string departureDate;
    string departureTime;
    string arrivalTime;
    double price;
    int totalSeats;
    int availableSeats;
    vector<bool> seatMap;  // true if seat is occupied
    map<int, string> seatAssignments;  // seat number -> passenger ID

public:
    Flight(string fNumber, string from, string to, string date, 
           string depTime, string arrTime, double ticketPrice, int seats)
        : flightNumber(fNumber), origin(from), destination(to),
          departureDate(date), departureTime(depTime), arrivalTime(arrTime),
          price(ticketPrice), totalSeats(seats), availableSeats(seats) {
        seatMap.resize(totalSeats, false);
    }

    string getFlightNumber() const { return flightNumber; }
    string getOrigin() const { return origin; }
    string getDestination() const { return destination; }
    string getDepartureDate() const { return departureDate; }
    double getPrice() const { return price; }
    int getAvailableSeats() const { return availableSeats; }

    bool isSeatAvailable(int seatNumber) const {
        return seatNumber > 0 && seatNumber <= totalSeats && !seatMap[seatNumber - 1];
    }

    bool assignSeat(int seatNumber, const string& passengerId) {
        if (isSeatAvailable(seatNumber)) {
            seatMap[seatNumber - 1] = true;
            seatAssignments[seatNumber] = passengerId;
            availableSeats--;
            return true;
        }
        return false;
    }

    bool cancelSeat(int seatNumber) {
        if (seatNumber > 0 && seatNumber <= totalSeats && seatMap[seatNumber - 1]) {
            seatMap[seatNumber - 1] = false;
            seatAssignments.erase(seatNumber);
            availableSeats++;
            return true;
        }
        return false;
    }

    void displaySeatMap() const {
        cout << "\nSeat Map for Flight " << flightNumber << ":" << endl;
        cout << "Available Seats: " << availableSeats << "/" << totalSeats << endl;
        
        int seatsPerRow = 6;
        for (int i = 0; i < totalSeats; i++) {
            if (i % seatsPerRow == 0) {
                cout << "\nRow " << (i / seatsPerRow + 1) << ": ";
            }
            cout << (seatMap[i] ? "X" : "O") << " ";
        }
        cout << "\nX = Occupied, O = Available" << endl;
    }

    void displayInfo() const {
        cout << "\nFlight Details:" << endl;
        cout << "Flight Number: " << flightNumber << endl;
        cout << "Route: " << origin << " -> " << destination << endl;
        cout << "Date: " << departureDate << endl;
        cout << "Departure Time: " << departureTime << endl;
        cout << "Arrival Time: " << arrivalTime << endl;
        cout << "Price: ETB " << fixed << setprecision(2) << price << endl;
        cout << "Available Seats: " << availableSeats << "/" << totalSeats << endl;
    }
};

class Reservation {
private:
    string reservationNumber;
    string passengerId;
    string flightNumber;
    int seatNumber;
    time_t bookingTime;
    bool confirmed;

public:
    Reservation(string resNumber, string pId, string fNumber, int seat)
        : reservationNumber(resNumber), passengerId(pId),
          flightNumber(fNumber), seatNumber(seat),
          bookingTime(time(0)), confirmed(false) {}

    string getReservationNumber() const { return reservationNumber; }
    string getPassengerId() const { return passengerId; }
    string getFlightNumber() const { return flightNumber; }
    int getSeatNumber() const { return seatNumber; }
    bool isConfirmed() const { return confirmed; }

    void confirm() { confirmed = true; }
    void cancel() { confirmed = false; }

    void displayInfo() const {
        cout << "\nReservation Details:" << endl;
        cout << "Reservation Number: " << reservationNumber << endl;
        cout << "Flight Number: " << flightNumber << endl;
        cout << "Passenger ID: " << passengerId << endl;
        cout << "Seat Number: " << seatNumber << endl;
        cout << "Status: " << (confirmed ? "Confirmed" : "Pending") << endl;
        cout << "Booking Time: " << ctime(&bookingTime);
    }
};

class AirlineReservationSystem {
private:
    vector<Flight> flights;
    vector<Passenger> passengers;
    vector<Reservation> reservations;
    map<string, int> flightIndex;    // flightNumber -> index
    map<string, int> passengerIndex; // passengerId -> index
    int lastReservationNumber;

    string generateReservationNumber() {
        return "RES" + to_string(++lastReservationNumber);
    }

public:
    AirlineReservationSystem() : lastReservationNumber(1000) {}

    void addFlight() {
        string number, origin, destination, date, depTime, arrTime;
        double price;
        int seats;

        cout << "\nEnter Flight Details" << endl;
        cout << "Flight Number: ";
        cin >> number;

        if (flightIndex.find(number) != flightIndex.end()) {
            cout << "Error: Flight already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Origin: ";
        getline(cin, origin);
        cout << "Destination: ";
        getline(cin, destination);
        cout << "Date (DD/MM/YYYY): ";
        getline(cin, date);
        cout << "Departure Time (HH:MM): ";
        getline(cin, depTime);
        cout << "Arrival Time (HH:MM): ";
        getline(cin, arrTime);
        cout << "Ticket Price (ETB): ";
        cin >> price;
        cout << "Total Seats: ";
        cin >> seats;

        flights.emplace_back(number, origin, destination, date, depTime, arrTime, price, seats);
        flightIndex[number] = flights.size() - 1;
        cout << "\nFlight added successfully!" << endl;
    }

    void addPassenger() {
        string id, name, phone, email, passport;

        cout << "\nEnter Passenger Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (passengerIndex.find(id) != passengerIndex.end()) {
            cout << "Error: Passenger already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Phone: ";
        getline(cin, phone);
        cout << "Email: ";
        getline(cin, email);
        cout << "Passport Number: ";
        getline(cin, passport);

        passengers.emplace_back(id, name, phone, email, passport);
        passengerIndex[id] = passengers.size() - 1;
        cout << "\nPassenger added successfully!" << endl;
    }

    void makeReservation() {
        string flightNumber, passengerId;
        int seatNumber;

        cout << "\nEnter Flight Number: ";
        cin >> flightNumber;

        auto flightIt = flightIndex.find(flightNumber);
        if (flightIt == flightIndex.end()) {
            cout << "Error: Flight not found!" << endl;
            return;
        }

        Flight& flight = flights[flightIt->second];
        if (flight.getAvailableSeats() == 0) {
            cout << "Error: No seats available on this flight!" << endl;
            return;
        }

        cout << "Enter Passenger ID: ";
        cin >> passengerId;

        if (passengerIndex.find(passengerId) == passengerIndex.end()) {
            cout << "Error: Passenger not found!" << endl;
            return;
        }

        flight.displaySeatMap();
        cout << "\nEnter Seat Number: ";
        cin >> seatNumber;

        if (!flight.assignSeat(seatNumber, passengerId)) {
            cout << "Error: Invalid seat number or seat already occupied!" << endl;
            return;
        }

        string reservationNumber = generateReservationNumber();
        reservations.emplace_back(reservationNumber, passengerId, flightNumber, seatNumber);
        reservations.back().confirm();

        cout << "\nReservation successful!" << endl;
        cout << "Reservation Number: " << reservationNumber << endl;
    }

    void cancelReservation() {
        string reservationNumber;
        cout << "\nEnter Reservation Number: ";
        cin >> reservationNumber;

        auto it = find_if(reservations.begin(), reservations.end(),
            [&](const Reservation& res) { return res.getReservationNumber() == reservationNumber; });

        if (it == reservations.end()) {
            cout << "Error: Reservation not found!" << endl;
            return;
        }

        auto flightIt = flightIndex.find(it->getFlightNumber());
        if (flightIt != flightIndex.end()) {
            flights[flightIt->second].cancelSeat(it->getSeatNumber());
        }

        it->cancel();
        cout << "\nReservation cancelled successfully!" << endl;
    }

    void displayFlights() const {
        if (flights.empty()) {
            cout << "\nNo flights available." << endl;
            return;
        }

        cout << "\n=== Available Flights ===" << endl;
        for (const auto& flight : flights) {
            flight.displayInfo();
        }
    }

    void searchFlights() {
        string origin, destination, date;
        cin.ignore();
        cout << "\nEnter Origin: ";
        getline(cin, origin);
        cout << "Enter Destination: ";
        getline(cin, destination);
        cout << "Enter Date (DD/MM/YYYY): ";
        getline(cin, date);

        bool found = false;
        for (const auto& flight : flights) {
            if (flight.getOrigin() == origin && 
                flight.getDestination() == destination && 
                flight.getDepartureDate() == date) {
                flight.displayInfo();
                found = true;
            }
        }

        if (!found) {
            cout << "\nNo flights found for the specified route and date." << endl;
        }
    }

    void displayReservation() {
        string reservationNumber;
        cout << "\nEnter Reservation Number: ";
        cin >> reservationNumber;

        auto it = find_if(reservations.begin(), reservations.end(),
            [&](const Reservation& res) { return res.getReservationNumber() == reservationNumber; });

        if (it == reservations.end()) {
            cout << "Error: Reservation not found!" << endl;
            return;
        }

        it->displayInfo();

        auto passengerIt = passengerIndex.find(it->getPassengerId());
        if (passengerIt != passengerIndex.end()) {
            passengers[passengerIt->second].displayInfo();
        }

        auto flightIt = flightIndex.find(it->getFlightNumber());
        if (flightIt != flightIndex.end()) {
            flights[flightIt->second].displayInfo();
        }
    }
};

int main() {
    AirlineReservationSystem system;
    int choice;

    cout << "Welcome to Airline Reservation System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add Flight" << endl;
        cout << "2. Add Passenger" << endl;
        cout << "3. Make Reservation" << endl;
        cout << "4. Cancel Reservation" << endl;
        cout << "5. Display All Flights" << endl;
        cout << "6. Search Flights" << endl;
        cout << "7. Display Reservation" << endl;
        cout << "8. Exit" << endl;
        cout << "Enter your choice (1-8): ";
        cin >> choice;

        switch (choice) {
            case 1:
                system.addFlight();
                break;
            case 2:
                system.addPassenger();
                break;
            case 3:
                system.makeReservation();
                break;
            case 4:
                system.cancelReservation();
                break;
            case 5:
                system.displayFlights();
                break;
            case 6:
                system.searchFlights();
                break;
            case 7:
                system.displayReservation();
                break;
            case 8:
                cout << "\nThank you for using Airline Reservation System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 