// Members data with detailed information
const membersData = [
  // Executive Board
  {
    id: "margaret-periard",
    name: "Margaret Periard",
    title: "President",
    major: "Computer Science",
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
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/IzzyDubov.WebP",
    linkedin: "https://www.linkedin.com/in/isabel-dubov/"
  },
  {
    id: "sahithi-nalamothu",
    name: "Sahithi Nalamothu",
    title: "VP Operations",
    major: "Computer Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/SahithiNalamothu.WebP",
    linkedin: "https://www.linkedin.com/in/sahithi-nalamothu-45568922b/"
  },
  {
    id: "alexandra-doytcheva",
    name: "Alexandra Doytcheva",
    title: "VP Internal",
    major: "Computer Science",
    year: "Sophomore",
    class: "eboard",
    image: "/static/media/people/AlexDoytcheva.WebP",
    linkedin: "https://www.linkedin.com/in/alexandra-doytcheva-b691a1237/"
  },
  {
    id: "pranav-goyal",
    name: "Pranav Goyal",
    title: "VP Pro Dev",
    major: "Computer Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/placeholder.WebP",
    linkedin: ""
  },
  {
    id: "insu-jung",
    name: "Insu Jung",
    title: "VP Tech Dev",
    major: "Computer Science",
    year: "Junior",
    class: "eboard",
    image: "/static/media/people/insujung.WebP",
    linkedin: "https://www.linkedin.com/in/insu-jung-84767229b/"
  },
  {
    id: "andrew-deng",
    name: "Andrew Deng",
    title: "VP Membership",
    major: "Computer Science",
    year: "Sophomore",
    class: "eboard",
    image: "/static/media/people/AndrewDeng.WebP",
    linkedin: "https://www.linkedin.com/in/andrew-deng-a73686208/"
  },
  {
    id: "justin-hirsch",
    name: "Justin Hirsch",
    title: "VP Membership",
    major: "Computer Science",
    year: "Sophomore",
    class: "eboard",
    image: "/static/media/people/JustinHirsch.WebP",
    linkedin: "https://www.linkedin.com/in/justinhirsch425/"
  },
  {
    id: "bowie-cooper",
    name: "Bowie Cooper",
    title: "VP Recruitment",
    major: "Data Science",
    year: "Senior",
    class: "eboard",
    image: "/static/media/people/bowiecooper.WebP",
    linkedin: "https://www.linkedin.com/in/bowie-cooper-b60328294/"
  },
  {
    id: "sam-koda",
    name: "Sam Koda",
    title: "VP Recruitment",
    major: "Computer Science",
    year: "Sophomore",
    class: "eboard",
    image: "/static/media/people/SamKoda.WebP",
    linkedin: "https://www.linkedin.com/in/samkoda/"
  },
  {
    id: "nandini-desaraju",
    name: "Nandini Desaraju",
    title: "VP Marketing",
    major: "Computer Science",
    year: "Sophomore",
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
    title: "Founding Class",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
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
    linkedin: ""
  },
  {
    id: "insu-jung-class",
    name: "Insu Jung",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Junior",
    class: "gamma",
    image: "/static/media/people/insujung.WebP",
    linkedin: "https://www.linkedin.com/in/insu-jung-84767229b/"
  },
  {
    id: "andrew-deng-class",
    name: "Andrew Deng",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AndrewDeng.WebP",
    linkedin: "https://www.linkedin.com/in/andrew-deng-a73686208/"
  },
  {
    id: "justin-hirsch-class",
    name: "Justin Hirsch",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/JustinHirsch.WebP",
    linkedin: "https://www.linkedin.com/in/justinhirsch425/"
  },
  {
    id: "bowie-cooper-class",
    name: "Bowie Cooper",
    title: "Gamma Class",
    major: "Data Science",
    year: "Senior",
    class: "gamma",
    image: "/static/media/people/bowiecooper.WebP",
    linkedin: "https://www.linkedin.com/in/bowie-cooper-b60328294/"
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
    id: "aaron-hsu",
    name: "Aaron Hsu",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/AaronHsu.WebP",
    linkedin: "https://www.linkedin.com/in/aaron-hsu-9ab116215/"
  },
  {
    id: "abigail-finn",
    name: "Abigail Finn",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/AbbyFinn.WebP",
    linkedin: "https://www.linkedin.com/in/abigail-finn-0700aa173/"
  },
  {
    id: "aditi-vishnubhatla",
    name: "Aditi Vishnubhatla",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AditiV-3.WebP",
    linkedin: "https://www.linkedin.com/in/aditi-vishnubhatla/"
  },
  {
    id: "ahmed-hadi",
    name: "Ahmed Hadi",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AhmedH.WebP",
    linkedin: "https://www.linkedin.com/in/ahmed-hadi1/"
  },
  {
    id: "alexandra-doytcheva",
    name: "Alexandra Doytcheva",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AlexDoytcheva.WebP",
    linkedin: "https://www.linkedin.com/in/alexandra-doytcheva-b691a1237/"
  },
  {
    id: "alexandra-tan",
    name: "Alexandra Tan",
    title: "Founding Class",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
    image: "/static/media/people/AlexandraTan.WebP",
    linkedin: "https://www.linkedin.com/in/thealexandratan/"
  },
  {
    id: "allison-yang",
    name: "Allison Yang",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AllisonYang.WebP",
    linkedin: "https://www.linkedin.com/in/allison-yang10/"
  },
  {
    id: "ana-ryerson",
    name: "Ana Ryerson",
    title: "Epsilon Class",
    major: "Information Systems",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/AnaRyerson.WebP",
    linkedin: "https://www.linkedin.com/in/anaryerson/"
  },
  {
    id: "anant-bajaj",
    name: "Anant Bajaj",
    title: "Founding Class",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
    image: "/static/media/people/AnantBajaj.WebP",
    linkedin: "https://www.linkedin.com/in/anantbajaj/"
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
    id: "andrew-wang",
    name: "Andrew Wang",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/AndrewWang.WebP",
    linkedin: "https://www.linkedin.com/in/theandrewwang/"
  },
  {
    id: "anuj-arora",
    name: "Anuj Arora",
    title: "Delta Class",
    major: "Computer Science",
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
    id: "bella-kressaty",
    name: "Bella Kressaty",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/BellaK.WebP",
    linkedin: "https://www.linkedin.com/in/isabella-kressaty-880036260/"
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
    id: "caitlin-roberts",
    name: "Caitlin Roberts",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/CaitlinRoberts.WebP",
    linkedin: "https://www.linkedin.com/in/caitlinmroberts/"
  },
  {
    id: "casey-zhang",
    name: "Casey Zhang",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/CaseyZhang.WebP",
    linkedin: "https://www.linkedin.com/in/casey-zhang-5861182b3/"
  },
  {
    id: "chloe-emch",
    name: "Chloe Emch",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/ChloeEmch.WebP",
    linkedin: "https://www.linkedin.com/in/chloe-emch-6924a2259/"
  },
  {
    id: "davis-rule",
    name: "Davis Rule",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/DavisRule.WebP",
    linkedin: "https://www.linkedin.com/in/davis-rule/"
  },
  {
    id: "declan-coyle",
    name: "Declan Coyle",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/DeclanCoyle.WebP",
    linkedin: "https://www.linkedin.com/in/declan-coyle-282516221/"
  },
  {
    id: "ethan-matsuda",
    name: "Ethan Matsuda",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/EthanMatsuda.WebP",
    linkedin: "https://www.linkedin.com/in/ethan-matsuda/"
  },
  {
    id: "gracie-hou",
    name: "Gracie Hou",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/GracieHou.WebP",
    linkedin: "https://www.linkedin.com/in/gracie-hou/"
  },
  {
    id: "haley-robinson",
    name: "Haley Robinson",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/HayleyRobinson.WebP",
    linkedin: "https://www.linkedin.com/in/haley-robinson3/"
  },
  {
    id: "insu-jung",
    name: "Insu Jung",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Junior",
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
    year: "Junior",
    class: "gamma",
    image: "/static/media/people/jademeister.WebP",
    linkedin: "https://www.linkedin.com/in/jade-meister-6ab1a0274/"
  },
  {
    id: "jake-levin",
    name: "Jake Levin",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Junior",
    class: "gamma",
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
    id: "john-borin",
    name: "John Borin",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/JohnBorin.WebP",
    linkedin: "https://www.linkedin.com/in/john-borin-033475215/"
  },
  {
    id: "jordan-chen",
    name: "Jordan Chen",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/JordanChen.WebP",
    linkedin: "https://www.linkedin.com/in/jordan-chen-5a8763141/"
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
    id: "kateri-darr",
    name: "Kateri Darr",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/KateriDarr.WebP",
    linkedin: "https://www.linkedin.com/in/kateri-darr-6597b3224/"
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
    year: "Junior",
    class: "gamma",
    image: "/static/media/people/kathrynNichols.WebP",
    linkedin: "https://www.linkedin.com/in/kathrynpnichols/"
  },
  {
    id: "keegan-kipke",
    name: "Keegan Kipke",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/KeeganKipke.WebP",
    linkedin: "https://www.linkedin.com/in/keegan-kipke/"
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
    id: "kyle-ritenour",
    name: "Kyle Ritenour",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/KyleRitenour.WebP",
    linkedin: "https://www.linkedin.com/in/kysrit/"
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
    id: "lena-bibbo",
    name: "Lena Bibbo",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/LenaBibbo.WebP",
    linkedin: "https://www.linkedin.com/in/lena-b-a8734b198/"
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
    id: "lily-gong",
    name: "Lily Gong",
    title: "Founding Class",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
    image: "/static/media/people/LilyGong.WebP",
    linkedin: "https://www.linkedin.com/in/lily-gong/"
  },
  {
    id: "lucas-rosenberg",
    name: "Lucas Rosenberg",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
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
    major: "Computer Science",
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
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/MichaelFeneberg.WebP",
    linkedin: "https://www.linkedin.com/in/mfeneberg/"
  },
  {
    id: "minali-kapadia",
    name: "Minali Kapadia",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/MinaliKapadia.WebP",
    linkedin: "https://www.linkedin.com/in/minali-kapadia-aa4470156/"
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
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/NathanL.jpg",
    linkedin: "https://www.linkedin.com/in/nathan-lesny/"
  },
  {
    id: "preston-woodworth",
    name: "Preston Woodworth",
    title: "Delta Class",
    major: "Computer Science",
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
    id: "samuel-ilivicky",
    name: "Samuel Ilivicky",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/SamuelIlivicky.WebP",
    linkedin: "https://www.linkedin.com/in/samilivicky/"
  },
  {
    id: "sam-hanson",
    name: "Sam Hanson",
    title: "Founding Class",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
    image: "/static/media/people/SamHanson.WebP",
    linkedin: "https://www.linkedin.com/in/sam-hanson-059b20221/"
  },
  {
    id: "sam-koda",
    name: "Sam Koda",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
    class: "epsilon",
    image: "/static/media/people/SamKoda.WebP",
    linkedin: "https://www.linkedin.com/in/samkoda/"
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
    id: "sebastian-roclore",
    name: "Sebastian Roclore",
    title: "Founding Team",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
    image: "/static/media/people/SebRoclore.WebP",
    linkedin: "https://www.linkedin.com/in/sebastian-roclore-0141aa1a8/"
  },
  {
    id: "shivani-sundaresan",
    name: "Shivani Sundaresan",
    title: "Beta Class",
    major: "Computer Science",
    year: "Senior",
    class: "beta",
    image: "/static/media/people/ShivaniSundaresan.WebP",
    linkedin: "https://www.linkedin.com/in/shivanisundaresan/"
  },
  {
    id: "stella-johnson",
    name: "Stella Johnson",
    title: "Epsilon Class",
    major: "Computer Science",
    year: "Sophomore",
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
    year: "Junior",
    class: "delta",
    image: "/static/media/people/WinstonWu.WebP",
    linkedin: "https://www.linkedin.com/in/win-wu/"
  },
  {
    id: "yan-cheng-poon",
    name: "Yan Cheng Poon",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/YCPoon.WebP",
    linkedin: "https://www.linkedin.com/in/yan-cheng-poon/"
  },
  {
    id: "zach-freed",
    name: "Zach Freed",
    title: "Gamma Class",
    major: "Computer Science",
    year: "Junior",
    class: "gamma",
    image: "/static/media/people/zachfreed.WebP",
    linkedin: "https://www.linkedin.com/in/zachary-freed/"
  },
  {
    id: "zainab-iftikhar",
    name: "Zainab Iftikhar",
    title: "Founding Class",
    major: "Computer Science",
    year: "Senior",
    class: "founding",
    image: "/static/media/people/ZainabIftikhar.WebP",
    linkedin: "https://www.linkedin.com/in/zainab-iftikhar-873b7a225/"
  },
  {
    id: "zannah-baker",
    name: "Zannah Baker",
    title: "Delta Class",
    major: "Computer Science",
    year: "Junior",
    class: "delta",
    image: "/static/media/people/ZannahBaker.WebP",
    linkedin: "https://www.linkedin.com/in/zannah-baker/"
  },
  {
    id: "zoe-vickery",
    name: "Zoe Vickery",
    title: "Alpha Class",
    major: "Computer Science",
    year: "Senior",
    class: "alpha",
    image: "/static/media/people/ZoeVickery.WebP",
    linkedin: "https://www.linkedin.com/in/zoe-vickery-7774b6253/"
  }
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
