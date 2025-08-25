// Members data with detailed information
const membersData = [
  // Executive Board
  {
    id: "margaret-periard",
    name: "Margaret Periard",
    title: "President",
    major: "Industrial & Operations Engineering",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/MargaretPeriard.WebP",
    linkedin: "https://www.linkedin.com/in/margaret-periard/"
  },
  {
    id: "andrew-kasper",
    name: "Andrew Kasper",
    title: "Vice President",
    major: "Computer Science",
    year: "Senior",
    class: "eboard",
    image: "/static/media/people/AndrewKasper.WebP",
    linkedin: "https://www.linkedin.com/in/andrew-kasper-95b68423b/"
  },
  {
    id: "izzy-dubov",
    name: "Isabel Dubov",
    title: "VP Finance",
    major: "Data Science",
    year: "Senior",
    class: "eboard",
    image: "/static/media/people/IzzyDubov.WebP",
    linkedin: "https://www.linkedin.com/in/isabel-dubov/"
  },
  {
    id: "sahithi-nalamothu",
    name: "Sahithi Nalamothu",
    title: "VP Operations",
    major: "Computer Science, Economics",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/SahithiNalamothu.WebP",
    linkedin: "https://www.linkedin.com/in/sahithi-nalamothu-45568922b/"
  },
  {
    id: "alexandra-doytcheva",
    name: "Alexandra Doytcheva",
    title: "VP Internal",
    major: "Astrophysics",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/AlexDoytcheva.WebP",
    linkedin: "https://www.linkedin.com/in/alexandra-doytcheva-b691a1237/"
  },
  {
    id: "pranav-goyal",
    name: "Pranav Goyal",
    title: "VP Pro Dev",
    major: "Computer Engineering",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/pranavgoyal.webp",
    linkedin: "https://www.linkedin.com/in/pranav-goy4l/"
  },
  {
    id: "insu-jung",
    name: "Insu Jung",
    title: "VP Tech Dev",
    major: "Computer Science",
    year: "Senior",
    class: "eboard",
    image: "/static/media/people/insujung.WebP",
    linkedin: "https://www.linkedin.com/in/insu-jung-84767229b/"
  },
  {
    id: "drew-dame",
    name: "Drew Dame",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/DrewDame.WebP",
    linkedin: "https://www.linkedin.com/in/drew-dame/"
  },
  {
    id: "andrew-deng",
    name: "Andrew Deng",
    title: "VP Membership",
    major: "Computer Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/AndrewDeng.WebP",
    linkedin: "https://www.linkedin.com/in/andrew-deng-a73686208/"
  },
  {
    id: "justin-hirsch",
    name: "Justin Hirsch",
    title: "VP Membership",
    major: "Computer Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/JustinHirsch.WebP",
    linkedin: "https://www.linkedin.com/in/justinhirsch425/"
  },
  {
    id: "bowie-cooper",
    name: "Bowie Cooper",
    title: "VP Recruitment",
    major: "Computer Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/bowiecooper.WebP",
    linkedin: "https://www.linkedin.com/in/bowie-cooper-b60328294/"
  },
  {
    id: "sam-koda",
    name: "Sam Koda",
    title: "VP Recruitment",
    major: "Infromation Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/samkoda.WebP",
    linkedin: "https://www.linkedin.com/in/samkoda/"
  },
  {
    id: "nandini-desaraju",
    name: "Nandini Desaraju",
    title: "VP Marketing",
    major: "Information Analysis",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/NandiniS.WebP",
    linkedin: "https://www.linkedin.com/in/nandinidesaraju/"
  },

  // Active Members
  
  // E-board members also in their class sections
  {
    id: "margaret-periard-class",
    name: "Margaret Periard",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/MargaretPeriard.WebP",
    linkedin: "https://www.linkedin.com/in/margaret-periard/"
  },
  {
    id: "andrew-kasper-class",
    name: "Andrew Kasper",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/AndrewKasper.WebP",
    linkedin: "https://www.linkedin.com/in/andrew-kasper-95b68423b/"
  },
  {
    id: "izzy-dubov-class",
    name: "Isabel Dubov",
    title: "Alpha Class",
    major: "Data Science",
    year: "Junior",
    class: "alpha",
    image: "/static/media/people/IzzyDubov.WebP",
    linkedin: "https://www.linkedin.com/in/isabel-dubov/"
  },
  {
    id: "sahithi-nalamothu-class",
    name: "Sahithi Nalamothu",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/SahithiNalamothu.WebP",
    linkedin: "https://www.linkedin.com/in/sahithi-nalamothu-45568922b/"
  },
  {
    id: "alexandra-doytcheva-class",
    name: "Alexandra Doytcheva",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AlexDoytcheva.WebP",
    linkedin: "https://www.linkedin.com/in/alexandra-doytcheva-b691a1237/"
  },
  {
    id: "pranav-goyal-class",
    name: "Pranav Goyal",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/placeholder.WebP",
    linkedin: "https://www.linkedin.com/in/pranav-goy4l/"
  },




  {
    id: "sam-koda-class",
    name: "Sam Koda",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/SamKoda.WebP",
    linkedin: "https://www.linkedin.com/in/samkoda/"
  },
  {
    id: "nandini-desaraju-class",
    name: "Nandini Desaraju",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/NandiniS.WebP",
    linkedin: "https://www.linkedin.com/in/nandinidesaraju/"
  },
  
  // Other Active Members

  {
    id: "aditi-vishnubhatla",
    name: "Aditi Vishnubhatla",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/AditiV-3.WebP",
    linkedin: "https://www.linkedin.com/in/aditi-vishnubhatla/"
  },
  {
    id: "ahmed-hadi",
    name: "Ahmed Hadi",
    title: "Epsilon Class",
    major: "Industrial Operations Engineering",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/AhmedH.WebP",
    linkedin: "https://www.linkedin.com/in/ahmed-hadi1/"
  },
  {
    id: "dhruv-kapur",
    name: "Dhruv Kapur",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/AhmedH.WebP",
    linkedin: "https://www.linkedin.com/in/ahmed-hadi1/"
  },

  {
    id: "allison-yang",
    name: "Allison Yang",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/AllisonYang.WebP",
    linkedin: "https://www.linkedin.com/in/allison-yang10/"
  },
  {
    id: "ana-ryerson",
    name: "Ana Ryerson",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/AnaRyerson.WebP",
    linkedin: "https://www.linkedin.com/in/anaryerson/"
  },
  {
    id: "andrew-deng",
    name: "Andrew Deng",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AndrewDeng.WebP",
    linkedin: "https://www.linkedin.com/in/andrew-deng-a73686208/"
  },

  {
    id: "jessica-azucena",
    name: "Jessica Azucena",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Grad Student",
    class: "alpha",
    image: "/static/media/people/JessicaAzucena.WebP",
    linkedin: "https://www.linkedin.com/in/jessicaazucenaumich/"
  },
  
  {
    id: "anuj-arora",
    name: "Anuj Arora",
    title: "Delta Class",
    major: "Robotics",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/AnujArora.WebP",
    linkedin: "https://www.linkedin.com/in/anuj-arora-26899222a/"
  },
  {
    id: "arnav-kadam",
    name: "Arnav Kadam",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/ArnavKadam.WebP",
    linkedin: "https://www.linkedin.com/in/arnav-kadam-45679b24b/"
  },
 
  {
    id: "bowie-cooper",
    name: "Bowie Cooper",
    title: "Gamma Class",
    major: "Data Science",
    year: "Senior",
    class: "gamma",
    image: "/static/media/people/bowiecooper.WebP",
    linkedin: "https://www.linkedin.com/in/bowie-cooper-b60328294/"
  },
    {
    id: "emma-johnson",
    name: "Emma Johnson",
    title: "Gamma Class",
    major: "Information Analysis",
    year: "Senior",
    class: "gamma",
    image: "/static/media/people/emmajohnson.WebP",
    linkedin: "https://www.linkedin.com/in/emma-johnson-47822a285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
  },
  {
    id: "caitlin-roberts",
    name: "Caitlin Roberts",
    title: "Delta Class",
    major: "Robotics",
    year: "Senior",
    class: "delta",
    image: "/static/media/people/CaitlinRoberts.WebP",
    linkedin: "https://www.linkedin.com/in/caitlinmroberts/"
  },
  {
    id: "casey-zhang",
    name: "Casey Zhang",
    title: "Delta Class",
    major: "Data Science, Art & Design",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/CaseyZhang.WebP",
    linkedin: "https://www.linkedin.com/in/casey-zhang-5861182b3/"
  },


  {
    id: "ethan-matsuda",
    name: "Ethan Matsuda",
    title: "Delta Class",
    major: "Data Science",
    year: "Senior",
    class: "delta",
    image: "/static/media/people/EthanMatsuda.WebP",
    linkedin: "https://www.linkedin.com/in/ethan-matsuda/"
  },
  {
    id: "gracie-hou",
    name: "Gracie Hou",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/GracieHou.WebP",
    linkedin: "https://www.linkedin.com/in/gracie-hou/"
  },

  {
    id: "insu-jung",
    name: "Insu Jung",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Senior",
    class: "gamma",
    image: "/static/media/people/insujung.WebP",
    linkedin: "https://www.linkedin.com/in/insu-jung-84767229b/"
  },
  {
    id: "jackson-kirkey",
    name: "Jackson Kirkey",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/JacksonKirkey.WebP",
    linkedin: "https://www.linkedin.com/in/jackson-kirkey/"
  },
  {
    id: "jade-meister",
    name: "Jade Meister",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Senioe",
    class: "gamma",
    image: "/static/media/people/jademeister.WebP",
    linkedin: "https://www.linkedin.com/in/jade-meister-6ab1a0274/"
  },
  {
    id: "jake-levin",
    name: "Jake Levin",
    title: "Beta Class",
    major: "Data Science",
    year: "Junior",
    class: "beta",
    image: "/static/media/people/jakelevin.WebP",
    linkedin: "https://www.linkedin.com/in/jake-levin-450303294/"
  },
  {
    id: "joe-fiorenzo",
    name: "Joe Fiorenzo",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/JoeFiorenzo.WebP",
    linkedin: "https://www.linkedin.com/company/tau-epsilon-kappa/mycompany/"
  },
  

  {
    id: "justin-hirsch",
    name: "Justin Hirsch",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/JustinHirsch.WebP",
    linkedin: "https://www.linkedin.com/in/justinhirsch425/"
  },
  {
    id: "katie-lee",
    name: "Katie Lee",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/KatieLee.WebP",
    linkedin: "https://www.linkedin.com/in/ktjlee/"
  },
  {
    id: "kathryn-nichols",
    name: "Kathryn Nichols",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Senior",
    class: "gamma",
    image: "/static/media/people/kathrynNichols.WebP",
    linkedin: "https://www.linkedin.com/in/kathrynpnichols/"
  },
  {
    id: "kenan-george-nwogu",
    name: "Kenan George-Nwogu",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/Kenan George-Nwogu.WebP",
    linkedin: "https://www.linkedin.com/company/tau-epsilon-kappa/mycompany/"
  },
  {
    id: "kian-sandoval",
    name: "Kian Sandoval",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/KianSandoval.WebP",
    linkedin: "https://www.linkedin.com/in/kian-sandoval-19942b26b/"
  },
  {
    id: "molly-rich",
    name: "Molly Rich",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Junio",
    class: "gamma",
    image: "/static/media/people/mollyrich.WebP",
    linkedin: "https://www.linkedin.com/in/molly-rich-8ab403294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
  },

  {
    id: "landon-mckinney",
    name: "Landon McKinney",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/LandonMc.WebP",
    linkedin: "https://www.linkedin.com/in/landon-mckinney-984a4832a/"
  },

  {
    id: "liad-gross",
    name: "Liad Gross",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/LiadGross.WebP",
    linkedin: "https://www.linkedin.com/in/liad-gross-6315542b5/"
  },
 
  {
    id: "lucas-rosenberg",
    name: "Lucas Rosenberg",
    title: "Delta Class",
    major: "Computer Science",
    year: "Senior",
    class: "delta",
    image: "/static/media/people/LucasRosenberg.WebP",
    linkedin: "https://www.linkedin.com/in/lucasrosenberg/"
  },
  {
    id: "lulu-zhang",
    name: "Lulu Zhang",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/LuluZhang.WebP",
    linkedin: "https://www.linkedin.com/in/lulu-zhang-431b6722a/"
  },
  {
    id: "megan-gottfried",
    name: "Megan Gottfried",
    title: "Delta Class",
    major: "Industrial & Operations Engineering",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/MeganGottfried.WebP",
    linkedin: "https://www.linkedin.com/in/megan-gottfried/"
  },
  {
    id: "michael-feneberg",
    name: "Michael Feneberg",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/MichaelFeneberg.WebP",
    linkedin: "https://www.linkedin.com/in/mfeneberg/"
  },
  {
    id: "menuel-rosso",
    name: "Manuel Rosso-Benitez",
    title: "Epsilon Class",
    major: "Mechanical Engineering",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/MenuelRosso.WebP",
    linkedin: "https://www.linkedin.com/in/manuel-rosso-benitez-381801250?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
  },
  {
    id: "Manushri-Anand",
    name: "Manushri Anand",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/ManushriAnand.WebP",
    linkedin: "https://www.linkedin.com/in/manushri-anand/"
  },
  {
    id: "nandini-desaraju",
    name: "Nandini Desaraju",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/NandiniS.WebP",
    linkedin: "https://www.linkedin.com/in/nandinidesaraju/"
  },
  {
    id: "nathan-lesny",
    name: "Nathan Lesny",
    title: "Epsilon Class",
    major: "Computer Science, Mathematics",
    year: "Junio",
    class: "epsilon",
    image: "/static/media/people/NathanL.jpg",
    linkedin: "https://www.linkedin.com/in/nathan-lesny/"
  },
  {
    id: "preston-woodworth",
    name: "Preston Woodworth",
    title: "Delta Class",
    major: "Industrial & Operations Engineering",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/PrestonWoodworth.WebP",
    linkedin: "https://www.linkedin.com/in/preston-woodworth-7371162b3/"
  },
  {
    id: "sahithi-nalamothu",
    name: "Sahithi Nalamothu",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/SahithiNalamothu.WebP",
    linkedin: "https://www.linkedin.com/in/sahithi-nalamothu-45568922b/"
  },
  {
    id: "sam-wit",
    name: "Sam Wit",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/SamWit.WebP",
    linkedin: "https://www.linkedin.com/in/samuel-wit-9149532b3/"
  },

  
 
  {
    id: "sanjana-kulkarni",
    name: "Sanjana Kulkarni",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/SanjanaKulkarni.WebP",
    linkedin: "https://www.linkedin.com/in/sanjana-kulkarni/"
  },
 
  {
    id: "stella-johnson",
    name: "Stella Johnson",
    title: "Epsilon Class",
    major: "Information Analysis",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/StellaJohnson.WebP",
    linkedin: "https://www.linkedin.com/in/stella-johnson-ba4649212/"
  },
  {
    id: "suprita-nagali",
    name: "Suprita Nagali",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/SupritaNagali.WebP",
    linkedin: "https://www.linkedin.com/in/suprita-nagali/"
  },
  {
    id: "ellie-grehan",
    name: "Ellie Grehan",
    title: "Epsilon Class",
    major: "Biomedical Engineering",
    year: "Junior",
    class: "epsilon",
    image: "/static/media/people/EllieGrehan.WebP",
    linkedin: "https://www.linkedin.com/in/ellie-grehan/"
  },
  {
    id: "tim-smith",
    name: "Tim Smith",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Junior",
    class: "gamma",
    image: "/static/media/people/timsmith.WebP",
    linkedin: "https://www.linkedin.com/in/timothy-smith-7366b3241/"
  },
  {
    id: "winston-wu",
    name: "Winston Wu",
    title: "Delta Class",
    major: "Computer Science",
    year: "Senior",
    class: "delta",
    image: "/static/media/people/WinstonWu.WebP",
    linkedin: "https://www.linkedin.com/in/win-wu/"
  },
  {
    id: "yana-mehta",
    name: "Yana Mehta",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Senior",
    class: "epsilon",
    image: "/static/media/people/YanaMehta.WebP",
    linkedin: "https://www.linkedin.com/in/yanamehta/"
  },
  {
    id: "yan-cheng-poon",
    name: "Yan Cheng Poon",
    title: "Delta Class",
    major: "Computer Science",
    year: "Senior",
    class: "delta",
    image: "/static/media/people/YCPoon.WebP",
    linkedin: "https://www.linkedin.com/in/yan-cheng-poon/"
  },
  {
    id: "zach-freed",
    name: "Zach Freed",
    title: "Gamma Class",
    major: "Computer Science, Economics",
    year: "Senior",
    class: "gamma",
    image: "/static/media/people/zachfreed.WebP",
    linkedin: "https://www.linkedin.com/in/zachary-freed/"
  },

  {
    id: "zannah-baker",
    name: "Zannah Baker",
    title: "Delta Class",
    major: "Information Analysis",
    year: "Senior",
    class: "delta",
    image: "/static/media/people/ZannahBaker.WebP",
    linkedin: "https://www.linkedin.com/in/zannah-baker/"
  },
];
 

