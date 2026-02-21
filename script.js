/* ==========================================
   THE SAINTS' NOTICE BOARD - JAVASCRIPT
   St. James Seminary Senior High School
   Created by: Kingsley Osei Akoto
   Email: kingsleyoseiakoto482@gmail.com
   © 2026 All Rights Reserved
   ========================================== */

// Data Storage
const announcements = [
    {
        id: 1,
        title: "WASSCE Registration Deadline Extended",
        content: "All final year students are reminded that the WASSCE registration deadline has been extended to March 15th. Please ensure all fees are paid promptly.",
        category: "academic",
        priority: "high",
        date: "2026-02-20",
        author: "Academic Office"
    },
    {
        id: 2,
        title: "Inter-House Sports Competition",
        content: "The annual inter-house sports competition will begin next week. All students are encouraged to participate and support their respective houses.",
        category: "sports",
        priority: "normal",
        date: "2026-02-18",
        author: "Sports Master"
    },
    {
        id: 3,
        title: "Ash Wednesday Service",
        content: "There will be a special Ash Wednesday service tomorrow at the school chapel. All Catholic students are expected to attend.",
        category: "religious",
        priority: "normal",
        date: "2026-02-17",
        author: "Chaplaincy"
    },
    {
        id: 4,
        title: "School Fees Payment Reminder",
        content: "All parents and guardians are reminded that second term school fees must be paid by the end of this month. Boarders: GH₵3,500, Day students: GH₵2,800.",
        category: "general",
        priority: "urgent",
        date: "2026-02-15",
        author: "Accounts Office"
    },
    {
        id: 5,
        title: "NSMQ Preparation Begins",
        content: "Preparation for the National Science and Maths Quiz has officially begun. Interested students should report to the science block after prep.",
        category: "academic",
        priority: "high",
        date: "2026-02-14",
        author: "NSMQ Coordinator"
    }
];

const events = [
    { date: "2026-02-21", title: "House Meeting", type: "general", time: "16:00" },
    { date: "2026-02-23", title: "Inter-House Sports Opening", type: "sports", time: "08:00" },
    { date: "2026-02-25", title: "Career Day", type: "academic", time: "09:00" },
    { date: "2026-02-28", title: "Old Students Visit", type: "general", time: "14:00" },
    { date: "2026-03-05", title: "Mid-Term Exams Begin", type: "academic", time: "07:30" }
];

const houses = [
    {
        name: "St. Kizito",
        patron: "St. Kizito (One of the Martyrs of Uganda)",
        color: "red",
        icon: "🔴",
        students: 245,
        points: 1250,
        achievements: "Sports Champions 2025"
    },
    {
        name: "St. Charles Lwanga",
        patron: "St. Charles Lwanga (Leader of the Martyrs)",
        color: "blue",
        icon: "🔵",
        students: 238,
        points: 1320,
        achievements: "Academic Excellence 2025"
    },
    {
        name: "St. Thomas Aquinas",
        patron: "St. Thomas Aquinas (Theologian & Philosopher)",
        color: "green",
        icon: "🟢",
        students: 241,
        points: 1280,
        achievements: "Debate Champions 2025"
    },
    {
        name: "St. Augustine",
        patron: "St. Augustine (Bishop & Theologian)",
        color: "yellow",
        icon: "🟡",
        students: 236,
        points: 1300,
        achievements: "Cultural Champions 2025"
    }
];

const galleryImages = [
    { src: "https://kimi-web-img.moonshot.cn/img/stjameseminaryshs.edu.gh/939c367d8cc06da4c794ea569356a2e6ac641ef9.jpg", category: "students", caption: "St. James Students" },
    { src: "https://kimi-web-img.moonshot.cn/img/www.graphic.com.gh/268ac7ac866c7ecb3696e90e74930e48496e4a0c.jpg", category: "students", caption: "Classroom Session" },
    { src: "https://kimi-web-img.moonshot.cn/img/static.wixstatic.com/d00086c0f24099dad9a8001aafb604e64e4b2b94.jpg", category: "events", caption: "NSMQ Competition 2025" },
    { src: "https://kimi-web-img.moonshot.cn/img/media.licdn.com/c9ae9850a056d2e38ee1634b96d8618a06a8797a", category: "events", caption: "WASSCE Excellence Awards" },
    { src: "https://kimi-web-img.moonshot.cn/img/www.graphic.com.gh/1f1e5c007a1b5c274d3c0bd93ea2e7a1b74fd9b4.jpg", category: "campus", caption: "School Entrance" },
    { src: "https://kimi-web-img.moonshot.cn/img/stjameseminaryshs.edu.gh/948f3e9b7cb745eea5216ddcfc45534196deae1f.jpg", category: "events", caption: "Admission 2024/25" }
];

