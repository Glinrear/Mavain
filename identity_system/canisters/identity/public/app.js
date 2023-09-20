import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory, canisterId } from "canister";

const agent = new HttpAgent({ host: "https://ic0.app", identity: null });

const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId: Principal.fromText(canisterId),
});

document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const result = await actor.authenticateUser(username, password);
        if (result) {
            document.getElementById("message").textContent = "Authentication successful.";
            document.getElementById("message").style.color = "#007bff";
            document.getElementById("message").style.display = "block";
        } else {
            document.getElementById("message").textContent = "Authentication failed. Incorrect username or password.";
            document.getElementById("message").style.color = "red";
            document.getElementById("message").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "Error during authentication.";
        document.getElementById("message").style.color = "red";
        document.getElementById("message").style.display = "block";
    }
});

document.getElementById("registerBtn").addEventListener("click", async () => {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const result = await actor.registerUser(username, password);
        if (result) {
            document.getElementById("message").textContent = "Registration successful.";
            document.getElementById("message").style.color = "#007bff";
            document.getElementById("message").style.display = "block";
        } else {
            document.getElementById("message").textContent = "Registration failed. User may already exist.";
            document.getElementById("message").style.color = "red";
            document.getElementById("message").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").textContent = "Error during registration.";
        document.getElementById("message").style.color = "red";
        document.getElementById("message").style.display = "block";
    }
});

// Comprobar si el usuario ya está autenticado
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("message").textContent = `Logged in as ${loggedInUser}.`;
    document.getElementById("message").style.color = "#007bff";
    document.getElementById("message").style.display = "block";
}
