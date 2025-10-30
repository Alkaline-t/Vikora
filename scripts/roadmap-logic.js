document.addEventListener('DOMContentLoaded', () => {
  const careerInput = document.getElementById('careerInput');
  const searchButton = document.getElementById('searchButton');
  const careerCardsGrid = document.querySelector('.career-cards-grid');
  const careerCards = document.querySelectorAll('.career-card');
  const careerOptionsHeading = document.querySelector('.career-options-section h2');

  function filterCareerCards() {
    const searchTerm = careerInput.value.toLowerCase().trim();

    if (searchTerm) {
      careerOptionsHeading.style.display = 'none'; // Hide the heading when searching
    } else {
      careerOptionsHeading.style.display = ''; // Show the heading when search is empty
    }

    careerCards.forEach(card => {
      const cardTitle = card.querySelector('h3').textContent.toLowerCase();
      const cardDescription = card.querySelector('p').textContent.toLowerCase();

      if (cardTitle.includes(searchTerm) || cardDescription.includes(searchTerm)) {
        card.style.display = ''; // Show the card
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  }

  // Trigger search on input change
  careerInput.addEventListener('input', filterCareerCards);

  // Trigger search on button click
  searchButton.addEventListener('click', filterCareerCards);

  // Roadmap modal logic
  const roadmapModal = document.getElementById('roadmapModal');
  const roadmapContent = document.getElementById('roadmapContent');
  const closeButtons = document.querySelectorAll('.modal .close-button');
  const dermatologistCard = document.querySelector('[data-career="Dermatologist"]');

  // Define roadmap content for Dermatologist
  const dermatologistRoadmapContent = `
    <h2>🛣 Dermatologist Roadmap (Line-by-Line)</h2>

    <h3>Phase I: Schooling & Entrance (Total: 3 Years)</h3>
    <ul>
      <li>Class 10: Score excellent grades, building a strong base in Science (PCB) and Math.</li>
      <li>Class 11 & 12 (Science): Select the Science Stream with Physics, Chemistry, and Biology (PCB).</li>
      <li>NEET-UG Preparation: Start intensive coaching/self-study for the NEET-UG exam.</li>
      <li>Entrance Exam: Appear for and crack the NEET-UG (National Eligibility-cum-Entrance Test) with a top rank.</li>
    </ul>

    <h3>Phase II: Medical Education (Total: 8.5 Years)</h3>
    <ul>
      <li>MBBS Admission: Secure a seat in an MBBS (Bachelor of Medicine and Bachelor of Surgery) program.</li>
      <li>MBBS Academics: Complete 4.5 years of core medical studies.</li>
      <li>Compulsory Internship: Complete 1 year of rotating internship after the final MBBS exams.</li>
      <li>NEET-PG Preparation: Begin focused preparation for the NEET-PG or INI CET during the internship year.</li>
    </ul>

    <h3>Phase III: Specialization (Total: 3 Years)</h3>
    <ul>
      <li>Crack NEET-PG/INI CET: Qualify with a very high rank to secure a seat in Dermatology.</li>
      <li>MD/DNB Admission: Enroll in M.D. in Dermatology, Venereology, and Leprosy (DVL) or DNB program.</li>
      <li>Specialist Training: Complete the 3-year M.D. residency in Dermatology.</li>
    </ul>

    <h3>Phase IV: Professional Practice (Continuous)</h3>
    <ul>
      <li>Licensing: Obtain specialist registration from the National Medical Commission (NMC).</li>
      <li>Super-specialization (Optional): Pursue a Fellowship or DM (Doctorate of Medicine) in an advanced field like Cosmetic Dermatology (1-2 years).</li>
      <li>Practice: Begin work as a Consultant Dermatologist.</li>
    </ul>

    <p><strong>Total Minimum Time (Post Class 10):</strong> 2 + 5.5 + 3 = 10.5 Years</p>
  `;

  const promptEngineerRoadmapContent = `
    <h2>🛣 Prompt Engineer Roadmap (Step-by-Step & Line-by-Line)</h2>

    <h3>Phase 1: Foundation (Weeks 1 – 2)</h3>
    <ul>
      <li>1️⃣ Understand what Artificial Intelligence (AI) and Natural Language Processing (NLP) mean.</li>
      <li>2️⃣ Learn how Large Language Models (LLMs) like GPT, Gemini, Claude work.</li>
      <li>3️⃣ Study how AI interprets prompts and generates answers.</li>
      <li>4️⃣ Watch beginner videos on YouTube — “Intro to Prompt Engineering by Andrew Ng.”</li>
      <li>5️⃣ Explore the ChatGPT Playground to see how small wording changes affect results.</li>
    </ul>

    <h3>Phase 2: Prompting Basics (Weeks 3 – 4)</h3>
    <ul>
      <li>6️⃣ Learn the standard prompt format — Role + Task + Context + Example.</li>
      <li>7️⃣ Practice writing clear, specific prompts with exact instructions.</li>
      <li>8️⃣ Experiment with tone, style, and length controls.</li>
      <li>9️⃣ Try “temperature” and “max tokens” adjustments in the AI Playground.</li>
      <li>🔟 Write at least 10 different prompts daily and analyze the responses.</li>
    </ul>

    <h3>Phase 3: Advanced Prompt Design (Weeks 5 – 6)</h3>
    <ul>
      <li>11️⃣ Learn Few-Shot Prompting — give AI examples before your question.</li>
      <li>12️⃣ Learn Chain-of-Thought Prompting — ask AI to reason step-by-step.</li>
      <li>13️⃣ Master System Prompts — control AI’s personality and limits.</li>
      <li>14️⃣ Practice Multi-Turn Prompting — build conversations that remember context.</li>
      <li>15️⃣ Study how changing one word in a prompt changes the logic or style.</li>
    </ul>

    <h3>Phase 4: Real-World Projects (Weeks 7 – 9)</h3>
    <ul>
      <li>16️⃣ Build a small AI Chatbot using OpenAI or Gemini API.</li>
      <li>17️⃣ Create an AI Study Assistant that helps students answer school questions.</li>
      <li>18️⃣ Develop an AI Content Writer that produces essays or blogs.</li>
      <li>19️⃣ Try connecting AI with a database (using LangChain or LlamaIndex).</li>
      <li>20️⃣ Test and improve your prompts to make them consistent and reliable.</li>
    </ul>

    <h3>Phase 5: Prompt Optimization & Automation (Weeks 10 – 12)</h3>
    <ul>
      <li>21️⃣ Learn Prompt Evaluation — compare which prompts perform best.</li>
      <li>22️⃣ Use A/B Testing — test multiple versions of the same prompt.</li>
      <li>23️⃣ Build Reusable Prompt Templates for similar tasks.</li>
      <li>24️⃣ Explore Flowise, PromptLayer, and Dust.tt for visual prompt flows.</li>
      <li>25️⃣ Start combining prompts with automation tools (like Zapier or Make).</li>
    </ul>

    <h3>Phase 6: Professional Growth (Ongoing)</h3>
    <ul>
      <li>26️⃣ Document your best prompts in a “Prompt Journal.”</li>
      <li>27️⃣ Build a small Prompt Portfolio Website (use GitHub Pages or Vercel).</li>
      <li>28️⃣ Share your prompt experiments on LinkedIn or X (Twitter).</li>
      <li>29️⃣ Join communities — OpenAI Forum, LangChain Discord, Prompt Engineering Subreddit.</li>
      <li>30️⃣ Keep learning new AI updates and practice daily prompt crafting.</li>
    </ul>

    <h3>⚙️ Bonus: Tech Stack to Learn</h3>
    <ul>
      <li>31️⃣ Front-End Basics: HTML, CSS, JavaScript (or React).</li>
      <li>32️⃣ Back-End: Node.js or Python (Flask / FastAPI).</li>
      <li>33️⃣ APIs: OpenAI API, Gemini API, Claude API.</li>
      <li>34️⃣ Tools: LangChain, Pinecone (Vector Database), Vercel (for hosting).</li>
    </ul>
  `;

  const neurologistRoadmapContent = `
    <h2>🧠 Complete Roadmap to Becoming a Neurologist</h2>

    <p>This path typically takes a minimum of 12 years after high school.</p>

    <h3>Phase 1: Undergraduate Education (4 Years)</h3>
    <ul>
      <li><strong>Year 1-4:</strong> Earn a Bachelor's Degree (B.S. or B.A.).</li>
      <li><strong>Major:</strong> Choose a major (e.g., Biology, Chemistry, Neuroscience) that allows you to maintain a high GPA (3.5+ is often recommended).</li>
      <li><strong>Prerequisites:</strong> Complete all pre-med courses (General Chemistry, Organic Chemistry, Physics, Biology, English, Math).</li>
      <li><strong>Experience:</strong> Gain extensive clinical shadowing (especially in Neurology), volunteering, and research experience.</li>
      <li><strong>Year 3/4:</strong> Prepare for and take the MCAT (Medical College Admission Test).</li>
      <li><strong>Year 4 (Summer/Fall):</strong> Apply to medical school using the AMCAS (MD) or AACOMAS (DO) service.</li>
    </ul>

    <h3>Phase 2: Medical School (4 Years)</h3>
    <ul>
      <li><strong>Year 1-2:</strong> Complete Pre-Clinical Coursework (lectures, labs, basic science foundations).</li>
      <li><strong>Year 2/3:</strong> Pass USMLE Step 1 / COMLEX Level 1 (Required for licensure).</li>
      <li><strong>Year 3-4:</strong> Complete Clinical Clerkships (required rotations in Internal Medicine, Surgery, Pediatrics, Psychiatry, and Neurology).</li>
      <li><strong>Year 4 (Summer/Fall):</strong> Complete a Neurology Sub-Internship and take electives.</li>
      <li><strong>Year 4 (Fall):</strong> Prepare and submit the Residency Application via ERAS (Electronic Residency Application Service).</li>
      <li><strong>Key Documents:</strong> Personal Statement, Medical School Transcript, MSPE (Dean's Letter), USMLE/COMLEX scores, and Letters of Recommendation (at least one from a neurologist).</li>
      <li><strong>Year 4 (Winter):</strong> Attend Residency Interviews.</li>
      <li><strong>Year 4 (Spring):</strong> Participate in the NRMP Match (National Resident Matching Program) for a Neurology Residency spot.</li>
      <li><strong>Year 4:</strong> Pass USMLE Step 2 / COMLEX Level 2.</li>
    </ul>

    <h3>Phase 3: Residency Training (4 Years)</h3>
    <ul>
      <li><strong>PGY-1 (Internship Year):</strong> Complete a required year of broad clinical training, typically in Internal Medicine.</li>
      <li>(Note: Many programs are "Categorical," meaning PGY-1 is integrated into the four-year training block, but it remains focused on internal medicine.)</li>
      <li><strong>PGY-2:</strong> Begin Core Neurology Training. Learn fundamental inpatient and outpatient neurology.</li>
      <li><strong>PGY-3 & PGY-4:</strong> Complete Advanced Neurology Rotations. Gain specialized experience in areas like Neurocritical Care, Stroke, Epilepsy, and Pediatric Neurology. Take on more supervisory roles.</li>
      <li><strong>During Residency:</strong> Participate in research and grand rounds, and give lectures.</li>
      <li><strong>PGY-4:</strong> Pass USMLE Step 3 / COMLEX Level 3 (Final licensing exam).</li>
    </ul>

    <h3>Phase 4: Post-Residency & Practice (Ongoing)</h3>
    <ul>
      <li><strong>Option 1: Subspecialty Fellowship (1-2 Years):</strong></li>
      <li>Apply to a specialized fellowship program (e.g., Vascular Neurology, Clinical Neurophysiology, Movement Disorders).</li>
      <li>Complete the fellowship training.</li>
      <li><strong>Final Requirement:</strong> Obtain a State Medical License.</li>
      <li><strong>Certification:</strong> Take and pass the exam for the American Board of Psychiatry and Neurology (ABPN) to become a Board-Certified Neurologist.</li>
      <li><strong>Practice:</strong> Begin professional practice as an Attending Neurologist.</li>
    </ul>
  `;

  const cardiologistRoadmapContent = `
    <h2>❤️ Complete Roadmap to Becoming a Cardiologist</h2>

    <p>This path typically takes a minimum of 12-14 years after high school.</p>

    <h3>Phase 1: Undergraduate Education (4 Years)</h3>
    <ul>
      <li><strong>Year 1-4:</strong> Earn a Bachelor's Degree (B.S. or B.A.).</li>
      <li><strong>Major:</strong> Choose a major (e.g., Biology, Chemistry, Neuroscience, Pre-Med) that allows you to maintain a high GPA (3.5+ recommended).</li>
      <li><strong>Prerequisites:</strong> Complete all pre-med courses (General Chemistry, Organic Chemistry, Physics, Biology, English, Math).</li>
      <li><strong>Experience:</strong> Gain extensive clinical shadowing (especially in Cardiology), volunteering, and research experience.</li>
      <li><strong>Year 3/4:</strong> Prepare for and take the MCAT (Medical College Admission Test).</li>
      <li><strong>Year 4 (Summer/Fall):</strong> Apply to medical school using the AMCAS (MD) or AACOMAS (DO) service.</li>
    </ul>

    <h3>Phase 2: Medical School (4 Years)</h3>
    <ul>
      <li><strong>Year 1-2:</strong> Complete Pre-Clinical Coursework (lectures, labs, basic science foundations).</li>
      <li><strong>Year 2/3:</strong> Pass USMLE Step 1 / COMLEX Level 1 (Required for licensure).</li>
      <li><strong>Year 3-4:</strong> Complete Clinical Clerkships (required rotations in Internal Medicine, Surgery, Pediatrics, Psychiatry, and Cardiology).</li>
      <li><strong>Year 4 (Summer/Fall):</strong> Complete a Cardiology Sub-Internship and take electives.</li>
      <li><strong>Year 4 (Fall):</strong> Prepare and submit the Residency Application via ERAS (Electronic Residency Application Service).</li>
      <li><strong>Key Documents:</strong> Personal Statement, Medical School Transcript, MSPE (Dean's Letter), USMLE/COMLEX scores, and Letters of Recommendation (at least one from a cardiologist).</li>
      <li><strong>Year 4 (Winter):</strong> Attend Residency Interviews.</li>
      <li><strong>Year 4 (Spring):</strong> Participate in the NRMP Match (National Resident Matching Program) for an Internal Medicine Residency spot (as Cardiology is a subspecialty of Internal Medicine).</li>
      <li><strong>Year 4:</strong> Pass USMLE Step 2 / COMLEX Level 2.</li>
    </ul>

    <h3>Phase 3: Internal Medicine Residency (3 Years)</h3>
    <ul>
      <li><strong>PGY-1 (Internship Year):</strong> Broad clinical training in Internal Medicine.</li>
      <li><strong>PGY-2 & PGY-3:</strong> Continued training in Internal Medicine, with increasing responsibility and opportunities for electives, including some in Cardiology.</li>
      <li><strong>During Residency:</strong> Participate in research, grand rounds, and teaching. Prepare for Internal Medicine Board Certification.</li>
      <li><strong>PGY-3:</strong> Pass USMLE Step 3 / COMLEX Level 3 (Final licensing exam).</li>
    </ul>

    <h3>Phase 4: Cardiovascular Disease Fellowship (3 Years)</h3>
    <ul>
      <li><strong>Year 1-3:</strong> Complete a specialized fellowship in Cardiovascular Disease. This includes intensive training in all aspects of cardiology, such as echocardiography, cardiac catheterization, electrophysiology, and management of various heart conditions.</li>
      <li><strong>During Fellowship:</strong> Engage in significant clinical work, research, and presentations.</li>
      <li><strong>Year 3:</strong> Prepare for and take the Cardiovascular Disease Board Certification exam.</li>
    </ul>

    <h3>Phase 5: Subspecialty Fellowship (Optional, 1-2 Years)</h3>
    <ul>
      <li>Further specialization in areas like Interventional Cardiology, Electrophysiology, or Advanced Heart Failure and Transplant Cardiology.</li>
    </ul>

    <h3>Phase 6: Professional Practice (Ongoing)</h3>
    <ul>
      <li><strong>Licensing:</strong> Obtain and maintain a State Medical License.</li>
      <li><strong>Certification:</strong> Become Board-Certified in Internal Medicine and Cardiovascular Disease (and any subspecialty).</li>
      <li><strong>Practice:</strong> Begin professional practice as an Attending Cardiologist.</li>
    </ul>
  `;

  const ethicalHackerRoadmapContent = `
    <h2>💻 Ethical Hacker Roadmap (Step-by-Step & Line-by-Line)</h2>

    <h3>Phase 1: Foundational Skills (Weeks 1-8)</h3>
    <ul>
      <li><strong>1. Learn Linux Basics:</strong> Master command line, file system navigation, permissions, and basic scripting in a Linux environment (e.g., Kali Linux).</li>
      <li><strong>2. Networking Fundamentals:</strong> Understand TCP/IP, subnetting, ports, protocols (HTTP, DNS, DHCP), and network topologies. Study for CompTIA Network+ or CCNA.</li>
      <li><strong>3. Programming Basics:</strong> Learn Python (essential for scripting, automation, and exploit development) and basic Bash scripting.</li>
      <li><strong>4. Web Technologies:</strong> Understand how websites work (HTML, CSS, JavaScript), client-server architecture, and basic web vulnerabilities (OWASP Top 10 introduction).</li>
      <li><strong>5. Virtualization:</strong> Set up a lab environment using VirtualBox or VMware with vulnerable VMs (e.g., Metasploitable, OWASP Broken Web Apps).</li>
    </ul>

    <h3>Phase 2: Core Hacking Concepts (Weeks 9-16)</h3>
    <ul>
      <li><strong>6. Information Gathering (Reconnaissance):</strong> Learn passive and active reconnaissance techniques (e.g., Nmap, Shodan, Google Dorking, OSINT tools).</li>
      <li><strong>7. Vulnerability Scanning:</strong> Understand how to use tools like Nessus, OpenVAS, and Nmap for automated vulnerability detection.</li>
      <li><strong>8. Exploitation Basics:</strong> Learn about common vulnerabilities (SQL Injection, XSS, RCE, LFI/RFI) and basic exploitation techniques.</li>
      <li><strong>9. Post-Exploitation:</strong> Understand privilege escalation, maintaining access, and covering tracks.</li>
      <li><strong>10. Introduction to Metasploit:</strong> Learn to use the Metasploit Framework for penetration testing.</li>
    </ul>

    <h3>Phase 3: Advanced Techniques & Certifications (Weeks 17-24)</h3>
    <ul>
      <li><strong>11. Web Application Hacking:</strong> Deep dive into web app vulnerabilities, advanced SQLi, XSS, CSRF, SSRF, and API security. Practice with Burp Suite.</li>
      <li><strong>12. Wireless Hacking:</strong> Understand Wi-Fi security (WEP, WPA/WPA2), common attacks, and tools like Aircrack-ng.</li>
      <li><strong>13. Social Engineering:</strong> Learn about human-based attacks, phishing, pretexting, and awareness.</li>
      <li><strong>14. Cryptography Basics:</strong> Understand encryption, hashing, digital signatures, and common cryptographic vulnerabilities.</li>
      <li><strong>15. Certifications:</strong> Prepare for and achieve entry-level cybersecurity certifications like CompTIA Security+ or EC-Council CEH (Certified Ethical Hacker). Consider advanced certs like OSCP (Offensive Security Certified Professional) for hands-on experience.</li>
    </ul>

    <h3>Phase 4: Specialization & Practice (Ongoing)</h3>
    <ul>
      <li><strong>16. Choose a Specialization:</strong> Focus on areas like Web Application Security, Network Security, Cloud Security, Mobile Security, or IoT Security.</li>
      <li><strong>17. Bug Bounty Programs:</strong> Participate in bug bounty programs to gain real-world experience and earn rewards.</li>
      <li><strong>18. CTF (Capture The Flag) Competitions:</strong> Regularly participate in CTF challenges to hone skills and learn new techniques.</li>
      <li><strong>19. Continuous Learning:</strong> Stay updated with the latest threats, vulnerabilities, and security tools. Read security blogs, research papers, and follow industry experts.</li>
      <li><strong>20. Build a Home Lab:</strong> Create a dedicated home lab for continuous practice and experimentation with different attack scenarios.</li>
    </ul>
  `;

  const penetrationTesterRoadmapContent = `
    <h2>🕵️ Penetration Tester Roadmap (Step-by-Step & Line-by-Line)</h2>

    <h3>Phase 1: Foundational Skills (Weeks 1-8)</h3>
    <ul>
      <li><strong>1. Learn Linux Basics:</strong> Become proficient in Linux command line, scripting (Bash), and common tools.</li>
      <li><strong>2. Networking Fundamentals:</strong> Master TCP/IP, subnetting, routing, firewalls, and network protocols. Study for CompTIA Network+.</li>
      <li><strong>3. Programming Basics:</strong> Learn Python for scripting and automating tasks, and basic understanding of other languages like C/C++, Java, or JavaScript.</li>
      <li><strong>4. Web Technologies:</strong> Understand web application architecture, HTTP/HTTPS, and basic web development concepts (HTML, CSS, JavaScript).</li>
      <li><strong>5. Operating Systems:</strong> Gain a solid understanding of Windows and Linux operating systems, including common services and configurations.</li>
    </ul>

    <h3>Phase 2: Core Cybersecurity Concepts (Weeks 9-16)</h3>
    <ul>
      <li><strong>6. Information Security Concepts:</strong> Understand confidentiality, integrity, availability (CIA triad), risk management, and common security models. Study for CompTIA Security+.</li>
      <li><strong>7. Vulnerability Assessment:</strong> Learn to identify, classify, and prioritize vulnerabilities using tools like Nessus, OpenVAS, and Nmap.</li>
      <li><strong>8. Cryptography:</strong> Understand symmetric/asymmetric encryption, hashing, digital signatures, and common cryptographic attacks.</li>
      <li><strong>9. Web Application Security:</strong> Deep dive into OWASP Top 10 vulnerabilities (SQL Injection, XSS, CSRF, etc.) and mitigation techniques. Practice with tools like Burp Suite.</li>
      <li><strong>10. Network Penetration Testing:</strong> Learn techniques for scanning, enumeration, vulnerability exploitation, and post-exploitation on networks.</li>
    </ul>

    <h3>Phase 3: Advanced Techniques & Certifications (Weeks 17-24)</h3>
    <ul>
      <li><strong>11. Exploit Development:</strong> Understand buffer overflows, shellcoding, and how to craft custom exploits (requires C/C++ knowledge).</li>
      <li><strong>12. Social Engineering:</strong> Learn to conduct effective social engineering attacks (e.g., phishing, pretexting) and how to defend against them.</li>
      <li><strong>13. Cloud Security:</strong> Understand security challenges and testing methodologies for cloud environments (AWS, Azure, GCP).</li>
      <li><strong>14. Mobile Application Penetration Testing:</strong> Learn to test iOS and Android applications for vulnerabilities.</li>
      <li><strong>15. Certifications:</strong> Pursue industry-recognized certifications like Offensive Security Certified Professional (OSCP), Certified Ethical Hacker (CEH), or GIAC Penetration Tester (GPEN).</li>
    </ul>

    <h3>Phase 4: Specialization & Continuous Learning (Ongoing)</h3>
    <ul>
      <li><strong>16. Choose a Specialization:</strong> Focus on a specific area like Web App PT, Mobile PT, Network PT, Cloud PT, or IoT PT.</li>
      <li><strong>17. Red Teaming:</strong> Gain experience in simulating full-scope attacks to test an organization's security posture.</li>
      <li><strong>18. Bug Bounty Programs & CTFs:</strong> Actively participate in bug bounty platforms and Capture The Flag competitions to sharpen skills.</li>
      <li><strong>19. Contribute to Open Source:</strong> Contribute to cybersecurity projects or tools to enhance your profile and learn from others.</li>
      <li><strong>20. Stay Updated:</strong> Continuously learn about new attack vectors, vulnerabilities, and defensive strategies by reading blogs, research papers, and attending conferences.</li>
    </ul>
  `;

  if (dermatologistCard) {
    dermatologistCard.addEventListener('click', () => {
      roadmapContent.innerHTML = dermatologistRoadmapContent;
      roadmapModal.setAttribute('aria-hidden', 'false');
      roadmapModal.classList.add('is-open');
    });
  }

  const promptEngineerCard = document.querySelector('[data-career="Prompt Engineer"]');
  if (promptEngineerCard) {
    promptEngineerCard.addEventListener('click', () => {
      roadmapContent.innerHTML = promptEngineerRoadmapContent;
      roadmapModal.setAttribute('aria-hidden', 'false');
      roadmapModal.classList.add('is-open');
    });
  }

  const neurologistCard = document.querySelector('[data-career="Neurologist"]');
  if (neurologistCard) {
    neurologistCard.addEventListener('click', () => {
      roadmapContent.innerHTML = neurologistRoadmapContent;
      roadmapModal.setAttribute('aria-hidden', 'false');
      roadmapModal.classList.add('is-open');
    });
  }

  const cardiologistCard = document.querySelector('[data-career="Cardiologist"]');
  if (cardiologistCard) {
    cardiologistCard.addEventListener('click', () => {
      roadmapContent.innerHTML = cardiologistRoadmapContent;
      roadmapModal.setAttribute('aria-hidden', 'false');
      roadmapModal.classList.add('is-open');
    });
  }

  const ethicalHackerCard = document.querySelector('[data-career="Ethical Hacker"]');
  if (ethicalHackerCard) {
    ethicalHackerCard.addEventListener('click', () => {
      roadmapContent.innerHTML = ethicalHackerRoadmapContent;
      roadmapModal.setAttribute('aria-hidden', 'false');
      roadmapModal.classList.add('is-open');
    });
  }

  const penetrationTesterCard = document.querySelector('[data-career="Penetration Tester"]');
  if (penetrationTesterCard) {
    penetrationTesterCard.addEventListener('click', () => {
      roadmapContent.innerHTML = penetrationTesterRoadmapContent;
      roadmapModal.setAttribute('aria-hidden', 'false');
      roadmapModal.classList.add('is-open');
    });
  }

  // Close modal functionality for all modals
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('is-open');
      }
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.setAttribute('aria-hidden', 'true');
      event.target.classList.remove('is-open');
    }
  });

  // Check for search query in URL on page load
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('query');
  if (searchQuery) {
    careerInput.value = searchQuery;
    filterCareerCards();
  }
});
