import { createRoot } from 'react-dom/client';
import { App } from "./App";
import { StrictMode } from 'react';
import "./index.css"
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
const root = createRoot(container);

const element = <StrictMode>
    <App />
    <Toaster position="top-center" toastOptions={{
        duration: 1000 // in milliseconds
    }}/>
</StrictMode>

root.render(element)