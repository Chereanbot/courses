#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <ctime>
#include <algorithm>
using namespace std;

// Forward declaration
class Book;

class Member {
private:
    string id;
    string name;
    string phone;
    vector<Book*> borrowedBooks;
    double fines;

public:
    Member(string memberId, string memberName, string phoneNumber)
        : id(memberId), name(memberName), phone(phoneNumber), fines(0.0) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getPhone() const { return phone; }
    double getFines() const { return fines; }
    void addFine(double amount) { fines += amount; }
    void payFine(double amount) { fines -= amount; }
    
    void borrowBook(Book* book);
    void returnBook(Book* book);
    const vector<Book*>& getBorrowedBooks() const { return borrowedBooks; }
    
    void displayInfo() const;
};

class Book {
private:
    string isbn;
    string title;
    string author;
    string category;
    int totalCopies;
    int availableCopies;
    Member* borrowedBy;
    time_t borrowDate;
    double dailyFine;

public:
    Book(string bookIsbn, string bookTitle, string bookAuthor, 
         string bookCategory, int copies)
        : isbn(bookIsbn), title(bookTitle), author(bookAuthor),
          category(bookCategory), totalCopies(copies), availableCopies(copies),
          borrowedBy(nullptr), borrowDate(0), dailyFine(1.0) {}

    string getIsbn() const { return isbn; }
    string getTitle() const { return title; }
    string getAuthor() const { return author; }
    string getCategory() const { return category; }
    int getAvailableCopies() const { return availableCopies; }
    bool isAvailable() const { return availableCopies > 0; }
    Member* getBorrowedBy() const { return borrowedBy; }
    time_t getBorrowDate() const { return borrowDate; }

    void borrowBook(Member* member) {
        if (isAvailable()) {
            availableCopies--;
            borrowedBy = member;
            borrowDate = time(0);
        }
    }

    void returnBook() {
        availableCopies++;
        borrowedBy = nullptr;
        borrowDate = 0;
    }

    double calculateFine() const {
        if (!borrowedBy) return 0.0;
        
        time_t now = time(0);
        double days = difftime(now, borrowDate) / (24 * 3600);
        if (days > 14) { // 14 days borrowing period
            return (days - 14) * dailyFine;
        }
        return 0.0;
    }

    void displayInfo() const {
        cout << "\nBook Details:" << endl;
        cout << "ISBN: " << isbn << endl;
        cout << "Title: " << title << endl;
        cout << "Author: " << author << endl;
        cout << "Category: " << category << endl;
        cout << "Available Copies: " << availableCopies << "/" << totalCopies << endl;
        if (borrowedBy) {
            cout << "Borrowed by: " << borrowedBy->getName() << endl;
            cout << "Fine Due: ETB " << fixed << setprecision(2) << calculateFine() << endl;
        }
    }
};

void Member::borrowBook(Book* book) {
    if (book && book->isAvailable()) {
        borrowedBooks.push_back(book);
        book->borrowBook(this);
    }
}

void Member::returnBook(Book* book) {
    auto it = std::find(borrowedBooks.begin(), borrowedBooks.end(), book);
    if (it != borrowedBooks.end()) {
        borrowedBooks.erase(it);
        book->returnBook();
        double fine = book->calculateFine();
        if (fine > 0) {
            addFine(fine);
        }
    }
}

void Member::displayInfo() const {
    cout << "\nMember Details:" << endl;
    cout << "ID: " << id << endl;
    cout << "Name: " << name << endl;
    cout << "Phone: " << phone << endl;
    cout << "Outstanding Fines: ETB " << fixed << setprecision(2) << fines << endl;
    
    if (!borrowedBooks.empty()) {
        cout << "\nBorrowed Books:" << endl;
        for (const auto& book : borrowedBooks) {
            cout << "- " << book->getTitle() << " (Fine: ETB " 
                 << book->calculateFine() << ")" << endl;
        }
    }
}

