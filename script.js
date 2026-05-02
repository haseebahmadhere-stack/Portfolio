// ==================== Mobile Menu Toggle ====================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Scroll Animation ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill cards and project cards
document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-wrapper').forEach(element => {
    element.classList.add('scroll-animate');
    observer.observe(element);
});

// ==================== Contact Form Handling ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== Project Button Handlers ====================
document.querySelectorAll('.project-btn').forEach(button => {
    button.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        if (this.classList.contains('demo')) {
            alert(`Live Demo for: ${projectTitle}\n\nThis would open your deployed project.`);
        } else if (this.classList.contains('code')) {
            alert(`GitHub Repository for: ${projectTitle}\n\nThis would open your GitHub repository.`);
        }
    });
});

// ==================== Active Navigation Link ====================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== Navbar Background on Scroll ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
    }
});

// ==================== Animation for page load ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console message for fun
console.log('%cWelcome to Haseeb Ahmad\'s Portfolio! 🚀', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBS Artificial Intelligence Student | 2nd Semester', 'color: #818cf8; font-size: 14px;');
// ===================== Configuration =====================
 
// Replace this with your actual OpenAI API key.
// IMPORTANT: See README.md for instructions on how to handle
// your API key safely. Never commit real keys to a public repo.
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";
 
// The OpenAI model to use for generating responses
const MODEL = "gpt-3.5-turbo";
 
// The API endpoint for OpenAI chat completions
const API_URL = "https://api.openai.com/v1/chat/completions";
 
// ===================== DOM Elements =====================
 
// Get references to all the elements we need
const toggleBtn = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const closeBtn = document.getElementById("chatbot-close");
const messagesContainer = document.getElementById("chatbot-messages");
const inputField = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");
 
// ===================== Chat State =====================
 
// Keep track of the conversation history for context.
// The system message defines the chatbot's personality.
const conversationHistory = [
    {
        role: "system",
        content:
            "You are a helpful and friendly AI assistant on Haseeb Ahmad's portfolio website. " +
            "Keep your answers concise and helpful. If someone asks about Haseeb, " +
            "let them know they can reach out via the portfolio contact section.",
    },
];
 
// ===================== Toggle Chat Window =====================
 
/**
 * Opens the chat window and hides the toggle button.
 */
toggleBtn.addEventListener("click", function () {
    chatWindow.classList.remove("hidden");
    toggleBtn.style.display = "none";
    inputField.focus();
});
 
/**
 * Closes the chat window and shows the toggle button again.
 */
closeBtn.addEventListener("click", function () {
    chatWindow.classList.add("hidden");
    toggleBtn.style.display = "block";
});
 
// ===================== Send Message =====================
 
/**
 * Handles sending a message when the Send button is clicked.
 */
sendBtn.addEventListener("click", function () {
    handleSendMessage();
});
 
/**
 * Handles sending a message when the Enter key is pressed.
 */
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleSendMessage();
    }
});
 
/**
 * Main function to handle sending a user message.
 * 1. Gets the user's text from the input field
 * 2. Displays the user's message in the chat
 * 3. Shows a "typing..." indicator
 * 4. Sends the message to OpenAI API
 * 5. Displays the AI response
 */
async function handleSendMessage() {
    // Get the text from the input field and trim whitespace
    const userText = inputField.value.trim();
 
    // Don't send empty messages
    if (!userText) return;
 
    // Clear the input field
    inputField.value = "";
 
    // Display the user's message in the chat window
    addMessage(userText, "user");
 
    // Add the user's message to the conversation history
    conversationHistory.push({ role: "user", content: userText });
 
    // Show a typing indicator while waiting for the response
    const typingIndicator = addMessage("Typing...", "bot typing");
 
    // Disable the send button and input while waiting
    sendBtn.disabled = true;
    inputField.disabled = true;
 
    try {
        // Send the message to OpenAI and get the response
        const botResponse = await fetchOpenAIResponse();
 
        // Remove the typing indicator
        typingIndicator.remove();
 
        // Display the bot's response
        addMessage(botResponse, "bot");
 
        // Add the bot's response to the conversation history
        conversationHistory.push({ role: "assistant", content: botResponse });
    } catch (error) {
        // Remove the failed user message from history to prevent
        // context divergence and unbounded history growth on errors
        conversationHistory.pop();
 
        // Remove the typing indicator
        typingIndicator.remove();
 
        // Show an error message to the user
        addMessage("Sorry, something went wrong. Please try again.", "bot");
 
        // Log the error for debugging
        console.error("OpenAI API Error:", error);
    } finally {
        // Re-enable the send button and input
        sendBtn.disabled = false;
        inputField.disabled = false;
        inputField.focus();
    }
}
 
// ===================== Display Messages =====================
 
/**
 * Adds a message bubble to the chat window.
 *
 * @param {string} text - The message text to display.
 * @param {string} className - CSS class(es) for styling ("user", "bot", or "bot typing").
 * @returns {HTMLElement} - The created message element (useful for removing typing indicator).
 */
function addMessage(text, className) {
    // Create a new div element for the message
    const messageDiv = document.createElement("div");
 
    // Add the base class and any additional classes (e.g., "user" or "bot typing")
    messageDiv.className = "chat-message " + className;
 
    // Set the text content of the message
    messageDiv.textContent = text;
 
    // Add the message to the messages container
    messagesContainer.appendChild(messageDiv);
 
    // Scroll to the bottom so the latest message is visible
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
 
    // Return the element so we can remove it later (for typing indicator)
    return messageDiv;
}
 
// ===================== OpenAI API Call =====================
 
/**
 * Sends the conversation history to the OpenAI API and returns the response.
 *
 * This function uses the Fetch API to make a POST request to OpenAI's
 * chat completions endpoint. It sends the full conversation history
 * so the AI has context from previous messages.
 *
 * @returns {Promise<string>} - The AI's response text.
 * @throws {Error} - If the API request fails.
 */
async function fetchOpenAIResponse() {
    // Check if the API key has been set
    if (OPENAI_API_KEY === "YOUR_API_KEY_HERE") {
        return "Please set your OpenAI API key in script.js to use this chatbot. See README.md for instructions.";
    }
 
    // Make the API request
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
            model: MODEL,
            messages: conversationHistory,
            max_tokens: 300,
            temperature: 0.7,
        }),
    });
 
    // Check if the response is OK (status 200-299)
    if (!response.ok) {
        const errorData = await response.json().catch(function () {
            return {};
        });
        throw new Error(
            "API request failed: " +
                response.status +
                " " +
                (errorData.error ? errorData.error.message : response.statusText)
        );
    }
 
    // Parse the JSON response
    const data = await response.json();
 
    // Extract and return the assistant's message text
    return data.choices[0].message.content.trim();
}
 
