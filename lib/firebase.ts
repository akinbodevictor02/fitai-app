import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBN1wo_-x6k4WRG7BkBIDSK0d2rSfapuyc",
  authDomain: "ai-fitness-dashboard.firebaseapp.com",
  projectId: "ai-fitness-dashboard",
  appId: "1:933147661166:web:91b3ac581a305dfc55e77f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);