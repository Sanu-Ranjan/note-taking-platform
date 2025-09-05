# Tables

### Users

- id (PK)
- userName
- email (unique)

### Subjects

- id (PK)
- subjectName
- userId (FK->Users.id)

### Notes

- id (PK)
- topic
- content
- subjectId (FK->Subjects.id)

### Recievednotes

- id (PK)
- userId (FK->Users.id)
- noteId (FK->Notes.id)

### Requests

- id (PK)
- fromUser
- noteId (FK->Notes.id)
- userId (FK->Users.id)

### RefreshTokens

- id
- tokenHash
- replaceHash
- expiresAt
- revokedAt
- userId (FK-> Users.id)
