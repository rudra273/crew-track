# CrewTrack Project Architecture 

## 1. Technology Stack

- Backend: Django
- Frontend: Next.js (React framework)
- Database: PostgreSQL

## 2. Project Structure

```
crewtrack/
│
├── backend/
│   ├── crewtrack/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── company/
│   ├── employee/
│   ├── department/
│   ├── attendance/
│   ├── payment/
│   └── dashboard/
│
└── frontend/
    ├── pages/
    ├── components/
    ├── styles/
    ├── public/
    └── lib/
```

## 3. Database Models (PostgreSQL Collections)

### 3.1 Company Collection

- _id: ObjectId (auto-generated)
- company_id: String (custom format: dd-mm-yy-hh-mm-ss-nn)
- name: String
- owner: String
- company_type: String
- description: String
- since: Date
- employee_range: String

### 3.2 Department Collection

- _id: ObjectId (auto-generated)
- department_id: String
- name: String
- company_id: String (reference to Company collection)
- base_salary: Decimal
- overtime_rate: Decimal (per hour)
- description: String

### 3.3 Employee Collection

- _id: ObjectId (auto-generated)
- employee_id: String (SHA hash)
- first_name: String
- last_name: String
- phone: String
- email: String
- address: String
- department_id: String (reference to Department collection)
- group: String
- role: String
- bank_account: Object
  - account_number: String
  - ifsc_code: String
  - bank_name: String
- upi_id: String
- qr_code: String (generated from ID, first name, phone, and generated date)
- company_id: String (reference to Company collection)
- joining_date: Date

### 3.4 Attendance Collection

- _id: ObjectId (auto-generated)
- employee_id: String (reference to Employee collection)
- date: Date
- status: String (enum: "full_day", "half_day", "absent")
- overtime_hours: Decimal

### 3.5 Payment Collection

- _id: ObjectId (auto-generated)
- employee_id: String (reference to Employee collection)
- month: Date (stored as first day of the month)
- year: Number
- amount: Decimal
- status: String (enum: "paid", "pending")
- payment_date: Date
- payment_method: String (e.g., "UPI", "Bank Transfer")
- transaction_id: String

### 3.6 Budget Collection

- _id: ObjectId (auto-generated)
- company_id: String (reference to Company collection)
- month: Date (stored as first day of the month)
- year: Number
- total_budget: Decimal
- total_spent: Decimal
- remaining_budget: Decimal

## 4. API Endpoints

1. Company Management
   - POST /api/company/register
   - GET /api/company/{company_id}
   - PUT /api/company/{company_id}

2. Employee Management
   - POST /api/employee/create
   - GET /api/employee/{employee_id}
   - PUT /api/employee/{employee_id}
   - GET /api/employee/list/{company_id}

3. Department Management
   - POST /api/department/create
   - GET /api/department/{department_id}
   - PUT /api/department/{department_id}
   - GET /api/department/list/{company_id}

4. Attendance System
   - POST /api/attendance/mark
   - GET /api/attendance/{employee_id}/{year}/{month}
   - PUT /api/attendance/{attendance_id}

5. Payment System
   - POST /api/payment/create
   - GET /api/payment/{employee_id}/{year}/{month}
   - PUT /api/payment/{payment_id}
   - GET /api/payment/unpaid/{company_id}

6. Dashboard
   - GET /api/dashboard/{company_id}

## 5. Frontend Structure (Next.js)

- pages/
  - index.js (Home/Login)
  - dashboard.js
  - employees/
    - index.js (List)
    - [id].js (Employee Profile)
  - departments/
    - index.js (List)
    - [id].js (Department Details)
  - attendance.js
  - payments.js
  - budget.js
- components/
  - Layout.js
  - Navbar.js
  - EmployeeCard.js
  - AttendanceCalendar.js
  - PaymentForm.js
  - DepartmentForm.js
- styles/
  - globals.css
- lib/
  - api.js (API calls)
  - utils.js

## 6. Salary and Overtime Calculation

1. Base Salary:
   - Stored in the Department collection
   - Applied to all employees in that department

2. Overtime Calculation:
   - Use the overtime_rate from the Department collection
   - Calculate based on overtime_hours in the Attendance collection

3. Total Salary Calculation:
   - Base salary for the period (e.g., month)
   - Add overtime pay: overtime_hours * overtime_rate
   - Deduct for half days or absences as per company policy

4. Implementation:
   - Create a salary calculation function in the backend
   - This function will aggregate attendance data and apply department rates
   - Use this for both regular payroll and ad-hoc calculations

## 7. Attendance System

1. Daily Attendance Marking:
   - Employers can mark employees as present (full day), half day, or absent
   - Option to record overtime hours

2. Calendar View:
   - Implement a calendar component in the frontend
   - Fetch attendance data for each employee on a monthly basis
   - Display attendance status and overtime hours in the calendar

3. Attendance Reports:
   - Generate monthly and custom period reports
   - Include statistics like attendance percentage, overtime hours, etc.

## 8. Payment System

1. Calculation:
   - Use the salary calculation function to determine payment amounts
   - Consider attendance, overtime, and any deductions

2. UPI Integration:
   - Generate UPI payment links or QR codes for each payment
   - Integrate with popular UPI apps for seamless payments

3. Payment Tracking:
   - Update payment status in the Payment collection
   - Provide payment history and pending payment reports

## 9. Dashboard

1. Company Overview:
   - Total employees
   - Department-wise employee count
   - Monthly attendance summary

2. Financial Overview:
   - Total unbilled amount
   - Budget vs. actual spent
   - Salary drifts (if any)

3. Quick Actions:
   - Mark attendance
   - Process payments
   - Add new employee/department

## 10. Security Considerations

1. Authentication:
   - Implement JWT-based authentication for API endpoints
   - Use secure password hashing (e.g., bcrypt)

2. Authorization:
   - Implement role-based access control (RBAC)
   - Restrict sensitive operations and data access based on user roles

3. Data Protection:
   - Encrypt sensitive data in the database
   - Use HTTPS for all communications
   - Implement proper input validation and sanitization

4. API Security:
   - Implement rate limiting on API endpoints
   - Use API keys for external integrations

## 11. Performance Optimization

1. Database Indexing:
   - Create appropriate indexes on frequently queried fields

2. Caching:
   - Implement Redis caching for frequently accessed data

3. Frontend Optimization:
   - Use Next.js's built-in optimizations for images and fonts
   - Implement code splitting and lazy loading

4. API Optimization:
   - Use pagination for large data sets
   - Implement efficient querying and aggregation in MongoDB

## 12. Scalability Considerations

1. Microservices Architecture:
   - Consider breaking down the backend into microservices for better scalability

2. Load Balancing:
   - Implement load balancing for handling increased traffic

3. Database Scaling:
   - Plan for database sharding if data growth is expected to be significant

4. Containerization:
   - Use Docker for containerization to ensure consistent environments

## 13. Monitoring and Logging

1. Application Monitoring:
   - Implement application performance monitoring (APM)
   - Set up alerts for critical issues

2. Logging:
   - Implement centralized logging for easier debugging and auditing

3. Analytics:
   - Integrate usage analytics to track feature adoption and user behavior

## 14. Compliance and Data Governance

1. Data Retention Policies:
   - Implement data retention and deletion policies as per regulations

2. Audit Trails:
   - Maintain audit logs for all critical actions in the system

3. Data Backup:
   - Implement regular data backup and disaster recovery procedures


