# Product Requirements Document (PRD)

## Project Note-taking-App

### 1. Product Overview

**Product Name:** Note-Taking-App
**Version:** 1.0.0  
**Product Type:** Full stack app

### 2. Target Users

- **Students** : Add and organise notes by subjects and share them with one another

### 3. Core Features

#### 3.1 User Authenticaton and Authorization

- **User Registration** : Account creation with Google OAuth (email)
- **User Login** : User authentication with Google OAuth and JWT
- **Token Management** : Access token refresh mechanism

#### 3.2 Subject Management

- **Subject Listing** : View all subjects
- **Subject Creation** : Create new subject with Subject name
- **Subject Deletion** : Removes Subject and all associated notes
- **Search Subject** : Search subject by name

#### 3.3 Notes Management

- **Note Listing** : View notes of a subject
- **Notes Creation** : Create new notes with topic name and content under a subject
- **Notes Updation** : Modify content on a note
- **Notes Deletion** : Remove Notes
- **Notes Search** : Search notes by topic name

#### 3.4 Request Management

- **Notes Sharing** : Create new share request to share notes with another user
- **Reject Request** : Reject incoming request to recieve notes
- **Accept Request** : Accept request to recieve notes
- **Cancell Request** : Cancell send request

### 4 API end points

**Authentication Routes** (`/api/v1/auth/`)

- `/google` - Redirects user to Google consent screen
- `/google/callback`- Read user profile, upsert user in DB, generate ascess and refresh token
- `/refresh`- Rotate refresh token to issue new acess token
- `/logout` - Revokes current access token

**Subjects Routes (protected routes)** (`/api/v1/subjects`)

- `GET/` - Subject Listing of a user
- `POST/` - Subject Creation for a user
- `GET/:name` - Search Subject for a user
- `DELETE/:id` - Subject Deletion for a user

**Notes Routes (protected routes)** (`/api/v1/notes`)

- `GET/:id` - Note Listing of a subject
- `POST/` - Notes Creation
- `PUT/:id` - Notes Updation
- `DELETE/:id` - Notes Deletion
- `GET/:topic` - Notes Search

**Requests Routes (protected routes)** (`api/v1/requests`)

- `POST/` - Create Note Sharing request
- `POST/:id` - Accept/reject request
- `GET/` - List all incoming request
- `DELETE/` - Delete request

**Recieved Notes (Protected routes)** (`api/v1/recieved`)

- `GET/` - List all recieved note for a user
- `DELETE/` - delete a recieved note for a user
