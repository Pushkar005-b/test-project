/* ================================================================
   NEXUS — College Event Management System  |  app.js
   ----------------------------------------------------------------
   Features:
   • Events stored in a structured array
   • Cards dynamically generated from that array
   • Live countdown timer on each card + in the modal
   • Register button saves data to localStorage
   • Custom confirmation alert (not browser alert())
   • My Registrations side panel
   • Filter, hamburger menu, ESC-to-close
   ================================================================ */

'use strict';

// ──────────────────────────────────────────────
//  1. EVENTS DATA ARRAY
// ──────────────────────────────────────────────
const EVENTS = [
  {
    id: 101,
    title: 'Java Bootcamp 2026',
    icon: '☕',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-02-21T09:00:00',
    displayDate: 'February 21–24, 2026',
    displayTime: '9:00 AM – 1:00 PM',
    venue: 'Computer Lab 1',
    organizer: 'Programming Club',
    fee: '₹250',
    registered: 95,
    capacity: 150,
    featured: false,
    status: 'Completed',
    description: 'Advanced Java programming with frameworks. OOP concepts, design patterns, and Spring Boot. Certificates awarded.',
  },
  {
    id: 102,
    title: 'Memory Chess Tournament',
    icon: '♟️',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #000000, #434343)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-02-20T10:00:00',
    displayDate: 'February 20–21, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Chess Hall',
    organizer: 'Chess Club',
    fee: '₹60',
    registered: 32,
    capacity: 60,
    featured: false,
    status: 'Completed',
    description: 'Speed chess and memory tournament. Interesting formats and exciting matches. Great turnout!',
  },
  {
    id: 103,
    title: 'Product Management Talk',
    icon: '🎯',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-02-19T15:00:00',
    displayDate: 'February 19, 2026',
    displayTime: '3:00 PM – 5:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Tech Club',
    fee: 'Free',
    registered: 180,
    capacity: 250,
    featured: false,
    status: 'Completed',
    description: 'Industry leaders discussed product management career paths and case studies.',
  },
  {
    id: 104,
    title: 'Inter-Class Volleyball Finals',
    icon: '🏐',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #ffd700, #ff6b00)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-02-17T10:00:00',
    displayDate: 'February 15–17, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Club',
    fee: 'Free',
    registered: 85,
    capacity: 150,
    featured: false,
    status: 'Completed',
    description: 'Exciting final matches between top teams. Intense games and amazing performances by all students.',
  },
  {
    id: 105,
    title: 'Digital Illustration Workshop',
    icon: '🎨',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-02-14T14:00:00',
    displayDate: 'February 14–16, 2026',
    displayTime: '2:00 PM – 5:00 PM',
    venue: 'Art Studio',
    organizer: 'Art Club',
    fee: '₹100',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Completed',
    description: 'Learn digital art on Procreate & Adobe Creative Suite. Participated artists created amazing pieces!',
  },
  {
    id: 106,
    title: 'Valentine Comedy Bash',
    icon: '😂',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-02-13T19:00:00',
    displayDate: 'February 13, 2026',
    displayTime: '7:00 PM – 10:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Entertainment Club',
    fee: '₹150',
    registered: 280,
    capacity: 400,
    featured: true,
    status: 'Completed',
    description: 'Hilarious comedy night with professional comedians and student performers. Huge success!',
  },
  {
    id: 107,
    title: 'Leadership Symposium',
    icon: '👔',
    category: 'social',
    badge: 'Social',
    badgeClass: 'badge-social',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-02-12T10:00:00',
    displayDate: 'February 12, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Student Council',
    fee: 'Free',
    registered: 200,
    capacity: 300,
    featured: false,
    status: 'Completed',
    description: 'Campus leaders and alumni discussed leadership, innovation, and career growth.',
  },
  {
    id: 108,
    title: 'Badminton League Finals',
    icon: '🏸',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-02-11T10:00:00',
    displayDate: 'February 8–11, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Indoor Sports Complex',
    organizer: 'Sports Club',
    fee: 'Free',
    registered: 52,
    capacity: 80,
    featured: false,
    status: 'Completed',
    description: 'Thrilling badminton finals. Outstanding matches and fantastic sportsmanship from all players.',
  },
  {
    id: 109,
    title: 'Cloud Architecture Talk',
    icon: '☁️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-02-10T14:00:00',
    displayDate: 'February 10, 2026',
    displayTime: '2:00 PM – 4:00 PM',
    venue: 'Seminar Hall A',
    organizer: 'Cloud Club',
    fee: 'Free',
    registered: 140,
    capacity: 200,
    featured: false,
    status: 'Completed',
    description: 'Senior architects from AWS shared insights on designing scalable cloud systems.',
  },
  {
    id: 110,
    title: 'Drama Competition',
    icon: '🎬',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-02-08T18:00:00',
    displayDate: 'February 8, 2026',
    displayTime: '6:00 PM – 9:00 PM',
    venue: 'Drama Theater',
    organizer: 'Drama Club',
    fee: 'Free',
    registered: 150,
    capacity: 250,
    featured: false,
    status: 'Completed',
    description: 'Amazing dramatic performances by various departments. Awards given for best acts.',
  },
  {
    id: 111,
    title: 'Cyber Security Workshop',
    icon: '🔐',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-02-05T10:00:00',
    displayDate: 'February 5–7, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Computer Lab 3',
    organizer: 'CyberSec Club',
    fee: '₹300',
    registered: 88,
    capacity: 120,
    featured: true,
    status: 'Completed',
    description: 'Hands-on cybersecurity workshop. Ethical hacking basics and penetration testing. Great knowledge transfer!',
  },
  {
    id: 112,
    title: 'Basketball Tournament',
    icon: '🏀',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-02-03T08:00:00',
    displayDate: 'January 30 – February 3, 2026',
    displayTime: '8:00 AM – 6:00 PM',
    venue: 'Basketball Court',
    organizer: 'Sports Club',
    fee: 'Free',
    registered: 95,
    capacity: 150,
    featured: false,
    status: 'Completed',
    description: 'Exciting 5-day basketball tournament with multiple matches. Winners received trophies!',
  },
  {
    id: 113,
    title: 'AI & Machine Learning Summit',
    icon: '🤖',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #2e2e78, #482b48)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-02-01T10:00:00',
    displayDate: 'February 1, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Main Auditorium',
    organizer: 'AI Club',
    fee: '₹200',
    registered: 220,
    capacity: 300,
    featured: true,
    status: 'Completed',
    description: 'Industry experts discussed latest AI trends, deep learning, and real-world applications.',
  },
  {
    id: 114,
    title: 'Foundation Day Celebration',
    icon: '🎉',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ffd700, #ff6b00)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-01-29T17:00:00',
    displayDate: 'January 29, 2026',
    displayTime: '5:00 PM – 10:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Cultural Committee',
    fee: 'Free',
    registered: 500,
    capacity: 600,
    featured: true,
    status: 'Completed',
    description: 'Grand celebration of JISSP foundation. Performances, speeches, and special awards ceremony.',
  },
  {
    id: 115,
    title: 'Portrait Photography Exhibition',
    icon: '📷',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #000000, #434343)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-01-25T10:00:00',
    displayDate: 'January 20–25, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Main Gallery',
    organizer: 'Photography Club',
    fee: 'Free',
    registered: 180,
    capacity: 300,
    featured: false,
    status: 'Completed',
    description: 'Beautiful portrait photography exhibition. Stunning student photography on display.',
  },
  {
    id: 116,
    title: 'Database Optimization Workshop',
    icon: '🗄️',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-01-22T10:00:00',
    displayDate: 'January 20–22, 2026',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Seminar Hall B',
    organizer: 'Tech Club',
    fee: '₹200',
    registered: 75,
    capacity: 120,
    featured: false,
    status: 'Completed',
    description: 'Learn SQL optimization, indexing, and query performance. Expert guidance provided.',
  },
  {
    id: 117,
    title: 'Tennis Tournament',
    icon: '🎾',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-01-18T08:00:00',
    displayDate: 'January 15–18, 2026',
    displayTime: '8:00 AM – 5:00 PM',
    venue: 'Tennis Courts',
    organizer: 'Sports Club',
    fee: '₹100',
    registered: 45,
    capacity: 80,
    featured: false,
    status: 'Completed',
    description: 'Well-organized tennis tournament. Singles and doubles matches. Professional umpiring throughout.',
  },
  {
    id: 118,
    title: 'Web3 & Blockchain Expo',
    icon: '⛓️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-01-15T11:00:00',
    displayDate: 'January 15, 2026',
    displayTime: '11:00 AM – 5:00 PM',
    venue: 'Expo Hall',
    organizer: 'Blockchain Club',
    fee: '₹150',
    registered: 160,
    capacity: 250,
    featured: false,
    status: 'Completed',
    description: 'Comprehensive Web3 and blockchain expo. Startup pitches, tech demos, and networking.',
  },
  {
    id: 119,
    title: 'Winter Fest Grand Finale',
    icon: '❄️',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-01-12T18:00:00',
    displayDate: 'January 12, 2026',
    displayTime: '6:00 PM – 11:00 PM',
    venue: 'Campus Grounds',
    organizer: 'Cultural Committee',
    fee: '₹250',
    registered: 420,
    capacity: 500,
    featured: true,
    status: 'Completed',
    description: 'Grand winter fest finale with music, dance, and amazing performances. Huge turnout!',
  },
  {
    id: 120,
    title: 'Git & GitHub Workshop',
    icon: '🐙',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-01-10T10:00:00',
    displayDate: 'January 10–11, 2026',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Computer Lab 1',
    organizer: 'Dev Club',
    fee: '₹100',
    registered: 110,
    capacity: 150,
    featured: false,
    status: 'Completed',
    description: 'Master Git version control and GitHub collaboration. Practical exercises and real projects.',
  },
  {
    id: 1,
    title: 'JISSP Hackathon 2025',
    icon: '💻',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-09-15T09:00:00',
    displayDate: 'September 15, 2025',
    displayTime: '9:00 AM – 9:00 AM (48 hrs)',
    venue: 'Main Auditorium & Labs',
    organizer: 'CSE Society',
    fee: 'Free',
    registered: 144,
    capacity: 200,
    featured: false,
    status: 'Open',
    description:
      '48-hour hackathon at JISSP open to all branches. Build IoT, web, or AI solutions for real-world challenges. Teams of 2–4 welcome. ₹50K in prizes. Free meals, mentorship, and certificates.',
  },
  {
    id: 2,
    title: 'TechnoFest at JISSP',
    icon: '🎭',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #f953c6, #b91d73)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2025-09-20T17:00:00',
    displayDate: 'September 20, 2025',
    displayTime: '5:00 PM – 11:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Cultural Committee',
    fee: '₹100 / person',
    registered: 450,
    capacity: 500,
    featured: true,
    status: 'Filling Fast',
    description:
      'Annual cultural fest with dance, drama, comedy, and live music. Celebrate JISSP tech culture with design competitions, short film screening, and networking. Book now!',
  },
  {
    id: 3,
    title: 'IoT & Embedded Systems Workshop',
    icon: '📡',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #11998e, #38ef7d)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2025-09-22T10:00:00',
    displayDate: 'September 22–24, 2025',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Seminar Hall B',
    organizer: 'ECE Club',
    fee: '₹250 (kit included)',
    registered: 55,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Hands-on 3-day workshop on Arduino, Raspberry Pi, and smart devices. Industry mentors from top companies guide projects. Certificate of completion for all participants.',
  },
  {
    id: 4,
    title: 'JISSP Sports Championship',
    icon: '⚽',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2025-09-25T07:00:00',
    displayDate: 'September 25–26, 2025',
    displayTime: '7:00 AM – 6:00 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Board',
    fee: '₹50 / person',
    registered: 80,
    capacity: 200,
    featured: false,
    status: 'Open',
    description:
      '2-day inter-departmental sports meet: football, badminton, chess, and athletics. All years welcome. Top 3 teams win trophies and certificates. Register your squad today!',
  },
  {
    id: 5,
    title: 'Campus Green Drive',
    icon: '🌿',
    category: 'social',
    badge: 'Social',
    badgeClass: 'badge-social',
    bg: 'linear-gradient(135deg, #4776e6, #8e54e9)',
    image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop',
    datetime: '2025-10-01T08:00:00',
    displayDate: 'October 1, 2025',
    displayTime: '8:00 AM – 12:00 PM',
    venue: 'Campus Grounds',
    organizer: 'Eco Club',
    fee: 'Free',
    registered: 30,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Tree plantation & campus cleanup event. Earn volunteer credits and make a real environmental impact. Breakfast and participation certificates provided to all volunteers.',
  },
  {
    id: 6,
    title: 'CyberSec CTF',
    icon: '🔐',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    image: 'https://images.unsplash.com/photo-1550439062-7a3fb3ce53de?w=500&h=300&fit=crop',
    datetime: '2025-10-05T14:00:00',
    displayDate: 'October 5, 2025',
    displayTime: '2:00 PM – 10:00 PM',
    venue: 'Computer Lab 3 & Online',
    organizer: 'CyberSec Club',
    fee: 'Free',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Capture The Flag cybersecurity challenge. Solve puzzles across cryptography, forensics, web exploitation, and binary exploitation. Solo or team of 2. Winner gets ₹15,000.',
  },
  {
    id: 7,
    title: 'Web Development Bootcamp',
    icon: '🌐',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-10-08T09:00:00',
    displayDate: 'October 8–15, 2025',
    displayTime: '9:00 AM – 1:00 PM',
    venue: 'Computer Lab 1',
    organizer: 'Web Development Club',
    fee: '₹300',
    registered: 75,
    capacity: 120,
    featured: true,
    status: 'Open',
    description:
      'Learn HTML, CSS, JavaScript, and React from industry experts. Build responsive websites and web applications. Lifetime access to course materials included.',
  },
  {
    id: 8,
    title: 'Data Science Symposium',
    icon: '📊',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #2e2e78, #482b48)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2025-10-12T10:00:00',
    displayDate: 'October 12, 2025',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Data Science Club',
    fee: '₹150',
    registered: 120,
    capacity: 200,
    featured: false,
    status: 'Open',
    description:
      'Industry experts share insights on ML, AI, and data analytics. Live demonstrations and Q&A session. Get insights into career opportunities in data science.',
  },
  {
    id: 9,
    title: 'Annual Talent Show',
    icon: '⭐',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ffd700, #ff6b00)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2025-10-18T18:00:00',
    displayDate: 'October 18, 2025',
    displayTime: '6:00 PM – 10:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Cultural Committee',
    fee: 'Free',
    registered: 200,
    capacity: 300,
    featured: true,
    status: 'Open',
    description:
      'Showcase your talent! Singing, dancing, comedy, and more. Open for all students. Winners receive prize money and certificates. Limited stage slots available.',
  },
  {
    id: 10,
    title: 'Badminton Tournament',
    icon: '🏸',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2025-10-22T08:00:00',
    displayDate: 'October 22–25, 2025',
    displayTime: '8:00 AM – 5:00 PM',
    venue: 'Indoor Sports Complex',
    organizer: 'Sports Club',
    fee: '₹100 per team',
    registered: 45,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'Inter-class badminton tournament. Singles and doubles categories. Register your team or participate individually. Prizes for top 3 finalists.',
  },
  {
    id: 11,
    title: 'Mobile App Development Workshop',
    icon: '📱',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-10-25T10:00:00',
    displayDate: 'October 25–27, 2025',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Seminar Hall C',
    organizer: 'Android Dev Club',
    fee: '₹200',
    registered: 65,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Develop Android and iOS apps from scratch. Learn Flutter and React Native. Build your first app during this 3-day workshop.',
  },
  {
    id: 12,
    title: 'Music Festival Night',
    icon: '🎵',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2025-11-01T19:00:00',
    displayDate: 'November 1, 2025',
    displayTime: '7:00 PM – 11:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Music Club',
    fee: '₹200',
    registered: 350,
    capacity: 400,
    featured: true,
    status: 'Filling Fast',
    description:
      'Live music performances by college bands and local artists. DJ night and dance floor. Get your tickets early for this amazing event!',
  },
  {
    id: 13,
    title: 'Coding Marathon',
    icon: '⌨️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-11-05T08:00:00',
    displayDate: 'November 5, 2025',
    displayTime: '8:00 AM – 6:00 PM',
    venue: 'Computer Labs',
    organizer: 'Programming Club',
    fee: 'Free',
    registered: 90,
    capacity: 150,
    featured: false,
    status: 'Open',
    description:
      '10-hour coding competition. Solve algorithmic challenges. Individual or team of 2. ₹10K prize pool. Lunch and snacks provided.',
  },
  {
    id: 14,
    title: 'Cricket League',
    icon: '🏏',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #007c41, #003d1f)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2025-11-08T09:00:00',
    displayDate: 'November 8–20, 2025',
    displayTime: '9:00 AM – 6:00 PM',
    venue: 'Cricket Ground',
    organizer: 'Sports Club',
    fee: '₹150 per team',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Inter-department T20 cricket league. Round-robin tournament format. Prizes for winning team and best player. Register your team now!',
  },
  {
    id: 15,
    title: 'Cloud Computing Workshop',
    icon: '☁️',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2025-11-12T10:00:00',
    displayDate: 'November 12–14, 2025',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Seminar Hall A',
    organizer: 'Cloud Computing Club',
    fee: '₹250',
    registered: 55,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Learn AWS, Azure, and Google Cloud. Deploy applications on cloud. Get AWS free tier account setup and basics covered.',
  },
  {
    id: 16,
    title: 'Art & Design Exhibition',
    icon: '🎨',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2025-11-15T11:00:00',
    displayDate: 'November 15–20, 2025',
    displayTime: '11:00 AM – 6:00 PM',
    venue: 'Art Gallery, Main Building',
    organizer: 'Art Club',
    fee: 'Free',
    registered: 150,
    capacity: 300,
    featured: false,
    status: 'Open',
    description:
      'Showcase of digital art, paintings, and design projects. Open gallery with student artwork. Voting for best artwork. Refreshments available.',
  },
  {
    id: 17,
    title: 'Debate Championship',
    icon: '🎤',
    category: 'social',
    badge: 'Social',
    badgeClass: 'badge-social',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-11-22T10:00:00',
    displayDate: 'November 22–23, 2025',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Debate Club',
    fee: '₹100 per team',
    registered: 40,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'Inter-college debate competition. Various topics. Teams of 2. Judges from media and academia. Cash prizes for winners.',
  },
  {
    id: 18,
    title: 'Machine Learning Bootcamp',
    icon: '🤖',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #2e2e78, #482b48)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2025-11-25T09:00:00',
    displayDate: 'November 25 - December 5, 2025',
    displayTime: '9:00 AM – 2:00 PM',
    venue: 'Computer Lab 2',
    organizer: 'AI Club',
    fee: '₹400',
    registered: 85,
    capacity: 120,
    featured: true,
    status: 'Filling Fast',
    description:
      'Complete ML journey: basics, supervised learning, unsupervised learning, and deep learning. Real datasets and projects included.',
  },
  {
    id: 19,
    title: 'Football Championship',
    icon: '⚽',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2025-12-01T08:00:00',
    displayDate: 'December 1–10, 2025',
    displayTime: '8:00 AM – 5:00 PM',
    venue: 'Football Ground',
    organizer: 'Sports Club',
    fee: '₹200 per team',
    registered: 75,
    capacity: 150,
    featured: false,
    status: 'Open',
    description:
      'Grand football championship. 11-a-side matches. Inter-department teams. Prizes for top 3 teams. Scout by professional teams.',
  },
  {
    id: 20,
    title: 'Cybersecurity Workshop',
    icon: '🛡️',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-12-05T10:00:00',
    displayDate: 'December 5–7, 2025',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Seminar Hall B',
    organizer: 'CyberSec Club',
    fee: '₹300',
    registered: 70,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Network security, ethical hacking, and penetration testing basics. Hands-on labs with Kali Linux. Certification exam included.',
  },
  {
    id: 21,
    title: 'Dance Workshop',
    icon: '💃',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2025-12-08T16:00:00',
    displayDate: 'December 8–12, 2025',
    displayTime: '4:00 PM – 6:00 PM',
    venue: 'Dance Studio',
    organizer: 'Dance Club',
    fee: '₹150',
    registered: 80,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Learn contemporary, hip-hop, and ballroom dancing. Professional choreographer. No prior experience needed. Certificate of participation.',
  },
  {
    id: 22,
    title: 'Hackathon 2.0',
    icon: '💻',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2025-12-15T09:00:00',
    displayDate: 'December 15–16, 2025',
    displayTime: '9:00 AM – 9:00 AM (24 hrs)',
    venue: 'Main Auditorium & Labs',
    organizer: 'CSE Society',
    fee: 'Free',
    registered: 110,
    capacity: 180,
    featured: true,
    status: 'Open',
    description:
      '24-hour hackathon. Innovation in IoT, Web, or Mobile. 48-member team limit. ₹30K prize pool. Free meals and expert mentors.',
  },
  {
    id: 23,
    title: 'Chess Tournament',
    icon: '♟️',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #000000, #434343)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2025-12-18T10:00:00',
    displayDate: 'December 18–20, 2025',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Chess Club Hall',
    organizer: 'Chess Club',
    fee: '₹75',
    registered: 35,
    capacity: 60,
    featured: false,
    status: 'Open',
    description:
      'Round-robin chess tournament. All skill levels welcome. Prizes for top 3. Tournament format with rapid games. Rating certification.',
  },
  {
    id: 24,
    title: 'Python Masterclass',
    icon: '🐍',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2025-12-22T09:00:00',
    displayDate: 'December 22–26, 2025',
    displayTime: '9:00 AM – 1:00 PM',
    venue: 'Computer Lab 1',
    organizer: 'Programming Club',
    fee: '₹250',
    registered: 95,
    capacity: 150,
    featured: false,
    status: 'Open',
    description:
      'Advanced Python: OOP, decorators, async programming, and web frameworks. Build real projects. Industry-standard practices.',
  },
  {
    id: 25,
    title: 'Annual Fest Grand Finale',
    icon: '🎆',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2025-12-28T18:00:00',
    displayDate: 'December 28, 2025',
    displayTime: '6:00 PM – 12:00 AM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Cultural Committee',
    fee: '₹300',
    registered: 500,
    capacity: 600,
    featured: true,
    status: 'Filling Fast',
    description:
      'Grand finale with celebrities, live bands, and amazing performances. Fireworks and special surprises. Year-end celebration for all students.',
  },
  {
    id: 26,
    title: 'Volleyball Championship',
    icon: '🏐',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #ffd700, #ff6b00)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-01-05T10:00:00',
    displayDate: 'January 5–12, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Club',
    fee: '₹100 per team',
    registered: 50,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Inter-class volleyball championship. Teams of 6. Best-of-3 sets. Trophies for top 3 teams. Participation certificates.',
  },
  {
    id: 27,
    title: 'Blockchain & Crypto Workshop',
    icon: '⛓️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-01-10T10:00:00',
    displayDate: 'January 10–12, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Seminar Hall C',
    organizer: 'Tech Club',
    fee: '₹350',
    registered: 65,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Master blockchain technology, smart contracts, and cryptocurrency. Build DApps. Industry experts mentoring.',
  },
  {
    id: 28,
    title: 'Quizzing Championship',
    icon: '❓',
    category: 'social',
    badge: 'Social',
    badgeClass: 'badge-social',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-01-15T14:00:00',
    displayDate: 'January 15, 2026',
    displayTime: '2:00 PM – 6:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Quiz Club',
    fee: '₹150 per team',
    registered: 45,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'General knowledge and technical quizzing. Teams of 2. Multiple rounds. Cash prizes and certificates. Fun-filled competition!',
  },
  {
    id: 29,
    title: 'UI/UX Design Workshop',
    icon: '🎯',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-01-20T10:00:00',
    displayDate: 'January 20–23, 2026',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Design Lab',
    organizer: 'Design Club',
    fee: '₹250',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Learn UI/UX principles and design tools (Figma, Adobe XD). Create prototypes. Industry-standard workflow and best practices.',
  },
  {
    id: 30,
    title: 'Photography Exhibition',
    icon: '📷',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #000000, #434343)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-01-25T10:00:00',
    displayDate: 'January 25–31, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Main Building Gallery',
    organizer: 'Photography Club',
    fee: 'Free',
    registered: 180,
    capacity: 300,
    featured: false,
    status: 'Open',
    description:
      'Stunning photography showcase from student photographers. Various categories: nature, portrait, candid. Voting and awards.',
  },
  {
    id: 31,
    title: 'Tennis Tournament',
    icon: '🎾',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-02-01T08:00:00',
    displayDate: 'February 1–8, 2026',
    displayTime: '8:00 AM – 6:00 PM',
    venue: 'Tennis Courts',
    organizer: 'Sports Club',
    fee: '₹120',
    registered: 40,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'Singles and doubles tennis tournament. All age groups. Round-robin and knockout. Prizes for champions. Professional umpiring.',
  },
  {
    id: 32,
    title: 'DevOps Masterclass',
    icon: '⚙️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-02-05T09:00:00',
    displayDate: 'February 5–12, 2026',
    displayTime: '9:00 AM – 2:00 PM',
    venue: 'Computer Lab 3',
    organizer: 'DevOps Club',
    fee: '₹400',
    registered: 75,
    capacity: 120,
    featured: true,
    status: 'Open',
    description:
      'Docker, Kubernetes, CI/CD pipelines. Git workflows. Infrastructure as code. Deploy real applications on cloud platforms.',
  },
  {
    id: 33,
    title: 'Fashion Show',
    icon: '👗',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-02-10T18:00:00',
    displayDate: 'February 10, 2026',
    displayTime: '6:00 PM – 9:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Fashion Club',
    fee: '₹250',
    registered: 300,
    capacity: 400,
    featured: true,
    status: 'Filling Fast',
    description:
      'Stunning fashion showcase. Traditional, contemporary, and fusion wear. Student designers. Prizes for best models and designers.',
  },
  {
    id: 34,
    title: 'Gymnastics Competition',
    icon: '🤸',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-02-15T10:00:00',
    displayDate: 'February 15–17, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Sports Complex',
    organizer: 'Sports Club',
    fee: '₹100',
    registered: 50,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Gymnastics showcase and competition. Artistic and rhythmic categories. All skill levels. Professional judges. Safety equipment provided.',
  },
  {
    id: 35,
    title: 'Game Development Workshop',
    icon: '🎮',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-02-20T10:00:00',
    displayDate: 'February 20–25, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Game Dev Lab',
    organizer: 'Game Dev Club',
    fee: '₹300',
    registered: 70,
    capacity: 120,
    featured: false,
    status: 'Open',
    description:
      'Learn Unity and Unreal Engine. Create 2D and 3D games. Asset creation and physics. Publish your game on app stores.',
  },
  {
    id: 36,
    title: 'Poetry & Literature Festival',
    icon: '📚',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-02-25T17:00:00',
    displayDate: 'February 25, 2026',
    displayTime: '5:00 PM – 9:00 PM',
    venue: 'Main Auditorium',
    organizer: 'Literary Club',
    fee: 'Free',
    registered: 120,
    capacity: 250,
    featured: false,
    status: 'Open',
    description:
      'Poetry reading, short stories, and literary discussions. Prizes for best performers. Open mic session for students. Light refreshments.',
  },
  {
    id: 37,
    title: 'Web Scraping Workshop',
    icon: '🕷️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-03-01T10:00:00',
    displayDate: 'March 1–3, 2026',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Computer Lab 1',
    organizer: 'Tech Club',
    fee: '₹150',
    registered: 55,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Learn web scraping with BeautifulSoup and Selenium. Data extraction from websites. Real-world projects and datasets.',
  },
  {
    id: 38,
    title: 'Throwball Championship',
    icon: '⚪',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-03-05T09:00:00',
    displayDate: 'March 5–12, 2026',
    displayTime: '9:00 AM – 5:00 PM',
    venue: 'Sports Ground',
    organizer: 'Sports Club',
    fee: '₹80 per team',
    registered: 45,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Throwball tournament for all. Teams of 7. Matches on outdoor grounds. Trophies and certificates. Free uniforms provided.',
  },
  {
    id: 39,
    title: 'Database Design Bootcamp',
    icon: '🗄️',
    category: 'workshop',
    badge: 'Workshop',
    badgeClass: 'badge-workshop',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-03-10T09:00:00',
    displayDate: 'March 10–15, 2026',
    displayTime: '9:00 AM – 1:00 PM',
    venue: 'Seminar Hall B',
    organizer: 'Tech Club',
    fee: '₹200',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'SQL, NoSQL databases, normalization, and optimization. Design scalable databases. Real-world case studies. Practice on live systems.',
  },
  {
    id: 40,
    title: 'Drama & Theater Workshop',
    icon: '🎬',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-03-15T15:00:00',
    displayDate: 'March 15–20, 2026',
    displayTime: '3:00 PM – 6:00 PM',
    venue: 'Drama Theater',
    organizer: 'Drama Club',
    fee: '₹100',
    registered: 65,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Acting techniques and stage performance. Character development workshops. Final performance opportunity. Professional feedback.',
  },
  {
    id: 41,
    title: 'Basketball League',
    icon: '🏀',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-03-20T08:00:00',
    displayDate: 'March 20–31, 2026',
    displayTime: '8:00 AM – 6:00 PM',
    venue: 'Basketball Court',
    organizer: 'Sports Club',
    fee: '₹250 per team',
    registered: 70,
    capacity: 150,
    featured: false,
    status: 'Open',
    description:
      'Inter-department basketball league. 5-on-5 format. Round-robin and playoffs. Prizes for top 3. Professional coaching available.',
  },
  {
    id: 42,
    title: 'API Development Workshop',
    icon: '🔌',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-03-25T10:00:00',
    displayDate: 'March 25–28, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Computer Lab 2',
    organizer: 'Web Dev Club',
    fee: '₹200',
    registered: 65,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Build RESTful APIs with Node.js, Flask, and Django. API testing and documentation. Version control and deployment.',
  },
  {
    id: 43,
    title: 'Anime & Manga Convention',
    icon: '🎌',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-04-01T11:00:00',
    displayDate: 'April 1–3, 2026',
    displayTime: '11:00 AM – 8:00 PM',
    venue: 'Convention Hall',
    organizer: 'Anime Club',
    fee: '₹150',
    registered: 250,
    capacity: 400,
    featured: true,
    status: 'Filling Fast',
    description:
      'Anime screenings, cosplay contests, merchandise stalls, and gaming zones. Prizes for best cosplay. Food and beverages available.',
  },
  {
    id: 44,
    title: 'Swimmers Meet',
    icon: '🏊',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-04-05T10:00:00',
    displayDate: 'April 5–6, 2026',
    displayTime: '10:00 AM – 4:00 PM',
    venue: 'Swimming Pool',
    organizer: 'Sports Club',
    fee: 'Free',
    registered: 40,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'Swimming competition: freestyle, backstroke, butterfly, and relay races. Professional lifeguards on duty. Medals and certificates.',
  },
  {
    id: 45,
    title: 'Quantum Computing Workshop',
    icon: '⚛️',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-04-10T10:00:00',
    displayDate: 'April 10–12, 2026',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Seminar Hall A',
    organizer: 'Physics & Tech Club',
    fee: '₹300',
    registered: 50,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Introduction to quantum computing with IBM Qiskit. Quantum gates and circuits. Real quantum computers access. Research opportunities.',
  },
  {
    id: 46,
    title: 'Short Film Festival',
    icon: '🎞️',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #000000, #434343)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-04-15T18:00:00',
    displayDate: 'April 15–17, 2026',
    displayTime: '6:00 PM – 9:00 PM',
    venue: 'Auditorium',
    organizer: 'Film Club',
    fee: '₹200',
    registered: 200,
    capacity: 300,
    featured: false,
    status: 'Open',
    description:
      'Showcase of student-made short films. Various genres and themes. Prizes for best film, director, and acting. Professional judges.',
  },
  {
    id: 47,
    title: 'Table Tennis Championship',
    icon: '🏓',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #ffd700, #ff6b00)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-04-20T10:00:00',
    displayDate: 'April 20–24, 2026',
    displayTime: '10:00 AM – 5:00 PM',
    venue: 'Sports Club',
    organizer: 'Sports Club',
    fee: '₹90',
    registered: 45,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'Singles and doubles table tennis matches. Seeded tournament. Professional umpires. Cash prizes for top players. Trophies.',
  },
  {
    id: 48,
    title: 'Augmented Reality Workshop',
    icon: '📱',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-04-25T09:00:00',
    displayDate: 'April 25–27, 2026',
    displayTime: '9:00 AM – 2:00 PM',
    venue: 'Computer Lab 3',
    organizer: 'Tech Club',
    fee: '₹250',
    registered: 60,
    capacity: 100,
    featured: false,
    status: 'Open',
    description:
      'Create AR experiences with ARKit and ARCore. Unity and Unreal integration. Real-world AR apps. Social media AR filters.',
  },
  {
    id: 49,
    title: 'Comedy Night & Stand-up',
    icon: '😂',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff006e, #8338ec)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-05-01T19:00:00',
    displayDate: 'May 1, 2026',
    displayTime: '7:00 PM – 11:00 PM',
    venue: 'Open-Air Amphitheater',
    organizer: 'Entertainment Club',
    fee: '₹200',
    registered: 350,
    capacity: 500,
    featured: true,
    status: 'Filling Fast',
    description:
      'Comedy night with professional comedians. Open mic for students. Hilarious performances and surprises. Unlimited refreshments.',
  },
  {
    id: 50,
    title: 'Marathon - Move for Health',
    icon: '🏃',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-05-05T06:00:00',
    displayDate: 'May 5, 2026',
    displayTime: '6:00 AM – 10:00 AM',
    venue: 'Campus & Surrounding Roads',
    organizer: 'Sports & Health Club',
    fee: '₹50',
    registered: 200,
    capacity: 300,
    featured: false,
    status: 'Open',
    description:
      '10km and 5km marathon options. All ages and fitness levels welcome. Medical support and hydration stations. Medals and certificates.',
  },
  {
    id: 51,
    title: 'Spring Fest Grand Opening',
    icon: '🌸',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #ff6b6b, #ff8c42)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-05-10T10:00:00',
    displayDate: 'May 10, 2026',
    displayTime: '10:00 AM – 6:00 PM',
    venue: 'Campus Grounds',
    organizer: 'Cultural Committee',
    fee: 'Free',
    registered: 600,
    capacity: 800,
    featured: true,
    status: 'Open',
    description:
      'Spring festival opening with food, games, performances, and competitions. Family-friendly activities. Beautiful decorations and ambiance.',
  },
  {
    id: 52,
    title: 'Digital Marketing Masterclass',
    icon: '📈',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #667eea, #764ba2)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    datetime: '2026-05-15T10:00:00',
    displayDate: 'May 15–18, 2026',
    displayTime: '10:00 AM – 3:00 PM',
    venue: 'Seminar Hall C',
    organizer: 'Marketing Club',
    fee: '₹200',
    registered: 70,
    capacity: 120,
    featured: false,
    status: 'Open',
    description:
      'SEO, SEM, social media marketing, and content strategy. Email marketing and analytics. Hands-on projects and case studies.',
  },
  {
    id: 53,
    title: 'Hand Drum Workshop',
    icon: '🥁',
    category: 'cultural',
    badge: 'Cultural',
    badgeClass: 'badge-cultural',
    bg: 'linear-gradient(135deg, #f7971e, #ffd200)',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop',
    datetime: '2026-05-20T16:00:00',
    displayDate: 'May 20–23, 2026',
    displayTime: '4:00 PM – 6:00 PM',
    venue: 'Music Room',
    organizer: 'Music Club',
    fee: '₹150',
    registered: 55,
    capacity: 80,
    featured: false,
    status: 'Open',
    description:
      'Learn various hand drums: tabla, djembe, and more. Rhythm training and basics. Join the college band after training.',
  },
  {
    id: 54,
    title: 'Archery Competition',
    icon: '🏹',
    category: 'sports',
    badge: 'Sports',
    badgeClass: 'badge-sports',
    bg: 'linear-gradient(135deg, #00c6ff, #0072ff)',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop',
    datetime: '2026-05-25T09:00:00',
    displayDate: 'May 25–27, 2026',
    displayTime: '9:00 AM – 5:00 PM',
    venue: 'Archery Range',
    organizer: 'Sports Club',
    fee: '₹80',
    registered: 35,
    capacity: 60,
    featured: false,
    status: 'Open',
    description:
      'Olympic-style archery competition. Professional coaching and safety training. All equipment provided. Medals and trophies.',
  },
  {
    id: 55,
    title: 'Virtual Reality Showcase',
    icon: '🥽',
    category: 'tech',
    badge: 'Tech',
    badgeClass: 'badge-tech',
    bg: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
    datetime: '2026-06-01T15:00:00',
    displayDate: 'June 1–3, 2026',
    displayTime: '3:00 PM – 7:00 PM',
    venue: 'Innovation Lab',
    organizer: 'Tech Club',
    fee: '₹100',
    registered: 150,
    capacity: 300,
    featured: false,
    status: 'Open',
    description:
      'Experience cutting-edge VR technology. Games, simulations, and education apps. Latest VR headsets available. Demo sessions.',
  },
];


