# Welcome to FlexileTT!

## Project Overview

Flexile Time Tracker is a project to explore a new feature for Flexile.com. As someone always looking to improve productivity, I wanted to create a tool I'd use.

This project is very much a work in progress. It's been a great learning experience, and I'm excited to continue developing it further.

## Current Features

-   Basic task tracking (start/stop timer)
-   Task list with duration
-   Local storage for data persistence
-   Simple data submission to a backend server
```mermaid
sequenceDiagram
    participant User
    participant DesktopApp as Desktop App
    participant ApiServer as API Server
    participant Frontend as Frontend

    User->>DesktopApp: Open the app
    DesktopApp->>DesktopApp: Initialize and display splash screen
    DesktopApp->>DesktopApp: Load main window

    User->>DesktopApp: Enter task name and start timer
    DesktopApp->>DesktopApp: Start task timer

    User->>DesktopApp: Stop timer
    DesktopApp->>DesktopApp: Stop task timer
    DesktopApp->>DesktopApp: Store task locally

    User->>DesktopApp: Enter a second task name and start timer
    DesktopApp->>DesktopApp: Start second task timer

    User->>DesktopApp: Stop timer for second task
    DesktopApp->>DesktopApp: Stop second task timer
    DesktopApp->>DesktopApp: Store second task locally

    User->>DesktopApp: Delete a task
    DesktopApp->>DesktopApp: Remove task from local storage

    User->>DesktopApp: Submit the day's data
    DesktopApp->>ApiServer: POST /tasks (task data)
    ApiServer-->>DesktopApp: 200 OK (Tasks updated)
    DesktopApp->>Frontend: Notify Frontend via SSE/WebSocket
    Frontend->>Frontend: Refresh UI with new task data
    Note right of Frontend: User sees updated tasks
```

## Tech Stack

-   Frontend: React
-   Backend: Express.js server (very basic at the moment)
-   Desktop: Tauri (React frontend with Rust backend)

Styled with TailwindCSS. Coded in Cursor. Helped by ClaudeAPI


## Current State and Next Steps

Right now, the app is functional but basic. Of course, it only works locally as Flexile does not have integration features. Yet. 

Here's what I'd suggest to work on next:

1. **Improve data management**: Implement proper server-side storage, preferably an API. I considered doing an API server for this exercise, but this one has more visibility.
2.  **Enhance UI/UX**: Add more interactive elements and improve the overall design.
3.  **Develop Tauri integration**: Create a fully functional desktop app.
4.  **Add data visualization**: Implement charts to provide insights into time usage.
5.  **Implement user authentication**: To allow for personalized experiences.

## Installation

I am not providing bundles at the moment. So you would have to install Tauri, for the desktop app. Fortunately, it's easy to do. Go check [Quick Start | Tauri Apps](https://tauri.app/v1/guides/getting-started/setup/)

Then, to run the API server and the frontend project locally:

1.  Clone this repo:
    
    `git clone git@github.com:rpruizc/flexile-api.git && cd flexile-api`
    
2.  Install dependencies:
    
    `npm install`
    
3.  In a terminal session, execute this line to start the API server:
  
    `node api/server.js`

4. On a new terminal session, serve the frontend

`http-server . -c-1`
    

##Other requirements

Please visit [rpruizc/flexile-time-tracker (github.com)](https://github.com/rpruizc/flexile-time-tracker) to get the API server and frontend emulation code.