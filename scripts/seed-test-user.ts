import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL!
console.log('Using database:', connectionString.split('@')[1]?.split('/')[0])
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding test user...')

  // Create test user
  const hashedPassword = await bcrypt.hash('testpassword123', 12)

  const testUser = await prisma.user.upsert({
    where: { email: 'test@roamsim.com' },
    update: {},
    create: {
      email: 'test@roamsim.com',
      name: 'Test User',
      password: hashedPassword,
      credits: 5000, // $50 credits for testing
    },
  })

  console.log('✅ Test user created:', testUser.email)
  console.log('   Referral code:', testUser.referralCode)
  console.log('   Credits: $' + (testUser.credits / 100).toFixed(2))

  // Create some sample travel guides
  const guides = [
    {
      countryCode: 'JP',
      countryName: 'Japan',
      overview: 'Japan offers excellent mobile connectivity with widespread 4G LTE and growing 5G coverage. Major cities have near-perfect coverage, while rural areas may have occasional dead spots.',
      tips: [
        { title: 'Airport SIM', content: 'Pickup counters at major airports offer temporary SIM cards, but eSIM is more convenient.' },
        { title: 'Train Connectivity', content: 'Shinkansen (bullet trains) have WiFi but cellular coverage can be spotty in tunnels.' },
      ],
      emergency: { police: '110', ambulance: '119', fire: '119' },
      connectivity: { coverage: 'Excellent in urban areas', carriers: ['NTT Docomo', 'au', 'SoftBank'], wifi: 'Free at convenience stores' },
      attractions: [{ name: 'Tokyo', description: 'Capital with excellent connectivity' }],
      flagImage: '🇯🇵',
    },
    {
      countryCode: 'TH',
      countryName: 'Thailand',
      overview: 'Thailand has excellent mobile coverage in tourist areas and major cities with affordable data plans.',
      tips: [
        { title: 'Island Coverage', content: 'Popular islands have good coverage. Remote islands may have limited connectivity.' },
      ],
      emergency: { police: '191', ambulance: '1669', fire: '199' },
      connectivity: { coverage: 'Good in tourist areas', carriers: ['AIS', 'True Move', 'dtac'], wifi: 'Common in hotels and cafes' },
      attractions: [{ name: 'Bangkok', description: 'Excellent 4G/5G coverage' }],
      flagImage: '🇹🇭',
    },
    {
      countryCode: 'US',
      countryName: 'United States',
      overview: 'Wide coverage in urban areas with multiple carrier options. Variable in rural regions.',
      tips: [
        { title: 'Coverage Varies', content: 'Urban areas have excellent coverage. National parks may have limited service.' },
      ],
      emergency: { police: '911', ambulance: '911', fire: '911' },
      connectivity: { coverage: 'Excellent in cities', carriers: ['Verizon', 'AT&T', 'T-Mobile'], wifi: 'Widely available' },
      attractions: [{ name: 'New York', description: 'Full coverage throughout' }],
      flagImage: '🇺🇸',
    },
  ]

  for (const guide of guides) {
    await prisma.travelGuide.upsert({
      where: { countryCode: guide.countryCode },
      update: guide,
      create: guide,
    })
    console.log('✅ Travel guide created:', guide.countryName)
  }

  console.log('\n🎉 Seeding complete!')
  console.log('\n📧 Test credentials:')
  console.log('   Email: test@roamsim.com')
  console.log('   Password: testpassword123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