// ──────────────────────────────────────────────
//  2. LOCALSTORAGE HELPERS
// ──────────────────────────────────────────────
const LS_KEY = 'jissp_registrations';

function getRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRegistration(event) {
  const regs = getRegistrations();
  if (regs.find((r) => r.id === event.id)) return false; // already registered
  regs.push({
    id: event.id,
    title: event.title,
    icon: event.icon,
    displayDate: event.displayDate,
    displayTime: event.displayTime,
    venue: event.venue,
    registeredAt: new Date().toISOString(),
  });
  localStorage.setItem(LS_KEY, JSON.stringify(regs));
  return true;
}

function removeRegistration(id) {
  const regs = getRegistrations().filter((r) => r.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(regs));
}

function isRegistered(id) {
  return getRegistrations().some((r) => r.id === id);
}

// ──────────────────────────────────────────────
//  3. COUNTDOWN HELPERS
// ──────────────────────────────────────────────
function getTimeLeft(datetimeStr) {
  const target = new Date(datetimeStr).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return null; // event has passed / started
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

// ──────────────────────────────────────────────
//  3A. EVENT FILTERING HELPERS
// ──────────────────────────────────────────────
function getFutureEvents() {
  const now = new Date();
  return EVENTS.filter(ev => new Date(ev.datetime) > now).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
}

function getPastEvents() {
  const now = new Date();
  return EVENTS.filter(ev => new Date(ev.datetime) <= now).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
}

// ──────────────────────────────────────────────
//  4. CARD GENERATION
// ──────────────────────────────────────────────
function buildCard(ev, isPastEvent = false) {
  const pct = Math.round((ev.registered / ev.capacity) * 100);
  const registered = isRegistered(ev.id);

  const article = document.createElement('article');
  article.className = 'event-card' + (ev.featured ? ' featured' : '') + (isPastEvent ? ' past-event' : '');
  article.dataset.category = ev.category;
  article.dataset.id = ev.id;

  // Build background style with image if available
  let bgStyle = `background: ${ev.bg};`;
  if (ev.image) {
    bgStyle = `background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${ev.image}'); background-size: cover; background-position: center;`;
  }

  const countdownHtml = isPastEvent ? `<div class="card-countdown"><span class="cd-label cd-live">✓ Event Completed</span></div>` : `
    <div class="card-countdown" id="countdown-${ev.id}">
      <span class="cd-label">Starts in</span>
      <div class="cd-blocks">
        <span class="cd-unit"><b id="cd-d-${ev.id}">--</b><small>d</small></span>
        <span class="cd-colon">:</span>
        <span class="cd-unit"><b id="cd-h-${ev.id}">--</b><small>h</small></span>
        <span class="cd-colon">:</span>
        <span class="cd-unit"><b id="cd-m-${ev.id}">--</b><small>m</small></span>
        <span class="cd-colon">:</span>
        <span class="cd-unit"><b id="cd-s-${ev.id}">--</b><small>s</small></span>
      </div>
    </div>
  `;

  article.innerHTML = `
    ${ev.featured ? '<div class="featured-label">⭐ Featured</div>' : ''}
    ${isPastEvent ? '<div class="past-badge">Past Event</div>' : ''}
    <div class="card-badge ${ev.badgeClass}">${ev.badge}</div>
    <div class="card-image" style="${bgStyle}">
      <span class="card-icon">${ev.icon}</span>
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="card-date">📅 ${ev.displayDate}</span>
      </div>
      <h3 class="card-title">${ev.title}</h3>
      <p class="card-desc">${ev.description}</p>

      <!-- Countdown Timer -->
      ${countdownHtml}

      <div class="card-footer">
        <div class="card-spots">
          <span class="spots-bar"><span style="width:${pct}%"></span></span>
          <span class="spots-text">${ev.registered}/${ev.capacity} attendees</span>
        </div>
        <button class="btn-register ${registered ? 'registered' : ''}"
                data-id="${ev.id}">
          ${isPastEvent ? '📸 View Details' : (registered ? '✓ Registered' : 'Register')}
        </button>
      </div>
    </div>
  `;

  // Register button click → open modal
  article.querySelector('.btn-register').addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(ev.id);
  });

  return article;
}

