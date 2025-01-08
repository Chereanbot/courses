#include <iostream>
#include <string>
#include <vector>
#include <iomanip>
#include <ctime>
#include <sstream>
using namespace std;

// Transaction class to store transaction history
class Transaction {
private:
    string date;
    string type;
    double amount;
    double balanceAfter;

public:
    Transaction(string t, double amt, double bal) 
        : type(t), amount(amt), balanceAfter(bal) {
        time_t now = time(0);
        date = ctime(&now);
    }

    void display() const {
        cout << "Date: " << date;
        cout << "Type: " << type << endl;
        cout << "Amount: ETB " << fixed << setprecision(2) << amount << endl;
        cout << "Balance After: ETB " << balanceAfter << endl;
    }
};

class Account {
private:
    string accountNumber;
    string accountHolder;
    string phoneNumber;
    double balance;
    string accountType;
    string idNumber;
    vector<Transaction> transactions;
    double creditLimit;
    bool hasPendingLoan;
    double loanAmount;

public:
    Account(string accNum, string holder, string phone, double initialBalance, string type, string id)
        : accountNumber(accNum), accountHolder(holder), phoneNumber(phone), 
          balance(initialBalance), accountType(type), idNumber(id), 
          creditLimit(0), hasPendingLoan(false), loanAmount(0) {
        addTransaction("Opening Balance", initialBalance, initialBalance);
    }

    void addTransaction(string type, double amount, double balanceAfter) {
        transactions.push_back(Transaction(type, amount, balanceAfter));
    }

    // Getters
    string getAccountNumber() const { return accountNumber; }
    string getAccountHolder() const { return accountHolder; }
    double getBalance() const { return balance; }
    string getAccountType() const { return accountType; }
    bool hasLoan() const { return hasPendingLoan; }
    double getLoanAmount() const { return loanAmount; }

    // Transaction methods
    bool deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            addTransaction("Deposit", amount, balance);
            return true;
        }
        return false;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            addTransaction("Withdrawal", -amount, balance);
            return true;
        }
        return false;
    }

    bool requestLoan(double amount) {
        if (!hasPendingLoan && amount > 0) {
            // Simple credit scoring based on account balance and history
            double maxLoanAmount = balance * 2; // Can borrow up to 2x their balance
            if (amount <= maxLoanAmount) {
                hasPendingLoan = true;
                loanAmount = amount;
                balance += amount;
                addTransaction("Loan Disbursement", amount, balance);
                return true;
            }
        }
        return false;
    }

    bool payLoan(double amount) {
        if (hasPendingLoan && amount > 0 && amount <= balance) {
            if (amount > loanAmount) amount = loanAmount;
            balance -= amount;
            loanAmount -= amount;
            addTransaction("Loan Payment", -amount, balance);
            if (loanAmount <= 0) {
                hasPendingLoan = false;
                loanAmount = 0;
            }
            return true;
        }
        return false;
    }

    void displayTransactionHistory() const {
        cout << "\n=== Transaction History ===" << endl;
        for (const auto& trans : transactions) {
            cout << "-------------------------" << endl;
            trans.display();
        }
        cout << "=========================" << endl;
    }

    void displayInfo() const {
        cout << "\n=== Account Information ===" << endl;
        cout << "Account Number: " << accountNumber << endl;
        cout << "Account Holder: " << accountHolder << endl;
        cout << "Phone Number: " << phoneNumber << endl;
        cout << "Account Type: " << accountType << endl;
        cout << "Balance: ETB " << fixed << setprecision(2) << balance << endl;
        if (hasPendingLoan) {
            cout << "Outstanding Loan: ETB " << loanAmount << endl;
        }
        cout << "=========================" << endl;
    }

    bool transfer(Account& recipient, double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            recipient.balance += amount;
            
            // Record transaction for sender
            addTransaction("Transfer Sent to " + recipient.getAccountNumber(), -amount, balance);
            
            // Record transaction for recipient
            recipient.addTransaction("Transfer Received from " + accountNumber, amount, recipient.balance);
            
            return true;
        }
        return false;
    }
};

class Bank {
private:
    vector<Account> accounts;
    int lastAccountNumber = 1000;

    string generateAccountNumber() {
        return "ETH" + to_string(++lastAccountNumber);
    }

public:
    void createAccount() {
        string holder, phone, type, id;
        double initialBalance;

        cout << "\nEnter Account Holder Name: ";
        cin.ignore();
        getline(cin, holder);

        cout << "Enter Phone Number (+251): ";
        getline(cin, phone);

        cout << "Enter ID Number (Kebele ID): ";
        getline(cin, id);

        cout << "Enter Account Type (Savings/Current): ";
        getline(cin, type);

        do {
            cout << "Enter Initial Deposit Amount (Minimum ETB 100): ";
        cin >> initialBalance;
            if (initialBalance < 100) {
                cout << "Initial deposit must be at least ETB 100" << endl;
            }
        } while (initialBalance < 100);

        string accNum = generateAccountNumber();
        accounts.push_back(Account(accNum, holder, phone, initialBalance, type, id));

        cout << "\nAccount Created Successfully!" << endl;
        cout << "Your Account Number is: " << accNum << endl;
    }

    Account* findAccount(string accNum) {
        for (auto& acc : accounts) {
            if (acc.getAccountNumber() == accNum) {
                return &acc;
            }
        }
        return nullptr;
    }

