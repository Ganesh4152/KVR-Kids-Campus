\# KVR Kids Campus - Recovery Log



\## Project



Project: KVR Kids Campus



GitHub Account: Ganesh4152



Repository: KVR-Kids-Campus



Branch: main



Local Project:

C:/DevOpsProjects/KVR-Kids-Campus



\---



\# 2026-08-17 - Fee Management Fix



\## Issue



Admin Fee Management page was showing:



"Failed to save fee"



The backend returned:



Field 'receipt\_no' doesn't have a default value



Endpoint tested:



POST /api/fees



\---



\## Database



Database:



kvr\_school



Table:



fees



\---



\## Database Fix 1



The fees table contained:



receipt\_no VARCHAR(100)



It was changed to allow NULL:



ALTER TABLE fees

MODIFY COLUMN receipt\_no VARCHAR(100) NULL;



\---



\## Database Fix 2



After fixing receipt\_no, the backend reported:



Field 'payable\_amount' doesn't have a default value



The fees table was then checked for required legacy columns.



The required database fields were adjusted so the current Fee.java application model could insert a fee record without deleting existing columns.



\---



\# Current Fee Backend



Backend endpoint:



POST http://localhost:8080/api/fees



Fee calculation:



schoolFee + busFee = totalFee



totalFee - paidFee = pendingFee



Validation:



paidFee cannot be greater than totalFee



Negative fee values are rejected.



\---



\# Current Fee Backend Files



backend/src/main/java/com/kvr/backend/entity/Fee.java



backend/src/main/java/com/kvr/backend/controller/FeeController.java



backend/src/main/java/com/kvr/backend/service/FeeService.java



backend/src/main/java/com/kvr/backend/repository/FeeRepository.java



backend/src/main/java/com/kvr/backend/dto/FeeResponse.java



Related entities:



backend/src/main/java/com/kvr/backend/entity/Student.java



backend/src/main/java/com/kvr/backend/entity/SchoolClass.java



\---



\# Verification



Test request:



POST /api/fees



Example:



studentId = 1

classId = 2

academicYear = 2026-2027

schoolFee = 20000

busFee = 5000

paidFee = 10000

paymentDate = 2026-08-17

remarks = First payment



Expected calculation:



Total Fee = 25000



Paid Fee = 10000



Pending Fee = 15000



\---



\# Recovery Procedure



If the project needs to be restored:



1\. Clone the GitHub repository.

2\. Checkout the required commit.

3\. Restore the MySQL database backup.

4\. Start the Spring Boot backend.

5\. Start the frontend.

6\. Test POST /api/fees.

7\. Test GET /api/fees.

8\. Verify Admin Fee Management.



\---



\# Important



GitHub stores the application source code.



MySQL data is backed up separately.



Do not commit passwords, API keys, database credentials, .env files, node\_modules, or target directories.



\---



\# Future Changes



Every major working change should be committed with a clear message.



Example:



git add .

git commit -m "Fix fee management save"

git push origin main



For major stable versions, create a Git tag.



Example:



git tag -a v1.0-fees-working -m "Fee management working"

git push origin v1.0-fees-working