function renderCards(filterCategory = 'all') {
  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = '';
  
  let futureFiltered = getFutureEvents();
  if (filterCategory !== 'all') {
    futureFiltered = futureFiltered.filter((ev) => ev.category === filterCategory);
  }

  futureFiltered.forEach((ev, i) => {
    const card = buildCard(ev, false);
    card.style.animationDelay = `${i * 0.07}s`;
    grid.appendChild(card);
  });

  const countText = futureFiltered.length === 1 ? 'event' : 'events';
  document.getElementById('eventCount').textContent = futureFiltered.length + ' ' + countText;
}

function renderPastEvents() {
  const pastGrid = document.getElementById('pastEventsGrid');
  if (!pastGrid) return; // Section might not exist
  
  pastGrid.innerHTML = '';
  const pastEvents = getPastEvents().slice(0, 12); // Show last 12 past events
  
  if (pastEvents.length === 0) {
    pastGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">No past events yet</div>';
    return;
  }

  pastEvents.forEach((ev, i) => {
    const card = buildCard(ev, true);
    card.style.animationDelay = `${i * 0.07}s`;
    pastGrid.appendChild(card);
  });
}

// ──────────────────────────────────────────────
//  5. COUNTDOWN TICK  (runs every second)
// ──────────────────────────────────────────────
let countdownInterval = null;

