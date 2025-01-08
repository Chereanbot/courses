#include <iostream>
#include <iomanip>
#include <string>
#include <vector>
#include <map>
using namespace std;

class UnitConverter {
private:
    // Conversion rates maps
    map<string, double> lengthToMeter = {
        {"mm", 0.001},     // millimeter to meter
        {"cm", 0.01},      // centimeter to meter
        {"m", 1.0},        // meter to meter (base unit)
        {"km", 1000.0},    // kilometer to meter
        {"in", 0.0254},    // inch to meter
        {"ft", 0.3048},    // foot to meter
        {"yd", 0.9144},    // yard to meter
        {"mi", 1609.344}   // mile to meter
    };

    map<string, double> weightToKg = {
        {"mg", 0.000001},  // milligram to kilogram
        {"g", 0.001},      // gram to kilogram
        {"kg", 1.0},       // kilogram to kilogram (base unit)
        {"t", 1000.0},     // metric ton to kilogram
        {"oz", 0.0283495}, // ounce to kilogram
        {"lb", 0.453592},  // pound to kilogram
        {"q", 100.0}       // quintal to kilogram
    };

    map<string, double> volumeToLiter = {
        {"ml", 0.001},     // milliliter to liter
        {"l", 1.0},        // liter to liter (base unit)
        {"m3", 1000.0},    // cubic meter to liter
        {"gal", 3.78541},  // US gallon to liter
        {"qt", 0.946353},  // quart to liter
        {"pt", 0.473176},  // pint to liter
        {"cup", 0.236588}, // cup to liter
        {"fl_oz", 0.0295735} // fluid ounce to liter
    };

    // Helper functions
    void displayUnits(const map<string, double>& units) {
        cout << "Available units:" << endl;
        for (const auto& unit : units) {
            cout << "- " << unit.first << endl;
        }
    }

    double convertUnit(double value, string fromUnit, string toUnit, 
                      const map<string, double>& conversionMap) {
        // Convert to base unit first, then to target unit
        double baseValue = value * conversionMap.at(fromUnit);
        return baseValue / conversionMap.at(toUnit);
    }

    bool isValidUnit(const string& unit, const map<string, double>& conversionMap) {
        return conversionMap.find(unit) != conversionMap.end();
    }

public:
    void showAbout() {
        cout << "\n=== About Unit Converter v1.0 ===" << endl;
        cout << "Developed by: [Cherinet]" << endl;
        cout << "Last Updated: 2024" << endl;
        cout << "\nSupported Conversions:" << endl;
        cout << "1. Length (mm, cm, m, km, in, ft, yd, mi)" << endl;
        cout << "2. Weight (mg, g, kg, t, oz, lb, q)" << endl;
        cout << "3. Volume (ml, l, m3, gal, qt, pt, cup, fl_oz)" << endl;
        cout << "\nFeatures:" << endl;
        cout << "- Multiple unit type support" << endl;
        cout << "- Precise conversions" << endl;
        cout << "- User-friendly interface" << endl;
        cout << "- Common unit references" << endl;
        cout << "================================" << endl;
    }

    void convertLength() {
        string fromUnit, toUnit;
        double value;

        cout << "\n=== Length Conversion ===" << endl;
        displayUnits(lengthToMeter);

        cout << "\nEnter the unit to convert from: ";
        cin >> fromUnit;
        cout << "Enter the unit to convert to: ";
        cin >> toUnit;

        if (!isValidUnit(fromUnit, lengthToMeter) || !isValidUnit(toUnit, lengthToMeter)) {
            cout << "Invalid unit(s)!" << endl;
            return;
        }

        cout << "Enter the value: ";
        cin >> value;

        double result = convertUnit(value, fromUnit, toUnit, lengthToMeter);
        cout << fixed << setprecision(4);
        cout << value << " " << fromUnit << " = " << result << " " << toUnit << endl;

        // Add helpful reference
        if (fromUnit == "m" || toUnit == "m") {
            cout << "\nReference: 1 meter = 100 centimeters = 3.28084 feet" << endl;
        }
    }

