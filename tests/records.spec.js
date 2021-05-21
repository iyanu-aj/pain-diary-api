const supertest = require("supertest");
const faker = require("faker");
const app = require("../app");

let token = "";

beforeAll((done) => {
    const data = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    supertest(app).post("/account/register").send(data)
        .end((err, response) => {
            token = response.body.token; // save the token!
            done();
        });
});

describe("Testing the pain records route", () => {
    const data = {
        pain_condition: "condition",
        level: 10,
        location: "location",
        symptoms: "symptoms",
        description: "description",
        triggers: "triggers",
        medications: "medications",
        interventions: "interventions",
        timing: "timing",
        environment: "environment",
        notes: "this is a note",
    };

    // create record route
    test("POST /record", async () => {
        await supertest(app)
            .post("/record")
            .set("Authorization", token)
            .send(data)
            .expect(201);
    });

    //should return records
    test("GET /record", async () => {
        await supertest(app)
            .get("/record")
            .set("Authorization", token)
            .expect(200)
            .then((response) => {
                expect(response.body.data.length).toBeGreaterThanOrEqual(1);
            });
    });
});
