const { expect } = require('chai');
const axios = require('axios');

// integration tests on the auth APIS
describe('The authAPI test', async () => {
  let token;
  it('Testing POST api/v1/auth/sign-up', async () => {
    // test should go here
    let httpTestResponse = await axios.post(
      'http://localhost:5000/api/v1/auth/sign-up',
      {
        email: 'kevinliutest12424@gmail.com',
        password: 'randomAssPassword123',
      }
    );
    expect(httpTestResponse.status).to.be.equal(200);
  });

  it('Testing user sign In', async () => {
    let httpTestResponse = await axios.post(
      'http://localhost:5000/api/v1/auth/sign-in',
      {
        email: 'kevinliutest12424@gmail.com',
        password: 'randomAssPassword123',
      }
    );
    expect(httpTestResponse.status).to.be.equal(200);
    token = httpTestResponse.data.token;
  });

  it('Testing DEL /api/v1/auth/ API', async () => {
    console.log(token);
    let httpTestResponse = await axios.delete(
      'http://localhost:5000/api/v1/auth/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(httpTestResponse.status).to.be.equal(200);
  });
});
