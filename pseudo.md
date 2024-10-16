## STEP 1 (PAGES):
- [X] **Home page**
- [X] **Register page**
- [X] **Signin page**
- [X] **Add communities page**
- [X] **Community page**
- [X] **1 style page**



## STEP 2 (IMPORTANT REQUIREMENTS FOR PROJECT):
### Status of work:
- **[X]**: Completed
- **[XX]**: In Progress
- **[XXX]**: Planned but not started
- **[ ]**: Not Started

***

- [X] **Create repo**
  - [link](https://github.com/alqassabz/project3_frontend)

- [X] **ReadME file**
  - Available


- [X] **Create two repos**
- Available

- [ ] **Must use flexbox or grid**


- [ ] **At least 3 Mongoose Schemas**
  - User
  - Community
  - Chat
  - DM

- [ ] **At least 2 associations of any type**
  - User and Community association
  - Chat and Community association

- [ ] **Have Full CRUD**


- [ ] **Display data from each model on the front-end**


- [ ] **Integrate User Authentication with JWT and utilize protected routes on the front-end**

- [ ] **Navigate between Pages**

- [ ] **At least 30 meaningful git commits per member**
    

- [ ] **Code indented, spaced, and within code blocks**


- [ ] **Deploy on Surge (Frontend)**

- [ ] **Deploy on Fly.io / Render (Backend)**

## STEP 3 (POST-MVP IDEAS):

- [ ] Integrate a 3rd party API: here

- [ ] Integrate a UI Library (Semantic, Material-UI, React-MD, React Rainbow, or r-suite)

- [ ] Integrate Mapbox or geo-location: here

- [ ] Implement Data Visualization or Charting: here


## STEP 4 (MAIN GAME RULES):

## 1 (MAIN APPLICATION):

- [ ] Import necessary libraries (e.g., React, React Router, etc.)

- [ ] **Main Application (App.js)**:
  - LOAD Navbar
  - LOAD Sidebar (for navigation links)
  - LOAD Homepage or relevant page (based on user action)

## 2 (NAVBAR):

- [ ] **Navbar Component**:
  - DISPLAY Two icons for joined communities
  - DISPLAY Plus button for creating a new community
  - IF user clicks Plus button THEN:
    - OPEN Create Community Page

## 3 (SIDEBAR):

- [ ] **Sidebar Component (Left Side)**:
  - DISPLAY Links to:
    - Home (All Communities)
    - My Communities (User's joined communities)
    - Direct Messages
    - Notifications (Optional)

## 4 (HOMEPAGE):

- [ ] **Homepage (Main Page)**:
  - DISPLAY All available communities in a grid format
  - FOR each community:
    - SHOW community icon
    - SHOW Join Button (if not already joined)
    - IF user clicks Join Button THEN:
      - ADD user to community members list
      - NOTIFY community admin of new member
  - DISPLAY Direct Messages panel with a list of recent conversations
  - IF user clicks on a conversation THEN:
    - OPEN message window

## 5 (CREATE COMMUNITY PAGE):

- [ ] **Create Community Page**:
  - DISPLAY Form:
    - Community Name input field
    - Icon upload option
    - Section input (multiple sections allowed)
  - IF user submits form THEN:
    - CREATE new community
    - ADD it to the homepage
    - ADD current user as admin

## 6 (COMMUNITY PAGE):

- [ ] **Community Page**:
  - DISPLAY Community Name and Icon
  - DISPLAY List of sections within the community (e.g., coding, sports, etc.)
  - FOR each section:
    - DISPLAY Section Name
    - DISPLAY Comment section (chat component)
    - IF user wants to post comment THEN:
      - ALLOW adding new comment or replying to an existing comment
  - IF user is admin THEN:
    - ALLOW admin to invite users via email
    - SEND email invitations

## 7 (DIRECT MESSAGING PAGE):

- [ ] **Direct Messaging (DM) Page**:
  - DISPLAY list of individual conversations
  - IF user selects a conversation THEN:
    - OPEN chat window
    - ALLOW user to send and receive messages

## 8 (MY COMMUNITIES PAGE):

- [ ] **My Communities Page**:
  - DISPLAY all communities that the user has joined
  - FOR each joined community:
    - SHOW community icon and name
    - DISPLAY Leave button
    - IF user clicks Leave THEN:
      - REMOVE user from community

## 9 (NOTIFICATIONS AND INVITATIONS - OPTIONAL):

- [ ] **Notifications**:
  - DISPLAY list of notifications:
    - New direct messages
    - Invitations to communities
    - Replies to comments

## 10 (DATABASE/BACKEND - TO BE IMPLEMENTED):

- [ ] **Database Setup**:
  - CREATE database to store:
    - Users (name, email, profile picture)
    - Communities (name, icon, sections)
    - Messages (direct messages, comments)
    - User membership in communities
  - IMPLEMENT API for handling:
    - Community creation, joining, and leaving
    - Sending messages (comments and DMs)
    - Sending email invitations