function tickAllCountdowns() {
  getFutureEvents().forEach((ev) => {
    const dEl = document.getElementById(`cd-d-${ev.id}`);
    if (!dEl) return; // card not rendered (filtered out)
    const tl = getTimeLeft(ev.datetime);
    if (!tl) {
      document.getElementById(`countdown-${ev.id}`).innerHTML =
        '<span class="cd-label cd-live">🔴 Live / Ended</span>';
      return;
    }
    dEl.textContent = pad(tl.d);
    document.getElementById(`cd-h-${ev.id}`).textContent = pad(tl.h);
    document.getElementById(`cd-m-${ev.id}`).textContent = pad(tl.m);
    document.getElementById(`cd-s-${ev.id}`).textContent = pad(tl.s);
  });
}

function startCountdowns() {
  tickAllCountdowns();
  clearInterval(countdownInterval);
  countdownInterval = setInterval(tickAllCountdowns, 1000);
}

// ──────────────────────────────────────────────
//  6. MODAL
// ──────────────────────────────────────────────
let activeModalEventId = null;
let modalCountdownInterval = null;

function openModal(id) {
  const ev = EVENTS.find((e) => e.id === id);
  if (!ev) return;
  activeModalEventId = id;

  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalImage').style.background = ev.bg;
  document.getElementById('modalIcon').textContent = ev.icon;
  document.getElementById('modalBadge').textContent = ev.badge;
  document.getElementById('modalBadge').className = 'modal-badge ' + ev.badgeClass;
  document.getElementById('modalStatus').textContent = ev.status;
  document.getElementById('modalStatus').className =
    'modal-status ' + (ev.status === 'Open' ? 'status-open' : 'status-filling');
  document.getElementById('modalTitle').textContent = ev.title;
  document.getElementById('modalDesc').textContent = ev.description;
  document.getElementById('modalDate').textContent = ev.displayDate;
  document.getElementById('modalTime').textContent = ev.displayTime;
  document.getElementById('modalVenue').textContent = ev.venue;
  document.getElementById('modalOrg').textContent = ev.organizer;
  document.getElementById('modalFee').textContent = ev.fee;

  const pct = Math.round((ev.registered / ev.capacity) * 100);
  document.getElementById('modalSpotsText').textContent =
    `${ev.registered} / ${ev.capacity} registered (${pct}%)`;
  document.getElementById('modalSpotsBar').style.width = pct + '%';

  // Register button state
  const regBtn = document.getElementById('modalRegisterBtn');
  const already = isRegistered(id);
  regBtn.textContent = already ? '✓ Already Registered' : 'Register Now →';
  regBtn.classList.toggle('already-registered', already);

  // Modal countdown
  tickModalCountdown(ev.datetime);
  clearInterval(modalCountdownInterval);
  modalCountdownInterval = setInterval(() => tickModalCountdown(ev.datetime), 1000);

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function tickModalCountdown(datetimeStr) {
  const tl = getTimeLeft(datetimeStr);
  const cd = document.getElementById('modalCountdown');
  if (!tl) {
    cd.innerHTML = '<span class="mcd-live">🔴 This event is live or has ended</span>';
    return;
  }
  document.getElementById('mcdD').textContent = pad(tl.d);
  document.getElementById('mcdH').textContent = pad(tl.h);
  document.getElementById('mcdM').textContent = pad(tl.m);
  document.getElementById('mcdS').textContent = pad(tl.s);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(modalCountdownInterval);
  activeModalEventId = null;
}

// ──────────────────────────────────────────────
//  7. CONFIRMATION ALERT
// ──────────────────────────────────────────────
let pendingRegistrationId = null;

function showConfirmation(ev) {
  pendingRegistrationId = ev.id;

  document.getElementById('confirmTitle').textContent = `You're in, ${ev.title}!`;
  document.getElementById('confirmMsg').textContent =
    "Your registration has been saved locally. Here's a summary:";
  document.getElementById('confirmDetail').innerHTML = `
    <div class="cd-row"><span>📅</span><span>${ev.displayDate}</span></div>
    <div class="cd-row"><span>⏰</span><span>${ev.displayTime}</span></div>
    <div class="cd-row"><span>📍</span><span>${ev.venue}</span></div>
    <div class="cd-row"><span>💰</span><span>${ev.fee}</span></div>
    <div class="cd-row"><span>🕐</span><span>Saved at ${new Date().toLocaleTimeString()}</span></div>
  `;

  document.getElementById('confirmOverlay').classList.add('active');
}

function hideConfirmation() {
  document.getElementById('confirmOverlay').classList.remove('active');
  pendingRegistrationId = null;
}

// ──────────────────────────────────────────────
//  8. TOAST
// ──────────────────────────────────────────────
let toastTimeout = null;

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show toast-' + type;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    t.classList.remove('show');
  }, 3500);
}