    void convertWeight() {
        string fromUnit, toUnit;
        double value;

        cout << "\n=== Weight Conversion ===" << endl;
        displayUnits(weightToKg);

        cout << "\nEnter the unit to convert from: ";
        cin >> fromUnit;
        cout << "Enter the unit to convert to: ";
        cin >> toUnit;

        if (!isValidUnit(fromUnit, weightToKg) || !isValidUnit(toUnit, weightToKg)) {
            cout << "Invalid unit(s)!" << endl;
            return;
        }

        cout << "Enter the value: ";
        cin >> value;

        double result = convertUnit(value, fromUnit, toUnit, weightToKg);
        cout << fixed << setprecision(4);
        cout << value << " " << fromUnit << " = " << result << " " << toUnit << endl;

        // Add helpful reference
        if (fromUnit == "kg" || toUnit == "kg") {
            cout << "\nReference: 1 kilogram = 1000 grams = 2.20462 pounds" << endl;
        }
    }

    void convertVolume() {
        string fromUnit, toUnit;
        double value;

        cout << "\n=== Volume Conversion ===" << endl;
        displayUnits(volumeToLiter);

        cout << "\nEnter the unit to convert from: ";
        cin >> fromUnit;
        cout << "Enter the unit to convert to: ";
        cin >> toUnit;

        if (!isValidUnit(fromUnit, volumeToLiter) || !isValidUnit(toUnit, volumeToLiter)) {
            cout << "Invalid unit(s)!" << endl;
            return;
        }

        cout << "Enter the value: ";
        cin >> value;

        double result = convertUnit(value, fromUnit, toUnit, volumeToLiter);
        cout << fixed << setprecision(4);
        cout << value << " " << fromUnit << " = " << result << " " << toUnit << endl;

        // Add helpful reference
        if (fromUnit == "l" || toUnit == "l") {
            cout << "\nReference: 1 liter = 1000 milliliters = 0.264172 gallons" << endl;
        }
    }

    void showCommonConversions() {
        cout << "\n=== Common Unit Conversions ===" << endl;
        cout << fixed << setprecision(4);
        
        cout << "\nLength:" << endl;
        cout << "1 meter = 100 centimeters" << endl;
        cout << "1 kilometer = 0.621371 miles" << endl;
        cout << "1 inch = 2.54 centimeters" << endl;
        cout << "1 foot = 30.48 centimeters" << endl;
        
        cout << "\nWeight:" << endl;
        cout << "1 kilogram = 2.20462 pounds" << endl;
        cout << "1 pound = 453.592 grams" << endl;
        cout << "1 ounce = 28.3495 grams" << endl;
        
        cout << "\nVolume:" << endl;
        cout << "1 liter = 0.264172 gallons" << endl;
        cout << "1 gallon = 3.78541 liters" << endl;
        cout << "1 cup = 236.588 milliliters" << endl;
    }
};

int main() {
    UnitConverter converter;
    int choice;

    cout << "Welcome to Unit Converter" << endl;

    while (true) {
        cout << "\n=== Main Menu ===" << endl;
        cout << "1. Length Conversion" << endl;
        cout << "2. Weight Conversion" << endl;
        cout << "3. Volume Conversion" << endl;
        cout << "4. Show Common Conversions" << endl;
        cout << "5. About" << endl;
        cout << "6. Exit" << endl;
        cout << "Enter your choice (1-6): ";
        cin >> choice;

        switch (choice) {
            case 1:
                converter.convertLength();
                break;
            case 2:
                converter.convertWeight();
                break;
            case 3:
                converter.convertVolume();
                break;
            case 4:
                converter.showCommonConversions();
                break;
            case 5:
                converter.showAbout();
                break;
            case 6:
                cout << "\nThank you for using Unit Converter!" << endl;
                return 0;
            default:
                cout << "\nInvalid choice! Please try again." << endl;
        }
    }

    return 0;
} 