class LibrarySystem {
private:
    vector<Book> books;
    vector<Member> members;
    map<string, int> bookIndex;  // ISBN to index mapping
    map<string, int> memberIndex;  // ID to index mapping

public:
    void addBook() {
        string isbn, title, author, category;
        int copies;

        cout << "\nEnter Book Details" << endl;
        cout << "ISBN: ";
        cin >> isbn;

        if (bookIndex.find(isbn) != bookIndex.end()) {
            cout << "Error: Book with this ISBN already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Title: ";
        getline(cin, title);
        cout << "Author: ";
        getline(cin, author);
        cout << "Category: ";
        getline(cin, category);
        cout << "Number of Copies: ";
        cin >> copies;

        books.emplace_back(isbn, title, author, category, copies);
        bookIndex[isbn] = books.size() - 1;
        cout << "\nBook added successfully!" << endl;
    }

    void addMember() {
        string id, name, phone;

        cout << "\nEnter Member Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (memberIndex.find(id) != memberIndex.end()) {
            cout << "Error: Member with this ID already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Phone: ";
        getline(cin, phone);

        members.emplace_back(id, name, phone);
        memberIndex[id] = members.size() - 1;
        cout << "\nMember added successfully!" << endl;
    }

    void borrowBook() {
        string memberId, isbn;

        cout << "\nEnter Member ID: ";
        cin >> memberId;
        
        auto memberIt = memberIndex.find(memberId);
        if (memberIt == memberIndex.end()) {
            cout << "Error: Member not found!" << endl;
            return;
        }

        Member& member = members[memberIt->second];
        if (member.getFines() > 0) {
            cout << "Error: Member has outstanding fines of ETB " 
                 << member.getFines() << endl;
            return;
        }

        cout << "Enter Book ISBN: ";
        cin >> isbn;
        
        auto bookIt = bookIndex.find(isbn);
        if (bookIt == bookIndex.end()) {
            cout << "Error: Book not found!" << endl;
            return;
        }

        Book& book = books[bookIt->second];
        if (!book.isAvailable()) {
            cout << "Error: Book is not available!" << endl;
            return;
        }

        member.borrowBook(&book);
        cout << "\nBook borrowed successfully!" << endl;
    }

    void returnBook() {
        string memberId, isbn;

        cout << "\nEnter Member ID: ";
        cin >> memberId;
        
        auto memberIt = memberIndex.find(memberId);
        if (memberIt == memberIndex.end()) {
            cout << "Error: Member not found!" << endl;
            return;
        }

        cout << "Enter Book ISBN: ";
        cin >> isbn;
        
        auto bookIt = bookIndex.find(isbn);
        if (bookIt == bookIndex.end()) {
            cout << "Error: Book not found!" << endl;
            return;
        }

        Member& member = members[memberIt->second];
        Book& book = books[bookIt->second];
        
        member.returnBook(&book);
        double fine = book.calculateFine();
        cout << "\nBook returned successfully!" << endl;
        if (fine > 0) {
            cout << "Fine charged: ETB " << fixed << setprecision(2) << fine << endl;
        }
    }

    void payFine() {
        string memberId;
        double amount;

        cout << "\nEnter Member ID: ";
        cin >> memberId;
        
        auto memberIt = memberIndex.find(memberId);
        if (memberIt == memberIndex.end()) {
            cout << "Error: Member not found!" << endl;
            return;
        }

        Member& member = members[memberIt->second];
        if (member.getFines() == 0) {
            cout << "No outstanding fines for this member." << endl;
            return;
        }

        cout << "Outstanding fine: ETB " << member.getFines() << endl;
        cout << "Enter payment amount: ETB ";
        cin >> amount;

        if (amount > member.getFines()) {
            cout << "Error: Payment amount exceeds outstanding fines!" << endl;
            return;
        }

        member.payFine(amount);
        cout << "\nPayment processed successfully!" << endl;
        cout << "Remaining fine: ETB " << member.getFines() << endl;
    }

    void searchBooks() {
        string query;
        cout << "\nEnter search term (title/author/ISBN): ";
        cin.ignore();
        getline(cin, query);

        bool found = false;
        for (const auto& book : books) {
            if (book.getTitle().find(query) != string::npos ||
                book.getAuthor().find(query) != string::npos ||
                book.getIsbn().find(query) != string::npos) {
                book.displayInfo();
                found = true;
            }
        }

        if (!found) {
            cout << "No books found matching your search." << endl;
        }
    }

    void displayMemberInfo() {
        string memberId;
        cout << "\nEnter Member ID: ";
        cin >> memberId;
        
        auto memberIt = memberIndex.find(memberId);
        if (memberIt == memberIndex.end()) {
            cout << "Error: Member not found!" << endl;
            return;
        }

        members[memberIt->second].displayInfo();
    }

    void displayBookInfo() {
        string isbn;
        cout << "\nEnter Book ISBN: ";
        cin >> isbn;
        
        auto bookIt = bookIndex.find(isbn);
        if (bookIt == bookIndex.end()) {
            cout << "Error: Book not found!" << endl;
            return;
        }

        books[bookIt->second].displayInfo();
    }
};

int main() {
    LibrarySystem library;
    int choice;

    cout << "Welcome to Library Management System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add New Book" << endl;
        cout << "2. Add New Member" << endl;
        cout << "3. Borrow Book" << endl;
        cout << "4. Return Book" << endl;
        cout << "5. Pay Fine" << endl;
        cout << "6. Search Books" << endl;
        cout << "7. Display Member Info" << endl;
        cout << "8. Display Book Info" << endl;
        cout << "9. Exit" << endl;
        cout << "Enter your choice (1-9): ";
        cin >> choice;

        switch (choice) {
            case 1:
                library.addBook();
                break;
            case 2:
                library.addMember();
                break;
            case 3:
                library.borrowBook();
                break;
            case 4:
                library.returnBook();
                break;
            case 5:
                library.payFine();
                break;
            case 6:
                library.searchBooks();
                break;
            case 7:
                library.displayMemberInfo();
                break;
            case 8:
                library.displayBookInfo();
                break;
            case 9:
                cout << "\nThank you for using Library Management System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 