// ──────────────────────────────────────────────
//  9. MY REGISTRATIONS PANEL
// ──────────────────────────────────────────────
function openPanel() {
  renderPanel();
  document.getElementById('panelOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  document.getElementById('panelOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function renderPanel() {
  const body = document.getElementById('panelBody');
  const regs = getRegistrations();

  if (regs.length === 0) {
    body.innerHTML = `
      <div class="panel-empty">
        <span>📭</span>
        <p>No registrations yet.<br/>Browse events and register!</p>
      </div>`;
    return;
  }

  body.innerHTML = regs
    .map(
      (r) => `
    <div class="panel-item" data-id="${r.id}">
      <div class="panel-item-icon">${r.icon}</div>
      <div class="panel-item-info">
        <strong>${r.title}</strong>
        <span>${r.displayDate}</span>
        <span>${r.venue}</span>
        <span class="panel-item-ts">Registered: ${new Date(r.registeredAt).toLocaleString()}</span>
      </div>
      <button class="panel-item-remove" data-id="${r.id}" title="Cancel registration">✕</button>
    </div>`
    )
    .join('');

  body.querySelectorAll('.panel-item-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      removeRegistration(id);
      renderPanel();
      updateRegBadge();
      refreshCardButton(id);
      showToast('Registration cancelled.', 'warning');
    });
  });
}

