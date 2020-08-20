require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {

  const beeMovie = {
    title: 'bee movie',
    rating: 10,
    image: 'bee.jpeg',
    overview: 'go bee',
  };

  let token;

  beforeAll(async done => {

    execSync('npm run setup-db');

    client.connect();

    const signInData = await fakeRequest(app)
    .post('/auth/signup')
    .send({
      email: 'jon@user.com',
      password: '1234'
    });

    token = signInData.body.token;

    return done();

  });





  
  afterAll(done => {
    return client.end(done);
  });

  test('returns search results from movie dbapi', async(done) => {
    const expectation = 
      [
            {
                "popularity": 5.943,
                "vote_count": 8,
                "video": false,
                "poster_path": "/lDsUWvTHbSsI62u63S8B6Jjgztb.jpg",
                "id": 291545,
                "adult": false,
                "backdrop_path": null,
                "original_language": "en",
                "original_title": "Parasite",
                "genre_ids": [
                    27
                ],
                "title": "Parasite",
                "vote_average": 5,
                "overview": "An abandoned oil rig in the middle of the North Sea. Dr. Christine Hansen is charged with the task of testing an experimental cleaning fluid which could revolutionize the oil industry. Hired to carry out the tests is Jacob Rasmussen and his rough and ready crew of deconstruction engineers. But within hours one of them is missing under suspicious circumstances. Things go from bad to worse when environmental activist Mickey Hennessey and his hard-bitten associates seize control of the rig, taking everybody on board hostage. But very soon oil workers and environmentalists will be compelled to join forces in an evolutionary battle for survival. For a savage new life-form has made its home on the rig. And it is hungry.",
                "release_date": "2004-01-01"
            },
            {
                "popularity": 4.746,
                "vote_count": 29,
                "video": false,
                "poster_path": "/6EM7Jm3veKSW9ELMajSSxslYWDa.jpg",
                "id": 48311,
                "adult": false,
                "backdrop_path": "/AcZjBskxs7NioQOVj6DQaMbet34.jpg",
                "original_language": "en",
                "original_title": "Parasite",
                "genre_ids": [
                    27,
                    878
                ],
                "title": "Parasite",
                "vote_average": 5,
                "overview": "Paul Dean has created a deadly parasite that is now attached to his stomach. He and his female companion, Patricia Welles, must find a way to destroy it while also trying to avoid Ricus, his rednecks, and an evil government agent named Merchant.",
                "release_date": "1982-03-12"
            },
            {
                "popularity": 1.4,
                "id": 497637,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "Parasite",
                "release_date": "2006-04-01",
                "original_language": "en",
                "original_title": "Parasite",
                "genre_ids": [
                    80,
                    27
                ],
                "backdrop_path": null,
                "adult": false,
                "overview": "Jock Van Rysell is a middle age psychiatrist on the verge of a nervous breakdown. When a parasitic male patient of his interrupts his comfortable life, his sanity is literally flushed down the toilet.",
                "poster_path": null
            },
            {
                "popularity": 1.349,
                "vote_count": 0,
                "video": false,
                "poster_path": "/pAjExpwZRibYxkRadqd3WdpsLB.jpg",
                "id": 671137,
                "adult": false,
                "backdrop_path": null,
                "original_language": "en",
                "original_title": "Parasite",
                "genre_ids": [
                    27
                ],
                "title": "Parasite",
                "vote_average": 0,
                "overview": "Young couple gets together with friends for a barbeque, but something in the sink has other plans for tonight...",
                "release_date": "2015-08-13"
            },
            {
                "popularity": 1.578,
                "id": 622791,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "The Parasite",
                "release_date": "1925-01-20",
                "original_language": "en",
                "original_title": "The Parasite",
                "genre_ids": [
                    18
                ],
                "backdrop_path": null,
                "adult": false,
                "overview": "",
                "poster_path": null
            },
            {
                "popularity": 53.435,
                "vote_count": 8819,
                "video": false,
                "poster_path": "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                "id": 496243,
                "adult": false,
                "backdrop_path": "/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg",
                "original_language": "ko",
                "original_title": "기생충",
                "genre_ids": [
                    35,
                    18,
                    53
                ],
                "title": "Parasite",
                "vote_average": 8.5,
                "overview": "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
                "release_date": "2019-05-30"
            },
            {
                "popularity": 0.6,
                "id": 629162,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "Parasite",
                "release_date": "",
                "original_language": "en",
                "original_title": "Parasite",
                "genre_ids": [],
                "backdrop_path": null,
                "adult": false,
                "overview": "Wherever there is human development, somewhere nature is getting the shorter end of the stick. Every time someone struggles to rise, another barren spot is left behind. Grabbing hands struggle to grasp the beauty that exists in the world. Darkness is always on the other side.",
                "poster_path": "/i81BSTjXnrozgR3oTmAD8JueC0N.jpg"
            },
            {
                "popularity": 0.6,
                "id": 227625,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "The Parasite",
                "release_date": "1997-01-01",
                "original_language": "en",
                "original_title": "The Parasite",
                "genre_ids": [],
                "backdrop_path": null,
                "adult": false,
                "overview": "A skeptical professor falls under the spell of a powerful hypnotist.",
                "poster_path": "/yMMm5KcfV3WaPmWLgABZDXdMcL2.jpg"
            },
            {
                "popularity": 0.6,
                "id": 540545,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "The Parasite",
                "release_date": "2015-11-21",
                "original_language": "en",
                "original_title": "The Parasite",
                "genre_ids": [
                    27,
                    10749
                ],
                "backdrop_path": "/6uJoEILU61tIzOXRPkC3Rn6bxC3.jpg",
                "adult": false,
                "overview": "A young couple is terrorized by a seductive psychic woman. A David Lynch Master's in Film thesis, based on the novelette by Sir Arthur Conan Doyle.",
                "poster_path": "/k6XRlpuSLQjeKfik4tP1vyUhtVb.jpg"
            },
            {
                "popularity": 0.6,
                "vote_count": 0,
                "video": false,
                "poster_path": null,
                "id": 380120,
                "adult": false,
                "backdrop_path": null,
                "original_language": "en",
                "original_title": "Parasite Choi",
                "genre_ids": [
                    878
                ],
                "title": "Parasite Choi",
                "vote_average": 0,
                "overview": "Something inside us wants to go away. Be ready.",
                "release_date": "2013-10-28"
            },
            {
                "popularity": 0.6,
                "vote_count": 0,
                "video": false,
                "poster_path": "/AmOcdupFtwrZnkdLoZgYWT2gIcS.jpg",
                "id": 404280,
                "adult": false,
                "backdrop_path": null,
                "original_language": "en",
                "original_title": "Parasite Memories: The Making of 'Shivers'",
                "genre_ids": [],
                "title": "Parasite Memories: The Making of 'Shivers'",
                "vote_average": 0,
                "overview": "\"Parasite Memories\" is a brand new retrospective piece on the film produced by High Rising Productions with lively contribution from effects artist Joe Blasco, actresses Lynn Lowry and Barbara Steele, actor Allan Kolman, and Canadian critic Kier La-Janisse.",
                "release_date": "2014-10-13"
            },
            {
                "popularity": 0.6,
                "id": 561074,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "Relax, It's Probably Just a Parasite",
                "release_date": "",
                "original_language": "en",
                "original_title": "Relax, It's Probably Just a Parasite",
                "genre_ids": [
                    16,
                    35
                ],
                "backdrop_path": null,
                "adult": false,
                "overview": "A hypochondriac tries to figure out what's ailing him. Hopefully it's just a parasite.",
                "poster_path": null
            },
            {
                "popularity": 2.192,
                "vote_count": 13,
                "video": false,
                "poster_path": "/dzQ2VhOLr7UgktlXR4SFTH4VQev.jpg",
                "id": 33045,
                "adult": false,
                "backdrop_path": "/ynYT4ohuJnbkYdb1OYmvD5AiG3A.jpg",
                "original_language": "ja",
                "original_title": "パラサイト・イヴ",
                "genre_ids": [
                    18,
                    27,
                    878,
                    53,
                    10749
                ],
                "title": "Parasite Eve",
                "vote_average": 6.3,
                "overview": "Toshiaki Nagashima is a biologist who is doing major research on mitochondria. When his beautiful young wife is tragically involved in a car accident which leaves her brain dead, in desperation he steals her liver from her body in order to recieve the mitochondria from it to resurrect his wife from the dead. The killer mitochondria takes the form of his assistant.",
                "release_date": "1997-01-01"
            },
            {
                "popularity": 1.649,
                "vote_count": 13,
                "video": false,
                "poster_path": "/hzh3OMGLiKI8AwaVltwSIjkaNr2.jpg",
                "id": 45676,
                "adult": false,
                "backdrop_path": "/v1LrSpTuzGKcVjmMSxTCFGWpWaO.jpg",
                "original_language": "ja",
                "original_title": "Kiseichuu: Kiraa Pusshii",
                "genre_ids": [
                    35,
                    27
                ],
                "title": "Sexual Parasite",
                "vote_average": 3.2,
                "overview": "Five teenagers enter a deserted jungle and trespass inside an abandoned house only to haunted by a woman with a monster hidden inside her reproductive organs.",
                "release_date": "2004-08-22"
            },
            {
                "popularity": 10.033,
                "vote_count": 291,
                "video": false,
                "poster_path": "/ngntYqeKvDLieQhJKryQZoCLyCf.jpg",
                "id": 27429,
                "adult": false,
                "backdrop_path": "/hKhsgLfJlIQVa88dZWR7kIEwgbI.jpg",
                "original_language": "en",
                "original_title": "Shivers",
                "genre_ids": [
                    27
                ],
                "title": "Shivers",
                "vote_average": 6.4,
                "overview": "The residents of a suburban high-rise apartment building are being infected by a strain of parasites that turn them into mindless, sex-crazed fiends out to infect others by the slightest sexual contact.",
                "release_date": "1975-10-10"
            },
            {
                "popularity": 0.946,
                "vote_count": 3,
                "video": false,
                "poster_path": null,
                "id": 295057,
                "adult": false,
                "backdrop_path": null,
                "original_language": "pl",
                "original_title": "Huba",
                "genre_ids": [
                    18
                ],
                "title": "Parasite",
                "vote_average": 5.3,
                "overview": "Huba (Parasite) is a film about an ailing old man and a young mother. After retiring from the factory, the man, deprived of his daily routine, loses control over his time. Unable to eat or sleep, he starts drying up. The mother and child are like a single organism. Yet their relationship is, for all its closeness, one of dependence and inequality. The child, whose attachment to life is the strongest, is ravenous and needy; the woman, though enjoying a brief moment of freedom, is doomed to be a victim, while the old man has nothing to keep him going now that he can no longer work at the factory. When the three of them try to have a life together, they are like the Holy Family reversed. Brought together by chance, their lives intertwine in a web of oppression. The film follows their daily existence and slow decline.",
                "release_date": "2014-02-12"
            },
            {
                "popularity": 5.264,
                "id": 402462,
                "video": false,
                "vote_count": 10,
                "vote_average": 3.9,
                "title": "Parasites",
                "release_date": "2016-07-30",
                "original_language": "en",
                "original_title": "Parasites",
                "genre_ids": [
                    28,
                    27,
                    53
                ],
                "backdrop_path": null,
                "adult": false,
                "overview": "A group of friends get lost in the seedy streets where they encounter a crazed gang of homeless derelicts that seizes them and kills them one by one. The surviving man escapes on foot, naked and unarmed, with a pack of depraved transients in pursuit, and only seconds away from capture.",
                "poster_path": "/ot3xREXZDeg5VwKfGz6WamcKEs.jpg"
            },
            {
                "popularity": 1.896,
                "vote_count": 12,
                "video": false,
                "poster_path": "/bCDVdpjhqbfMsSg0TlNeGMdg2el.jpg",
                "id": 80089,
                "adult": false,
                "backdrop_path": null,
                "original_language": "ja",
                "original_title": "パラサイトドールズ",
                "genre_ids": [
                    28,
                    16,
                    878,
                    53
                ],
                "title": "Parasite Dolls",
                "vote_average": 5.3,
                "overview": "Beauty is only skin deep, but when you can’t see beneath the skin, how can you know what you’re really dealing with? In a world where perfect androids called Boomers have infiltrated every aspect of society, it’s the job of Branch to maintain peace between the people and the plastic. Unfortunately, not all boomers are created perfect, and when boomers go bad, people die. The thin blue line that separates man from machine is about to meet its most horrifying test in Parasite Dolls.",
                "release_date": "2003-05-22"
            },
            {
                "popularity": 0.805,
                "id": 620066,
                "video": false,
                "vote_count": 0,
                "vote_average": 0,
                "title": "The Parasite",
                "release_date": "1953-04-09",
                "original_language": "ru",
                "original_title": "Нахлебник",
                "genre_ids": [
                    18
                ],
                "backdrop_path": null,
                "adult": false,
                "overview": "After a long absence from St. Petersburg, a young landowner Yeletskaya comes to her estate with her husband.",
                "poster_path": "/m3kRyn6YmiyYW1XV8odmQBF8ry1.jpg"
            },
            {
                "popularity": 4.504,
                "vote_count": 12,
                "video": false,
                "poster_path": "/26Gl0tkVlQU5naHlRll5bBVZSKa.jpg",
                "id": 48809,
                "adult": false,
                "backdrop_path": null,
                "original_language": "en",
                "original_title": "Parasitic",
                "genre_ids": [
                    27,
                    878
                ],
                "title": "Parasitic",
                "vote_average": 2.5,
                "overview": "After a strange meteor destroys a communications satellite and crashes into Tampa Bay, a sickly looking fish finds itself the meal of a beautiful nightclub bartender named Val. Moments later, as the bar is closed and locked tight, the infected Val becomes ill and all Hell breaks loose. Hidden from the others, the parasite she has unknowingly eaten rapidly grows, bursting from her throat and becoming the puppet master for the chaos ahead. With no possible way to reach help or escape, the trapped club-goers must fight to survive and plan to destroy the creature before it is let loose into the world.",
                "release_date": "2012-06-26"
            }
        ];

    const data = await fakeRequest(app)
    .get('/search?searchQuery=parasite')
    .expect('Content-Type', /json/)
    .expect(200);

    expect(data.body).toEqual(expectation);

    done();
  });

    test('creates a new favorite on POST', async(done) => {
      const expectation = {
        ...beeMovie,
        id: 2,
        owner_id: 2
      };
  
      const data = await fakeRequest(app)
        .post('/api/favorites')
        .set('Authorization', token)
        .send(beeMovie)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(data.body).toEqual(expectation);
  
      done();
    });

    test('gets favs', async(done) => {
      const expectation = [{
        ...beeMovie,
        id: 2,
        owner_id: 2
      }];
  
      const data = await fakeRequest(app)
        .get('/api/favorites')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(data.body).toEqual(expectation);
  
      done();
    });

    test('deletes movie', async(done) => {
      const expectation = [];

      await fakeRequest(app)
      .delete('/api/favorites/2')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

      const data = await fakeRequest(app)
      .get('/api/favorites')
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

      expect(data.body).toEqual(expectation);

      done();
    })

});