    void performDeposit() {
        string accNum;
        double amount;

        cout << "\nEnter Account Number: ";
        cin >> accNum;

        Account* acc = findAccount(accNum);
        if (acc) {
            cout << "Enter Deposit Amount (ETB): ";
            cin >> amount;

            if (acc->deposit(amount)) {
                cout << "Deposit Successful!" << endl;
                cout << "New Balance: ETB " << fixed << setprecision(2) << acc->getBalance() << endl;
            } else {
                cout << "Invalid deposit amount!" << endl;
            }
        } else {
            cout << "Account not found!" << endl;
        }
    }

    void performWithdrawal() {
        string accNum;
        double amount;

        cout << "\nEnter Account Number: ";
        cin >> accNum;

        Account* acc = findAccount(accNum);
        if (acc) {
            cout << "Enter Withdrawal Amount (ETB): ";
            cin >> amount;

            if (acc->withdraw(amount)) {
                cout << "Withdrawal Successful!" << endl;
                cout << "New Balance: ETB " << fixed << setprecision(2) << acc->getBalance() << endl;
            } else {
                cout << "Insufficient balance or invalid amount!" << endl;
            }
        } else {
            cout << "Account not found!" << endl;
        }
    }

    void requestCredit() {
        string accNum;
        double amount;

        cout << "\nEnter Account Number: ";
        cin >> accNum;

        Account* acc = findAccount(accNum);
        if (acc) {
            if (acc->hasLoan()) {
                cout << "You already have an outstanding loan of ETB " 
                     << fixed << setprecision(2) << acc->getLoanAmount() << endl;
                return;
            }

            cout << "Enter Loan Amount (ETB): ";
            cin >> amount;

            if (acc->requestLoan(amount)) {
                cout << "Loan Request Approved!" << endl;
                cout << "Loan Amount: ETB " << fixed << setprecision(2) << amount << endl;
                cout << "New Balance: ETB " << acc->getBalance() << endl;
            } else {
                cout << "Loan Request Denied! (Insufficient Credit Score or Invalid Amount)" << endl;
            }
        } else {
            cout << "Account not found!" << endl;
        }
    }

    void payLoan() {
        string accNum;
        double amount;

        cout << "\nEnter Account Number: ";
        cin >> accNum;

        Account* acc = findAccount(accNum);
        if (acc) {
            if (!acc->hasLoan()) {
                cout << "You don't have any outstanding loans." << endl;
                return;
            }

            cout << "Outstanding Loan: ETB " << fixed << setprecision(2) << acc->getLoanAmount() << endl;
            cout << "Enter Payment Amount (ETB): ";
            cin >> amount;

            if (acc->payLoan(amount)) {
                cout << "Loan Payment Successful!" << endl;
                cout << "Remaining Loan: ETB " << acc->getLoanAmount() << endl;
                cout << "New Balance: ETB " << acc->getBalance() << endl;
            } else {
                cout << "Invalid payment amount or insufficient balance!" << endl;
            }
        } else {
            cout << "Account not found!" << endl;
        }
    }

    void viewTransactionHistory() {
        string accNum;
        cout << "\nEnter Account Number: ";
        cin >> accNum;

        Account* acc = findAccount(accNum);
        if (acc) {
            acc->displayTransactionHistory();
        } else {
            cout << "Account not found!" << endl;
        }
    }

    void checkBalance() {
        string accNum;
        cout << "\nEnter Account Number: ";
        cin >> accNum;

        Account* acc = findAccount(accNum);
        if (acc) {
            acc->displayInfo();
        } else {
            cout << "Account not found!" << endl;
        }
    }

    void transferMoney() {
        string senderAccNum, recipientAccNum;
        double amount;

        cout << "\nEnter Sender's Account Number: ";
        cin >> senderAccNum;

        Account* sender = findAccount(senderAccNum);
        if (!sender) {
            cout << "Sender's account not found!" << endl;
            return;
        }

        cout << "Enter Recipient's Account Number: ";
        cin >> recipientAccNum;

        if (senderAccNum == recipientAccNum) {
            cout << "Cannot transfer to the same account!" << endl;
            return;
        }

        Account* recipient = findAccount(recipientAccNum);
        if (!recipient) {
            cout << "Recipient's account not found!" << endl;
            return;
        }

        cout << "Enter Transfer Amount (ETB): ";
        cin >> amount;

        if (sender->transfer(*recipient, amount)) {
            cout << "\nTransfer Successful!" << endl;
            cout << "Transferred: ETB " << fixed << setprecision(2) << amount << endl;
            cout << "Your New Balance: ETB " << sender->getBalance() << endl;
        } else {
            cout << "Transfer failed! Insufficient balance or invalid amount." << endl;
        }
    }
};

int main() {
    Bank bank;
    int choice;

    cout << "\nWelcome to Ethiopian Bank Management System" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Create New Account" << endl;
        cout << "2. Deposit Money" << endl;
        cout << "3. Withdraw Money" << endl;
        cout << "4. Check Balance" << endl;
        cout << "5. Request Credit" << endl;
        cout << "6. Pay Loan" << endl;
        cout << "7. View Transaction History" << endl;
        cout << "8. Transfer Money" << endl;
        cout << "9. Exit" << endl;
        cout << "Enter your choice (1-9): ";
        cin >> choice;

        switch (choice) {
            case 1:
                bank.createAccount();
                break;
            case 2:
                bank.performDeposit();
                break;
            case 3:
                bank.performWithdrawal();
                break;
            case 4:
                bank.checkBalance();
                break;
            case 5:
                bank.requestCredit();
                break;
            case 6:
                bank.payLoan();
                break;
            case 7:
                bank.viewTransactionHistory();
                break;
            case 8:
                bank.transferMoney();
                break;
            case 9:
                cout << "\nThank you for using Ethiopian Bank Management System!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
}