function updateRegBadge() {
  const count = getRegistrations().length;
  const badge = document.getElementById('regBadge');
  badge.textContent = count;
  badge.classList.toggle('has-regs', count > 0);
}

// Refresh a single card's register button state without full re-render
function refreshCardButton(id) {
  const card = document.querySelector(`.event-card[data-id="${id}"]`);
  if (!card) return;
  const btn = card.querySelector('.btn-register');
  const already = isRegistered(id);
  btn.textContent = already ? '✓ Registered' : 'Register';
  btn.classList.toggle('registered', already);
}

// ──────────────────────────────────────────────
//  10. ANIMATED COUNTER (hero stats)
// ──────────────────────────────────────────────
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1400;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start.toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

// ──────────────────────────────────────────────
//  11. FILTER
// ──────────────────────────────────────────────
let activeFilter = 'all';

function setupFilters() {
  document.getElementById('filterBar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCards(activeFilter);
    startCountdowns();
  });
}

// ──────────────────────────────────────────────
//  12. HAMBURGER
// ──────────────────────────────────────────────
function setupHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
}

// ──────────────────────────────────────────────
//  13. EVENT LISTENERS
// ──────────────────────────────────────────────
function setupListeners() {
  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Modal register button
  document.getElementById('modalRegisterBtn').addEventListener('click', () => {
    if (activeModalEventId === null) return;
    const ev = EVENTS.find((e) => e.id === activeModalEventId);
    if (isRegistered(ev.id)) {
      showToast('You already registered for this event!', 'warning');
      return;
    }
    const saved = saveRegistration(ev);
    if (saved) {
      closeModal();
      showConfirmation(ev);
      updateRegBadge();
      refreshCardButton(ev.id);
    }
  });

  // Confirmation OK
  document.getElementById('confirmOk').addEventListener('click', () => {
    hideConfirmation();
    showToast('🎉 Registration confirmed & saved!', 'success');
  });

  // Confirmation UNDO
  document.getElementById('confirmCancel').addEventListener('click', () => {
    if (pendingRegistrationId !== null) {
      removeRegistration(pendingRegistrationId);
      refreshCardButton(pendingRegistrationId);
      updateRegBadge();
    }
    hideConfirmation();
    showToast('Registration removed.', 'warning');
  });

  // Panel open/close
  document.getElementById('myRegistrationsBtn').addEventListener('click', openPanel);
  document.getElementById('panelClose').addEventListener('click', closePanel);
  document.getElementById('panelOverlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('panelOverlay')) closePanel();
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closePanel();
      hideConfirmation();
    }
  });
}

// ──────────────────────────────────────────────
//  14. INIT
// ──────────────────────────────────────────────
function init() {
  renderCards();
  renderPastEvents();
  startCountdowns();
  setupFilters();
  setupHamburger();
  setupListeners();
  updateRegBadge();

  // Calculate accurate hero stats
  const futureCount = getFutureEvents().length;
  const totalRegs = EVENTS.reduce((sum, ev) => sum + ev.registered, 0);
  const uniqueOrganizers = new Set(EVENTS.map(ev => ev.organizer)).size;

  // Animated hero stats
  animateCount(document.getElementById('statEvents'), futureCount);
  animateCount(document.getElementById('statStudents'), totalRegs, '');
  animateCount(document.getElementById('statClubs'), uniqueOrganizers);

  // Format large numbers
  if (totalRegs >= 1000) {
    setTimeout(() => {
      document.getElementById('statStudents').textContent = (totalRegs / 1000).toFixed(1) + 'K';
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', init);
