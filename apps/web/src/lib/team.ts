export interface TeamMember {
  name: string // Hindi name
  nameEn: string // English name
  role: string // English role (uppercase)
  photo: string | null
  bio: string
  badge?: string
}

// Convert an English name to the author-page slug used for links.
// e.g. "Arvind Shukla" -> "arvind-shukla"
export function teamSlug(nameEn: string): string {
  return nameEn.toLowerCase().trim().replace(/\s+/g, '-')
}

// ── Team (single ordered list) ─────────────────────────────────────
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'अरविंद शुक्ला',
    nameEn: 'Arvind Shukla',
    role: 'FOUNDER & EDITOR-IN-CHIEF',
    photo: '/images/team/arvind-shukla.jpg',
    bio: 'Pulitzer Center Grantee. 20+ years of rural journalism across print, TV, radio, and digital. Founded News Potli to amplify the voices of farmers, women, and tribal communities.',
    badge: 'Pulitzer Grantee',
  },
  {
    name: 'साधना शुक्ला',
    nameEn: 'Sadhana Shukla',
    role: 'CO-FOUNDER & HEAD OF OPERATIONS',
    photo: '/images/team/sadhana-shukla.jpg',
    bio: "Business graduate and former project manager at Gaursons India. Freelance reporter and content writer for the Urban Development Department, Government of UP. Key role in shaping News Potli's vision and field reporting network.",
  },
  {
    name: 'मोहम्मद जलीश',
    nameEn: 'Mohd Jalish',
    role: 'ASSOCIATE EDITOR',
    photo: '/images/team/mohd-jalish.jpg',
    bio: '13+ years in journalism with India TV, News18 India, TV9 Bharatvarsh, and India News. Handles scripting, packaging, and editorial operations at News Potli.',
  },
  {
    name: 'मिथिलेश धर दुबे',
    nameEn: 'Mithilesh Dhar Dubey',
    role: 'ASSOCIATE EDITOR (CONTENT)',
    photo: '/images/team/mithilesh-dubey.jpg',
    bio: 'Ex-Principal correspondent for IndiaSpend Hindi. Previously at Gaon Connection, Nav Bharat Times, Prabhat Khabar, and Dainik Bhaskar. Expertise in agriculture, education, and climate change.',
  },
  {
    name: 'परितोष चार्ल्स',
    nameEn: 'Paritosh Charles',
    role: 'HEAD OF PRODUCTION',
    photo: null,
    bio: 'Bio coming soon.',
  },
  {
    name: 'जयंत मिश्रा',
    nameEn: 'Jayant Mishra',
    role: 'MULTIMEDIA JOURNALIST',
    photo: '/images/team/jayant-mishra.jpg',
    bio: 'Has reported from Alirajpur, Nashik, Bihar, and Lakhimpur covering tribal communities, farmer suicides, floods, and climate change impact on agriculture.',
  },
  {
    name: 'अजय राजपूत',
    nameEn: 'Ajay Rajput',
    role: 'CINEMATOGRAPHER',
    photo: '/images/team/ajay-kumar.jpg',
    bio: '10+ years in camera operations, drone cinematography, and documentary filmmaking. Captures the ground realities of rural India through powerful visuals and immersive storytelling.',
  },
  {
    name: 'मोहम्मद हस्साम',
    nameEn: 'Mohd Hassam',
    role: 'VIDEO EDITOR',
    photo: '/images/team/hassam-tajub.jpg',
    bio: '3+ years in video production specializing in cinematic storytelling, motion graphics, and visual content. Trained in motion graphics from Mumbai. Deep passion for writing, reading, and poetry.',
  },
  {
    name: 'मयंक श्रीवास्तव',
    nameEn: 'Mayank Srivastava',
    role: 'VIDEO EDITOR & MOTION GRAPHICS DESIGNER',
    photo: '/images/team/mayank-srivastava.jpg',
    bio: '14 years in motion graphics, video editing, and visual storytelling. Work spans commercials, social media content, corporate films, and digital campaigns. Also a faculty trainer in animation.',
  },
  {
    name: 'शिवानी बाजपेयी',
    nameEn: 'Shivani Bajpai',
    role: 'COMMUNICATION MANAGER',
    photo: '/images/team/shivani-bajpai.jpg',
    bio: '10+ years across marketing, sales, and customer engagement. Creates impactful content around agriculture, rural communities, women, and climate issues.',
  },
]

// Look up a team member by their author-page slug (derived from English name).
export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => teamSlug(m.nameEn) === slug)
}
