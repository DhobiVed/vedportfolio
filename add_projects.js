const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// Find the start of projGrid
const gridStartStr = '<div class="proj-grid" id="projGrid">';
const gridStartIdx = html.indexOf(gridStartStr) + gridStartStr.length;

// Extract existing projects
const restHtml = html.substring(gridStartIdx);
// We will drop the existing 'attendance' and 'ddquest' cards to replace them.
// The first card (attendance) starts at gridStartIdx.
// Let's just use regex to remove the old attendance and ddquest cards.
let cleanHtml = html;
cleanHtml = cleanHtml.replace(/<div class="pcard[^>]*onclick="openDeepDive\('attendance'\)"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, '');
cleanHtml = cleanHtml.replace(/<div class="pcard[^>]*onclick="openDeepDive\('ddquest'\)"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/, '');

// Now prepare the 4 new cards
const newCards = `
      <!-- 1. Smart Attendance -->
      <div class="pcard rev" data-cat="android">
        <div class="pthumb" style="background:linear-gradient(135deg,#0f2010,#1a3020)">
          <i class="fas fa-user-check pthumb-icon" style="color:#34a853"></i>
          <span class="pthumb-badge private">Dream Vision Tech</span>
        </div>
        <div class="pbody">
          <div class="ptypes"><span class="ptype ptype-android">Android</span></div>
          <h3>Smart Attendance System</h3>
          <p class="pdesc">A universal solution for schools & offices. Features Face Recognition, QR Check-In, Instant Notifications, and Real-Time Cloud Reports.</p>
          <div class="pfoot">
            <div class="ptech-stack"><span class="ptechitem">Java</span><span class="ptechitem">XML</span><span class="ptechitem">ML Kit</span></div>
            <div class="plinks"><span class="plink" title="Private"><i class="fas fa-lock"></i></span></div>
          </div>
        </div>
      </div>

      <!-- 2. Online Order App -->
      <div class="pcard rev rev-d1" data-cat="android">
        <div class="pthumb" style="background:linear-gradient(135deg,#201010,#301a1a)">
          <i class="fas fa-shopping-basket pthumb-icon" style="color:#e74c3c"></i>
          <span class="pthumb-badge live">Featured</span>
        </div>
        <div class="pbody">
          <div class="ptypes"><span class="ptype ptype-android">Android</span></div>
          <h3>QuickCommerce Delivery App</h3>
          <p class="pdesc">A Blinkit/JioMart style online ordering app. Highly reliable, flexible, and attractive UI for seamless shopping and fast delivery.</p>
          <div class="pfoot">
            <div class="ptech-stack"><span class="ptechitem">Kotlin</span><span class="ptechitem">Firebase</span><span class="ptechitem">MVVM</span></div>
            <div class="plinks"><span class="plink" title="Private"><i class="fas fa-lock"></i></span></div>
          </div>
        </div>
      </div>

      <!-- 3. Offline Billing System -->
      <div class="pcard rev rev-d2" data-cat="web">
        <div class="pthumb" style="background:linear-gradient(135deg,#101a20,#1a2a30)">
          <i class="fas fa-cash-register pthumb-icon" style="color:#3498db"></i>
          <span class="pthumb-badge private">Dream & Vision</span>
        </div>
        <div class="pbody">
          <div class="ptypes"><span class="ptype ptype-web">Desktop Web</span></div>
          <h3>Smart Mall Billing System</h3>
          <p class="pdesc">Offline desktop billing dashboard. Features fast POS billing, Inventory Management, Sales Reports & Analytics, and Receipt Printing.</p>
          <div class="pfoot">
            <div class="ptech-stack"><span class="ptechitem">HTML/CSS</span><span class="ptechitem">JS</span><span class="ptechitem">Local DB</span></div>
            <div class="plinks"><span class="plink" title="Private"><i class="fas fa-lock"></i></span></div>
          </div>
        </div>
      </div>

      <!-- 4. DDQuest -->
      <div class="pcard rev" data-cat="android">
        <div class="pthumb" style="background:linear-gradient(135deg,#0f0f20,#1a1a35)">
          <i class="fas fa-graduation-cap pthumb-icon" style="color:var(--amber)"></i>
          <span class="pthumb-badge private">Founder</span>
        </div>
        <div class="pbody">
          <div class="ptypes"><span class="ptype ptype-android">Android</span></div>
          <h3>DDQuest Study Platform</h3>
          <p class="pdesc">Best-in-class mobile study platform providing academic materials, notes, assignments, and smooth student-teacher communication.</p>
          <div class="pfoot">
            <div class="ptech-stack"><span class="ptechitem">Java</span><span class="ptechitem">XML</span><span class="ptechitem">Firebase</span></div>
            <div class="plinks"><span class="plink" title="Private"><i class="fas fa-crown"></i></span></div>
          </div>
        </div>
      </div>
`;

// Insert the new cards right after the start of projGrid
const finalHtml = cleanHtml.replace(gridStartStr, gridStartStr + '\\n' + newCards);

fs.writeFileSync('index.html', finalHtml);
console.log('Projects successfully added.');