// DOM Elements
const loader = document.getElementById('loader');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');
const currentDateEl = document.getElementById('currentDate');
const searchInput = document.getElementById('searchInput');
const notificationBell = document.getElementById('notificationBell');
const modal = document.getElementById('announcementModal');
const newAnnouncementBtn = document.getElementById('newAnnouncementBtn');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const announcementForm = document.getElementById('announcementForm');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Remove loader after page loads
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // Initialize all components
    initNavigation();
    initDate();
    initSearch();
    renderRecentAnnouncements();
    renderUpcomingEvents();
    renderHousePoints();
    renderAnnouncements('all');
    renderHouses();
    initCalendar();
    renderGallery('all');
    initEventListeners();
});

// Navigation Functionality
function initNavigation() {
    // Sidebar toggle for mobile
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });

    // Navigation items click
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
            
            // Update page title
            updatePageTitle(targetSection);
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.add('collapsed');
            }
        });
    });
}

function updatePageTitle(section) {
    const titles = {
        dashboard: 'Dashboard',
        announcements: 'Announcements',
        academics: 'Academic Excellence',
        houses: 'House System',
        calendar: 'School Calendar',
        gallery: 'Photo Gallery',
        contact: 'Contact Us'
    };
    pageTitle.textContent = titles[section] || 'Dashboard';
}

// Date Display
function initDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// Search Functionality
function initSearch() {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        // Search in announcements
        const filtered = announcements.filter(ann => 
            ann.title.toLowerCase().includes(query) || 
            ann.content.toLowerCase().includes(query)
        );
        
        if (query.length > 0) {
            renderAnnouncementsGrid(filtered);
        } else {
            renderAnnouncements('all');
        }
    });
}

// Render Recent Announcements (Dashboard)
function renderRecentAnnouncements() {
    const container = document.getElementById('recentAnnouncements');
    const recent = announcements.slice(0, 3);
    
    container.innerHTML = recent.map(ann => `
        <div class="announcement-item" onclick="viewAnnouncement(${ann.id})">
            <div class="ann-icon ${ann.category}">
                <i class="fas ${getCategoryIcon(ann.category)}"></i>
            </div>
            <div class="ann-content">
                <h4>${ann.title}</h4>
                <p>${ann.content.substring(0, 80)}...</p>
                <div class="ann-meta">
                    <span><i class="far fa-calendar"></i> ${formatDate(ann.date)}</span>
                    <span><i class="far fa-user"></i> ${ann.author}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Upcoming Events (Dashboard)
function renderUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    const upcoming = events.slice(0, 3);
    
    container.innerHTML = upcoming.map(event => {
        const date = new Date(event.date);
        return `
            <div class="event-item">
                <div class="event-date">
                    <span class="day">${date.getDate()}</span>
                    <span class="month">${date.toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div class="event-details">
                    <h4>${event.title}</h4>
                    <p><i class="far fa-clock"></i> ${event.time}</p>
                </div>
            </div>
        `;
    }).join('');
}

// Render House Points (Dashboard)
function renderHousePoints() {
    const container = document.getElementById('housePoints');
    const maxPoints = Math.max(...houses.map(h => h.points));
    
    container.innerHTML = houses.map(house => {
        const percentage = (house.points / maxPoints) * 100;
        return `
            <div class="house-item">
                <div class="house-color ${house.color}"></div>
                <div class="house-info">
                    <h4>${house.name}</h4>
                    <div class="house-progress">
                        <div class="house-progress-bar" style="width: ${percentage}%; background: ${house.color};"></div>
                    </div>
                </div>
                <div class="house-score">${house.points}</div>
            </div>
        `;
    }).join('');
}

// Render All Announcements
function renderAnnouncements(filter) {
    const container = document.getElementById('announcementsGrid');
    let filtered = announcements;
    
    if (filter !== 'all') {
        filtered = announcements.filter(ann => ann.category === filter);
    }
    
    renderAnnouncementsGrid(filtered);
}

function renderAnnouncementsGrid(data) {
    const container = document.getElementById('announcementsGrid');
    
    if (data.length === 0) {
        container.innerHTML = '<p class="no-results">No announcements found.</p>';
        return;
    }
    
    container.innerHTML = data.map(ann => `
        <div class="announcement-card priority-${ann.priority}">
            <div class="ann-card-header">
                <span class="ann-category-badge ${ann.category}">${ann.category}</span>
                ${ann.priority !== 'normal' ? `<span class="ann-priority ${ann.priority}">${ann.priority}</span>` : ''}
            </div>
            <div class="ann-card-body">
                <h3>${ann.title}</h3>
                <p>${ann.content}</p>
            </div>
            <div class="ann-card-footer">
                <span><i class="far fa-calendar"></i> ${formatDate(ann.date)}</span>
                <span><i class="far fa-user"></i> ${ann.author}</span>
            </div>
        </div>
    `).join('');
}

// Render Houses
function renderHouses() {
    const container = document.getElementById('housesGrid');
    
    container.innerHTML = houses.map(house => `
        <div class="house-card ${house.name.toLowerCase().split(' ')[1]}">
            <div class="house-banner">
                <div class="house-icon">${house.icon}</div>
            </div>
            <div class="house-info">
                <h3>${house.name}</h3>
                <p class="patron">${house.patron}</p>
                <div class="house-stats">
                    <div class="house-stat">
                        <h4>${house.students}</h4>
                        <p>Students</p>
                    </div>
                    <div class="house-stat">
                        <h4>${house.points}</h4>
                        <p>Points</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Calendar Functionality
function initCalendar() {
    const date = new Date();
    renderCalendar(date.getFullYear(), date.getMonth());
    
    document.getElementById('prevMonth').addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar(date.getFullYear(), date.getMonth());
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar(date.getFullYear(), date.getMonth());
    });
}

function renderCalendar(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    document.getElementById('calendarMonth').textContent = `${monthNames[month]} ${year}`;
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    // Day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const div = document.createElement('div');
        div.className = 'calendar-day-header';
        div.textContent = day;
        grid.appendChild(div);
    });
    
    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day other-month';
        grid.appendChild(div);
    }
    
    // Days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        div.textContent = i;
        
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            div.classList.add('today');
        }
        
        // Check for events
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        if (events.some(e => e.date === dateStr)) {
            div.classList.add('has-event');
        }
        
        grid.appendChild(div);
    }
    
    renderMonthEvents(month);
}

