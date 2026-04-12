import { prisma } from '../src/config/prisma.js';
import 'dotenv/config';
import { insertUser } from '../src/services/auth.services.js';
import { insertPost } from '../src/services/posts.services.js';
import { insertComment } from '../src/services/comments.services.js';

async function main() {
  // Reset DB
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE;'
  );
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE;'
  );
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;'
  );

  console.log('DB reset.');

  // ======================
  // Add admins (F1 commentators)
  // ======================

  const john = await insertUser('johnferrancol', process.env.DUMMY_PW, 'admin');
  const martin = await insertUser(
    'martinbrundle',
    process.env.DUMMY_PW,
    'admin'
  );
  const david = await insertUser('davidcroft', process.env.DUMMY_PW, 'admin');

  // ======================
  // Add users (F1 drivers)
  // ======================

  const max = await insertUser('maxverstappen', process.env.DUMMY_PW);
  const charles = await insertUser('charlesleclerc', process.env.DUMMY_PW);
  const lewis = await insertUser('lewishamilton', process.env.DUMMY_PW);
  const oscar = await insertUser('oscarpiastri', process.env.DUMMY_PW);

  console.log('Added Users and Admins');

  // ======================
  // Add posts
  // ======================
  const post1 = await insertPost(
    'GianPiero Lambiase to leave Red Bull for Mclaren in 2028',
    "Max Verstappen's long-time race engineer Gianpiero Lambiase will leave Red Bull when his current contract expires in 2028, with the Briton joining McLaren as Chief Racing Officer.",
    john.id
  );

  const post2 = await insertPost(
    'What F1 teams and drivers will be doing in April?',
    'Why are there no races in April? How is the break in the calendar different to the enforced summer and winter ‘shutdowns’? What will the teams be working on during this period? F1.com answers all of these questions and more',
    martin.id
  );

  const post3 = await insertPost(
    'Ricciardo opens up on F1 career coming to an end',
    "Daniel Ricciardo has opened up on the conclusion of his Formula 1 career, acknowledging that he is 'grateful' for Red Bull calling time on his stint as an F1 driver.",
    david.id
  );

  const post4 = await insertPost(
    "Binotto reflects on Audi's 'biggest challenge'",
    "John catches up with Mattia Binotto, Head of the Audi F1 project, to assess the team's journey so far and the challenge of building a brand-new power unit.When Mattia Binotto took over the reins at Sauber, he knew the path to the top was steep.",
    john.id
  );

  console.log('Added Posts');

  // ======================
  // Add Comments
  // ======================

  // Comments for Post 1
  await insertComment('Simply not lovely!', max.id, post1.id);

  await insertComment('Can mine leave as well!', lewis.id, post1.id);

  await insertComment('Mine too!', charles.id, post1.id);

  // Comments for Post 2
  await insertComment(
    'Probably just Sim racing and racing in GT3',
    max.id,
    post2.id
  );

  await insertComment('Catching up with running!', lewis.id, post2.id);

  await insertComment('Spending time with the wife!', charles.id, post2.id);

  await insertComment('Ummm......', oscar.id, post2.id);

  // Comments for Post 3
  await insertComment('Miss you daniel....', max.id, post3.id);

  await insertComment(
    'Miss having a fellow aussie around....',
    oscar.id,
    post3.id
  );

  // Comments for Post 4
  await insertComment(
    'Not as big of the challenge as red bull....',
    max.id,
    post4.id
  );

  await insertComment('Same for ferrari....', charles.id, post4.id);

  console.log('Added comments.');
  console.log('DB seeded.');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
