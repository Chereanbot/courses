#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
#include <ctime>
#include <algorithm>
using namespace std;

class Book {
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
    vector<pair<string, string>> reviews; // userId, review

public:
    Book(string bookIsbn, string bookTitle, string bookAuthor, string cat,
         string desc, double bookPrice, string path, int pages, 
         string lang, string pubDate)
        : isbn(bookIsbn), title(bookTitle), author(bookAuthor), category(cat),
          description(desc), price(bookPrice), filePath(path), pageCount(pages),
          language(lang), publishDate(pubDate), downloadCount(0), rating(0.0) {}

    string getIsbn() const { return isbn; }
    string getTitle() const { return title; }
    string getAuthor() const { return author; }
    string getCategory() const { return category; }
    double getPrice() const { return price; }
    string getFilePath() const { return filePath; }

    void addTag(const string& tag) {
        tags.push_back(tag);
    }

    void addReview(const string& userId, const string& review) {
        reviews.emplace_back(userId, review);
    }

    void incrementDownloads() {
        downloadCount++;
    }

    void updateRating(double newRating) {
        if (newRating >= 0 && newRating <= 5) {
            rating = (rating * reviews.size() + newRating) / (reviews.size() + 1);
        }
    }

    void displayInfo() const {
        cout << "\nBook Details:" << endl;
        cout << "ISBN: " << isbn << endl;
        cout << "Title: " << title << endl;
        cout << "Author: " << author << endl;
        cout << "Category: " << category << endl;
        cout << "Description: " << description << endl;
        cout << "Price: ETB " << fixed << setprecision(2) << price << endl;
        cout << "Pages: " << pageCount << endl;
        cout << "Language: " << language << endl;
        cout << "Publish Date: " << publishDate << endl;
        cout << "Downloads: " << downloadCount << endl;
        cout << "Rating: " << setprecision(1) << rating << "/5.0" << endl;

        cout << "\nTags: ";
        if (tags.empty()) cout << "No tags" << endl;
        else {
            for (const auto& tag : tags) {
                cout << tag << ", ";
            }
            cout << endl;
        }

        cout << "\nReviews:" << endl;
        if (reviews.empty()) cout << "No reviews yet" << endl;
        else {
            for (const auto& review : reviews) {
                cout << "User " << review.first << ": " << review.second << endl;
            }
        }
    }
};

class User {
private:
    string id;
    string name;
    string email;
    string phone;
    string password;
    double balance;
    vector<string> purchasedBooks; // ISBNs
    vector<pair<string, time_t>> downloadHistory; // ISBN, timestamp

public:
    User(string userId, string userName, string userEmail, 
         string userPhone, string userPassword)
        : id(userId), name(userName), email(userEmail),
          phone(userPhone), password(userPassword), balance(0.0) {}

    string getId() const { return id; }
    string getName() const { return name; }
    string getEmail() const { return email; }
    double getBalance() const { return balance; }