function renderMonthEvents(month) {
    const container = document.getElementById('monthEvents');
    const monthEvents = events.filter(e => new Date(e.date).getMonth() === month);
    
    container.innerHTML = monthEvents.map(event => `
        <div class="event-item">
            <div class="event-date">
                <span class="day">${new Date(event.date).getDate()}</span>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${event.time}</p>
            </div>
        </div>
    `).join('') || '<p>No events this month.</p>';
}

// Gallery Functionality
function renderGallery(filter) {
    const container = document.getElementById('galleryGrid');
    let filtered = galleryImages;
    
    if (filter !== 'all') {
        filtered = galleryImages.filter(img => img.category === filter);
    }
    
    container.innerHTML = filtered.map((img, index) => `
        <div class="gallery-item" onclick="openLightbox(${index})">
            <img src="${img.src}" alt="${img.caption}" loading="lazy">
            <div class="gallery-overlay">
                <p>${img.caption}</p>
            </div>
        </div>
    `).join('');
}

function openLightbox(index) {
    const img = galleryImages[index];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.caption;
    lightbox.classList.add('active');
}

// Event Listeners
function initEventListeners() {
    // Filter tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderAnnouncements(btn.dataset.filter);
        });
    });
    
    // Gallery filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(btn.dataset.filter);
        });
    });
    
    // Modal controls
    newAnnouncementBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
    
    closeModal.addEventListener('click', closeModalFunc);
    cancelBtn.addEventListener('click', closeModalFunc);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });
    
    // Form submission
    announcementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newAnn = {
            id: announcements.length + 1,
            title: document.getElementById('annTitle').value,
            content: document.getElementById('annContent').value,
            category: document.getElementById('annCategory').value,
            priority: document.getElementById('annPriority').value,
            date: new Date().toISOString().split('T')[0],
            author: "Current User"
        };
        
        announcements.unshift(newAnn);
        renderAnnouncements('all');
        renderRecentAnnouncements();
        closeModalFunc();
        announcementForm.reset();
        
        // Show success notification
        showNotification('Announcement posted successfully!');
    });
    
    // Lightbox close
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // Notification bell
    notificationBell.addEventListener('click', () => {
        showNotification('You have 5 new notifications');
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Message sent successfully! We will get back to you soon.');
        e.target.reset();
    });
}

function closeModalFunc() {
    modal.classList.remove('active');
}

// Helper Functions
function getCategoryIcon(category) {
    const icons = {
        general: 'fa-bullhorn',
        academic: 'fa-graduation-cap',
        sports: 'fa-futbol',
        religious: 'fa-church'
    };
    return icons[category] || 'fa-bullhorn';
}

function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showNotification(message) {
    // Create notification element
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8B4513, #A0522D);
        color: #F5F5DC;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function viewAnnouncement(id) {
    const ann = announcements.find(a => a.id === id);
    if (ann) {
        showNotification(`${ann.title}: ${ann.content.substring(0, 100)}...`);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('collapsed');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        lightbox.classList.remove('active');
    }
});
      
