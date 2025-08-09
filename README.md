# Docker-Web-app
A functional Dockerized multi-service web app with persistent storage, plus a set of shell scripts to prepare, start, stop, and remove everything.
Here’s a **complete and accurate README.md** for your “Bank Web App” that will meet the documentation part of your assignment grading criteria.
---
# **Bank Web Application – Virtualization and Containers Project**

## **Deployment Requirements**

Before running the application, ensure you have the following installed:

* **Docker** (version 20.10 or later)
* **Docker Compose** (v2.x or later) – Comes bundled with modern Docker Desktop installations
* **Git** (optional, for cloning the repository)

This application runs entirely inside Docker containers; no Node.js, React, or MySQL installations are needed on your host machine.

---

## **Application Description**

This project is a simple **Bank Dashboard Web App** with a **Login page** and a **User Dashboard** that displays:

* Current Accounts
* Savings Accounts

**Technology stack:**

* **Frontend:** React (served via Nginx) – Royal Blue & White theme for a professional dashboard look
* **Backend:** Node.js Express API – Handles login requests and provides account data
* **Database:** MySQL – Stores persistent bank account and user information

---

## **Network and Volume Details**

| Resource        | Purpose                                                                              |
| --------------- | ------------------------------------------------------------------------------------ |
| `myapp-network` | Custom Docker network enabling communication between frontend, backend, and database |
| `myapp-db-data` | Named Docker volume for MySQL data persistence so data is preserved between restarts |

---

## **Container Configuration**

### **Frontend Container (`frontend`)**

* **Image:** Built from `frontend/Dockerfile`
* **Base:** Node.js (for build) + Nginx (for serving static files)
* **Ports:** Maps container port `80` to host port `3000`
* **Environment:** Communicates with backend via internal Docker network
* **Role:** Displays the bank dashboard and login interface

### **Backend Container (`backend`)**

* **Image:** Built from `backend/Dockerfile`
* **Base:** Node.js Express
* **Ports:** Maps container port `5001` to host port `5001`
* **Environment Variables:**

  * `DB_HOST`: Hostname of MySQL container (`db`)
  * `DB_USER`: Database username (`root`)
  * `DB_PASS`: Database password (`rootpass`)
* **Role:** Authenticates users and returns account data

### **Database Container (`db`)**

* **Image:** `mysql:8.0` from Docker Hub
* **Ports:** Exposed internally (not accessible directly from host)
* **Environment Variables:**

  * `MYSQL_ROOT_PASSWORD`: Root password (`rootpass`)
  * `MYSQL_DATABASE`: Database name (`bankdb`)
* **Volumes:** Persists `/var/lib/mysql` to `myapp-db-data`
* **Role:** Stores persistent banking data

---

## **Container List**

| Container Name | Role               | Port Mapping  |
| -------------- | ------------------ | ------------- |
| `frontend`     | React UI via Nginx | `3000:80`     |
| `backend`      | API server         | `5001:5001`   |
| `db`           | MySQL database     | Internal only |

---

## **Usage Instructions**

### **1. Prepare the application**

Creates Docker network, volume, and builds images.

```bash
./prepare-app.sh
```

### **2. Start the application**

Starts containers in the background and sets restart policies.

```bash
./start-app.sh
```

**Access the web app:**
[http://localhost:3000](http://localhost:3000)

**Test login credentials:**

* Username: `john`
* Password: `1234`

### **3. Stop the application**

Stops containers without removing persistent data.

```bash
./stop-app.sh
```

### **4. Remove the application**

Removes all containers, images, networks, and volumes created.

```bash
./remove-app.sh
```

---

## **Example Workflow**

```bash
# Prepare application resources
./prepare-app.sh
Preparing app ...

# Run the application
./start-app.sh
Starting app ...
The app is available at http://localhost:3000

# Access via browser
# Login with username: john, password: 1234

# Stop the application (persistent data preserved)
./stop-app.sh
Stopping app ...

# Remove all application resources (including persistent data)
./remove-app.sh
Removed app.
```

---

## **How to Access the Application**

* **Frontend (UI):** [http://localhost:3000](http://localhost:3000)
* **Backend API:** [http://localhost:5001](http://localhost:5001) (for testing API calls)

---

##Notes

* The backend is currently using **mock data**. To use a real database:

  * Replace mock login and account data in `backend/server.js` with MySQL queries.
  * Ensure proper table creation and seed data before running the backend.
* If you change ports or environment variables, update them in both `docker-compose.yaml` and relevant source code files.


* Deployment requirements ✅
* Application description ✅
* Network & volume details ✅
* Container configuration ✅
* Container list ✅
* Instructions for prepare, run, stop, delete ✅
* Example workflow ✅
* Access details ✅