// Function to create member card HTML
function createMemberCard(member, isCompact = true) {
  const cardClass = isCompact ? 'member-card compact' : `member-card ${member.class}`;
  
  return `
    <div class="${cardClass}" data-member="${member.id}" data-class="${member.class}">
      <div class="member-image">
        <img src="${member.image}" alt="${member.name}" />
        <div class="member-overlay">
          <i class="fas fa-info-circle"></i>
        </div>
      </div>
      <div class="member-info">
        <h3>${member.name}</h3>
        <p class="member-title">${member.title}</p>
        <div class="member-details">
          <p class="member-major">${member.major}</p>
          <p class="member-year">${member.year}</p>
        </div>
      </div>
    </div>
  `;
}

// Function to render members grid
function renderMembers(classFilter = 'all') {
  const membersGrid = document.getElementById('members-grid');
  let filteredMembers = membersData.filter(member => member.class !== 'eboard');
  
  if (classFilter !== 'all') {
    filteredMembers = filteredMembers.filter(member => member.class === classFilter);
  }
  
  membersGrid.innerHTML = filteredMembers.map(member => createMemberCard(member)).join('');
  
  // Add click listeners to new cards
  addMemberCardListeners();
}

// Function to setup class filter tabs
function setupClassFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get the class and render members
      const classFilter = button.getAttribute('data-class');
      renderMembers(classFilter);
    });
  });
}

