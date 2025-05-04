# CMSC 495 Capstone AI News Aggregator
Front end side created with vite and reactJS. Axios integration to make HTTP requests. Components created with JSX.

---

## Setup

Git clone repo.

To start up, run the following in terminal:
```
npm install
npm run dev
```

Vite will build program - open `http://localhost:5173/` in browser.

Once loaded on your local machine, create .env file in root and set VITE_API_KEY=YOUR_API_KEY where 'YOUR_API_KEY' is the actual key you get from the eventregistry newsAPI.

---

## snippet of its current layout
  
<img width="1023" alt="homescreenImg" src="https://github.com/user-attachments/assets/1e29f4fa-6a3c-4917-8f28-e9fbd8d3701f" />

---

## Why React?

React was chosen for its rich ecosystem of development tools, ease of component-based architecture, and widespread community support. Compared to backend frameworks like Go or Rails, React and the broader JavaScript frontend ecosystem provide significantly better developer experience for UI-centric tasks—especially when rapid iteration and responsive design are required.

While tools like Rails offer frontend integrations (e.g., Rails + React), they often increase complexity without much payoff. Managing them inside a monolithic project can be cumbersome, essentially becoming another project within a project. Keeping the frontend as a standalone React application promotes better separation of concerns and avoids the overhead of tightly coupled full-stack frameworks.

---

Would you like to add a section explaining the backend setup or deployment instructions?
