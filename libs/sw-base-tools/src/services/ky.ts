import ky from 'ky';

const swApi = ky.create({
  retry: {
    limit: 3,
    // statusCodes: [404], for test only
  },
});

export default swApi;
