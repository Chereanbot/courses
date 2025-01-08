import { useParams, Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function OOPProjectDetails() {
  const { id } = useParams();

  const handleDownload = (sourceCode: string, projectTitle: string) => {
    // Create a blob with the source code
    const element = document.createElement("a");
    const file = new Blob(
      [sourceCode],
      { type: 'text/plain;charset=utf-8' }
    );
    element.href = URL.createObjectURL(file);
    element.download = projectTitle.toLowerCase().replace(/ /g, '-') + ".java";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // This would typically come from a database or API
  const projects = [
    {
      id: "1",
      title: "University Management System",
      description: "A comprehensive object-oriented system for managing university operations, including student enrollment, course management, and faculty administration.",
      longDescription: `
        The University Management System is a sophisticated application that demonstrates advanced OOP principles in action. This system showcases the power of object-oriented design in handling complex relationships between different entities in an educational institution.

        Key Implementation Details:
        • Class Hierarchy: Implements a robust inheritance structure for different types of users
        • Polymorphism: Uses dynamic method dispatch for handling different user roles
        • Encapsulation: Maintains data integrity through proper access control
        • Association: Manages relationships between students, courses, and faculty
      `,
      difficulty: "advanced",
      features: [
        "Student enrollment and registration system",
        "Course management and scheduling",
        "Faculty administration and assignment",
        "Grade management and transcript generation",
        "Attendance tracking system",
        "Academic calendar management",
        "Resource allocation system"
      ],
      technologies: ["Java", "Spring Framework", "Hibernate", "MySQL", "Maven"],
      sourceCode: `/oop/university-management.java`,
      fullSourceCode: `package com.university.management;

import java.util.ArrayList;
import java.util.List;

abstract class Person {
    protected String id;
    protected String name;
    protected String email;
    
    public Person(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public abstract void displayInfo();
}

class Student extends Person {
    private List<Course> enrolledCourses;
    private double gpa;
    
    public Student(String id, String name, String email) {
        super(id, name, email);
        this.enrolledCourses = new ArrayList<>();
        this.gpa = 0.0;
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Student ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled Courses: " + enrolledCourses.size());
    }
    
    public void enrollCourse(Course course) {
        if (course.enrollStudent(this)) {
            enrolledCourses.add(course);
        }
    }
    
    public void updateGPA(double newGPA) {
        this.gpa = newGPA;
    }
}

class Faculty extends Person {
    private List<Course> teachingCourses;
    private String department;
    
    public Faculty(String id, String name, String email, String department) {
        super(id, name, email);
        this.department = department;
        this.teachingCourses = new ArrayList<>();
    }
    
    @Override
    public void displayInfo() {
        System.out.println("Faculty ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Department: " + department);
        System.out.println("Teaching Courses: " + teachingCourses.size());
    }
    
    public void assignCourse(Course course) {
        teachingCourses.add(course);
        course.assignInstructor(this);
    }
}

class Course {
    private String courseId;
    private String title;
    private Faculty instructor;
    private List<Student> enrolledStudents;
    private int maxCapacity;
    
    public Course(String courseId, String title, int maxCapacity) {
        this.courseId = courseId;
        this.title = title;
        this.maxCapacity = maxCapacity;
        this.enrolledStudents = new ArrayList<>();
    }
    
    public boolean enrollStudent(Student student) {
        if (enrolledStudents.size() < maxCapacity) {
            enrolledStudents.add(student);
            return true;
        }
        return false;
    }
    
    public void assignInstructor(Faculty faculty) {
        this.instructor = faculty;
    }
    
    public void displayCourseInfo() {
        System.out.println("Course ID: " + courseId);
        System.out.println("Title: " + title);
        System.out.println("Instructor: " + (instructor != null ? instructor.name : "Not Assigned"));
        System.out.println("Enrolled Students: " + enrolledStudents.size() + "/" + maxCapacity);
    }
}

public class UniversityManagementSystem {
    public static void main(String[] args) {
        // Create courses
        Course java101 = new Course("CS101", "Introduction to Java", 30);
        Course dataStructures = new Course("CS201", "Data Structures", 25);
        
        // Create faculty
        Faculty profJohn = new Faculty("F101", "John Smith", "john@university.edu", "Computer Science");
        profJohn.assignCourse(java101);
        
        // Create and enroll students
        Student alice = new Student("S101", "Alice Johnson", "alice@university.edu");
        Student bob = new Student("S102", "Bob Wilson", "bob@university.edu");
        
        alice.enrollCourse(java101);
        bob.enrollCourse(java101);
        bob.enrollCourse(dataStructures);
        
        // Display information
        java101.displayCourseInfo();
        System.out.println("\\n");
        profJohn.displayInfo();
        System.out.println("\\n");
        alice.displayInfo();
    }
}`,
      concepts: [
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
        "Abstraction",
        "Design Patterns",
        "SOLID Principles"
      ],
      implementation: [
        {
          title: "Class Hierarchy",
          code: `abstract class Person {
    protected String id;
    protected String name;
    protected String email;
    
    public abstract void displayInfo();
}

class Student extends Person {
    private List<Course> enrolledCourses;
    private double gpa;
    
    @Override
    public void displayInfo() {
        // Implementation
    }
}

class Faculty extends Person {
    private List<Course> teachingCourses;
    private String department;
    
    @Override
    public void displayInfo() {
        // Implementation
    }
}`
        },
        {
          title: "Course Management",
          code: `class Course {
    private String courseId;
    private String title;
    private Faculty instructor;
    private List<Student> enrolledStudents;
    private int maxCapacity;
    
    public boolean enrollStudent(Student student) {
        if (enrolledStudents.size() < maxCapacity) {
            enrolledStudents.add(student);
            return true;
        }
        return false;
    }
    
    public void assignInstructor(Faculty faculty) {
        this.instructor = faculty;
    }
}`
        }
      ],
      requirements: [
        "Java Development Kit (JDK) 11 or later",
        "Spring Framework 5.x",
        "MySQL Database",
        "Maven for dependency management",
        "IDE (Eclipse or IntelliJ IDEA)"
      ],
      setupInstructions: [
        "Clone the repository",
        "Import as Maven project in your IDE",
        "Configure application.properties with database credentials",
        "Run maven clean install",
        "Execute the main application class"
      ],
      icon: "🎓",
      screenshots: [
        {
          title: "Dashboard",
          description: "Main dashboard showing university statistics and quick actions",
          url: "/screenshots/university/dashboard.png"
        },
        {
          title: "Course Management",
          description: "Interface for managing courses and enrollments",
          url: "/screenshots/university/courses.png"
        }
      ]
    },
    {
      id: "2",
      title: "E-Commerce Platform",
      description: "A comprehensive object-oriented e-commerce system implementing core shopping functionalities and payment processing.",
      longDescription: `
        The E-Commerce Platform is a sophisticated Java application that demonstrates advanced OOP principles in a real-world business context. This system showcases modern e-commerce functionality with a focus on scalability and maintainability.

        Key Implementation Details:
        • Product Management: Hierarchical categorization of products
        • Shopping Cart: Thread-safe implementation of cart operations
        • Order Processing: State pattern for order lifecycle management
        • Payment Integration: Strategy pattern for multiple payment methods
      `,
      difficulty: "advanced",
      features: [
        "Product catalog and search",
        "Shopping cart management",
        "Order processing system",
        "Payment gateway integration",
        "User authentication",
        "Inventory management",
        "Analytics dashboard"
      ],
      technologies: ["Java", "Spring Boot", "JPA/Hibernate", "MySQL", "Redis"],
      sourceCode: `/oop/ecommerce-platform.java`,
      fullSourceCode: `package com.ecommerce.platform;

import java.util.*;

// Product hierarchy
abstract class Product {
    protected String id;
    protected String name;
    protected double price;
    protected String description;
    
    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    
    public abstract double calculateDiscount();
}

class PhysicalProduct extends Product {
    private double weight;
    private String dimensions;
    
    public PhysicalProduct(String id, String name, double price) {
        super(id, name, price);
    }
    
    @Override
    public double calculateDiscount() {
        return price * 0.1; // 10% discount
    }
}

class DigitalProduct extends Product {
    private String downloadLink;
    private String fileFormat;
    
    public DigitalProduct(String id, String name, double price) {
        super(id, name, price);
    }
    
    @Override
    public double calculateDiscount() {
        return price * 0.2; // 20% discount
    }
}

// Shopping Cart
class ShoppingCart {
    private List<Product> items;
    private double total;
    
    public ShoppingCart() {
        items = new ArrayList<>();
        total = 0.0;
    }
    
    public synchronized void addItem(Product product) {
        items.add(product);
        calculateTotal();
    }
    
    public synchronized void removeItem(Product product) {
        items.remove(product);
        calculateTotal();
    }
    
    private void calculateTotal() {
        total = items.stream()
                    .mapToDouble(item -> item.price - item.calculateDiscount())
                    .sum();
    }
}

// Order processing using State pattern
interface OrderState {
    void next(Order order);
    void prev(Order order);
    String getStatus();
}

class NewOrder implements OrderState {
    @Override
    public void next(Order order) {
        order.setState(new Processing());
    }
    
    @Override
    public void prev(Order order) {
        // Cannot go back from new state
    }
    
    @Override
    public String getStatus() {
        return "New Order";
    }
}

class Processing implements OrderState {
    @Override
    public void next(Order order) {
        order.setState(new Shipped());
    }
    
    @Override
    public void prev(Order order) {
        order.setState(new NewOrder());
    }
    
    @Override
    public String getStatus() {
        return "Processing";
    }
}

class Shipped implements OrderState {
    @Override
    public void next(Order order) {
        order.setState(new Delivered());
    }
    
    @Override
    public void prev(Order order) {
        order.setState(new Processing());
    }
    
    @Override
    public String getStatus() {
        return "Shipped";
    }
}

class Delivered implements OrderState {
    @Override
    public void next(Order order) {
        // Final state
    }
    
    @Override
    public void prev(Order order) {
        order.setState(new Shipped());
    }
    
    @Override
    public String getStatus() {
        return "Delivered";
    }
}

class Order {
    private String orderId;
    private OrderState state;
    private List<Product> items;
    
    public Order() {
        this.state = new NewOrder();
        this.items = new ArrayList<>();
    }
    
    public void setState(OrderState state) {
        this.state = state;
    }
    
    public void nextState() {
        state.next(this);
    }
    
    public void previousState() {
        state.prev(this);
    }
    
    public String getStatus() {
        return state.getStatus();
    }
}

// Payment processing using Strategy pattern
interface PaymentStrategy {
    boolean processPayment(double amount);
}

class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cvv;
    
    public CreditCardPayment(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }
    
    @Override
    public boolean processPayment(double amount) {
        // Implementation for credit card processing
        return true;
    }
}

class PayPalPayment implements PaymentStrategy {
    private String email;
    
    public PayPalPayment(String email) {
        this.email = email;
    }
    
    @Override
    public boolean processPayment(double amount) {
        // Implementation for PayPal processing
        return true;
    }
}

public class EcommercePlatform {
    public static void main(String[] args) {
        // Create products
        Product laptop = new PhysicalProduct("P001", "Gaming Laptop", 1299.99);
        Product ebook = new DigitalProduct("D001", "Java Programming Guide", 29.99);
        
        // Create shopping cart and add items
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(laptop);
        cart.addItem(ebook);
        
        // Create and process order
        Order order = new Order();
        System.out.println("Initial state: " + order.getStatus());
        
        order.nextState();
        System.out.println("After processing: " + order.getStatus());
        
        // Process payment
        PaymentStrategy payment = new CreditCardPayment("1234-5678-9012-3456", "123");
        payment.processPayment(1329.98);
        
        order.nextState();
        System.out.println("Final state: " + order.getStatus());
    }
}`,
      concepts: [
        "Design Patterns",
        "SOLID Principles",
        "Inheritance",
        "Polymorphism",
        "Concurrency",
        "Exception Handling"
      ],
      implementation: [
        {
          title: "Product Hierarchy",
          code: `abstract class Product {
    protected String id;
    protected String name;
    protected double price;
    
    public abstract double calculateDiscount();
}

class PhysicalProduct extends Product {
    private double weight;
    private String dimensions;
    
    @Override
    public double calculateDiscount() {
        return price * 0.1; // 10% discount
    }
}

class DigitalProduct extends Product {
    private String downloadLink;
    
    @Override
    public double calculateDiscount() {
        return price * 0.2; // 20% discount
    }
}`
        },
        {
          title: "Order State Pattern",
          code: `interface OrderState {
    void next(Order order);
    void prev(Order order);
    String getStatus();
}

class Order {
    private OrderState state;
    private List<Product> items;
    
    public void setState(OrderState state) {
        this.state = state;
    }
    
    public void nextState() {
        state.next(this);
    }
}`
        }
      ],
      requirements: [
        "Java Development Kit (JDK) 11 or later",
        "Spring Boot 2.x",
        "MySQL Database",
        "Redis for caching",
        "Maven for dependency management"
      ],
      setupInstructions: [
        "Clone the repository",
        "Configure application.properties",
        "Set up MySQL database",
        "Install and configure Redis",
        "Run mvn clean install",
        "Start the application"
      ],
      icon: "🛒",
      screenshots: [
        {
          title: "Product Catalog",
          description: "Browse and search product listings",
          url: "/screenshots/ecommerce/catalog.png"
        },
        {
          title: "Order Management",
          description: "Track and manage order status",
          url: "/screenshots/ecommerce/orders.png"
        }
      ]
    },
    {
      id: "3",
      title: "Smart Home System",
      description: "An object-oriented implementation of a smart home automation system, featuring device control, scheduling, and monitoring.",
      longDescription: `
        The Smart Home System demonstrates advanced OOP concepts in the context of IoT and home automation. This system provides a flexible and extensible framework for managing various smart devices and automation scenarios.

        Key Implementation Details:
        • Device Management: Abstract factory for different device types
        • Automation Rules: Observer pattern for device state changes
        • Scheduling: Command pattern for scheduled actions
        • Monitoring: Decorator pattern for device monitoring
      `,
      difficulty: "intermediate",
      features: [
        "Device control and monitoring",
        "Automation rules engine",
        "Scheduling system",
        "Energy consumption tracking",
        "Remote access capabilities",
        "Scene management",
        "Voice control integration"
      ],
      technologies: ["Java", "Spring Framework", "MQTT", "MongoDB", "WebSocket"],
      sourceCode: `/oop/smart-home.java`,
      fullSourceCode: `package com.smarthome.system;

import java.util.*;

// Device abstraction
interface Device {
    void turnOn();
    void turnOff();
    boolean isOn();
    String getStatus();
}

// Abstract factory for creating devices
interface DeviceFactory {
    Device createDevice(String name);
}

class LightDevice implements Device {
    private String name;
    private boolean status;
    private int brightness;
    
    public LightDevice(String name) {
        this.name = name;
        this.status = false;
        this.brightness = 100;
    }
    
    @Override
    public void turnOn() {
        status = true;
    }
    
    @Override
    public void turnOff() {
        status = false;
    }
    
    @Override
    public boolean isOn() {
        return status;
    }
    
    @Override
    public String getStatus() {
        return "Light: " + name + " is " + (status ? "ON" : "OFF") + 
               " (Brightness: " + brightness + "%)";
    }
    
    public void setBrightness(int level) {
        this.brightness = level;
    }
}

class ThermostatDevice implements Device {
    private String name;
    private boolean status;
    private double temperature;
    
    public ThermostatDevice(String name) {
        this.name = name;
        this.status = false;
        this.temperature = 22.0;
    }
    
    @Override
    public void turnOn() {
        status = true;
    }
    
    @Override
    public void turnOff() {
        status = false;
    }
    
    @Override
    public boolean isOn() {
        return status;
    }
    
    @Override
    public String getStatus() {
        return "Thermostat: " + name + " is " + (status ? "ON" : "OFF") + 
               " (Temperature: " + temperature + "°C)";
    }
    
    public void setTemperature(double temp) {
        this.temperature = temp;
    }
}

// Observer pattern for device state changes
interface DeviceObserver {
    void update(Device device);
}

class DeviceMonitor implements DeviceObserver {
    @Override
    public void update(Device device) {
        System.out.println("Device state changed: " + device.getStatus());
    }
}

// Command pattern for device control
interface Command {
    void execute();
    void undo();
}

class TurnOnCommand implements Command {
    private Device device;
    
    public TurnOnCommand(Device device) {
        this.device = device;
    }
    
    @Override
    public void execute() {
        device.turnOn();
    }
    
    @Override
    public void undo() {
        device.turnOff();
    }
}

class TurnOffCommand implements Command {
    private Device device;
    
    public TurnOffCommand(Device device) {
        this.device = device;
    }
    
    @Override
    public void execute() {
        device.turnOff();
    }
    
    @Override
    public void undo() {
        device.turnOn();
    }
}

// Scene management
class Scene {
    private String name;
    private List<Command> commands;
    
    public Scene(String name) {
        this.name = name;
        this.commands = new ArrayList<>();
    }
    
    public void addCommand(Command command) {
        commands.add(command);
    }
    
    public void activate() {
        for (Command command : commands) {
            command.execute();
        }
    }
}

// Smart Home Controller
class SmartHomeController {
    private Map<String, Device> devices;
    private Map<String, Scene> scenes;
    private List<DeviceObserver> observers;
    
    public SmartHomeController() {
        devices = new HashMap<>();
        scenes = new HashMap<>();
        observers = new ArrayList<>();
    }
    
    public void addDevice(String id, Device device) {
        devices.put(id, device);
    }
    
    public void addScene(String name, Scene scene) {
        scenes.put(name, scene);
    }
    
    public void addObserver(DeviceObserver observer) {
        observers.add(observer);
    }
    
    public void executeCommand(String deviceId, Command command) {
        command.execute();
        notifyObservers(devices.get(deviceId));
    }
    
    public void activateScene(String sceneName) {
        Scene scene = scenes.get(sceneName);
        if (scene != null) {
            scene.activate();
        }
    }
    
    private void notifyObservers(Device device) {
        for (DeviceObserver observer : observers) {
            observer.update(device);
        }
    }
}

public class SmartHomeSystem {
    public static void main(String[] args) {
        SmartHomeController controller = new SmartHomeController();
        
        // Create devices
        Device livingRoomLight = new LightDevice("Living Room");
        Device bedroomLight = new LightDevice("Bedroom");
        Device thermostat = new ThermostatDevice("Main");
        
        // Add devices to controller
        controller.addDevice("living_light", livingRoomLight);
        controller.addDevice("bedroom_light", bedroomLight);
        controller.addDevice("thermostat", thermostat);
        
        // Add observer
        controller.addObserver(new DeviceMonitor());
        
        // Create and execute commands
        Command turnOnLiving = new TurnOnCommand(livingRoomLight);
        Command turnOnBedroom = new TurnOnCommand(bedroomLight);
        
        // Create scene
        Scene eveningScene = new Scene("Evening");
        eveningScene.addCommand(turnOnLiving);
        eveningScene.addCommand(turnOnBedroom);
        
        controller.addScene("evening", eveningScene);
        
        // Activate scene
        controller.activateScene("evening");
    }
}`,
      concepts: [
        "Design Patterns",
        "Interface Segregation",
        "Dependency Injection",
        "Event Handling",
        "State Management"
      ],
      implementation: [
        {
          title: "Device Interface",
          code: `interface Device {
    void turnOn();
    void turnOff();
    boolean isOn();
    String getStatus();
}

class LightDevice implements Device {
    private String name;
    private boolean status;
    private int brightness;
    
    @Override
    public void turnOn() {
        status = true;
    }
    
    @Override
    public void turnOff() {
        status = false;
    }
}`
        },
        {
          title: "Scene Management",
          code: `class Scene {
    private String name;
    private List<Command> commands;
    
    public void addCommand(Command command) {
        commands.add(command);
    }
    
    public void activate() {
        for (Command command : commands) {
            command.execute();
        }
    }
}`
        }
      ],
      requirements: [
        "Java Development Kit (JDK) 11 or later",
        "Spring Framework",
        "MQTT Broker",
        "MongoDB Database",
        "WebSocket support"
      ],
      setupInstructions: [
        "Clone the repository",
        "Configure MQTT broker settings",
        "Set up MongoDB database",
        "Configure application properties",
        "Run the application",
        "Connect devices"
      ],
      icon: "🏠",
      screenshots: [
        {
          title: "Device Dashboard",
          description: "Control panel for all connected devices",
          url: "/screenshots/smarthome/dashboard.png"
        },
        {
          title: "Automation Rules",
          description: "Configure and manage automation rules",
          url: "/screenshots/smarthome/automation.png"
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
            <Link to="/projects/oop" className="text-blue-600 hover:text-blue-800">
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

            {/* OOP Concepts */}
            <section className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                OOP Concepts
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
                  <p>• The file will be downloaded as a .java file</p>
                  <p>• Make sure you have JDK installed to compile and run the code</p>
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
                to="/projects/oop"
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