// Function to show member modal
function showMemberModal(memberId) {
  const member = membersData.find(m => m.id === memberId);
  if (!member) return;
  
  const modal = document.getElementById('member-modal');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalTitle = document.getElementById('modal-title');
  const modalMajor = document.getElementById('modal-major');
  const modalYear = document.getElementById('modal-year');
  const modalLinkedin = document.getElementById('modal-linkedin');
  
  // Populate modal with member data
  modalImg.src = member.image;
  modalImg.alt = member.name;
  modalName.textContent = member.name;
  modalTitle.textContent = member.title;
  modalMajor.textContent = member.major;
  modalYear.textContent = member.year;
  modalLinkedin.href = member.linkedin;
  
  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Function to hide member modal
function hideMemberModal() {
  const modal = document.getElementById('member-modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Function to add click listeners to member cards
function addMemberCardListeners() {
  const memberCards = document.querySelectorAll('.member-card');
  
  memberCards.forEach(card => {
    card.addEventListener('click', () => {
      const memberId = card.getAttribute('data-member');
      showMemberModal(memberId);
    });
  });
}

// Function to setup modal controls
function setupModal() {
  const modal = document.getElementById('member-modal');
  const closeBtn = document.querySelector('.close');
  


  // Close modal when clicking X
  closeBtn.addEventListener('click', hideMemberModal);
  
  // Close modal when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      hideMemberModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideMemberModal();
    }
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderMembers(); // Render all members initially
  setupClassFilter(); // Setup filter functionality
  setupModal(); // Setup modal functionality
  addMemberCardListeners(); // Add listeners to eboard cards
});
