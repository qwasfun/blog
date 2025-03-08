import { drizzle } from 'drizzle-orm/neon-http'
import feedSeed from './seed.json'
import { rssFeed } from './schema'

// TODO: Replace DATABASE_URL with the actual database url string
// @ts-ignore
const db = drizzle(DATABASE_URL)

const seed = async () => {
  console.log('Seeding data...')

  try {
    for (let feed of feedSeed) {
      console.log(feed)
      await db.insert(rssFeed).values({ ...feed })
    }
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

seed()
