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
- **Notes Sharing** : Create new share request to share notes with another user
- **Notes Updation** : Modify content on a note
- **Notes Deletion** : Remove Notes
- **Notes Search** : Search notes by topic name

#### 3.4 Request Management

- **Reject Request** : Reject incoming request to recieve notes
- **Accept Request** : Accept request to recieve notes
- **Cancell Request** : Cancell send request
