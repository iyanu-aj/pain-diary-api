const supertest = require("supertest");
const faker = require("faker");
const app = require("../app");

// testing account registration
describe("Testing the account sign up and log in endpoints", () => {
    // setup fake account details with the faker library
    const data = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };

    // signup route test
    test("POST /account/register", async () => {
        await supertest(app).post("/account/register").send(data).expect(201);
    });

    // login route test
    test("POST /account/login", async () => {
        await supertest(app)
            .post("/account/login")
            .send(data)
            .expect(200)
            .then((response) => {
                expect(response.body.token).toContain("Bearer");
            });
    });
});