    void addBalance(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    bool deductBalance(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    void addPurchase(const string& isbn) {
        purchasedBooks.push_back(isbn);
    }

    void addDownload(const string& isbn) {
        downloadHistory.emplace_back(isbn, time(0));
    }

    bool hasPurchased(const string& isbn) const {
        return find(purchasedBooks.begin(), purchasedBooks.end(), isbn) 
               != purchasedBooks.end();
    }

    void displayInfo() const {
        cout << "\nUser Details:" << endl;
        cout << "ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Email: " << email << endl;
        cout << "Phone: " << phone << endl;
        cout << "Balance: ETB " << fixed << setprecision(2) << balance << endl;

        cout << "\nPurchased Books:" << endl;
        if (purchasedBooks.empty()) cout << "No purchases yet" << endl;
        else {
            for (const auto& isbn : purchasedBooks) {
                cout << "ISBN: " << isbn << endl;
            }
        }

        cout << "\nDownload History:" << endl;
        if (downloadHistory.empty()) cout << "No downloads yet" << endl;
        else {
            for (const auto& download : downloadHistory) {
                cout << "ISBN: " << download.first 
                     << ", Time: " << ctime(&download.second);
            }
        }
    }
};

class PDFStore {
private:
    vector<Book> books;
    vector<User> users;
    map<string, int> bookIndex;    // ISBN -> index
    map<string, int> userIndex;    // userId -> index

public:
    void addBook() {
        string isbn, title, author, category, description, filePath;
        string language, publishDate;
        double price;
        int pages;

        cout << "\nEnter Book Details" << endl;
        cout << "ISBN: ";
        cin >> isbn;

        if (bookIndex.find(isbn) != bookIndex.end()) {
            cout << "Error: Book already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Title: ";
        getline(cin, title);
        cout << "Author: ";
        getline(cin, author);
        cout << "Category: ";
        getline(cin, category);
        cout << "Description: ";
        getline(cin, description);
        cout << "Price (ETB): ";
        cin >> price;
        cin.ignore();
        cout << "File Path: ";
        getline(cin, filePath);
        cout << "Page Count: ";
        cin >> pages;
        cin.ignore();
        cout << "Language: ";
        getline(cin, language);
        cout << "Publish Date (DD/MM/YYYY): ";
        getline(cin, publishDate);

        books.emplace_back(isbn, title, author, category, description,
                          price, filePath, pages, language, publishDate);
        bookIndex[isbn] = books.size() - 1;

        // Add tags
        string tag;
        char addMore;
        do {
            cout << "Enter tag: ";
            getline(cin, tag);
            books.back().addTag(tag);

            cout << "Add more tags? (Y/N): ";
            cin >> addMore;
            cin.ignore();
        } while (toupper(addMore) == 'Y');

        cout << "\nBook added successfully!" << endl;
    }

    void registerUser() {
        string id, name, email, phone, password;

        cout << "\nEnter User Details" << endl;
        cout << "ID: ";
        cin >> id;

        if (userIndex.find(id) != userIndex.end()) {
            cout << "Error: User already exists!" << endl;
            return;
        }

        cin.ignore();
        cout << "Name: ";
        getline(cin, name);
        cout << "Email: ";
        getline(cin, email);
        cout << "Phone: ";
        getline(cin, phone);
        cout << "Password: ";
        getline(cin, password);

        users.emplace_back(id, name, email, phone, password);
        userIndex[id] = users.size() - 1;
        cout << "\nUser registered successfully!" << endl;
    }

    void addBalance() {
        string userId;
        double amount;

        cout << "\nEnter User ID: ";
        cin >> userId;

        auto userIt = userIndex.find(userId);
        if (userIt == userIndex.end()) {
            cout << "Error: User not found!" << endl;
            return;
        }

        cout << "Enter amount to add (ETB): ";
        cin >> amount;

        users[userIt->second].addBalance(amount);
        cout << "\nBalance added successfully!" << endl;
    }

    void purchaseBook() {
        string userId, isbn;

        cout << "\nEnter User ID: ";
        cin >> userId;

        auto userIt = userIndex.find(userId);
        if (userIt == userIndex.end()) {
            cout << "Error: User not found!" << endl;
            return;
        }

        cout << "Enter Book ISBN: ";
        cin >> isbn;

        auto bookIt = bookIndex.find(isbn);
        if (bookIt == bookIndex.end()) {
            cout << "Error: Book not found!" << endl;
            return;
        }

        User& user = users[userIt->second];
        const Book& book = books[bookIt->second];

        if (user.hasPurchased(isbn)) {
            cout << "Error: Book already purchased!" << endl;
            return;
        }

        if (!user.deductBalance(book.getPrice())) {
            cout << "Error: Insufficient balance!" << endl;
            return;
        }

        user.addPurchase(isbn);
        cout << "\nBook purchased successfully!" << endl;
    }

    void downloadBook() {
        string userId, isbn;

        cout << "\nEnter User ID: ";
        cin >> userId;

        auto userIt = userIndex.find(userId);
        if (userIt == userIndex.end()) {
            cout << "Error: User not found!" << endl;
            return;
        }

        cout << "Enter Book ISBN: ";
        cin >> isbn;

        auto bookIt = bookIndex.find(isbn);
        if (bookIt == bookIndex.end()) {
            cout << "Error: Book not found!" << endl;
            return;
        }

        User& user = users[userIt->second];
        Book& book = books[bookIt->second];

        if (!user.hasPurchased(isbn)) {
            cout << "Error: Book not purchased!" << endl;
            return;
        }

        user.addDownload(isbn);
        book.incrementDownloads();
        cout << "\nDownloading book from: " << book.getFilePath() << endl;
        cout << "Download completed successfully!" << endl;
    }

    void addReview() {
        string userId, isbn, review;
        double rating;

        cout << "\nEnter User ID: ";
        cin >> userId;

        auto userIt = userIndex.find(userId);
        if (userIt == userIndex.end()) {
            cout << "Error: User not found!" << endl;
            return;
        }

        cout << "Enter Book ISBN: ";
        cin >> isbn;

        auto bookIt = bookIndex.find(isbn);
        if (bookIt == bookIndex.end()) {
            cout << "Error: Book not found!" << endl;
            return;
        }

        const User& user = users[userIt->second];
        Book& book = books[bookIt->second];

        if (!user.hasPurchased(isbn)) {
            cout << "Error: Cannot review a book you haven't purchased!" << endl;
            return;
        }

        cout << "Enter rating (0-5): ";
        cin >> rating;
        cin.ignore();
        cout << "Enter review: ";
        getline(cin, review);

        book.updateRating(rating);
        book.addReview(userId, review);
        cout << "\nReview added successfully!" << endl;
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

    void displayUserInfo() {
        string userId;
        cout << "\nEnter User ID: ";
        cin >> userId;

        auto userIt = userIndex.find(userId);
        if (userIt == userIndex.end()) {
            cout << "Error: User not found!" << endl;
            return;
        }

        users[userIt->second].displayInfo();
    }

    void searchBooks() {
        string searchTerm;
        cin.ignore();
        cout << "\nEnter search term (title, author, or ISBN): ";
        getline(cin, searchTerm);

        bool found = false;
        for (const auto& book : books) {
            if (book.getTitle().find(searchTerm) != string::npos ||
                book.getAuthor().find(searchTerm) != string::npos ||
                book.getIsbn() == searchTerm) {
                book.displayInfo();
                found = true;
            }
        }

        if (!found) {
            cout << "\nNo books found matching the search term." << endl;
        }
    }
};

int main() {
    PDFStore store;
    int choice;

    cout << "Welcome to Online PDF Store" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Add Book" << endl;
        cout << "2. Register User" << endl;
        cout << "3. Add Balance" << endl;
        cout << "4. Purchase Book" << endl;
        cout << "5. Download Book" << endl;
        cout << "6. Add Review" << endl;
        cout << "7. Display Book Information" << endl;
        cout << "8. Display User Information" << endl;
        cout << "9. Search Books" << endl;
        cout << "10. Exit" << endl;
        cout << "Enter your choice (1-10): ";
        cin >> choice;

        switch (choice) {
            case 1:
                store.addBook();
                break;
            case 2:
                store.registerUser();
                break;
            case 3:
                store.addBalance();
                break;
            case 4:
                store.purchaseBook();
                break;
            case 5:
                store.downloadBook();
                break;
            case 6:
                store.addReview();
                break;
            case 7:
                store.displayBookInfo();
                break;
            case 8:
                store.displayUserInfo();
                break;
            case 9:
                store.searchBooks();
                break;
            case 10:
                cout << "\nThank you for using Online PDF Store!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 